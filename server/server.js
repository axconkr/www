require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15분
  max: 100, // IP당 최대 100개 요청
  message: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.'
});
app.use('/api/', limiter);

// 데이터베이스 연결
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

// JWT 시크릿 키 (실제 운영에서는 환경변수로 관리)
const JWT_SECRET = process.env.JWT_SECRET || 'ax-consulting-secret-key-2025';

// 이메일 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'axconkr@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password-here' // Gmail 앱 비밀번호 필요
  }
});

// 이메일 전송 함수
async function sendConsultationEmail(consultationData) {
  // 이메일 설정이 없으면 건너뛰기
  if (!process.env.EMAIL_PASS || process.env.EMAIL_PASS === 'your-app-password-here') {
    console.log('⚠️  이메일 전송 건너뜀: EMAIL_PASS 환경변수가 설정되지 않았습니다.');
    console.log('📧 상담 신청 정보:', consultationData);
    return { success: false, error: '이메일 설정 없음' };
  }

  const { name, company, email, phone, message } = consultationData;
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'axconkr@gmail.com',
    to: 'axconkr@gmail.com',
    subject: `[AX Consulting] 새로운 상담 신청 - ${company} (${name})`,
    html: `
      <h2>새로운 상담 신청이 접수되었습니다</h2>
      <hr>
      <p><strong>신청자명:</strong> ${name}</p>
      <p><strong>회사명:</strong> ${company}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>연락처:</strong> ${phone || '미제공'}</p>
      <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
      <hr>
      <h3>상담 내용</h3>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>이 메일은 AX Consulting 웹사이트를 통해 자동 발송되었습니다.</small></p>
    `,
    text: `
새로운 상담 신청이 접수되었습니다

신청자명: ${name}
회사명: ${company}
이메일: ${email}
연락처: ${phone || '미제공'}
신청 시간: ${new Date().toLocaleString('ko-KR')}

상담 내용:
${message}

이 메일은 AX Consulting 웹사이트를 통해 자동 발송되었습니다.
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('상담 신청 알림 이메일 전송 성공:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return { success: false, error: error.message };
  }
}

// ====== API 엔드포인트 ======

// 1. 상담 신청 저장
app.post('/api/consultations', async (req, res) => {
  try {
    const { name, company, email, phone, message } = req.body;

    // 필수 필드 검증
    if (!name || !company || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: '필수 정보를 모두 입력해주세요.' 
      });
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: '올바른 이메일 형식을 입력해주세요.' 
      });
    }

    // 데이터베이스에 저장
    const sql = `
      INSERT INTO consultations (name, company, email, phone, message) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [name, company, email, phone, message], async function(err) {
      if (err) {
        console.error('상담 신청 저장 오류:', err);
        return res.status(500).json({ 
          success: false, 
          message: '상담 신청 저장에 실패했습니다.' 
        });
      }

      const consultationId = this.lastID;

      // 이메일 전송 시도
      const emailResult = await sendConsultationEmail({ name, company, email, phone, message });
      
      if (emailResult.success) {
        console.log(`상담 신청 ${consultationId}: 이메일 알림 전송 완료`);
      } else {
        console.error(`상담 신청 ${consultationId}: 이메일 전송 실패 -`, emailResult.error);
      }

      res.status(201).json({
        success: true,
        message: '상담 신청이 성공적으로 접수되었습니다.',
        consultationId: consultationId,
        emailSent: emailResult.success
      });
    });

  } catch (error) {
    console.error('상담 신청 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// 2. 관리자 로그인
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: '사용자명과 비밀번호를 입력해주세요.' 
      });
    }

    // 사용자 확인
    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
      if (err) {
        console.error('관리자 조회 오류:', err);
        return res.status(500).json({ 
          success: false, 
          message: '서버 오류가 발생했습니다.' 
        });
      }

      if (!admin) {
        return res.status(401).json({ 
          success: false, 
          message: '잘못된 사용자명 또는 비밀번호입니다.' 
        });
      }

      // 비밀번호 확인
      const isValidPassword = await bcrypt.compare(password, admin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ 
          success: false, 
          message: '잘못된 사용자명 또는 비밀번호입니다.' 
        });
      }

      // JWT 토큰 생성
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username, 
          email: admin.email 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: '로그인 성공',
        token,
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email
        }
      });
    });

  } catch (error) {
    console.error('로그인 처리 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// JWT 토큰 검증 미들웨어
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: '인증 토큰이 필요합니다.' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: '유효하지 않은 토큰입니다.' 
      });
    }
    req.user = user;
    next();
  });
};

// 3. 상담 신청 목록 조회 (관리자 전용)
app.get('/api/admin/consultations', authenticateToken, (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM consultations';
    let params = [];
    let whereConditions = [];

    // 상태 필터
    if (status && status !== 'all') {
      whereConditions.push('status = ?');
      params.push(status);
    }

    // 검색 필터
    if (search) {
      whereConditions.push('(name LIKE ? OR company LIKE ? OR email LIKE ? OR message LIKE ?)');
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (whereConditions.length > 0) {
      sql += ' WHERE ' + whereConditions.join(' AND ');
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    // 데이터 조회
    db.all(sql, params, (err, consultations) => {
      if (err) {
        console.error('상담 신청 조회 오류:', err);
        return res.status(500).json({ 
          success: false, 
          message: '데이터 조회에 실패했습니다.' 
        });
      }

      // 전체 개수 조회
      let countSql = 'SELECT COUNT(*) as total FROM consultations';
      let countParams = [];
      
      if (whereConditions.length > 0) {
        countSql += ' WHERE ' + whereConditions.join(' AND ');
        countParams = params.slice(0, -2); // LIMIT, OFFSET 제외
      }

      db.get(countSql, countParams, (err, result) => {
        if (err) {
          console.error('전체 개수 조회 오류:', err);
          return res.status(500).json({ 
            success: false, 
            message: '데이터 조회에 실패했습니다.' 
          });
        }

        res.json({
          success: true,
          data: {
            consultations,
            pagination: {
              page: parseInt(page),
              limit: parseInt(limit),
              total: result.total,
              totalPages: Math.ceil(result.total / limit)
            }
          }
        });
      });
    });

  } catch (error) {
    console.error('상담 신청 목록 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// 4. 상담 신청 상태 업데이트 (관리자 전용)
app.put('/api/admin/consultations/:id/status', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({ 
        success: false, 
        message: '상태 정보가 필요합니다.' 
      });
    }

    const validStatuses = ['pending', 'contacted', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: '유효하지 않은 상태입니다.' 
      });
    }

    const sql = `
      UPDATE consultations 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;

    db.run(sql, [status, id], function(err) {
      if (err) {
        console.error('상태 업데이트 오류:', err);
        return res.status(500).json({ 
          success: false, 
          message: '상태 업데이트에 실패했습니다.' 
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({ 
          success: false, 
          message: '해당 상담 신청을 찾을 수 없습니다.' 
        });
      }

      res.json({
        success: true,
        message: '상태가 성공적으로 업데이트되었습니다.'
      });
    });

  } catch (error) {
    console.error('상태 업데이트 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// 5. 상담 신청 상세 조회 (관리자 전용)
app.get('/api/admin/consultations/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;

    db.get('SELECT * FROM consultations WHERE id = ?', [id], (err, consultation) => {
      if (err) {
        console.error('상담 신청 상세 조회 오류:', err);
        return res.status(500).json({ 
          success: false, 
          message: '데이터 조회에 실패했습니다.' 
        });
      }

      if (!consultation) {
        return res.status(404).json({ 
          success: false, 
          message: '해당 상담 신청을 찾을 수 없습니다.' 
        });
      }

      res.json({
        success: true,
        data: consultation
      });
    });

  } catch (error) {
    console.error('상담 신청 상세 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// 6. 통계 정보 조회 (관리자 전용)
app.get('/api/admin/stats', authenticateToken, (req, res) => {
  try {
    const statsQueries = [
      { name: 'total', sql: 'SELECT COUNT(*) as count FROM consultations' },
      { name: 'pending', sql: 'SELECT COUNT(*) as count FROM consultations WHERE status = "pending"' },
      { name: 'contacted', sql: 'SELECT COUNT(*) as count FROM consultations WHERE status = "contacted"' },
      { name: 'completed', sql: 'SELECT COUNT(*) as count FROM consultations WHERE status = "completed"' },
      { name: 'cancelled', sql: 'SELECT COUNT(*) as count FROM consultations WHERE status = "cancelled"' },
      { name: 'today', sql: 'SELECT COUNT(*) as count FROM consultations WHERE DATE(created_at) = DATE("now")' },
      { name: 'thisWeek', sql: 'SELECT COUNT(*) as count FROM consultations WHERE DATE(created_at) >= DATE("now", "weekday 0", "-6 days")' },
      { name: 'thisMonth', sql: 'SELECT COUNT(*) as count FROM consultations WHERE DATE(created_at) >= DATE("now", "start of month")' }
    ];

    const stats = {};
    let completedQueries = 0;

    statsQueries.forEach(({ name, sql }) => {
      db.get(sql, (err, result) => {
        if (err) {
          console.error(`${name} 통계 조회 오류:`, err);
        } else {
          stats[name] = result.count;
        }

        completedQueries++;
        if (completedQueries === statsQueries.length) {
          res.json({
            success: true,
            data: stats
          });
        }
      });
    });

  } catch (error) {
    console.error('통계 조회 오류:', error);
    res.status(500).json({ 
      success: false, 
      message: '서버 오류가 발생했습니다.' 
    });
  }
});

// ====== 정적 파일 서빙 ======

// Admin 패널 HTML
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// 루트 경로
app.get('/', (req, res) => {
  res.json({
    message: 'AX Consulting API Server',
    version: '1.0.0',
    endpoints: {
      'POST /api/consultations': '상담 신청',
      'POST /api/admin/login': '관리자 로그인',
      'GET /api/admin/consultations': '상담 신청 목록 (관리자)',
      'GET /admin': '관리자 패널'
    }
  });
});

// 404 처리
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '요청한 엔드포인트를 찾을 수 없습니다.'
  });
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('서버 오류:', err);
  res.status(500).json({
    success: false,
    message: '서버 내부 오류가 발생했습니다.'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 AX Consulting 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📊 관리자 패널: http://localhost:${PORT}/admin`);
  console.log(`🔑 기본 계정: admin / admin123`);
  console.log(`📧 연락처: axconkr@gmail.com`);
});
