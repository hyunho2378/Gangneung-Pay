# 강릉페이 리뉴얼 🏖️

강릉시 지역화폐 **강릉페이** 모바일 웹 리뉴얼 프로젝트입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| **Frontend** | React 18 · Vite · Tailwind CSS v4 · React Router v6 |
| **Backend** | Node.js · Express |
| **Database** | NeonDB (PostgreSQL) |
| **배포** | Render (Server) · Vercel 또는 Netlify (Client) |

## 폴더 구조

```
gangnungpay-renewal/
├── client/                # React + Vite 프론트엔드
│   ├── src/
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── components/    # 공통 UI 컴포넌트
│   │   ├── App.jsx        # 라우터 설정
│   │   └── index.css      # 디자인 토큰 + Tailwind
│   └── vite.config.js     # Vite + Tailwind + API 프록시
├── server/                # Express API 서버
│   └── src/
│       ├── index.js       # 서버 엔트리
│       ├── db.js          # NeonDB 연결 풀
│       └── routes/        # API 라우터
├── .gitignore
├── .env.example
├── package.json           # 워크스페이스 스크립트
└── README.md
```

## 시작하기

### 1. 의존성 설치

```bash
npm run install:all
```

### 2. 환경 변수 설정

```bash
# 클라이언트
cp client/.env.example client/.env

# 서버
cp server/.env.example server/.env
# server/.env 파일에 NeonDB 연결 문자열을 입력하세요
```

### 3. 개발 서버 실행

```bash
# 클라이언트 + 서버 동시 실행
npm run dev

# 개별 실행
npm run dev:client   # http://localhost:5173
npm run dev:server   # http://localhost:4000
```

### 4. 프로덕션 빌드

```bash
npm run build
```

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| GET | `/api/health` | 서버 + DB 연결 상태 확인 |

## 팀원

| 이름 | 역할 |
|------|------|
| — | — |

---

> UX 디자인 텀 프로젝트 · 2026-1학기
