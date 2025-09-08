# 기술 컨텍스트

## 기술 스택

### 프론트엔드
- **React 18.2.0**: 최신 React 기능과 Hooks
- **Vite 4.5.14**: 빠른 개발 서버와 빌드 도구
- **Tailwind CSS 3.3.0**: 유틸리티 기반 CSS 프레임워크
- **Framer Motion 10.16.4**: 애니메이션 라이브러리
- **PostCSS**: CSS 전처리 및 최적화

### 백엔드
- **Node.js 24.1.0**: JavaScript 런타임
- **Express 4.18.2**: 웹 애플리케이션 프레임워크
- **SQLite3 5.1.6**: 경량 데이터베이스
- **bcryptjs 2.4.3**: 비밀번호 해싱
- **jsonwebtoken 9.0.2**: JWT 토큰 생성/검증

### 개발 도구
- **npm 10.2.4**: 패키지 매니저
- **nodemon 3.1.10**: 개발 서버 자동 재시작
- **Git**: 버전 관리
- **GitHub**: 코드 저장소 및 협업

## 개발 환경 설정

### 시스템 요구사항
- **OS**: macOS 23.6.0 (darwin)
- **Node.js**: 24.1.0 이상
- **npm**: 10.2.4 이상
- **메모리**: 최소 4GB RAM
- **디스크**: 최소 2GB 여유 공간

### 개발 서버 설정
```bash
# 프론트엔드 개발 서버
npm run dev          # http://localhost:3000

# 백엔드 개발 서버
cd server && npm run dev  # http://localhost:5000
```

### 빌드 설정
```bash
# 프로덕션 빌드
npm run build        # dist/ 폴더에 빌드 결과물

# 빌드 결과물 미리보기
npm run preview      # http://localhost:4173
```

## 의존성 관리

### 핵심 의존성
```json
{
  "react": "^18.2.0",
  "framer-motion": "^10.16.4",
  "express": "^4.18.2",
  "sqlite3": "^5.1.6",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2"
}
```

### 개발 의존성
```json
{
  "vite": "^4.5.14",
  "tailwindcss": "^3.3.0",
  "nodemon": "^3.1.10",
  "@types/node": "^20.0.0"
}
```

## 기술적 제약사항

### 1. 브라우저 호환성
- **최소 지원**: Chrome 90+, Firefox 88+, Safari 14+
- **ES6+ 기능**: 모던 JavaScript 기능 사용
- **CSS Grid/Flexbox**: 최신 CSS 레이아웃 기능 활용

### 2. 성능 제약
- **번들 크기**: 300KB 이하 (gzip 압축 후)
- **로딩 시간**: 3초 이내 초기 렌더링
- **애니메이션**: 60fps 유지

### 3. 보안 제약
- **HTTPS**: 프로덕션 환경에서 필수
- **CSP**: Content Security Policy 적용
- **인증**: JWT 토큰 만료 시간 설정

## 배포 환경

### 정적 호스팅 (프론트엔드)
- **Vercel**: React 앱 최적화, 자동 배포
- **Netlify**: 정적 사이트 호스팅, 폼 처리
- **GitHub Pages**: 무료 호스팅, 자동 배포

### 서버 호스팅 (백엔드)
- **Vercel Functions**: 서버리스 함수
- **Netlify Functions**: 서버리스 백엔드
- **Railway/Render**: Node.js 앱 호스팅

## 개발 워크플로우

### 1. 개발 단계
```bash
# 1. 코드 작성
# 2. 로컬 테스트 (npm run dev)
# 3. 빌드 테스트 (npm run build)
# 4. Git 커밋
```

### 2. 배포 단계
```bash
# 1. GitHub 푸시
# 2. 자동 빌드 및 배포
# 3. 도메인 연결
# 4. SSL 인증서 설정
```

## 모니터링 및 로깅

### 프론트엔드 모니터링
- **에러 추적**: React Error Boundary
- **성능 측정**: Web Vitals API
- **사용자 행동**: Google Analytics

### 백엔드 모니터링
- **서버 상태**: 헬스체크 엔드포인트
- **에러 로깅**: Winston 로거
- **성능 측정**: 응답 시간 모니터링

## 확장 계획

### 단기 (1-3개월)
- **SEO 최적화**: 메타 태그, 구조화된 데이터
- **성능 개선**: 이미지 최적화, 코드 스플리팅
- **모바일 최적화**: PWA 기능 추가

### 중기 (3-6개월)
- **다국어 지원**: 한국어/영어
- **CMS 연동**: 콘텐츠 관리 시스템
- **분석 도구**: 고급 사용자 행동 분석

### 장기 (6개월 이상)
- **마이크로서비스**: 기능별 서비스 분리
- **실시간 기능**: WebSocket 기반 채팅
- **AI 통합**: 챗봇 및 추천 시스템
