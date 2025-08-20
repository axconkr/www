# AX Consulting 고객용 웹사이트

중소기업을 위한 실전형 AI 도입 파트너, AX Consulting의 고객용 웹사이트입니다.

## 🚀 특징

- **Bold Dark 테마**: 전문적이고 현대적인 디자인
- **스토리텔링 구조**: 고객의 의사결정 과정을 자연스럽게 안내
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **Framer Motion**: 부드러운 애니메이션과 인터랙션
- **영업 최적화**: 상담 신청과 사례집 다운로드로 이어지는 전환율 향상

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **Backend**: Express.js + SQLite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Font**: Inter (Google Fonts)
- **Build Tool**: Vite
- **Database**: SQLite
- **Authentication**: JWT

## 📁 프로젝트 구조

```
www/
├── src/                          # 프론트엔드 (React)
│   ├── components/
│   │   └── AXCustomerSite.jsx    # 메인 웹사이트 컴포넌트
│   ├── App.jsx                    # 앱 진입점
│   ├── main.jsx                   # React 렌더링
│   └── index.css                  # 글로벌 스타일
├── server/                        # 백엔드 (Express + SQLite)
│   ├── public/
│   │   └── admin.html            # 관리자 패널
│   ├── server.js                  # Express 서버
│   ├── init-db.js                # 데이터베이스 초기화
│   └── package.json              # 백엔드 의존성
├── package.json                   # 프론트엔드 의존성
├── tailwind.config.js            # Tailwind CSS 설정
├── postcss.config.js             # PostCSS 설정
├── vite.config.js                # Vite 설정
└── index.html                    # HTML 템플릿
```

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 백엔드 서버 설정 (상담 신청 데이터 저장)

상담 신청 데이터를 SQLite에 저장하고 관리자 패널에서 확인하려면:

1. 백엔드 서버 디렉토리로 이동: `cd server`
2. 의존성 설치: `npm install`
3. 데이터베이스 초기화: `npm run init-db`
4. 서버 실행: `npm run dev`

**기본 관리자 계정**: admin / admin123

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 4. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 5. 빌드 미리보기

```bash
npm run preview
```

## 🎨 주요 섹션

1. **Hero**: 메인 메시지와 CTA 버튼
2. **현황 분석**: 중소기업 AI 도입 현황
3. **필요성**: AI 도입이 필요한 이유
4. **방법론**: AM-4D 프로세스 (Define → Design → Deliver → Drive)
5. **적용 영역**: 산업별 적용 사례
6. **차별화**: AX Consulting만의 장점
7. **비교표**: 자체 도입 vs 컨설팅 도입
8. **성과 지표**: AI 도입 효과 데이터
9. **해외 사례**: 글로벌 성과 사례
10. **상담 신청**: 연락처 폼

## 🔧 커스터마이징

### 콘텐츠 수정
`src/components/AXCustomerSite.jsx`의 `CONTENT` 객체에서 텍스트와 데이터를 수정할 수 있습니다.

### 테마 변경
`THEME` 객체에서 색상과 스타일을 조정할 수 있습니다.

### 새로운 섹션 추가
컴포넌트를 추가하고 `AXCustomerSite` 함수에 포함시키면 됩니다.

### 백엔드 설정
`server/server.js`에서 API 엔드포인트를 수정하거나 추가할 수 있습니다.

### 데이터베이스 스키마
`server/init-db.js`에서 테이블 구조를 수정할 수 있습니다.

## 📱 반응형 디자인

- **Mobile**: 320px 이상
- **Tablet**: 768px 이상  
- **Desktop**: 1024px 이상

## 🌐 배포

### Vercel (권장)
```bash
npm install -g vercel
vercel
```

### Netlify
빌드 후 `dist/` 폴더를 Netlify에 드래그 앤 드롭

### 정적 호스팅
`npm run build` 후 `dist/` 폴더의 내용을 웹 서버에 업로드

## 📞 연락처

- **이메일**: axconkr@gmail.com
- **전화**: 010-4739-0704

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.