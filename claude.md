# CLAUDE.md — 강릉페이 AS-IS 복제
팀: 마카모예 | Phase 1: 현재 앱 1:1 복제 | 스크린샷 79장 기준

## 절대 규칙
- localStorage / sessionStorage 사용 금지
- TypeScript 금지 → JavaScript(JSX)만
- 색상·간격·폰트 하드코딩 금지 → tokens.js만 사용
- 디자인 임의 개선 금지 → 이상해 보여도 스샷 그대로
- 기능 추가/제거 금지 → 있는 것만 구현
- 아이콘은 lucide-react 또는 inline SVG만 사용 (이모지 금지)

## 스택
React 18 · Vite · JavaScript · Tailwind CSS · React Router v6
lucide-react · useState/useReducer · Context API · Vercel · Render · NeonDB (전부 무료)

## 참조 파일 (세션 시작 시 첨부)
- `client/src/tokens/tokens.js` → 디자인 토큰
- `COMPONENTS.md` → 컴포넌트 34개 목록·스펙
- `ROUTES.md` → 라우팅 구조
- `IA.md` → 79개 화면 분류·플로우
- `PROGRESS.md` → 이전 세션 진행 상황 (있을 경우)

## 에이전트 구조 (병렬)
```
A1 토큰    → tokens.js + tailwind 먼저 확정
A2 컴포넌트 → A1 완료 후 components/** 구현
A3 페이지   → A2 완료 후 pages/** 조립
A4 QA      → 각 페이지 완료 시마다 체크리스트 실행
```

## QA 기준 (A4가 매 페이지마다 확인)
```
□ 배경색 / 카드색 스샷과 일치
□ 헤더 구조 동일 (버튼 종류·위치)
□ 폰트 크기 대소 관계 일치
□ 버튼 모양 일치 (pill / rect / filled / outlined)
□ 바텀탭 활성·비활성 상태 일치
□ 빈 상태(Empty State) 스샷과 동일
□ 탭 전환·페이지 이동·뒤로가기 정상
□ 390px / 375px 레이아웃 깨짐 없음
□ 하드코딩 색상값 없음
□ localStorage 미사용
```

## 컨텍스트 관리
- 컨텍스트 85% 도달 시 즉시 멈추고 PROGRESS.md 업데이트 후 대기
- PROGRESS.md에 완료 목록, 진행 중, 다음 작업 명시

## 커밋 규칙
```
[A1] chore(tokens): 설명
[A2] feat(home): BalanceCard 구현
[A3] feat(pages): HomePage 조립
[A4] test(pages): HomePage QA 통과
[A2] fix(home): 색상 수정
```

## 구현 순서
1. A1 → tokens.js 확정
2. A2 → 레이아웃 컴포넌트 (TopAppBar, BottomNavBar, QRFloatingBar)
3. A2+A3+A4 반복:
   홈 → 결제/충전 → QR → 결제매장 → 지원금·혜택 → 생활편의 → 소통참여 → 설정/메뉴