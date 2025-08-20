const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// 데이터베이스 파일 경로
const dbPath = path.join(__dirname, 'database.sqlite');

// 데이터베이스 연결
const db = new sqlite3.Database(dbPath);

// 테이블 생성
db.serialize(() => {
  console.log('데이터베이스 초기화 시작...');

  // 상담 신청 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('상담 신청 테이블 생성 오류:', err);
    } else {
      console.log('✅ 상담 신청 테이블 생성 완료');
    }
  });

  // 관리자 계정 테이블
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      email TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('관리자 테이블 생성 오류:', err);
    } else {
      console.log('✅ 관리자 테이블 생성 완료');
    }
  });

  // 기본 관리자 계정 생성 (admin / admin123)
  const defaultAdmin = {
    username: 'admin',
    password: 'admin123',
    email: 'axconkr@gmail.com'
  };

  // 비밀번호 해시화
  bcrypt.hash(defaultAdmin.password, 10, (err, hash) => {
    if (err) {
      console.error('비밀번호 해시화 오류:', err);
      return;
    }

    // 기존 관리자 계정이 있는지 확인
    db.get('SELECT id FROM admins WHERE username = ?', [defaultAdmin.username], (err, row) => {
      if (err) {
        console.error('관리자 계정 확인 오류:', err);
        return;
      }

      if (!row) {
        // 새 관리자 계정 생성
        db.run(`
          INSERT INTO admins (username, password_hash, email) 
          VALUES (?, ?, ?)
        `, [defaultAdmin.username, hash, defaultAdmin.email], (err) => {
          if (err) {
            console.error('기본 관리자 계정 생성 오류:', err);
          } else {
            console.log('✅ 기본 관리자 계정 생성 완료');
            console.log(`   사용자명: ${defaultAdmin.username}`);
            console.log(`   비밀번호: ${defaultAdmin.password}`);
            console.log(`   이메일: ${defaultAdmin.email}`);
          }
        });
      } else {
        console.log('ℹ️  관리자 계정이 이미 존재합니다');
      }
    });
  });

  // 샘플 상담 신청 데이터 (테스트용)
  db.run(`
    INSERT OR IGNORE INTO consultations (name, company, email, phone, message, status) 
    VALUES 
      ('김철수', '테스트기업1', 'test1@example.com', '010-1234-5678', 'AI 도입에 관심이 있습니다. 상담 부탁드립니다.', 'pending'),
      ('이영희', '테스트기업2', 'test2@example.com', '010-2345-6789', '품질관리 자동화에 대해 문의드립니다.', 'pending'),
      ('박민수', '테스트기업3', 'test3@example.com', '010-3456-7890', '고객응대 챗봇 구축을 원합니다.', 'contacted')
  `, (err) => {
    if (err) {
      console.error('샘플 데이터 생성 오류:', err);
    } else {
      console.log('✅ 샘플 상담 신청 데이터 생성 완료');
    }
  });
});

// 데이터베이스 연결 종료
db.close((err) => {
  if (err) {
    console.error('데이터베이스 연결 종료 오류:', err);
  } else {
    console.log('✅ 데이터베이스 초기화 완료!');
    console.log('📁 데이터베이스 파일:', dbPath);
    console.log('\n🚀 서버 실행 방법:');
    console.log('   cd server');
    console.log('   npm install');
    console.log('   npm run dev');
  }
});
