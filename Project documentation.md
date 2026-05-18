# 강릉페이 리뉴얼 프로젝트 종합 문서

> 2026년 1학기 UX 디자인 텀프로젝트 - 강릉페이 앱 UX/UI 리뉴얼
> Team: 마카모예
> 개발자: 주현호 (한림대 디지털인문예술전공)

---

## 0. 프로젝트 개요

### 0.1 기획 의도

강릉시 지역화폐 앱 강릉페이의 UX 문제를 진단하고 리뉴얼. 시니어 사용자 비중이 높은 지역화폐 앱 특성을 고려하여 "묻지 않아도 보이는, 헤매지 않는 금융 경험"을 핵심 가치로 설정.

핵심 문제 가설
- AS-IS 강릉페이는 기능 나열형 IA (모든 기능을 메뉴에 평면적으로 노출)
- 시니어 사용자가 헤매기 쉬운 깊은 메뉴 구조 (충전 6단계, 환불은 깊이 숨김)
- 캐시백/환불/잔액 정보가 분산되어 가치 체감 약함
- 매장 정보의 진실성 부족 (목업 데이터)

핵심 해결 방향
- 시니어 멘탈 모델에 맞춘 직관적 정보 위계
- 액션 동등 위계 (충전과 환불을 동격으로)
- 가치 체감 직관 메시지 (숫자 → 일상 비교)
- 실제 가맹점 데이터 통합 (13,021개 강릉시 공식 데이터)

### 0.2 진행 방식

전 과정에서 Claude (Anthropic) AI를 적극 활용. 단순 코드 생성기가 아닌, UX 의사결정 파트너 + 하네스 엔지니어로 활용. AI와 인간의 협업 방식을 실험적으로 적용.

협업 모델
- **인간 (개발자)**: 사용자 페르소나 정의, 디자인 의도 결정, 비즈니스 로직 판단, AI 산출물 최종 검수
- **AI (Claude Sonnet/Opus)**: 기술 구현, 디자인 시스템 일관성 검증, 대안 비교, 의사결정 근거 제공, 코드 작성, 일관성 회귀 점검

핵심 운영 인프라
- `CLAUDE.md` - 할루시네이션 방지 + 컨텍스트 안내 (GitHub 검증된 패턴 활용)
- `AGENTS.md` - 하네스 엔지니어링 워크플로우 (병렬 에이전트 A1/A2/A3 + AGENT-REVIEW)
- `DESIGN.md` - 디자인 시스템 단일 진실 공급원
- `IA.md` - Information Architecture (정보 위계)
- `Components.md` - 컴포넌트 카탈로그 + 책임 정의
- `Patterns.md` - 코딩 패턴 + 안티패턴
- `Routes.md` - 30개 라우트 매핑
- `PROGRESS.md` - 작업 단위별 진행 + QA 결과 자동 기록
- `LARGETEXT.md` - 큰글씨 모드 사양
- `ANDROID.md` - Material Design 3 사양

각 문서는 새 AI 세션 시작 시 컨텍스트 주입용. AI가 "추측"이 아닌 "사양 참조"로 작업하도록 강제하여 일관성 + 할루시네이션 방지.

### 0.3 산출물

- iOS 버전 (Apple HIG 기반): `client/` 폴더, https://gangneung-pay.vercel.app
- Android 버전 (Material Design 3 기반): `client-android/` 폴더 (별도 배포 예정)
- 포트폴리오 사이트 (제작 예정, Plus-Ex 톤)
- 발표 자료 (제작 예정)
- 30개 페이지 + 70+ 컴포넌트
- 13,021개 실제 가맹점 데이터
- 8개 사양 문서 (위 0.2절 참조)

---

## 1. 기술 스택

### 1.1 프론트엔드

| 항목 | 선택 | 선택 근거 |
|------|------|----------|
| 프레임워크 | React 18 | 컴포넌트 재사용, 빠른 프로토타이핑 |
| 빌드 도구 | Vite | dev 서버 빠름, HMR 안정적 |
| 언어 | JSX (TypeScript 미사용) | 발표 일정 단축, 학습 곡선 최소화 |
| 스타일링 | Tailwind v4 + 자체 토큰 시스템 (inline style) | 토큰 강제 + 동적 분기 용이 |
| 라우팅 | React Router v6 | 표준 |
| 상태 관리 | Context API (UserContext, AppContext, OnboardingContext) | 외부 라이브러리 회피, 발표 단일 사용자 가정 |

### 1.2 핵심 라이브러리

| 라이브러리 | 용도 | 선택 근거 |
|----------|------|----------|
| @react-google-maps/api | Google Maps 지도 | React 친화적 wrapper |
| @googlemaps/markerclusterer | 매장 13,000개 클러스터링 | 공식 라이브러리, 성능 최적화 |
| @lottiefiles/dotlottie-react | Face ID 애니메이션 | dotLottie 표준 지원 |
| lucide-react | 아이콘 (iOS) | 가벼움, 라인 스타일 (HIG 톤) |
| html5-qrcode | QR 코드 스캔 | 브라우저 카메라 API 추상화 |
| @mui/icons-material | Material 아이콘 (Android) | Material Design 공식 |
| framer-motion | 페이지 전환 모션 (Android) | Material 모션 가이드라인 구현 용이 |

### 1.3 데이터 시스템

- 13,021개 강릉 가맹점 (좌표 포함) - `client/src/data/stores.json`
- 216개 QR결제 매장 별도 분류 - `client/src/data/qr-stores.json`
- 가상 거래 내역 12개월 (월별 한도 적용) - UserContext에서 생성
- 모든 데이터는 클라이언트 메모리에서 처리 (백엔드 없음)

### 1.4 배포

- Vercel: GitHub 자동 배포
- 환경변수: `VITE_GOOGLE_MAPS_API_KEY` (Google Cloud Platform 빌링 활성화)

---

## 2. 디자인 시스템

### 2.1 iOS 버전 (Apple HIG 기반)

핵심 원칙
- 모바일 고정형 (max-width 390px, 중앙 정렬)
- SF Pro / Apple SD Gothic Neo 폰트 시스템
- 둥근 모서리 (radiusCard 16px, radiusButton 12px)
- 미묘한 그림자 (subtle shadow)
- 좌측 화살표 + 이전 페이지 라벨 (뒤로가기)

토큰 구조 (`client/src/tokens/tokens.js`)
```js
export const colors = {
  primary: { 700: '#1D4ED8', 600: '#2563EB', ... },
  surface: { background: '#F2F4F8', card: '#FFFFFF', ... },
  teal: { 500: '#14B8A6', 400: '#2DD4BF' },  // 캐시백 강조
  gray: { 900: '#111827', 700: '#374151', ... },
  warning: '#F59E0B', error: '#EF4444', success: '#10B981',
}

export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', sans-serif",
  size: {
    largeTitle: '34px', balanceLarge: '36px', balance: '28px',
    appTitle: '22px', xl: '20px', lg: '18px', md: '17px',
    sm: '15px', xs: '13px', xxs: '12px', nav: '11px',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
}

export const layout = {
  margin: '16px',
  viewport: '390px',
  radiusCard: '16px', radiusButton: '12px', radiusModal: '20px',
  radiusPill: '999px', radiusChip: '20px', radiusSmall: '8px',
  bottomNavHeight: '60px',
}
```

### 2.2 큰글씨 모드

`docs/LARGETEXT.md`에 상세 사양 정리. 핵심 요약

- typography.sizeLarge 토큰 (기본의 1.3~1.4배)
- useTypography hook으로 컴포넌트 한 줄 분기
- HomePage는 별도 컴포넌트 (HomePageLarge.jsx)로 완전 재설계
- 다른 페이지는 폰트만 1.3배 확장

설계 원칙
- 정보 밀도 다운 (캐러셀 같은 자동 변경 UI 제거)
- 액션 명확도 업 (충전, 환불 등 큰 박스 분리)
- 아이콘 → 텍스트 라벨 변환
- 시니어 멘탈 모델 대응

### 2.3 Android 버전 (Material Design 3)

`docs/ANDROID.md`에 상세 사양 정리. 핵심 차이

| 항목 | iOS | Android |
|------|-----|---------|
| 폰트 | SF Pro / Apple SD Gothic | Roboto / Noto Sans KR |
| 모서리 | 16px (radiusCard) | 12px (Material 카드) |
| 그림자 | 미묘함 | elevation 명확 |
| 인터랙션 | spring | ripple |
| 버튼 | scale 95% | ripple 확산 |
| 모달 | iOS Modal (하단 정렬) | Material Alert Dialog (중앙) |
| 시트 | iOS Bottom Sheet | Material Bottom Sheet (큰 라운드 28px) |
| 토스트 | iOS Modal Toast | Material Snackbar |

---

## 3. UX 7대 전략 (S1~S7)

### S1. 위젯 잔액 노출

**문제 (AS-IS)**: 잔액 확인을 위해 앱을 열어야 함. 시니어 사용자에게 부담.

**해결**: PWA 위젯 추가 안내 + 잔액 카드 최상단 노출.

**의도**: 닫혀있는 정보를 열어서 보여줌. 사용자가 "지금 얼마 있지?"를 묻지 않게 함.

**구현**:
- HomePage 최상단 잔액 카드 우선 배치
- 위젯 추가하기 안내 카드 (실제 PWA 위젯은 추후)

---

### S2. 환불 동등 위계

**문제 (AS-IS)**: 충전은 메인에 큰 버튼, 환불은 깊이 들어가야 함. 환불은 "복잡한 행정 절차"로 인식.

**해결**: 충전과 환불을 잔액 카드 안 3슬롯에 동등하게 배치.

**의도**: 환불은 사용자의 권리. 위계 차별 X.

**구현**:
- 잔액 카드 글래스 3슬롯: 충전 / 환불 / QR결제
- 모두 동일한 크기, 동일한 시각 강조

---

### S3. 캐시백 체감

**문제 (AS-IS)**: 캐시백이 숫자로만 표시. "1,345원 적립"이라는 텍스트는 가치 체감이 약함.

**해결**: 직관 메시지로 변환. "커피 한 잔 값 아꼈어요" 같은 일상적 비교.

**의도**: 추상적 숫자 → 구체적 가치. 시니어에게 효과 큼.

**구현**:
- getCashbackIntuition() 함수 (`components/home/BalanceCardExpanded.jsx`)
- 5단계 메시지 (Bus / Coffee / Utensils / ShoppingBag / Smartphone)
- 적립 금액에 따라 자동 매칭
- 모든 메시지 lucide 아이콘 동반

---

### S4. 충전 3단계 압축

**문제 (AS-IS)**: 충전이 6단계 (인증 → 카드 선택 → 금액 입력 → 확인 → 비밀번호 → 완료). 시니어 이탈률 높음.

**해결**: 3단계로 압축 (금액 입력 → 확인 → 완료).

**의도**: 닐슨 휴리스틱 #5 (오류 예방) + Shneiderman #4 (closure).

**구현**:
- `components/payment/ChargeScreen.jsx` 3단계 step state
- StepIndicator 상단 고정 (현재 진행 단계 시각화)
- 금액 입력에 빠른 금액 칩 (+1만 / +5만 / +10만)
- 한도 항상 노출 (Nielsen #1 visibility)

---

### S5. 잔액 부족 사전 차단

**문제 (AS-IS)**: 결제 시도 → "잔액 부족" 에러. 매장에서 부끄러움.

**해결**: 입력 단계에서 한도 초과 즉시 안내.

**의도**: 닐슨 #5 오류 예방. 발생 후 처리가 아닌 발생 전 차단.

**구현**:
- 충전 한도 (1회 최대 50만원) 입력 시점 검증
- isOverLimit 분기로 다음 버튼 disabled
- "1회 충전 한도 500,000원을 초과했습니다" 빨간 안내

---

### S6. 가맹점 실시간 신뢰

**문제 (AS-IS)**: 매장 목록만 보여줌. 실제로 결제되는지 의심.

**해결**: 13,021개 실제 가맹점 데이터 + 지도 + 클러스터링.

**의도**: 신뢰는 데이터의 진실성에서 나옴.

**구현**:
- konacard API (강릉시청 공식) 크롤링으로 13,643개 매장 수집
- 좌표/주소/전화번호 실데이터
- 카테고리별 필터 (12개) + 검색 자동완성
- Google Maps Cluster (강릉시 전체 → 줌인 시 개별 핀)

---

### S7. 코치마크 단계별 안내

**문제 (AS-IS)**: 카드 신청 후 다음 단계가 불명확. 시니어가 막힘.

**해결**: 카드 등록 직후 충전 → 환불 코치마크 자동 진행.

**의도**: 사용자가 "다음 뭐 하지?"라고 묻지 않게 함.

**구현**:
- CoachMarkOverlay 컴포넌트 (ScreenContainer 기준 상대 좌표)
- AppContext의 hasSkippedCoachMark state
- 카드 등록 직후 자동 트리거 (Step 1 충전 → Step 2 환불)
- 스크롤 잠금 (코치마크 노출 중)

---

## 4. AI 활용 방법론

### 4.1 협업 인프라 (문서 기반 컨텍스트 주입)

AI 협업의 가장 큰 문제는 **할루시네이션**과 **컨텍스트 단절**. 새 채팅 세션이 시작될 때마다 AI는 이전 결정을 모름. 이를 해결하기 위해 8개의 사양 문서를 운영.

#### 4.1.1 CLAUDE.md - 할루시네이션 방지 (GitHub 검증 패턴)

GitHub에서 스타를 많이 받은 CLAUDE.md 컨벤션을 강릉페이용으로 채용. AI에게 "프로젝트 컨텍스트와 절대 규칙"을 첫 줄부터 주입.

핵심 섹션
- **절대 금지사항**: localStorage 사용 금지, TypeScript 금지, 하드코딩 색상 금지, 이모지 금지
- **토큰 시스템 강제**: 모든 색상/간격/폰트는 `tokens.js` 참조
- **컴포넌트 경계**: 어떤 컴포넌트가 어떤 책임을 가지는지 명시
- **빌드 검증 규칙**: `npm run build` 0 오류 필수
- **PROGRESS.md 자동 업데이트**: 작업 완료 시 자동 기록

기획 의도: AI가 "이 정도는 괜찮겠지" 추측하지 못하게 함. 모든 결정에 근거가 있어야 함.

#### 4.1.2 AGENTS.md - 하네스 엔지니어링 워크플로우

한 명의 AI 인스턴스가 큰 작업을 처음부터 끝까지 하면 디테일을 놓침. 대신 작업을 **병렬 가능한 단위**로 쪼개고, 각 단위를 별도 AI 인스턴스에 할당.

병렬 에이전트 패턴 (Phase 3-B 사례)

```
Agent BN — 검색 시스템 담당
  ├── SearchPage 재작성
  └── PopularKeywords 신규

Agent MY — MY 페이지 + 카드 담당
  ├── MyPage 재작성
  ├── CardApplyPage 재작성
  ├── CardBackModal 신규
  └── HomePage 카드 클릭 연동

Agent FX — 버그 수정 + 지도 + 내역 담당
  ├── CoachMarkOverlay 버그 수정
  ├── StoreMapScreen Kakao → Google Maps 전환
  ├── FrequentPlaces 신규
  ├── TransactionHistory 수정
  └── HistoryPage 메인 탭화

Agent VR — 최종 검증 (Agent BN/MY/FX 작업 완료 후 실행)
  └── 44항목 체크리스트
```

각 에이전트는 자기 담당 파일만 수정. 다른 에이전트 작업 영역을 침범하지 않음.

기획 의도
- 한 AI가 30개 파일을 한 번에 다루면 컨텍스트 분산 → 디테일 놓침
- 4개 영역을 4명에게 나누면 각자 깊이 있게 작업 가능
- 마지막에 검증 전용 에이전트로 통합 회귀 점검

#### 4.1.3 DESIGN.md / IA.md / Components.md / Patterns.md / Routes.md

각 문서는 단일 진실 공급원 (Single Source of Truth).

- **DESIGN.md**: 디자인 토큰 + 색상 시스템 + 타이포그래피 규칙
- **IA.md**: 30개 페이지의 정보 위계 + 사용자 동선
- **Components.md**: 70+ 컴포넌트 카탈로그 (역할, 책임, props)
- **Patterns.md**: 코딩 패턴 (토큰 강제, 의도 주석, 분기 처리)
- **Routes.md**: 30개 라우트 + 진입 경로 + 부모/자식 관계

작업 시작 전 AI에게 "관련 문서 view 후 작업"이라고 명시. AI가 자체 추측이 아닌 사양 참조로 작업.

#### 4.1.4 PROGRESS.md - 자동 커밋 + 작업 기록

모든 작업 완료 시 PROGRESS.md에 다음 형식으로 기록.

```markdown
## 청크 D — 캐시백 페이지 재작성 + 가상 데이터 (2026-05-15) ✅ 완료

**빌드 결과: 0 오류 (1830 모듈, 347ms)**

| # | 파일 | 내용 |
|---|------|------|
| D1 | `context/UserContext.jsx` | 12개월 mock 데이터 생성 함수 추가 |
| D2 | `components/common/PeriodPickerModal.jsx` (신규) | 바텀시트 |
| D3 | `pages/CashbackPage.jsx` | 차감 표현 전면 제거 |

### 청크 D QA 결과

| 항목 | 결과 |
|------|------|
| 12개월치 mock 데이터 | ✅ |
| 차감 표현 0건 | ✅ |
| localStorage 0건 | ✅ |
| 빌드 0 오류 | ✅ (1830 모듈) |
```

기획 의도
- 발표 시 "어떻게 만들었는지" 즉시 추적 가능
- 다음 AI 세션이 PROGRESS.md만 읽어도 전체 진척 파악
- 회귀 발생 시 어느 청크에서 문제 발생했는지 즉시 식별

### 4.2 작업 단위 (Sprint / Phase / 청크 / Agent)

작업 규모에 따라 단위 구분.

| 단위 | 규모 | 사례 |
|------|------|------|
| Phase | 큰 방향 전환 | Phase 1 (초기 구축) / Phase 2 (UX 진단 + 개선) / Phase 3 (IA 재편) |
| Sprint | 1~3일 작업 | Sprint A (P0 이슈) / Sprint D (S7 코치마크) / Sprint R1~R10 (긴급 복구) |
| 청크 | 반나절~1일 | 청크 A (디자인 복원) / 청크 B (흐름 로직) / 청크 C (인터랙션) / 청크 D (데이터) |
| Agent | 병렬 에이전트 | Agent BN / Agent MY / Agent FX / Agent VR |
| Task | 단일 컴포넌트 | T2 (OnboardingContext) / T5 (CardActions 신규) |

각 단위는 작업 시작 → 완료 → QA → PROGRESS.md 기록의 사이클.

### 4.3 모델 선택 기준

| 작업 종류 | 모델 | 근거 |
|----------|------|------|
| 단순 매핑/교체 (토큰 일괄 변경) | Sonnet | 빠르고 충분 |
| 디자인 시스템 검증 (199건 spacing 분류) | Opus | 의미 추론 필요 |
| 새 컴포넌트 작성 + 통합 | Opus | 컨텍스트 일관성 |
| 데이터 변환 스크립트 | Sonnet | 명확한 규칙 |
| 아키텍처 설계 (큰글씨 모드, Android) | Opus | 복합 의사결정 |
| 디버깅 (Face ID 무한 루프 등) | Opus | 가설 추론 + 검증 |

### 4.4 프롬프트 관리 패턴

#### 4.4.1 진단 → 사양 → 수정 → 검증

```
1. 진단: "현재 상태 view 후 보고. 수정 X"
   → AI가 현재 코드 읽고 문제 파악
   → 사용자가 진단 결과 검토

2. 사양: 정확한 변경 사양 (파일/라인/before/after)
   → 사용자가 "이렇게 바꿔" 명확히 지시
   → AI는 추측 금지

3. 수정: 명시된 범위만, 추측 X
   → AI가 사양대로 수정
   → 다른 파일 건드리지 않음

4. 검증: 빌드 0 오류 + 시각 회귀 체크리스트
   → AI가 자체 빌드 확인
   → 사용자가 시각 검증
```

#### 4.4.2 문서 참조 강제 패턴

```
강릉페이 큰글씨 모드 - HomePageLarge 작성.

시작 전 필독: client/docs/LARGETEXT.md

본 작업은 LARGETEXT.md의 "4. HomePage 큰글씨 모드" 섹션 전체 수행.
LARGETEXT.md 4.4절 잔액 카드 구조 정확히 준수.
LARGETEXT.md 4.5절 카드 컴포넌트 사양 정확히 준수.

명시 외 파일 수정 금지.
```

기획 의도: AI가 "내가 알아서 잘 할게" 모드 차단. 사양 문서 = 계약서.

#### 4.4.3 회귀 방지 패턴

```
청크 D 작업 시작 전:
1. 청크 A, B, C 완료 결과 검증
2. 다음 항목 회귀 없는지 확인
   - localStorage 0건
   - 하드코딩 색상 0건
   - 빌드 0 오류

청크 D 작업 후:
- 위 3개 항목 재검증
- 발견 시 즉시 보고
```

### 4.5 코드 자기 검증 의무

AI가 작업 완료 시 자체 보고해야 할 항목

```
✅ 빌드 결과: 0 오류 (1830 모듈, 347ms)
✅ localStorage 사용: 0건
✅ 하드코딩 색상: 0건 (SVG 장식 제외)
✅ TypeScript 코드: 0건
✅ 이모지 사용: 0건
✅ 명시 외 파일 수정: 없음

수정 파일 목록:
- client/src/context/UserContext.jsx (12 lines added)
- client/src/pages/CashbackPage.jsx (rewrite)
```

위 보고 없이 작업 완료 인정 X. 사용자가 직접 확인할 시간 절약.

### 4.6 Claude Code (Antigravity IDE) 활용

- 기본 Sonnet, 복잡 작업 시 Opus 전환
- 한 인스턴스에 한 가지 작업 (병렬 인스턴스는 파일 충돌 위험)
- 권한 확인 프롬프트 자동 통과 설정 (작업 흐름 끊김 방지)
- 변경사항 항상 git 단위로 추적 (자동 커밋 + PROGRESS.md)
- 진행 중 모델 전환 가능 (단순 작업 → Sonnet, 복잡 작업 → Opus)

---

## 5. 데이터 수집 방법

### 5.1 강릉페이 가맹점 데이터 (13,021개)

**출처**: search.konacard.co.kr (강릉시청 공식 가맹점 검색)

**방법**: 브라우저 콘솔 자동 수집 스크립트

**과정**
1. 페이지 F12 → Network 탭에서 API endpoint 발견
   - URL: `https://search.konacard.co.kr/api/v1/payable-merchants`
   - Method: POST
   - Payload: `{id:"38", merchantType:"HN", pageNum:"N", pageSize:"30", affiliateName:"강릉시청"}`
2. 응답 구조 분석 (`data.merchants` 배열에 30개씩)
3. 콘솔 fetch 스크립트로 1~455페이지 자동 순회
4. 13,643개 매장 정보 JSON 다운로드
5. 좌표 없는 매장 제외 → 13,021개 확정

**활용한 AI 기여**
- API endpoint 분석 (curl 형식 보고 자동 인식)
- 자동 수집 스크립트 작성 (페이지네이션 + 대기 시간 + 다운로드)
- 카테고리 매핑 (200+ konacard 분류 → 12개 우리 카테고리)
- QR 매장 매칭 (이름 부분 일치 알고리즘)

### 5.2 QR결제 매장 데이터 (216개)

**출처**: 강릉시청 QR결제 안내 페이지 스크린샷

**방법**: NotebookLM에 스크린샷 업로드 + 텍스트 추출 프롬프트

**과정**
1. 강릉시청 페이지에서 QR결제 가능 매장 스크린샷 다수 캡처
2. NotebookLM에 업로드
3. 추출 프롬프트: "이미지에서 상호명/업종/주소/동/면 추출 후 CSV"
4. 193개 추출 → konacard 데이터와 부분 일치 매칭으로 216개 확정

### 5.3 좌표 시스템

- 모든 매장 위경도 (lat, lng) 포함
- konacard 데이터에 이미 포함되어 있어 Geocoding API 호출 불필요
- 강릉시청 좌표: (37.7519, 128.8761)
- 강릉역 좌표: (37.7647, 128.8990) - 지도 기본 center

---

## 6. 주요 기술 도전 + 해결

### 6.1 Face ID Lottie 무한 루프 버그

**문제**: dotLottie 파일 재생 시 처음 1초만 반복.

**진단 (AI 협업)**
- `.lottie` 파일 unzip → 내부 구조 분석
- `s/face_unlock_1.json` (State Machine) 발견
- State Machine이 19개 PlaybackState로 구성
- 각 단계마다 사용자 click 입력 대기 (loop=true + guard)
- 우리 코드는 click 안 보내서 첫 단계 무한 루프

**해결**
1. State Machine 통째 제거한 새 `.lottie` 파일 생성 (Python 스크립트)
2. manifest.json의 `stateMachines: []` 비움
3. 일반 애니메이션처럼 자동 재생 가능
4. 17초 길이 → 9배속 재생으로 1.9초 단축

**활용 코드**: `client/src/assets/lottie/face-id.lottie` (수정본)

### 6.2 13,000개 매장 지도 표시

**문제**: Google Maps에 13,021개 마커 직접 표시 시 브라우저 멈춤.

**해결**: @googlemaps/markerclusterer 라이브러리 통합
- 강릉시 전체 줌 아웃: "1000+", "500+" 클러스터 동그라미
- 줌인하면 개별 매장 핀 자동 분할
- 첫 진입 시 매장 핀 안 표시 (검색/카테고리 선택 시에만)
- 핀 디자인 얇게 (radius 6px, stroke 1.5px)

**참고**: Material Design / Apple Maps 동일 패턴

### 6.3 Google Maps "for development purposes only" 워터마크

**문제**: API key 정상, .env 정상, Vercel 환경변수 등록. 그래도 워터마크.

**진단**: 콘솔 에러 `RefererNotAllowedMapError: Your site URL to be authorized: http://localhost:5174`

**해결**: Google Cloud Console → API 키 → HTTP 리퍼러 제한에 다음 추가
- `http://localhost:5174/*`
- `http://localhost:*/*`
- `https://gangneung-pay.vercel.app/*`
- `https://*.vercel.app/*`

**교훈**: 코드 측 점검 후에도 안 풀리면 Google Cloud Console 설정 의심

### 6.4 디자인 시스템 일관성 검증

**문제**: 200+ 컴포넌트에 하드코딩된 spacing/borderRadius/fontSize 산재.

**해결**: 3단계 검증 자동화
1. 진단: grep으로 토큰 미사용 위치 카운트 (199건 spacing, 17건 borderRadius, 7건 fontSize 발견)
2. 매핑: 비표준값 → 가까운 토큰 매핑 규칙 정의
3. 일괄 교체: AI에게 매핑 규칙 + 파일 목록 제공, 자동 수정

**결과**:
- 우선순위 파일 100% 토큰화 (HomePage, BalanceCardExpanded, CardApplyPage 등)
- 장식 예외 항목 (브랜드 마크 6px gap, 미세 조정 2px 등) 주석으로 명시

### 6.5 코치마크 정렬 문제

**문제**: 코치마크가 ScreenContainer 밖으로 벗어남. 작은 viewport에서 버튼 안 보임.

**해결 과정**:
1. ScreenContainer에 id="screen-container" 부여
2. CoachMarkOverlay에서 getBoundingClientRect()로 컨테이너 좌표 추적
3. 말풍선을 컨테이너 안 absolute 좌표로 배치
4. body 스크롤 잠금 (코치마크 노출 중)
5. 작은 viewport 대응: 타겟 위쪽에 표시 (아래 공간 부족 시 자동 중앙)

---

## 7. 코딩 패턴 + 원본 코드

### 7.1 토큰 강제 패턴

모든 스타일은 토큰 참조. 하드코딩 금지.

```jsx
// 잘못된 패턴 (금지)
<button style={{ padding: '16px', borderRadius: '12px', fontSize: '15px' }}>

// 올바른 패턴
import { colors, spacing, layout, typography } from '../../tokens/tokens'
<button style={{ 
  padding: spacing[4], 
  borderRadius: layout.radiusButton, 
  fontSize: typography.size.sm,
}}>
```

### 7.2 컴포넌트 의도 주석 패턴

```jsx
/**
 * ChargeScreen (Phase 2 redesigned)
 * Strategy: S4, S5
 * Nielsen: #1 visibility, #4 closure, #5 error prevention, #8 memory load
 * Shneiderman: #3 informative feedback, #4 design for closure, #8 reduce memory load
 * Phase 1 ref: components/payment/ChargeScreen.jsx
 * Preserved: header style, quick amount chips, numpad
 * Changed: 3-step flow (C-01·C-06), balance display (C-02)
 */
export default function ChargeScreen({ onClose, onCharge, balance }) {
  // ...
}
```

### 7.3 useTypography hook 패턴 (큰글씨 모드)

```jsx
// hooks/useTypography.js
import { useApp } from '../context/AppContext'
import { typography } from '../tokens/tokens'

export function useTypography() {
  const { isLargeText } = useApp()
  return isLargeText ? typography.sizeLarge : typography.size
}

// 컴포넌트
function MyComponent() {
  const sizes = useTypography()
  return <span style={{ fontSize: sizes.md }}>텍스트</span>
}
```

### 7.4 가상 거래 내역 생성 패턴

```jsx
// context/UserContext.jsx
function generateMockTransactions() {
  const transactions = []
  const now = new Date('2026-05-15')
  
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const date = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)
    const yyyy = date.getFullYear()
    const mm = date.getMonth()
    
    // 현재 월(5월)은 1~15일만, 거래 8~15개
    const isCurrentMonth = (yyyy === 2026 && mm === 4)
    const maxDay = isCurrentMonth ? 15 : 28
    const count = isCurrentMonth 
      ? 8 + Math.floor(Math.random() * 8)
      : 15 + Math.floor(Math.random() * 16)
    
    let monthlyAccumulated = 0  // 캐시백 월별 한도 추적
    const MAX_MONTHLY = 30000
    
    for (let i = 0; i < count; i++) {
      // 거래 생성 (충전/환불/결제 비율 15/5/80%)
      // 결제는 단골 30% + 일반 70%
      // 캐시백은 한도 체크 (월 30,000원 도달 시 0원)
      // ...
    }
  }
  
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  return transactions
}
```

### 7.5 데이터 수집 스크립트 (브라우저 콘솔)

```javascript
(async function collectAllMerchants() {
  const PAGE_SIZE = 30
  const TOTAL = 13643
  const TOTAL_PAGES = Math.ceil(TOTAL / PAGE_SIZE)
  const allMerchants = []
  
  console.log(`총 ${TOTAL_PAGES}페이지 수집 시작...`)
  
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    try {
      const res = await fetch('https://search.konacard.co.kr/api/v1/payable-merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          id: "38",
          bizType: "",
          merchantType: "HN",
          pageNum: String(page),
          pageSize: "30",
          affiliateName: "강릉시청",
          searchKey: "",
        }),
      })
      
      const json = await res.json()
      const merchants = json.data?.merchants || []
      merchants.forEach(m => {
        allMerchants.push({
          seq: m.seq, name: m.simpleNm, category: m.bizTypeNm,
          addr: m.addr, tel: m.telNo, zipCd: m.zipCd,
          lat: m.latitude, lng: m.longitude,
        })
      })
      
      if (page % 10 === 0 || page === TOTAL_PAGES) {
        console.log(`진행: ${page}/${TOTAL_PAGES} (${allMerchants.length}개)`)
      }
      await new Promise(r => setTimeout(r, 100))
    } catch (e) {
      console.error(`페이지 ${page} 실패:`, e)
    }
  }
  
  // JSON 다운로드
  const blob = new Blob([JSON.stringify(allMerchants, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gangneung-merchants.json'
  a.click()
  URL.revokeObjectURL(url)
})()
```

### 7.6 카테고리 매핑 로직

```python
# Python (데이터 전처리)
CATEGORY_MAP = {
    '일반음식점': '음식점', '일식전문점': '음식점', '중식전문점': '음식점',
    '서양식전문점': '음식점', '치킨전문점': '음식점', '일반주점': '음식점',
    '커피전문점': '카페', '제과.제빵': '카페',
    '편의점': '편의점',
    '슈퍼마켓.마트': '마트', '농산물,청과물': '마트', '수산물,건어물': '마트',
    # ... 200+ 매핑
}

def map_category(biz_type_nm):
    if biz_type_nm in CATEGORY_MAP:
        return CATEGORY_MAP[biz_type_nm]
    # 키워드 부분 매칭으로 fallback
    keywords = {
        '음식점': ['음식', '주점', '치킨', '한식', ...],
        '카페': ['카페', '커피', '제과', '빵', ...],
        # ...
    }
    for cat, words in keywords.items():
        if any(w in biz_type_nm for w in words):
            return cat
    return '기타'
```

---

## 8. 프롬프트 예시 (AI 활용)

### 8.1 진단 프롬프트 (디자인 시스템)

```
강릉페이 디자인시스템 점검 1단계 - 진단.

목표: 코드 전체에서 디자인시스템 위반 사항을 찾아 보고. 수정은 다음 단계.

시작 전 필독: client/src/tokens/tokens.js

검증 작업
1) typography.fontFamily 외 하드코딩된 fontFamily 발견 시 모두 목록화
2) fontSize 하드코딩 grep
3) borderRadius 하드코딩 grep
4) spacing 하드코딩 grep

각 진단 항목별 다음 형식으로 보고:
- 총 N건
- 가장 많이 사용된 비표준 값 Top 3
- 파일별 발생 횟수 Top 5

수정 작업은 진행하지 말 것. 진단만.
```

### 8.2 워크플로우 프롬프트 (FIX 패턴)

```
강릉페이 충전 이중 적용 버그 최종 수정.

진단 완료. ChargeScreen.jsx Step 2 확인 버튼에 처리 가드가 없어 onCharge가 중복 호출됨.

워크플로우 진단 → 수정 → 검증
수정 대상 파일: client/src/components/payment/ChargeScreen.jsx (단일)

수정 1. charged 가드 state 추가
수정 2. Step 2 확인 버튼 onClick 교체
수정 3. Step 3 표시 잔액 props 그대로 사용
수정 4. 수정 버튼 onClick에 setCharged(false) 추가

검증 시나리오
□ 잔액 0원 시작
□ 5만원 입력 → 확인 → "현재 잔액 50,000원" (100,000원 아님)
□ 더블 클릭 시도 → 1회만 처리

명시 외 파일 수정 금지.
모든 응답 한국어.
```

### 8.3 사양 문서 참조 프롬프트

```
강릉페이 큰글씨 모드 - HomePageLarge 작성 (2단계).

시작 전 필독: client/docs/LARGETEXT.md

본 2단계는 LARGETEXT.md의 "4. HomePage 큰글씨 모드" 섹션 전체 수행.

LARGETEXT.md 4.4절 잔액 카드 구조 정확히 준수
LARGETEXT.md 4.5절 카드 컴포넌트 사양 정확히 준수
LARGETEXT.md 4.6절 환불 카드 일러스트 사양 그대로 SVG 작성

체크리스트 (LARGETEXT.md 7.2)
- [ ] HomePage.jsx에 isLargeText 분기 추가
- [ ] HomePageLarge.jsx 신규 작성
- [ ] ...

명시 외 파일 수정 금지.
모든 응답 한국어.
```

---

## 9. 프로젝트 진행 히스토리 (Phase별)

전체 작업이 다단계 Phase로 진행됨. 각 Phase의 의도 + 산출물 정리.

### 9.1 Phase 1 — 초기 구축

기간: 2026-04월
의도: 강릉페이 AS-IS 화면을 React로 1:1 복제. UX 분석 + 개선 방향 도출.
산출: 30개 페이지 + 43개 컴포넌트 초기 버전, Kakao Maps 연동, 디자인 토큰 시스템 첫 구축

### 9.2 Phase 2 — UX 진단 + 개선 (29개 이슈 해결)

기간: 2026-05-13
의도: 닐슨 휴리스틱 + Shneiderman 황금률 기반 UX 진단. 29개 이슈 식별 후 Sprint로 분할 해결.

#### Sprint A — P0 이슈 (긴급)

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-02 | 환불 버튼 동등 노출 | 3버튼 [충전][환불][QR결제] |
| H-04 | 캐시백 BalanceCard 통합 | 분산된 캐시백 정보 통합 |
| H-08 | 잔액 34px Large Title | 시니어 가독성 |
| C-01 | 3단계 충전 플로우 | 6단계 → 3단계 압축 |
| C-02 | 잔액 상시 표시 | ChargeScreen 잔액 항상 노출 |
| C-06 | 충전 완료 단계 | 명확한 closure |
| Q-01 | QR 잔액 부족 경고 | 결제 전 사전 차단 |
| Q-02 | QR 잔액 폰트 상향 | 가독성 |

#### Sprint B — P1 이슈

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-01 | WidgetAddBanner 신규 (S1) | 홈화면 위젯 추가 안내 |
| H-03 | 정보 위계 재구성 | BalanceCard 최상단 |
| H-05 | AnnouncementModal → 인라인 배너 | 강제 모달 제거 |
| H-06 | B2BPromoCard 홈 제거 | 사용자 우선 |
| Cb-01~03 | 캐시백 요약 카드 + 금액/탭 수정 | 가치 체감 |
| St-01~02 | 가맹점 정보 신뢰성 | 업데이트 날짜 + 수정 요청 |
| Hi-01~02 | 환불 진입점 + 잔액 표시 | History 페이지 메인화 |

#### Sprint C — P2 이슈

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-07 | 카드명 수정 | "내 카드" / "강릉페이 N" |
| C-03~05 | 충전 한도 + Disabled 사유 + 환불 요약 | 오류 예방 |
| Q-03 | 스캔 상태 피드백 | 펄스 애니메이션 |
| St-03~04 | 검색 input 활성화 + 카테고리 아이콘 | 매장 페이지 강화 |
| Hi-03~04 | 거래 리스트 UI + 환불 가능 배지 | 명확한 상태 |

#### Sprint 1 — QR 실제 카메라

html5-qrcode 라이브러리 통합. mock → 실제 카메라 피드. 결제 확인 바텀시트 + 체크 애니메이션 + 권한 거부 한국어 안내.

#### Sprint 2 — S3 혜택 체감

캐시백 금액 구간별 직관 메시지 (커피 한 잔 / 점심 한 끼 / 한도 달성).

#### Sprint 3 — S6 가맹점 정보 신뢰

가맹점 마지막 업데이트 날짜 노출. 가맹점주 정보 수정 요청 흐름 추가.

#### Sprint 4 — 닐슨/슈나이더만 잔여

QR 카메라 init 상태 스피너 (Nielsen #1 visibility). 충전 한도 초과 시 비활성 + 사유 (Nielsen #5, #9).

#### Sprint D — S7 코치마크 단계별 안내

CoachMarkOverlay 신규 작성. Step 1 (홈 충전 버튼) → Step 2 (충전 페이지 진입) 자동 진행. fromCoach state로 페이지 간 코치마크 연속성 유지.

Phase 2 결과: 29개 이슈 모두 완료. 빌드 0 오류 유지.

### 9.3 Phase 3 — IA 재편 + 기능 구현

기간: 2026-05-15
의도: Phase 2가 컴포넌트 단위 개선이었다면 Phase 3는 IA(Information Architecture) 전면 재편. 30개 페이지의 사용자 동선 자체를 재설계.

#### Phase 3-A — IA 구조 재편

기존 5탭: 홈·결제매장·QR중앙·이용내역·MY → 5탭으로 재편 (이용내역을 핵심 위치로 승격)
TopAppBar Menu → Bell + 검색 → /search
MyPage, SearchPage, CardApplyPage 신규 생성
/menu → /my 리다이렉트
Google Maps API 통합 (.env, @react-google-maps/api)

#### Phase 3-B — 기능 구현 (3명의 병렬 에이전트)

병렬 에이전트 패턴 처음 적용. 한 작업을 3개 영역으로 분할.

**Agent BN (검색)**: SearchPage 완성, PopularKeywords 가로 스크롤 칩

**Agent MY (MY + 카드)**: MyPage 5그룹 메뉴, CardApplyPage 2카드 캐러셀, CardBackModal FaceID + CVC, HomePage 카드 클릭 연동

**Agent FX (버그 + 지도 + 내역)**: CoachMark max-w 430px 강제 + position fixed, StoreMapScreen Kakao → Google Maps 전환, FrequentPlaces 신규, HistoryPage 메인 탭화, BottomNav safe-area-inset-bottom env() 적용

**Agent VR (검증)**: 44항목 체크리스트 일괄 점검 (다른 에이전트 작업 완료 후 실행)

#### Sprint R1~R10 — 긴급 복구 + dotLottie

Phase 3-B 작업 중 일부 디자인 회귀 발생. 10개 sprint로 긴급 복구.

| Sprint | 내용 |
|--------|------|
| R1+R7 | 3버튼(충전/환불/이용내역) 카드 내부 복원; 잔액 색상 white; CreditCard 아이콘 → 3D SVG |
| R2 | CardActions 외부 컴포넌트 제거, chargeButtonRef BalanceCardExpanded로 전달 |
| R3→R9 | 직관 캐시백 메시지 이모지 제거, lucide-react 아이콘 5종 (Bus/Coffee/Utensils/ShoppingBag/Smartphone) |
| R4 | 인라인 캐시백 배너 완전 삭제 |
| R5 | BannerCarousel teal-600 → primary-100 라이트 블루 (디자인 톤 통일) |
| R8 | shouldShowCashbackModalOnNextHome state, registerCard 시 true (카드 등록 후 첫 홈에서만 모달) |
| R10 | @lottiefiles/dotlottie-react 설치, face-id.lottie + State Machine 통합 (이후 청크 C에서 우회) |

기획 의도
- 회귀는 발견 즉시 별도 sprint로 격리
- R1~R10 = "긴급 복구" 명시. 정상 흐름 작업과 구분
- 작업 단위가 명확해야 PROGRESS.md 추적 가능

### 9.4 Phase 3 청크 작업 (피드백 반영)

기간: 2026-05-15
의도: Phase 3 완료 후 피드백 수렴. 작업을 4개 청크로 분할.

#### 청크 A — 디자인 시스템 복원

기획 의도: Phase 3-B 회귀로 인한 디자인 시스템 일관성 점검. 토큰화 + safe-area 정리.

| Task | 파일 | 변경 |
|------|------|------|
| A1 | ScreenContainer | maxWidth 390px 복원 (tokens.layout.viewport 일치), safe-area-inset 추가 |
| A2 | BalanceCardExpanded | 워터마크 button 화, onCardIconClick prop, opacity 0.15/hover 0.25; refundButtonRef 분리; LOW_BALANCE=10000 복원; getCashbackIntuition teal 색상 |
| A3 | HomePage | AnnouncementBanner 복원; refundButtonRef useRef 추가 |

#### 청크 B — 흐름 로직

기획 의도: 신규 사용자 + 기존 사용자 분기. 코치마크 3단계 자동 진행 (cardApply → charge → refund → cashbackModal).

| Task | 파일 | 변경 |
|------|------|------|
| B1 | UserContext | monthlyCashback 상태, useCallback, shipCard, chargeBalance ID 반환, refundTransaction(id) |
| B2 | OnboardingContext | hasSeen* 3종, markSeen(key), completeAllCoachmarks |
| B3 | CoachMarkOverlay | 버튼 row justifyContent space-between (건너뛰기 좌 / 다음 우) |
| B4 | HomePage | 신규/기존 사용자 분기 (CardApplyCTA/CashbackEntryCard), 코치마크 자동 진행 |
| B5 | MonthlyCashbackModal | 슬라이드업/다운 350ms |
| B6 | CardApplyCTA (신규) | 신규 사용자 잔액 카드 자리 CTA |
| B7 | CashbackEntryCard (신규) | hasCard true 시 잔액 카드 아래 노출 |

#### 청크 C — 인터랙션 디테일 (Face ID 통합)

기획 의도: 카드 뒷면 모달을 Face ID 인증 인터랙션으로 변경. RefundPage를 NumPad → 충전 내역 리스트 방식으로 재작성.

| Task | 파일 | 변경 |
|------|------|------|
| C3 | CardBackFaceId (신규) | Dynamic Island 필 컴포넌트; 상단 슬라이드다운 → Lottie 재생 → 슬라이드업 |
| C4 | HomePage | showFaceId state; CardBackModal → CardBackFaceId 교체 |
| C5 | RefundPage | NumPad/금액입력 → 충전 내역 리스트; refundTransaction(id) 호출; 확인 다이얼로그 |
| C7 | CardApplyPage | useEffect: cardStatus === 'applying' 시 1000ms 후 shipCard 자동 호출 |

#### 청크 D — 캐시백 페이지 재작성 + 가상 데이터

기획 의도: "자동 차감" 표현 전면 제거 (캐시백은 적립만, 차감 없음). 12개월치 가상 거래 데이터 + 단골 매장 30% + 캐시백 월 한도 30K 자동 계산.

| Task | 파일 | 변경 |
|------|------|------|
| D1 | UserContext | STORES/REGULAR_STORES 상수, generateMockTransactions, 12개월 × 15~30건, 단골 30%, 5월 monthlyCashback 자동 합산 |
| D2 | PeriodPickerModal (신규) | 390px 앱 고정형 바텀시트, 슬라이드업 300ms, CashbackPage·HistoryPage 공용 |
| D3 | CashbackPage | "차감" 표현 전면 제거, primary[700] 요약 카드 + teal 진행바, 기간 선택 |
| D4 | HistoryPage | 타입 필터 칩 4종 (전체/충전/환불/결제), 기간 필터, spend 항목 store명 + teal 캐시백 표시 |

### 9.5 Phase 3 이후 (현재 진행 중)

#### 디자인 시스템 전수 검증 (2026-05-16)

3단계 자동 검증
1. 진단: grep으로 토큰 미사용 위치 카운트
2. 매핑: 비표준값 → 가까운 토큰 매핑 규칙 정의
3. 일괄 교체

결과
- fontSize 7건 → 모두 토큰화
- borderRadius 17건 → 10건 토큰화 + 7건 장식 예외 (주석 명시)
- spacing 199건 → 우선순위 파일 100% 토큰화

#### 큰글씨 모드 (진행 중)

`LARGETEXT.md` 사양 기반. 3단계로 분할.

| 단계 | 작업 | 상태 |
|------|------|------|
| 1 | typography.sizeLarge 토큰 + useTypography hook + AppContext.isLargeText | ✅ 완료 |
| 2 | HomePage 분기 + HomePageLarge 신규 (3단 잔액 카드 + 4카드) | ✅ 완료 |
| 3 | 7개 페이지 useTypography 확산 + 레이아웃 깨짐 검증 | 🔄 진행 중 |

#### 매장 데이터 통합 (2026-05-17)

konacard API 크롤링으로 13,021개 실제 가맹점 + 216개 QR결제 매장 수집. stores.json + qr-stores.json 분리.

다음 단계 (진행 중)
- data/stores.js 검색/필터 함수
- Google Maps Cluster 적용
- 카테고리 필터 12개 확장
- 검색 자동완성 + QR 매장 탭

#### Android 버전 (예정)

`ANDROID.md` 사양 기반. 폴더 분리 방식 (client → client-android 복사).

발표 직전 (5/29~5/30) 분리 절차
1. client-android 별도 폴더로 복사
2. 새 GitHub repo 생성
3. Vercel 새 프로젝트 + 새 URL
4. iOS URL + Android URL 두 개 시연

### 9.6 발표 시점 진행 상황 (2026-05-17 기준)

#### 완료

- [x] iOS 버전 (Apple HIG)
  - [x] 30개 페이지 모두 완료
  - [x] 70+ 컴포넌트 토큰화
  - [x] Face ID + 카드 뒷면 모달
  - [x] 코치마크 시스템 (Step 1, 2)
  - [x] 7대 전략 모두 구현
  - [x] 디자인 시스템 검증 (fontSize/borderRadius/spacing)
  - [x] 데이터 시스템 (가상 거래 12개월 + 캐시백 한도 30K)
  - [x] 13,021개 실제 가맹점 데이터 수집
  - [x] 큰글씨 모드 인프라 + HomePageLarge

#### 진행 중

- [ ] 큰글씨 모드 페이지 확산 (단계 3)
- [ ] 매장 시스템 단계 B, C (지도 클러스터링, QR 매장 탭)
- [ ] Android 버전 (client-android 분리 + Material 적용)

#### 예정

- [ ] 포트폴리오 사이트 (Plus-Ex 톤)
- [ ] 발표 자료
- [ ] MY 페이지 디테일 마무리

---

## 10. 디벨롭 백로그 (발표 후)

- 백엔드 연결 (Render + NeonDB)
- 진짜 PWA 변환 (오프라인 지원)
- React Native 또는 Capacitor로 네이티브 빌드
- 음성 안내 (TTS, 시니어 접근성)
- 다크 모드
- 큰글씨 모드 + 다크 모드 동시
- Material You 동적 색상 (Android)
- 강릉시 실제 API 연동 (정부 협업 필요)

---

## 11. 참고 자료

### 11.1 디자인 가이드라인

- Apple Human Interface Guidelines (HIG): https://developer.apple.com/design/human-interface-guidelines/
- Material Design 3: https://m3.material.io/
- 닐슨 휴리스틱 10원칙
- Shneiderman 8가지 황금률

### 11.2 라이브러리 문서

- React 18: https://react.dev
- Vite: https://vite.dev
- React Router v6: https://reactrouter.com
- @react-google-maps/api: https://react-google-maps-api-docs.netlify.app
- @googlemaps/markerclusterer: https://github.com/googlemaps/js-markerclusterer
- Framer Motion: https://www.framer.com/motion/
- Lucide Icons: https://lucide.dev
- Material Icons: https://fonts.google.com/icons

### 11.3 데이터 출처

- 강릉시 가맹점: https://search.konacard.co.kr/payable-merchants/gangneung
- 강릉시청: https://www.gn.go.kr
- 강원페이/강릉페이 안내: 강원도청 지역화폐 홈페이지

### 11.4 AI 도구

- Claude (Anthropic): https://claude.ai
- Claude Code (Antigravity IDE): https://docs.claude.com/en/docs/agents-and-tools/claude-code
- NotebookLM: https://notebooklm.google.com
- Perplexity AI: https://perplexity.ai

---

## 12. 협업 회고 (AI와 함께 작업하며)

### 12.1 AI를 잘 활용한 사례

**디자인 시스템 199건 spacing 위반 자동 검증**
- AI가 단순 매핑 + 컨텍스트 추론 (브랜드 마크 6px gap은 장식 예외) 둘 다 처리
- 10건 자동 토큰화 + 7건 보고 후 사용자 결정 요청
- 인간 판단력과 AI 자동화의 조합

**Face ID 무한 루프 디버깅**
- 사람이 보고 알 수 없는 .lottie 내부 구조 (Python으로 unzip + 분석)
- AI가 State Machine 19단계 구조를 파악하고 우회 방법 제시
- 수동 시도라면 며칠 걸렸을 작업이 30분

**대규모 데이터 변환**
- 13,643개 매장 → 우리 카테고리로 매핑 (200+ 분류 매핑 규칙)
- 매핑 규칙 작성을 AI에게 위임. 검증만 사람이 수행
- konacard 가맹점 → QR 매장 매칭 알고리즘 (이름 부분 일치)

**병렬 에이전트 패턴 (Phase 3-B)**
- 한 명의 AI에 30개 파일 위임 X
- 4개 영역으로 분할 → 4명의 AI에게 병렬 위임
- 각 에이전트는 자기 영역 깊이 작업
- 마지막에 검증 전용 에이전트 (Agent VR) 통합 회귀 점검
- 작업 속도 2~3배 향상

**문서 기반 컨텍스트 주입**
- 새 AI 세션마다 0부터 시작하는 문제 해결
- 8개 사양 문서 (CLAUDE.md, AGENTS.md, DESIGN.md, IA.md, Components.md, Patterns.md, Routes.md, PROGRESS.md) 운영
- 작업 시작 전 "이 문서 view 후 작업" 명시
- 일관성 + 할루시네이션 방지

**자동 커밋 + PROGRESS.md 작성**
- AI가 작업 완료 시 PROGRESS.md에 자동 기록
- "어떤 청크에서 무엇이 바뀌었는지" 발표 시점에 즉시 추적
- 회귀 발생 시 어느 청크가 문제인지 즉시 식별

### 12.2 하네스 엔지니어링의 성과

**개념**: AI를 단일 "전능한 도구"가 아닌, 여러 협업자가 함께 일하는 "오케스트라"로 운영. 각 협업자(에이전트)는 명확한 책임 + 명확한 인터페이스(사양 문서) + 명확한 검증 절차를 가짐.

**성과**
- Phase 3-B에서 4개 영역 병렬 작업으로 1일치 작업을 반나절에 완료
- 청크 A~D 작업에서 회귀 발생 즉시 식별 + R1~R10 sprint로 격리 복구
- 디자인 시스템 검증을 사람이 직접 검사 X → grep + AI 자동화로 199건 처리

**기여**: 단순히 "AI에게 코드 짜주세요"가 아닌 "AI에게 어떻게 일을 맡겨야 효율적인가"라는 메타 질문에 대한 실험적 답.

### 12.3 한계 + 주의점

**AI는 학습 데이터 시점에 의존**
- 토스, 카카오페이의 최신 디자인을 사람이 직접 확인 필요
- AI가 "토스에 송금 버튼 있어요"라고 잘못 답할 수 있음 (실제로 없음)
- 사용자 직접 시연 확인이 검증의 최후 보루

**과도한 위임은 디자인 의도 손실 위험**
- AI가 "효율적"이라고 한 결정이 디자인 의도와 어긋날 수 있음
- 예: 토큰화 시 모든 비표준값을 강제 매핑하면 미세 조정이 손실됨
- 사람이 "이것은 의도된 장식 예외"라고 판단해야 함

**컨텍스트 한계**
- 한 인스턴스에서 너무 큰 작업 시키면 디테일 놓침
- 큰 작업은 단계 분할 + 사양 문서로 일관성 확보

**병렬 에이전트의 충돌**
- 같은 파일을 두 에이전트가 동시에 수정 시 위험
- 영역 분할이 명확해야 함 (Agent BN/MY/FX는 파일 겹침 없음)
- 충돌 위험 있으면 순차 처리

### 12.4 인간 + AI 협업의 정수

AI는 "어떻게(How)"를 잘 한다. 사람은 "왜(Why)"를 결정한다.

이 프로젝트에서 가장 중요한 결정들은 사람이 했다.
- 시니어 사용자 우선 → 이용내역 바텀 네비에 배치
- 환불 동등 위계 → 잔액 카드 3슬롯
- 캐시백 직관 메시지 → 추상적 숫자 거부
- 큰글씨 모드 = 단순 폰트 X, 레이아웃 재설계
- 폴더 분리 방식 (client/client-android) → 토글 분기 X
- 13,000개 매장 전부 등록 → 임의 발췌 X

AI는 이 의도를 정확히 구현해주는 강력한 파트너였다.

### 12.5 디지털 인문예술 전공의 관점에서

이 프로젝트는 디지털 도구(AI)를 인문학적 사고(사용자 관점 + 가치 판단)와 결합한 실험이다.

기술 측면
- React + Vite + Material Design 3 등 현대 프론트엔드 스택 학습
- AI 협업 워크플로우 (하네스 엔지니어링) 설계
- 13,000개 데이터 자동 수집 및 변환

인문 측면
- 시니어 사용자의 멘탈 모델 분석
- 정보 위계의 윤리적 결정 (환불 동등 위계 = 사용자 권리)
- 가치 체감의 인지적 디자인 (숫자 → 직관 메시지)
- AI 도구를 어떻게 "윤리적으로" 활용할 것인가에 대한 실험

기술과 의도가 결합될 때 좋은 디자인이 나온다. AI는 그 결합을 가능하게 하는 도구다.

---

**문서 작성일**: 2026-05-17
**문서 버전**: 2.0 (PROGRESS.md 통합 + 하네스 엔지니어링 + 문서 인프라 추가)
**최종 수정자**: 주현호 (with Claude)

# 매장 시스템 작업 케이스 스터디

> 강릉페이 결제매장 페이지 전면 재구축 (2026-05-17)
> AI 활용 + 데이터 수집 + UX 의사결정 + 코딩 패턴 종합 기록

---

## 1. 작업 개요

### 1.1 작업 범위

강릉페이의 결제매장 페이지를 다음과 같이 전면 재구축

- **데이터**: 목업 데이터 4개 → 실제 13,021개 매장 (강릉시 공식)
- **지도**: 단순 마커 → Google Maps Cluster (대량 마커 처리)
- **검색**: 비활성 → 13,021개 대상 자동완성
- **카테고리**: 6개 → 12개 (실제 가맹점 분포 반영)
- **시트**: 빈 상태 안내문 → 강릉역 기준 가까운 매장 큐레이션
- **QR결제**: 신규 탭 (216개 QR 가능 매장 분리)

### 1.2 작업 일정

| 시점 | 작업 |
|------|------|
| 5/17 오전 | 데이터 수집 방법 진단 (수동 vs 자동) |
| 5/17 오전 | konacard API 발견 + 자동 수집 스크립트 작성 |
| 5/17 오전 | 13,021개 매장 데이터 수집 + 카테고리 매핑 |
| 5/17 오후 | QR 매장 216개 NotebookLM 추출 + 매칭 |
| 5/17 오후 | 지도/검색/시트 UI 재구축 작업 |
| 5/17 저녁 | 가까운 매장 큐레이션 + 시트 빈 공간 수정 |

총 작업 시간 약 6시간.

---

## 2. UX 의사결정

### 2.1 핵심 문제 진단

기존 매장 페이지의 4가지 문제

| # | 문제 | UX 영향 |
|---|------|---------|
| 1 | 목업 데이터 4개만 표시 | 신뢰성 X. "실제로 결제되나?" 의심 |
| 2 | 검색 기능 비활성 (UI만 있음) | Nielsen #1 visibility 위반 |
| 3 | 첫 진입 시 빈 안내문 | 가치 체감 X. 무엇을 할지 모름 |
| 4 | QR결제 가능 매장 구분 X | 사용자가 결제 전 사전 확인 불가 |

### 2.2 의사결정 1: 데이터 양

선택지

| 옵션 | 장점 | 단점 |
|------|------|------|
| 상위 100~500개만 | 가볍고 빠름 | 모든 매장 못 찾음 |
| 카테고리별 균등 분포 | 다양성 보장 | 강릉역 인근 집중도 떨어짐 |
| **전체 13,021개** | 신뢰성 최대 | 빌드 무거움 |

**선택: 전체 13,021개**

근거
- S6 (가맹점 정보 실시간 신뢰) 전략의 핵심
- 임의 발췌는 "선별의 의도"가 의심됨 → 신뢰 손상
- 2.8MB JSON은 초기 로드만 부담. 한번 로드 후 메모리 처리
- 강릉시 공식 데이터라는 점이 발표 임팩트

### 2.3 의사결정 2: 지도 초기 상태

선택지

| 옵션 | 장점 | 단점 |
|------|------|------|
| 13,021개 모두 표시 | 정직 | 강릉 전체가 핀 천지 → 시각 노이즈 |
| 첫 진입 시 핀 안 표시 | 깔끔 | 사용자가 뭘 해야 할지 모름 |
| **Google Maps Cluster** | 줌 레벨별 자동 분할 | 구현 복잡 |

**선택: Google Maps Cluster + 첫 진입 시 카테고리 미선택 상태에서는 표시 X**

근거
- 카테고리 선택 또는 검색 시에만 핀 표시 → 의도 있는 UI
- 클러스터링으로 "이 동네에 가맹점 1000+개"라는 정보 자체가 가치
- 줌인하면 자연스럽게 개별 핀 분할

### 2.4 의사결정 3: 빈 상태 UI 처리

기존: 카테고리 선택/검색 안 한 상태 → "카테고리를 선택하거나 매장을 검색해보세요" 안내문

문제
- 사용자가 매장 페이지에 진입하는 가장 흔한 이유: "내 근처에 어디 가서 쓸 수 있지?"
- 안내문은 행동을 유도하지만 즉시 가치 제공 X
- Nielsen #6 (recognition rather than recall): 카테고리를 떠올려야 함

**선택: 강릉역 기준 가까운 매장 즉시 큐레이션**

근거
- 강릉페이 사용자는 강릉 방문객 + 강릉 거주자 둘 다 강릉역 기준이 자연스러움 (시연 환경도 강릉역 기준)
- 안내문 대신 행동 가능한 정보 (직접 클릭하면 상세 진입)
- "기본값이 있는 인터페이스" UX 원칙

### 2.5 의사결정 4: 시트 빈 공간 처리

스크린샷에서 발견된 회색 빈 공간 (시트 아래 + 바텀 네비 위)

진단
- 시트 컨테이너 `flex` 또는 `height` 설정 미흡
- 리스트 영역이 시트 끝까지 차지하지 않음

**선택: 시트가 검색바/필터 아래부터 바텀 네비 위까지 가득 채움**

구현 패턴
```jsx
<div style={{
  flex: 1,
  minHeight: 0,  // flex item이 overflow 가능하도록
  display: 'flex',
  flexDirection: 'column',
}}>
  {/* 탭 헤더 (자주 가는 곳 / QR결제 매장) */}
  <div>...</div>
  
  {/* 스크롤 가능한 리스트 */}
  <div style={{
    flex: 1,
    overflowY: 'auto',
  }}>
    {/* 매장 리스트 */}
  </div>
</div>
```

핵심: `minHeight: 0`이 없으면 flex 자식이 overflow 안 됨 (CSS 함정).

### 2.6 의사결정 5: QR결제 매장 별도 탭

기존 탭: 자주 가는 곳 (단일)

추가 탭: QR결제 매장 216

근거
- 사용자 페르소나 중 일부는 "QR로만 결제하는 사용자"
- QR 가능 매장 사전 확인 = 결제 실패 예방 (Nielsen #5)
- 216개라는 숫자 자체가 정보 (전체 13,021 중 1.6%)
- 탭 구조라 기존 자주 가는 곳을 해치지 않음

---

## 3. AI 활용 방법

### 3.1 데이터 수집 자동화

#### 3.1.1 발견 (Discovery)

사용자가 강릉시 가맹점 페이지를 한 페이지씩 복사하던 중 (150페이지까지 수동 작업) AI에게 자동화 가능 여부 문의.

AI가 한 일

1. Network 탭 요청 분석 (사용자가 보내준 URL + 헤더 정보)
2. POST endpoint 발견: `https://search.konacard.co.kr/api/v1/payable-merchants`
3. payload 구조 추론 + 응답 구조 파악 요청
4. 사용자가 payload + 응답 보내줌
5. 자동 수집 스크립트 작성

소요 시간: 약 15분

#### 3.1.2 자동 수집 스크립트 패턴

```javascript
(async function collectAllMerchants() {
  const PAGE_SIZE = 30
  const TOTAL = 13643
  const TOTAL_PAGES = Math.ceil(TOTAL / PAGE_SIZE)
  const allMerchants = []
  
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    const res = await fetch('https://search.konacard.co.kr/api/v1/payable-merchants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: "38", merchantType: "HN",
        pageNum: String(page), pageSize: "30",
        affiliateName: "강릉시청",
      }),
    })
    const json = await res.json()
    json.data?.merchants?.forEach(m => allMerchants.push({
      seq: m.seq, name: m.simpleNm, category: m.bizTypeNm,
      addr: m.addr, tel: m.telNo, lat: m.latitude, lng: m.longitude,
    }))
    await new Promise(r => setTimeout(r, 100))  // 서버 부담 완화
  }
  
  // JSON 자동 다운로드
  const blob = new Blob([JSON.stringify(allMerchants)], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'gangneung-merchants.json'
  a.click()
})()
```

설계 의도
- 사용자가 브라우저 콘솔 한 번 실행 → 끝
- 페이지마다 100ms 대기 (서버 부담 완화)
- 매 10페이지마다 진행 로그 (사용자 안심)
- 완료 시 JSON 자동 다운로드 (사용자 추가 작업 없음)

소요 시간: 약 1.5분 (455페이지 자동 순회)

#### 3.1.3 데이터 변환 + 매핑

수집 후 추가 처리

| 처리 | AI가 한 일 |
|------|----------|
| 카테고리 매핑 | konacard 200+ 분류 → 우리 12개 카테고리 매핑 규칙 작성 |
| 키워드 fallback | 정확 매핑 안 되는 경우 키워드 매칭 (예: "치킨"→"음식점") |
| QR 매장 매칭 | ga.md(NotebookLM 추출 193개) 매장 이름과 konacard 데이터 부분 매칭 |
| 좌표 검증 | lat/lng 없는 매장 622개 제외 (13,021개 확정) |
| 더미 전화번호 필터 | "033-000-0000" 같은 가짜 번호 빈 문자열 처리 |

```python
# 카테고리 매핑 로직
CATEGORY_MAP = {
    '일반음식점': '음식점', '일식전문점': '음식점', '중식전문점': '음식점',
    '커피전문점': '카페', '제과.제빵': '카페',
    '편의점': '편의점',
    '미용실(두발전문)': '미용', '피부.체형미관리': '미용',
    # ... 200+ 매핑
}

def map_category(biz_type_nm):
    if biz_type_nm in CATEGORY_MAP:
        return CATEGORY_MAP[biz_type_nm]
    # 키워드 fallback
    keywords = {'음식점': ['음식', '주점', '치킨'], ...}
    for cat, words in keywords.items():
        if any(w in biz_type_nm for w in words):
            return cat
    return '기타'

def is_qr_store(name):
    """QR 매장 매칭 - 정확/부분 일치"""
    if name in qr_names: return True
    name_normalized = re.sub(r'\s+', '', name).lower()
    for qr_name in qr_names:
        qr_normalized = re.sub(r'\s+', '', qr_name).lower()
        if len(qr_normalized) >= 4 and qr_normalized in name_normalized:
            return True
    return False
```

결과 통계 (AI가 자동 보고)
- 총 매장: 13,021개 (좌표 있는 매장만)
- QR 매장: 216개 (193 정확 매칭 + 23 부분 매칭)
- 카테고리 분포: 음식점 4,117 / 마트 1,121 / 미용 1,038 / 카페 771 등

### 3.2 UI 구현 작업 흐름

#### 3.2.1 진단 → 사양 → 수정 → 검증

이번 작업에 사용한 워크플로우

**진단 단계**
```
강릉페이 결제매장 페이지 바텀시트 + 큐레이션 수정.

1. 진단 (먼저 view)

view 대상 파일
- client/src/pages/StorePage.jsx
- client/src/components/store/StoreMapScreen.jsx
- client/src/components/store/FrequentPlaces.jsx
- client/src/components/store/StoreDetailSheet.jsx

진단 보고
- 바텀시트의 현재 height/maxHeight 값
- 빈 상태 안내문이 어느 컴포넌트의 어느 라인에 있는지
- 자주가는 곳 / QR결제 매장 탭 구조
- 강릉역 좌표 상수 위치
- 매장 리스트 렌더링 로직

수정은 진단 보고 후 사용자 승인 받고 진행.
```

**사양 단계**
- 정확한 변경 위치 + before/after 코드 제공
- 토큰 강제 (radiusButton, spacing 등)
- 명시 외 파일 수정 금지

**수정 단계**
- AI가 사양대로 수정
- 자체 빌드 검증

**검증 단계**
- 체크리스트 항목별 자체 보고
- 빌드 0 오류 + 변경 라인 수 + 발견했으나 보류한 항목

기획 의도
- AI가 "내가 알아서 잘 할게" 모드 차단
- 각 단계에서 사용자 검토 가능
- 회귀 발생 시 어느 단계에서 문제인지 즉시 식별

#### 3.2.2 모델 선택

| 작업 | 모델 | 근거 |
|------|------|------|
| 데이터 수집 스크립트 | Sonnet | 명확한 규칙, 빠르고 충분 |
| 카테고리 매핑 로직 | Sonnet | 단순 매핑 + 키워드 |
| UI 재구축 (지도 + 시트 + 검색) | Opus | 복합 의사결정 + 컴포넌트 통합 |
| 빈 공간 디버깅 | Sonnet | 단일 CSS 이슈 |

### 3.3 검증 자동화

모든 수정 후 AI가 자체 보고하는 항목

```
✅ 빌드 결과: 0 오류 (1830 모듈, 347ms)
✅ localStorage 사용: 0건
✅ 하드코딩 색상: 0건 (SVG 장식 제외)
✅ TypeScript 코드: 0건
✅ 이모지 사용: 0건
✅ 명시 외 파일 수정: 없음
✅ 강릉역 기준 가장 가까운 매장 5개:
   1. 강릉역세권개발 (0.1km)
   2. 강릉우유협동조합 (0.3km)
   3. 교동시장 (0.4km)
   ...
```

위 보고 없이 작업 완료 인정 X.

---

## 4. 코딩 패턴

### 4.1 데이터 모듈 분리

큰 데이터는 JSON 파일로 분리, JS 모듈은 import만

```
client/src/data/
  stores.json          ← 13,021개 (2.8MB)
  qr-stores.json       ← 216개 (47KB)
  stores.js            ← import + 가공 함수
```

```js
// stores.js
import storesData from './stores.json'
import qrStoresData from './qr-stores.json'

export const STORES = storesData
export const QR_STORES = qrStoresData

export const CATEGORIES = [
  '전체', '음식점', '카페', '편의점', '마트', '의료',
  '미용', '교통', '숙박', '관광', '생활', '교육', '기타'
]

// 거리 계산
const GANGNEUNG_STATION = { lat: 37.7647, lng: 128.8990 }

export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371  // km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// 가까운 매장 정렬
export function getNearbyStores(refLat = GANGNEUNG_STATION.lat,
                                refLng = GANGNEUNG_STATION.lng,
                                limit = 100) {
  return STORES
    .map(s => ({ ...s, distance: calculateDistance(refLat, refLng, s.lat, s.lng) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
}

// 검색
export function searchStores(query, options = {}) {
  if (!query?.trim()) return []
  const q = query.trim().toLowerCase()
  const { category, qrOnly, limit = 50 } = options

  let results = STORES.filter(s => {
    if (qrOnly && !s.isQR) return false
    if (category && category !== '전체' && s.category !== category) return false
    return s.name.toLowerCase().includes(q) ||
           s.address.toLowerCase().includes(q)
  })
  return results.slice(0, limit)
}
```

기획 의도
- 데이터 + 로직 분리 (관심사 분리)
- import 한 줄로 어디서든 사용 가능
- 빌드 시 JSON은 정적 자산으로 처리

### 4.2 flex 시트의 빈 공간 방지 패턴

```jsx
<div style={{
  flex: 1,
  minHeight: 0,  // 핵심
  display: 'flex',
  flexDirection: 'column',
}}>
  <div>{/* 고정 헤더 */}</div>
  <div style={{
    flex: 1,
    overflowY: 'auto',
  }}>
    {/* 스크롤 영역 */}
  </div>
</div>
```

CSS 함정: flex 자식은 기본 `min-height: auto`라 콘텐츠 크기보다 작아질 수 없음. `minHeight: 0` 명시해야 overflow 제대로 동작.

### 4.3 클러스터링 적용 패턴

```jsx
import { MarkerClusterer } from '@googlemaps/markerclusterer'

useEffect(() => {
  if (!mapRef.current) return

  // 기존 마커 정리
  if (clustererRef.current) {
    clustererRef.current.clearMarkers()
  }

  // 새 마커 생성
  const markers = visibleStores.map(store => {
    const marker = new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: store.isQR ? colors.teal[500] : colors.primary[700],
        fillOpacity: 0.85,
        strokeColor: '#FFFFFF',
        strokeWeight: 1.5,
      },
      title: store.name,
    })
    marker.addListener('click', () => onSelectStore?.(store))
    return marker
  })

  // 클러스터러 생성
  clustererRef.current = new MarkerClusterer({
    map: mapRef.current,
    markers,
  })

  return () => clustererRef.current?.clearMarkers()
}, [visibleStores])
```

핵심
- 마커 lifecycle 관리 (useEffect cleanup)
- visibleStores 변경 시 클러스터 갱신
- 메모리 누수 방지 (clearMarkers)

### 4.4 카테고리 아이콘 매핑

```jsx
import { Utensils, Coffee, Store, ShoppingCart, Stethoscope,
         Scissors, Car, Bed, Camera, Wrench, GraduationCap, Package }
       from 'lucide-react'

const CATEGORY_ICONS = {
  '음식점': Utensils, '카페': Coffee, '편의점': Store,
  '마트': ShoppingCart, '의료': Stethoscope, '미용': Scissors,
  '교통': Car, '숙박': Bed, '관광': Camera,
  '생활': Wrench, '교육': GraduationCap, '기타': Package,
}

const CATEGORY_COLORS = {
  '음식점': '#F97316', '카페': '#A16207', '편의점': '#10B981',
  '마트': '#F59E0B', '의료': '#EF4444', '미용': '#EC4899',
  '교통': '#3B82F6', '숙박': '#8B5CF6', '관광': '#06B6D4',
  '생활': '#6B7280', '교육': '#1D4ED8', '기타': '#94A3B8',
}

function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || Package
}

function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || '#94A3B8'
}
```

색상 hex 인라인 사용은 디자인 시스템 위반이지만 **카테고리 식별 색상**은 예외로 인정. tokens.js에 별도 그룹으로 분리하는 것도 옵션.

---

## 5. 기술적 도전과 해결

### 5.1 도전 1: 13,000개 매장 표시 성능

문제
- Google Maps에 마커 13,021개 직접 추가 시 브라우저 멈춤
- 13,000개 DOM 노드는 React로도 처리 어려움

해결
- `@googlemaps/markerclusterer` 도입
- 줌 레벨별 자동 클러스터링
- 첫 진입 시 표시 X → 카테고리/검색 시에만 표시

결과
- 강릉시 전체 줌 아웃: "1000+" 클러스터 동그라미
- 줌인하면 개별 핀 자동 분할
- 브라우저 멈춤 없음

### 5.2 도전 2: konacard API 페이지네이션 안정성

문제
- 455페이지 자동 순회 중 일부 페이지 응답 실패 가능
- 너무 빠르면 서버 차단 위험

해결
- 100ms 대기 (서버 부담 완화)
- try-catch로 실패 페이지 skip
- 10페이지마다 진행 로그 (사용자 안심)

결과
- 1.5분 만에 13,643개 안정 수집
- 차단 없음

### 5.3 도전 3: QR 매장 매칭 정확도

문제
- NotebookLM에서 추출한 QR 매장 이름은 사용자 입력 그대로
- konacard 정식 등록명과 약간 다를 수 있음 (띄어쓰기, 약어, 지점명 등)
- 정확 매칭만 하면 누락 많음

해결
- 1단계: 정확 매칭 (`name in qr_names`)
- 2단계: 정규화 후 매칭 (`re.sub(r'\s+', '', name).lower()`)
- 3단계: 부분 일치 (`if len(qr_normalized) >= 4 and qr_normalized in name_normalized`)

결과
- 193개 → 216개 매칭 (정확 193 + 부분 23)
- 매칭 정확도 향상

### 5.4 도전 4: 시트 빈 공간 (CSS 함정)

문제
- 매장 페이지 진입 시 시트 아래 회색 빈 공간 노출
- 시트가 바텀 네비까지 안 채워짐

진단 과정
- AI가 StorePage.jsx + StoreMapScreen.jsx view
- flex 컨테이너의 자식 컴포넌트가 `min-height: auto` 기본값
- 시트 컨테이너 height가 콘텐츠 크기로 제한됨

해결
```jsx
<div style={{
  flex: 1,
  minHeight: 0,  // 이 한 줄
  display: 'flex',
  flexDirection: 'column',
}}>
```

결과
- 시트가 검색바 아래부터 바텀 네비 위까지 가득 채움
- 빈 공간 0

---

## 6. UX 검증 시나리오

작업 완료 후 다음 시나리오로 시각 검증

### 6.1 첫 진입

기대 동작
- [x] 강릉역 중심 지도 표시
- [x] 시트가 화면 절반 차지
- [x] 시트에 "자주 가는 곳" 탭 + "QR결제 매장 216" 탭
- [x] "자주 가는 곳" 탭 선택 상태에서 강릉역 기준 가까운 매장 30개 이상 노출
- [x] 빈 공간 없음

### 6.2 스크롤

기대 동작
- [x] 시트 내부에서 매장 리스트 스크롤
- [x] 지도/탭/검색바는 고정
- [x] 100개까지 스크롤 가능

### 6.3 QR 매장 탭

기대 동작
- [x] 216개 QR 매장만 표시
- [x] 각 매장에 teal QR 배지
- [x] 거리 기준 정렬

### 6.4 카테고리 필터

기대 동작
- [x] 12개 카테고리 칩 가로 스크롤
- [x] 선택 시 해당 카테고리 매장만 표시
- [x] 지도 마커도 필터 반영

### 6.5 검색

기대 동작
- [x] 검색 input 활성화
- [x] 입력 시 자동완성 (디바운스 300ms)
- [x] 상위 50개 표시
- [x] 매장명 + 주소 둘 다 검색 대상

---

## 7. 발표 메시지 요약

이 작업 한 가지로 어필 가능한 포인트

### 7.1 데이터 신뢰성

"강릉시 공식 가맹점 13,021개를 통째로 가져왔어요. 임의 발췌가 아닌 전체 통합."

근거
- konacard API (강릉시청 공식)
- 좌표/주소/전화번호 실데이터
- 1.5분 자동 수집

### 7.2 AI 협업 깊이

"사용자가 한 페이지씩 수동 복사하던 작업 (5시간 추정)을 AI와 함께 1.5분으로 단축. 데이터 수집뿐 아니라 카테고리 매핑까지 AI에게 위임."

근거
- 단순 코드 생성기 X
- API 발견 → 스크립트 작성 → 매핑 규칙 → 변환 → 검증까지 AI 협업

### 7.3 UX 의도의 명확성

"빈 안내문 대신 강릉역 기준 가까운 매장 큐레이션. '무엇을 할지 모르는 빈 화면'은 UX 죄악."

근거
- Nielsen #6 (recognition rather than recall)
- 사용자가 카테고리를 떠올릴 필요 X
- 기본값이 있는 인터페이스

### 7.4 디자인 시스템 일관성

"13,021개 매장을 다 등록하면서도 디자인 시스템 위반 0건. 토큰 강제 + 자체 검증."

근거
- 카테고리 색상 hex는 예외 인정 (식별성 우선)
- 그 외 모든 색상/간격/모서리는 tokens.js
- AI 자체 검증 보고 (위반 0건 확인)

### 7.5 기술적 깊이

"Google Maps Cluster 통합 + 거리 계산 (Haversine 공식) + 자동완성 디바운스 + flex 컨테이너 빈 공간 해결."

근거
- 클러스터링: 13,000개 마커 성능 보장
- Haversine: 정확한 위경도 거리 계산
- 디바운스: 검색 성능 + UX
- flex minHeight 0: CSS 함정 인식

---

**문서 작성일**: 2026-05-17
**문서 작성자**: 주현호 (with Claude)
**관련 문서**:
- `client/docs/PROJECT_DOCUMENTATION.md` - 전체 프로젝트 종합 문서
- `client/docs/LARGETEXT.md` - 큰글씨 모드 사양
- `client/docs/ANDROID.md` - Material Design 3 사양
- `client/src/data/stores.json` - 13,021개 매장
- `client/src/data/qr-stores.json` - 216개 QR 매장


# 강릉페이 리뉴얼 프로젝트 종합 문서

> 2026년 1학기 UX 디자인 텀프로젝트 - 강릉페이 앱 UX/UI 리뉴얼
> Team: 마카모예
> 개발자: 주현호 (한림대 디지털인문예술전공)

---

## 0. 프로젝트 개요

### 0.1 기획 의도

강릉시 지역화폐 앱 강릉페이의 UX 문제를 진단하고 리뉴얼. 시니어 사용자 비중이 높은 지역화폐 앱 특성을 고려하여 "묻지 않아도 보이는, 헤매지 않는 금융 경험"을 핵심 가치로 설정.

핵심 문제 가설
- AS-IS 강릉페이는 기능 나열형 IA (모든 기능을 메뉴에 평면적으로 노출)
- 시니어 사용자가 헤매기 쉬운 깊은 메뉴 구조 (충전 6단계, 환불은 깊이 숨김)
- 캐시백/환불/잔액 정보가 분산되어 가치 체감 약함
- 매장 정보의 진실성 부족 (목업 데이터)

핵심 해결 방향
- 시니어 멘탈 모델에 맞춘 직관적 정보 위계
- 액션 동등 위계 (충전과 환불을 동격으로)
- 가치 체감 직관 메시지 (숫자 → 일상 비교)
- 실제 가맹점 데이터 통합 (13,021개 강릉시 공식 데이터)

### 0.2 진행 방식

전 과정에서 Claude (Anthropic) AI를 적극 활용. 단순 코드 생성기가 아닌, UX 의사결정 파트너 + 하네스 엔지니어로 활용. AI와 인간의 협업 방식을 실험적으로 적용.

협업 모델
- **인간 (개발자)**: 사용자 페르소나 정의, 디자인 의도 결정, 비즈니스 로직 판단, AI 산출물 최종 검수
- **AI (Claude Sonnet/Opus)**: 기술 구현, 디자인 시스템 일관성 검증, 대안 비교, 의사결정 근거 제공, 코드 작성, 일관성 회귀 점검

핵심 운영 인프라
- `CLAUDE.md` - 할루시네이션 방지 + 컨텍스트 안내 (GitHub 검증된 패턴 활용)
- `AGENTS.md` - 하네스 엔지니어링 워크플로우 (병렬 에이전트 A1/A2/A3 + AGENT-REVIEW)
- `DESIGN.md` - 디자인 시스템 단일 진실 공급원
- `IA.md` - Information Architecture (정보 위계)
- `Components.md` - 컴포넌트 카탈로그 + 책임 정의
- `Patterns.md` - 코딩 패턴 + 안티패턴
- `Routes.md` - 30개 라우트 매핑
- `PROGRESS.md` - 작업 단위별 진행 + QA 결과 자동 기록
- `LARGETEXT.md` - 큰글씨 모드 사양
- `ANDROID.md` - Material Design 3 사양

각 문서는 새 AI 세션 시작 시 컨텍스트 주입용. AI가 "추측"이 아닌 "사양 참조"로 작업하도록 강제하여 일관성 + 할루시네이션 방지.

### 0.3 산출물

- iOS 버전 (Apple HIG 기반): `client/` 폴더, https://gangneung-pay.vercel.app
- Android 버전 (Material Design 3 기반): `client-android/` 폴더 (별도 배포 예정)
- 포트폴리오 사이트 (제작 예정, Plus-Ex 톤)
- 발표 자료 (제작 예정)
- 30개 페이지 + 70+ 컴포넌트
- 13,021개 실제 가맹점 데이터
- 8개 사양 문서 (위 0.2절 참조)

---

## 1. 기술 스택

### 1.1 프론트엔드

| 항목 | 선택 | 선택 근거 |
|------|------|----------|
| 프레임워크 | React 18 | 컴포넌트 재사용, 빠른 프로토타이핑 |
| 빌드 도구 | Vite | dev 서버 빠름, HMR 안정적 |
| 언어 | JSX (TypeScript 미사용) | 발표 일정 단축, 학습 곡선 최소화 |
| 스타일링 | Tailwind v4 + 자체 토큰 시스템 (inline style) | 토큰 강제 + 동적 분기 용이 |
| 라우팅 | React Router v6 | 표준 |
| 상태 관리 | Context API (UserContext, AppContext, OnboardingContext) | 외부 라이브러리 회피, 발표 단일 사용자 가정 |

### 1.2 핵심 라이브러리

| 라이브러리 | 용도 | 선택 근거 |
|----------|------|----------|
| @react-google-maps/api | Google Maps 지도 | React 친화적 wrapper |
| @googlemaps/markerclusterer | 매장 13,000개 클러스터링 | 공식 라이브러리, 성능 최적화 |
| @lottiefiles/dotlottie-react | Face ID 애니메이션 | dotLottie 표준 지원 |
| lucide-react | 아이콘 (iOS) | 가벼움, 라인 스타일 (HIG 톤) |
| html5-qrcode | QR 코드 스캔 | 브라우저 카메라 API 추상화 |
| @mui/icons-material | Material 아이콘 (Android) | Material Design 공식 |
| framer-motion | 페이지 전환 모션 (Android) | Material 모션 가이드라인 구현 용이 |

### 1.3 데이터 시스템

- 13,021개 강릉 가맹점 (좌표 포함) - `client/src/data/stores.json`
- 216개 QR결제 매장 별도 분류 - `client/src/data/qr-stores.json`
- 가상 거래 내역 12개월 (월별 한도 적용) - UserContext에서 생성
- 모든 데이터는 클라이언트 메모리에서 처리 (백엔드 없음)

### 1.4 배포

- Vercel: GitHub 자동 배포
- 환경변수: `VITE_GOOGLE_MAPS_API_KEY` (Google Cloud Platform 빌링 활성화)

---

## 2. 디자인 시스템

### 2.1 iOS 버전 (Apple HIG 기반)

핵심 원칙
- 모바일 고정형 (max-width 390px, 중앙 정렬)
- SF Pro / Apple SD Gothic Neo 폰트 시스템
- 둥근 모서리 (radiusCard 16px, radiusButton 12px)
- 미묘한 그림자 (subtle shadow)
- 좌측 화살표 + 이전 페이지 라벨 (뒤로가기)

토큰 구조 (`client/src/tokens/tokens.js`)
```js
export const colors = {
  primary: { 700: '#1D4ED8', 600: '#2563EB', ... },
  surface: { background: '#F2F4F8', card: '#FFFFFF', ... },
  teal: { 500: '#14B8A6', 400: '#2DD4BF' },  // 캐시백 강조
  gray: { 900: '#111827', 700: '#374151', ... },
  warning: '#F59E0B', error: '#EF4444', success: '#10B981',
}

export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', sans-serif",
  size: {
    largeTitle: '34px', balanceLarge: '36px', balance: '28px',
    appTitle: '22px', xl: '20px', lg: '18px', md: '17px',
    sm: '15px', xs: '13px', xxs: '12px', nav: '11px',
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
}

export const layout = {
  margin: '16px',
  viewport: '390px',
  radiusCard: '16px', radiusButton: '12px', radiusModal: '20px',
  radiusPill: '999px', radiusChip: '20px', radiusSmall: '8px',
  bottomNavHeight: '60px',
}
```

### 2.2 큰글씨 모드

`docs/LARGETEXT.md`에 상세 사양 정리. 핵심 요약

- typography.sizeLarge 토큰 (기본의 1.3~1.4배)
- useTypography hook으로 컴포넌트 한 줄 분기
- HomePage는 별도 컴포넌트 (HomePageLarge.jsx)로 완전 재설계
- 다른 페이지는 폰트만 1.3배 확장

설계 원칙
- 정보 밀도 다운 (캐러셀 같은 자동 변경 UI 제거)
- 액션 명확도 업 (충전, 환불 등 큰 박스 분리)
- 아이콘 → 텍스트 라벨 변환
- 시니어 멘탈 모델 대응

### 2.3 Android 버전 (Material Design 3)

`docs/ANDROID.md`에 상세 사양 정리. 핵심 차이

| 항목 | iOS | Android |
|------|-----|---------|
| 폰트 | SF Pro / Apple SD Gothic | Roboto / Noto Sans KR |
| 모서리 | 16px (radiusCard) | 12px (Material 카드) |
| 그림자 | 미묘함 | elevation 명확 |
| 인터랙션 | spring | ripple |
| 버튼 | scale 95% | ripple 확산 |
| 모달 | iOS Modal (하단 정렬) | Material Alert Dialog (중앙) |
| 시트 | iOS Bottom Sheet | Material Bottom Sheet (큰 라운드 28px) |
| 토스트 | iOS Modal Toast | Material Snackbar |

---

## 3. UX 7대 전략 (S1~S7)

### S1. 위젯 잔액 노출

**문제 (AS-IS)**: 잔액 확인을 위해 앱을 열어야 함. 시니어 사용자에게 부담.

**해결**: PWA 위젯 추가 안내 + 잔액 카드 최상단 노출.

**의도**: 닫혀있는 정보를 열어서 보여줌. 사용자가 "지금 얼마 있지?"를 묻지 않게 함.

**구현**:
- HomePage 최상단 잔액 카드 우선 배치
- 위젯 추가하기 안내 카드 (실제 PWA 위젯은 추후)

---

### S2. 환불 동등 위계

**문제 (AS-IS)**: 충전은 메인에 큰 버튼, 환불은 깊이 들어가야 함. 환불은 "복잡한 행정 절차"로 인식.

**해결**: 충전과 환불을 잔액 카드 안 3슬롯에 동등하게 배치.

**의도**: 환불은 사용자의 권리. 위계 차별 X.

**구현**:
- 잔액 카드 글래스 3슬롯: 충전 / 환불 / QR결제
- 모두 동일한 크기, 동일한 시각 강조

---

### S3. 캐시백 체감

**문제 (AS-IS)**: 캐시백이 숫자로만 표시. "1,345원 적립"이라는 텍스트는 가치 체감이 약함.

**해결**: 직관 메시지로 변환. "커피 한 잔 값 아꼈어요" 같은 일상적 비교.

**의도**: 추상적 숫자 → 구체적 가치. 시니어에게 효과 큼.

**구현**:
- getCashbackIntuition() 함수 (`components/home/BalanceCardExpanded.jsx`)
- 5단계 메시지 (Bus / Coffee / Utensils / ShoppingBag / Smartphone)
- 적립 금액에 따라 자동 매칭
- 모든 메시지 lucide 아이콘 동반

---

### S4. 충전 3단계 압축

**문제 (AS-IS)**: 충전이 6단계 (인증 → 카드 선택 → 금액 입력 → 확인 → 비밀번호 → 완료). 시니어 이탈률 높음.

**해결**: 3단계로 압축 (금액 입력 → 확인 → 완료).

**의도**: 닐슨 휴리스틱 #5 (오류 예방) + Shneiderman #4 (closure).

**구현**:
- `components/payment/ChargeScreen.jsx` 3단계 step state
- StepIndicator 상단 고정 (현재 진행 단계 시각화)
- 금액 입력에 빠른 금액 칩 (+1만 / +5만 / +10만)
- 한도 항상 노출 (Nielsen #1 visibility)

---

### S5. 잔액 부족 사전 차단

**문제 (AS-IS)**: 결제 시도 → "잔액 부족" 에러. 매장에서 부끄러움.

**해결**: 입력 단계에서 한도 초과 즉시 안내.

**의도**: 닐슨 #5 오류 예방. 발생 후 처리가 아닌 발생 전 차단.

**구현**:
- 충전 한도 (1회 최대 50만원) 입력 시점 검증
- isOverLimit 분기로 다음 버튼 disabled
- "1회 충전 한도 500,000원을 초과했습니다" 빨간 안내

---

### S6. 가맹점 실시간 신뢰

**문제 (AS-IS)**: 매장 목록만 보여줌. 실제로 결제되는지 의심.

**해결**: 13,021개 실제 가맹점 데이터 + 지도 + 클러스터링.

**의도**: 신뢰는 데이터의 진실성에서 나옴.

**구현**:
- konacard API (강릉시청 공식) 크롤링으로 13,643개 매장 수집
- 좌표/주소/전화번호 실데이터
- 카테고리별 필터 (12개) + 검색 자동완성
- Google Maps Cluster (강릉시 전체 → 줌인 시 개별 핀)

---

### S7. 코치마크 단계별 안내

**문제 (AS-IS)**: 카드 신청 후 다음 단계가 불명확. 시니어가 막힘.

**해결**: 카드 등록 직후 충전 → 환불 코치마크 자동 진행.

**의도**: 사용자가 "다음 뭐 하지?"라고 묻지 않게 함.

**구현**:
- CoachMarkOverlay 컴포넌트 (ScreenContainer 기준 상대 좌표)
- AppContext의 hasSkippedCoachMark state
- 카드 등록 직후 자동 트리거 (Step 1 충전 → Step 2 환불)
- 스크롤 잠금 (코치마크 노출 중)

---

## 4. AI 활용 방법론

### 4.1 협업 인프라 (문서 기반 컨텍스트 주입)

AI 협업의 가장 큰 문제는 **할루시네이션**과 **컨텍스트 단절**. 새 채팅 세션이 시작될 때마다 AI는 이전 결정을 모름. 이를 해결하기 위해 8개의 사양 문서를 운영.

#### 4.1.1 CLAUDE.md - 할루시네이션 방지 (GitHub 검증 패턴)

GitHub에서 스타를 많이 받은 CLAUDE.md 컨벤션을 강릉페이용으로 채용. AI에게 "프로젝트 컨텍스트와 절대 규칙"을 첫 줄부터 주입.

핵심 섹션
- **절대 금지사항**: localStorage 사용 금지, TypeScript 금지, 하드코딩 색상 금지, 이모지 금지
- **토큰 시스템 강제**: 모든 색상/간격/폰트는 `tokens.js` 참조
- **컴포넌트 경계**: 어떤 컴포넌트가 어떤 책임을 가지는지 명시
- **빌드 검증 규칙**: `npm run build` 0 오류 필수
- **PROGRESS.md 자동 업데이트**: 작업 완료 시 자동 기록

기획 의도: AI가 "이 정도는 괜찮겠지" 추측하지 못하게 함. 모든 결정에 근거가 있어야 함.

#### 4.1.2 AGENTS.md - 하네스 엔지니어링 워크플로우

한 명의 AI 인스턴스가 큰 작업을 처음부터 끝까지 하면 디테일을 놓침. 대신 작업을 **병렬 가능한 단위**로 쪼개고, 각 단위를 별도 AI 인스턴스에 할당.

병렬 에이전트 패턴 (Phase 3-B 사례)

```
Agent BN — 검색 시스템 담당
  ├── SearchPage 재작성
  └── PopularKeywords 신규

Agent MY — MY 페이지 + 카드 담당
  ├── MyPage 재작성
  ├── CardApplyPage 재작성
  ├── CardBackModal 신규
  └── HomePage 카드 클릭 연동

Agent FX — 버그 수정 + 지도 + 내역 담당
  ├── CoachMarkOverlay 버그 수정
  ├── StoreMapScreen Kakao → Google Maps 전환
  ├── FrequentPlaces 신규
  ├── TransactionHistory 수정
  └── HistoryPage 메인 탭화

Agent VR — 최종 검증 (Agent BN/MY/FX 작업 완료 후 실행)
  └── 44항목 체크리스트
```

각 에이전트는 자기 담당 파일만 수정. 다른 에이전트 작업 영역을 침범하지 않음.

기획 의도
- 한 AI가 30개 파일을 한 번에 다루면 컨텍스트 분산 → 디테일 놓침
- 4개 영역을 4명에게 나누면 각자 깊이 있게 작업 가능
- 마지막에 검증 전용 에이전트로 통합 회귀 점검

#### 4.1.3 DESIGN.md / IA.md / Components.md / Patterns.md / Routes.md

각 문서는 단일 진실 공급원 (Single Source of Truth).

- **DESIGN.md**: 디자인 토큰 + 색상 시스템 + 타이포그래피 규칙
- **IA.md**: 30개 페이지의 정보 위계 + 사용자 동선
- **Components.md**: 70+ 컴포넌트 카탈로그 (역할, 책임, props)
- **Patterns.md**: 코딩 패턴 (토큰 강제, 의도 주석, 분기 처리)
- **Routes.md**: 30개 라우트 + 진입 경로 + 부모/자식 관계

작업 시작 전 AI에게 "관련 문서 view 후 작업"이라고 명시. AI가 자체 추측이 아닌 사양 참조로 작업.

#### 4.1.4 PROGRESS.md - 자동 커밋 + 작업 기록

모든 작업 완료 시 PROGRESS.md에 다음 형식으로 기록.

```markdown
## 청크 D — 캐시백 페이지 재작성 + 가상 데이터 (2026-05-15) ✅ 완료

**빌드 결과: 0 오류 (1830 모듈, 347ms)**

| # | 파일 | 내용 |
|---|------|------|
| D1 | `context/UserContext.jsx` | 12개월 mock 데이터 생성 함수 추가 |
| D2 | `components/common/PeriodPickerModal.jsx` (신규) | 바텀시트 |
| D3 | `pages/CashbackPage.jsx` | 차감 표현 전면 제거 |

### 청크 D QA 결과

| 항목 | 결과 |
|------|------|
| 12개월치 mock 데이터 | ✅ |
| 차감 표현 0건 | ✅ |
| localStorage 0건 | ✅ |
| 빌드 0 오류 | ✅ (1830 모듈) |
```

기획 의도
- 발표 시 "어떻게 만들었는지" 즉시 추적 가능
- 다음 AI 세션이 PROGRESS.md만 읽어도 전체 진척 파악
- 회귀 발생 시 어느 청크에서 문제 발생했는지 즉시 식별

### 4.2 작업 단위 (Sprint / Phase / 청크 / Agent)

작업 규모에 따라 단위 구분.

| 단위 | 규모 | 사례 |
|------|------|------|
| Phase | 큰 방향 전환 | Phase 1 (초기 구축) / Phase 2 (UX 진단 + 개선) / Phase 3 (IA 재편) |
| Sprint | 1~3일 작업 | Sprint A (P0 이슈) / Sprint D (S7 코치마크) / Sprint R1~R10 (긴급 복구) |
| 청크 | 반나절~1일 | 청크 A (디자인 복원) / 청크 B (흐름 로직) / 청크 C (인터랙션) / 청크 D (데이터) |
| Agent | 병렬 에이전트 | Agent BN / Agent MY / Agent FX / Agent VR |
| Task | 단일 컴포넌트 | T2 (OnboardingContext) / T5 (CardActions 신규) |

각 단위는 작업 시작 → 완료 → QA → PROGRESS.md 기록의 사이클.

### 4.3 모델 선택 기준

| 작업 종류 | 모델 | 근거 |
|----------|------|------|
| 단순 매핑/교체 (토큰 일괄 변경) | Sonnet | 빠르고 충분 |
| 디자인 시스템 검증 (199건 spacing 분류) | Opus | 의미 추론 필요 |
| 새 컴포넌트 작성 + 통합 | Opus | 컨텍스트 일관성 |
| 데이터 변환 스크립트 | Sonnet | 명확한 규칙 |
| 아키텍처 설계 (큰글씨 모드, Android) | Opus | 복합 의사결정 |
| 디버깅 (Face ID 무한 루프 등) | Opus | 가설 추론 + 검증 |

### 4.4 프롬프트 관리 패턴

#### 4.4.1 진단 → 사양 → 수정 → 검증

```
1. 진단: "현재 상태 view 후 보고. 수정 X"
   → AI가 현재 코드 읽고 문제 파악
   → 사용자가 진단 결과 검토

2. 사양: 정확한 변경 사양 (파일/라인/before/after)
   → 사용자가 "이렇게 바꿔" 명확히 지시
   → AI는 추측 금지

3. 수정: 명시된 범위만, 추측 X
   → AI가 사양대로 수정
   → 다른 파일 건드리지 않음

4. 검증: 빌드 0 오류 + 시각 회귀 체크리스트
   → AI가 자체 빌드 확인
   → 사용자가 시각 검증
```

#### 4.4.2 문서 참조 강제 패턴

```
강릉페이 큰글씨 모드 - HomePageLarge 작성.

시작 전 필독: client/docs/LARGETEXT.md

본 작업은 LARGETEXT.md의 "4. HomePage 큰글씨 모드" 섹션 전체 수행.
LARGETEXT.md 4.4절 잔액 카드 구조 정확히 준수.
LARGETEXT.md 4.5절 카드 컴포넌트 사양 정확히 준수.

명시 외 파일 수정 금지.
```

기획 의도: AI가 "내가 알아서 잘 할게" 모드 차단. 사양 문서 = 계약서.

#### 4.4.3 회귀 방지 패턴

```
청크 D 작업 시작 전:
1. 청크 A, B, C 완료 결과 검증
2. 다음 항목 회귀 없는지 확인
   - localStorage 0건
   - 하드코딩 색상 0건
   - 빌드 0 오류

청크 D 작업 후:
- 위 3개 항목 재검증
- 발견 시 즉시 보고
```

### 4.5 코드 자기 검증 의무

AI가 작업 완료 시 자체 보고해야 할 항목

```
✅ 빌드 결과: 0 오류 (1830 모듈, 347ms)
✅ localStorage 사용: 0건
✅ 하드코딩 색상: 0건 (SVG 장식 제외)
✅ TypeScript 코드: 0건
✅ 이모지 사용: 0건
✅ 명시 외 파일 수정: 없음

수정 파일 목록:
- client/src/context/UserContext.jsx (12 lines added)
- client/src/pages/CashbackPage.jsx (rewrite)
```

위 보고 없이 작업 완료 인정 X. 사용자가 직접 확인할 시간 절약.

### 4.6 Claude Code (Antigravity IDE) 활용

- 기본 Sonnet, 복잡 작업 시 Opus 전환
- 한 인스턴스에 한 가지 작업 (병렬 인스턴스는 파일 충돌 위험)
- 권한 확인 프롬프트 자동 통과 설정 (작업 흐름 끊김 방지)
- 변경사항 항상 git 단위로 추적 (자동 커밋 + PROGRESS.md)
- 진행 중 모델 전환 가능 (단순 작업 → Sonnet, 복잡 작업 → Opus)

---

## 5. 데이터 수집 방법

### 5.1 강릉페이 가맹점 데이터 (13,021개)

**출처**: search.konacard.co.kr (강릉시청 공식 가맹점 검색)

**방법**: 브라우저 콘솔 자동 수집 스크립트

**과정**
1. 페이지 F12 → Network 탭에서 API endpoint 발견
   - URL: `https://search.konacard.co.kr/api/v1/payable-merchants`
   - Method: POST
   - Payload: `{id:"38", merchantType:"HN", pageNum:"N", pageSize:"30", affiliateName:"강릉시청"}`
2. 응답 구조 분석 (`data.merchants` 배열에 30개씩)
3. 콘솔 fetch 스크립트로 1~455페이지 자동 순회
4. 13,643개 매장 정보 JSON 다운로드
5. 좌표 없는 매장 제외 → 13,021개 확정

**활용한 AI 기여**
- API endpoint 분석 (curl 형식 보고 자동 인식)
- 자동 수집 스크립트 작성 (페이지네이션 + 대기 시간 + 다운로드)
- 카테고리 매핑 (200+ konacard 분류 → 12개 우리 카테고리)
- QR 매장 매칭 (이름 부분 일치 알고리즘)

### 5.2 QR결제 매장 데이터 (216개)

**출처**: 강릉시청 QR결제 안내 페이지 스크린샷

**방법**: NotebookLM에 스크린샷 업로드 + 텍스트 추출 프롬프트

**과정**
1. 강릉시청 페이지에서 QR결제 가능 매장 스크린샷 다수 캡처
2. NotebookLM에 업로드
3. 추출 프롬프트: "이미지에서 상호명/업종/주소/동/면 추출 후 CSV"
4. 193개 추출 → konacard 데이터와 부분 일치 매칭으로 216개 확정

### 5.3 좌표 시스템

- 모든 매장 위경도 (lat, lng) 포함
- konacard 데이터에 이미 포함되어 있어 Geocoding API 호출 불필요
- 강릉시청 좌표: (37.7519, 128.8761)
- 강릉역 좌표: (37.7647, 128.8990) - 지도 기본 center

---

## 6. 주요 기술 도전 + 해결

### 6.1 Face ID Lottie 무한 루프 버그

**문제**: dotLottie 파일 재생 시 처음 1초만 반복.

**진단 (AI 협업)**
- `.lottie` 파일 unzip → 내부 구조 분석
- `s/face_unlock_1.json` (State Machine) 발견
- State Machine이 19개 PlaybackState로 구성
- 각 단계마다 사용자 click 입력 대기 (loop=true + guard)
- 우리 코드는 click 안 보내서 첫 단계 무한 루프

**해결**
1. State Machine 통째 제거한 새 `.lottie` 파일 생성 (Python 스크립트)
2. manifest.json의 `stateMachines: []` 비움
3. 일반 애니메이션처럼 자동 재생 가능
4. 17초 길이 → 9배속 재생으로 1.9초 단축

**활용 코드**: `client/src/assets/lottie/face-id.lottie` (수정본)

### 6.2 13,000개 매장 지도 표시

**문제**: Google Maps에 13,021개 마커 직접 표시 시 브라우저 멈춤.

**해결**: @googlemaps/markerclusterer 라이브러리 통합
- 강릉시 전체 줌 아웃: "1000+", "500+" 클러스터 동그라미
- 줌인하면 개별 매장 핀 자동 분할
- 첫 진입 시 매장 핀 안 표시 (검색/카테고리 선택 시에만)
- 핀 디자인 얇게 (radius 6px, stroke 1.5px)

**참고**: Material Design / Apple Maps 동일 패턴

### 6.3 Google Maps "for development purposes only" 워터마크

**문제**: API key 정상, .env 정상, Vercel 환경변수 등록. 그래도 워터마크.

**진단**: 콘솔 에러 `RefererNotAllowedMapError: Your site URL to be authorized: http://localhost:5174`

**해결**: Google Cloud Console → API 키 → HTTP 리퍼러 제한에 다음 추가
- `http://localhost:5174/*`
- `http://localhost:*/*`
- `https://gangneung-pay.vercel.app/*`
- `https://*.vercel.app/*`

**교훈**: 코드 측 점검 후에도 안 풀리면 Google Cloud Console 설정 의심

### 6.4 디자인 시스템 일관성 검증

**문제**: 200+ 컴포넌트에 하드코딩된 spacing/borderRadius/fontSize 산재.

**해결**: 3단계 검증 자동화
1. 진단: grep으로 토큰 미사용 위치 카운트 (199건 spacing, 17건 borderRadius, 7건 fontSize 발견)
2. 매핑: 비표준값 → 가까운 토큰 매핑 규칙 정의
3. 일괄 교체: AI에게 매핑 규칙 + 파일 목록 제공, 자동 수정

**결과**:
- 우선순위 파일 100% 토큰화 (HomePage, BalanceCardExpanded, CardApplyPage 등)
- 장식 예외 항목 (브랜드 마크 6px gap, 미세 조정 2px 등) 주석으로 명시

### 6.5 코치마크 정렬 문제

**문제**: 코치마크가 ScreenContainer 밖으로 벗어남. 작은 viewport에서 버튼 안 보임.

**해결 과정**:
1. ScreenContainer에 id="screen-container" 부여
2. CoachMarkOverlay에서 getBoundingClientRect()로 컨테이너 좌표 추적
3. 말풍선을 컨테이너 안 absolute 좌표로 배치
4. body 스크롤 잠금 (코치마크 노출 중)
5. 작은 viewport 대응: 타겟 위쪽에 표시 (아래 공간 부족 시 자동 중앙)

---

## 7. 코딩 패턴 + 원본 코드

### 7.1 토큰 강제 패턴

모든 스타일은 토큰 참조. 하드코딩 금지.

```jsx
// 잘못된 패턴 (금지)
<button style={{ padding: '16px', borderRadius: '12px', fontSize: '15px' }}>

// 올바른 패턴
import { colors, spacing, layout, typography } from '../../tokens/tokens'
<button style={{ 
  padding: spacing[4], 
  borderRadius: layout.radiusButton, 
  fontSize: typography.size.sm,
}}>
```

### 7.2 컴포넌트 의도 주석 패턴

```jsx
/**
 * ChargeScreen (Phase 2 redesigned)
 * Strategy: S4, S5
 * Nielsen: #1 visibility, #4 closure, #5 error prevention, #8 memory load
 * Shneiderman: #3 informative feedback, #4 design for closure, #8 reduce memory load
 * Phase 1 ref: components/payment/ChargeScreen.jsx
 * Preserved: header style, quick amount chips, numpad
 * Changed: 3-step flow (C-01·C-06), balance display (C-02)
 */
export default function ChargeScreen({ onClose, onCharge, balance }) {
  // ...
}
```

### 7.3 useTypography hook 패턴 (큰글씨 모드)

```jsx
// hooks/useTypography.js
import { useApp } from '../context/AppContext'
import { typography } from '../tokens/tokens'

export function useTypography() {
  const { isLargeText } = useApp()
  return isLargeText ? typography.sizeLarge : typography.size
}

// 컴포넌트
function MyComponent() {
  const sizes = useTypography()
  return <span style={{ fontSize: sizes.md }}>텍스트</span>
}
```

### 7.4 가상 거래 내역 생성 패턴

```jsx
// context/UserContext.jsx
function generateMockTransactions() {
  const transactions = []
  const now = new Date('2026-05-15')
  
  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const date = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)
    const yyyy = date.getFullYear()
    const mm = date.getMonth()
    
    // 현재 월(5월)은 1~15일만, 거래 8~15개
    const isCurrentMonth = (yyyy === 2026 && mm === 4)
    const maxDay = isCurrentMonth ? 15 : 28
    const count = isCurrentMonth 
      ? 8 + Math.floor(Math.random() * 8)
      : 15 + Math.floor(Math.random() * 16)
    
    let monthlyAccumulated = 0  // 캐시백 월별 한도 추적
    const MAX_MONTHLY = 30000
    
    for (let i = 0; i < count; i++) {
      // 거래 생성 (충전/환불/결제 비율 15/5/80%)
      // 결제는 단골 30% + 일반 70%
      // 캐시백은 한도 체크 (월 30,000원 도달 시 0원)
      // ...
    }
  }
  
  transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  return transactions
}
```

### 7.5 데이터 수집 스크립트 (브라우저 콘솔)

```javascript
(async function collectAllMerchants() {
  const PAGE_SIZE = 30
  const TOTAL = 13643
  const TOTAL_PAGES = Math.ceil(TOTAL / PAGE_SIZE)
  const allMerchants = []
  
  console.log(`총 ${TOTAL_PAGES}페이지 수집 시작...`)
  
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    try {
      const res = await fetch('https://search.konacard.co.kr/api/v1/payable-merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          id: "38",
          bizType: "",
          merchantType: "HN",
          pageNum: String(page),
          pageSize: "30",
          affiliateName: "강릉시청",
          searchKey: "",
        }),
      })
      
      const json = await res.json()
      const merchants = json.data?.merchants || []
      merchants.forEach(m => {
        allMerchants.push({
          seq: m.seq, name: m.simpleNm, category: m.bizTypeNm,
          addr: m.addr, tel: m.telNo, zipCd: m.zipCd,
          lat: m.latitude, lng: m.longitude,
        })
      })
      
      if (page % 10 === 0 || page === TOTAL_PAGES) {
        console.log(`진행: ${page}/${TOTAL_PAGES} (${allMerchants.length}개)`)
      }
      await new Promise(r => setTimeout(r, 100))
    } catch (e) {
      console.error(`페이지 ${page} 실패:`, e)
    }
  }
  
  // JSON 다운로드
  const blob = new Blob([JSON.stringify(allMerchants, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gangneung-merchants.json'
  a.click()
  URL.revokeObjectURL(url)
})()
```

### 7.6 카테고리 매핑 로직

```python
# Python (데이터 전처리)
CATEGORY_MAP = {
    '일반음식점': '음식점', '일식전문점': '음식점', '중식전문점': '음식점',
    '서양식전문점': '음식점', '치킨전문점': '음식점', '일반주점': '음식점',
    '커피전문점': '카페', '제과.제빵': '카페',
    '편의점': '편의점',
    '슈퍼마켓.마트': '마트', '농산물,청과물': '마트', '수산물,건어물': '마트',
    # ... 200+ 매핑
}

def map_category(biz_type_nm):
    if biz_type_nm in CATEGORY_MAP:
        return CATEGORY_MAP[biz_type_nm]
    # 키워드 부분 매칭으로 fallback
    keywords = {
        '음식점': ['음식', '주점', '치킨', '한식', ...],
        '카페': ['카페', '커피', '제과', '빵', ...],
        # ...
    }
    for cat, words in keywords.items():
        if any(w in biz_type_nm for w in words):
            return cat
    return '기타'
```

---

## 8. 프롬프트 예시 (AI 활용)

### 8.1 진단 프롬프트 (디자인 시스템)

```
강릉페이 디자인시스템 점검 1단계 - 진단.

목표: 코드 전체에서 디자인시스템 위반 사항을 찾아 보고. 수정은 다음 단계.

시작 전 필독: client/src/tokens/tokens.js

검증 작업
1) typography.fontFamily 외 하드코딩된 fontFamily 발견 시 모두 목록화
2) fontSize 하드코딩 grep
3) borderRadius 하드코딩 grep
4) spacing 하드코딩 grep

각 진단 항목별 다음 형식으로 보고:
- 총 N건
- 가장 많이 사용된 비표준 값 Top 3
- 파일별 발생 횟수 Top 5

수정 작업은 진행하지 말 것. 진단만.
```

### 8.2 워크플로우 프롬프트 (FIX 패턴)

```
강릉페이 충전 이중 적용 버그 최종 수정.

진단 완료. ChargeScreen.jsx Step 2 확인 버튼에 처리 가드가 없어 onCharge가 중복 호출됨.

워크플로우 진단 → 수정 → 검증
수정 대상 파일: client/src/components/payment/ChargeScreen.jsx (단일)

수정 1. charged 가드 state 추가
수정 2. Step 2 확인 버튼 onClick 교체
수정 3. Step 3 표시 잔액 props 그대로 사용
수정 4. 수정 버튼 onClick에 setCharged(false) 추가

검증 시나리오
□ 잔액 0원 시작
□ 5만원 입력 → 확인 → "현재 잔액 50,000원" (100,000원 아님)
□ 더블 클릭 시도 → 1회만 처리

명시 외 파일 수정 금지.
모든 응답 한국어.
```

### 8.3 사양 문서 참조 프롬프트

```
강릉페이 큰글씨 모드 - HomePageLarge 작성 (2단계).

시작 전 필독: client/docs/LARGETEXT.md

본 2단계는 LARGETEXT.md의 "4. HomePage 큰글씨 모드" 섹션 전체 수행.

LARGETEXT.md 4.4절 잔액 카드 구조 정확히 준수
LARGETEXT.md 4.5절 카드 컴포넌트 사양 정확히 준수
LARGETEXT.md 4.6절 환불 카드 일러스트 사양 그대로 SVG 작성

체크리스트 (LARGETEXT.md 7.2)
- [ ] HomePage.jsx에 isLargeText 분기 추가
- [ ] HomePageLarge.jsx 신규 작성
- [ ] ...

명시 외 파일 수정 금지.
모든 응답 한국어.
```

---

## 9. 프로젝트 진행 히스토리 (Phase별)

전체 작업이 다단계 Phase로 진행됨. 각 Phase의 의도 + 산출물 정리.

### 9.1 Phase 1 — 초기 구축

기간: 2026-04월
의도: 강릉페이 AS-IS 화면을 React로 1:1 복제. UX 분석 + 개선 방향 도출.
산출: 30개 페이지 + 43개 컴포넌트 초기 버전, Kakao Maps 연동, 디자인 토큰 시스템 첫 구축

### 9.2 Phase 2 — UX 진단 + 개선 (29개 이슈 해결)

기간: 2026-05-13
의도: 닐슨 휴리스틱 + Shneiderman 황금률 기반 UX 진단. 29개 이슈 식별 후 Sprint로 분할 해결.

#### Sprint A — P0 이슈 (긴급)

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-02 | 환불 버튼 동등 노출 | 3버튼 [충전][환불][QR결제] |
| H-04 | 캐시백 BalanceCard 통합 | 분산된 캐시백 정보 통합 |
| H-08 | 잔액 34px Large Title | 시니어 가독성 |
| C-01 | 3단계 충전 플로우 | 6단계 → 3단계 압축 |
| C-02 | 잔액 상시 표시 | ChargeScreen 잔액 항상 노출 |
| C-06 | 충전 완료 단계 | 명확한 closure |
| Q-01 | QR 잔액 부족 경고 | 결제 전 사전 차단 |
| Q-02 | QR 잔액 폰트 상향 | 가독성 |

#### Sprint B — P1 이슈

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-01 | WidgetAddBanner 신규 (S1) | 홈화면 위젯 추가 안내 |
| H-03 | 정보 위계 재구성 | BalanceCard 최상단 |
| H-05 | AnnouncementModal → 인라인 배너 | 강제 모달 제거 |
| H-06 | B2BPromoCard 홈 제거 | 사용자 우선 |
| Cb-01~03 | 캐시백 요약 카드 + 금액/탭 수정 | 가치 체감 |
| St-01~02 | 가맹점 정보 신뢰성 | 업데이트 날짜 + 수정 요청 |
| Hi-01~02 | 환불 진입점 + 잔액 표시 | History 페이지 메인화 |

#### Sprint C — P2 이슈

| 이슈 | 내용 | 결과 |
|------|------|------|
| H-07 | 카드명 수정 | "내 카드" / "강릉페이 N" |
| C-03~05 | 충전 한도 + Disabled 사유 + 환불 요약 | 오류 예방 |
| Q-03 | 스캔 상태 피드백 | 펄스 애니메이션 |
| St-03~04 | 검색 input 활성화 + 카테고리 아이콘 | 매장 페이지 강화 |
| Hi-03~04 | 거래 리스트 UI + 환불 가능 배지 | 명확한 상태 |

#### Sprint 1 — QR 실제 카메라

html5-qrcode 라이브러리 통합. mock → 실제 카메라 피드. 결제 확인 바텀시트 + 체크 애니메이션 + 권한 거부 한국어 안내.

#### Sprint 2 — S3 혜택 체감

캐시백 금액 구간별 직관 메시지 (커피 한 잔 / 점심 한 끼 / 한도 달성).

#### Sprint 3 — S6 가맹점 정보 신뢰

가맹점 마지막 업데이트 날짜 노출. 가맹점주 정보 수정 요청 흐름 추가.

#### Sprint 4 — 닐슨/슈나이더만 잔여

QR 카메라 init 상태 스피너 (Nielsen #1 visibility). 충전 한도 초과 시 비활성 + 사유 (Nielsen #5, #9).

#### Sprint D — S7 코치마크 단계별 안내

CoachMarkOverlay 신규 작성. Step 1 (홈 충전 버튼) → Step 2 (충전 페이지 진입) 자동 진행. fromCoach state로 페이지 간 코치마크 연속성 유지.

Phase 2 결과: 29개 이슈 모두 완료. 빌드 0 오류 유지.

### 9.3 Phase 3 — IA 재편 + 기능 구현

기간: 2026-05-15
의도: Phase 2가 컴포넌트 단위 개선이었다면 Phase 3는 IA(Information Architecture) 전면 재편. 30개 페이지의 사용자 동선 자체를 재설계.

#### Phase 3-A — IA 구조 재편

기존 5탭: 홈·결제매장·QR중앙·이용내역·MY → 5탭으로 재편 (이용내역을 핵심 위치로 승격)
TopAppBar Menu → Bell + 검색 → /search
MyPage, SearchPage, CardApplyPage 신규 생성
/menu → /my 리다이렉트
Google Maps API 통합 (.env, @react-google-maps/api)

#### Phase 3-B — 기능 구현 (3명의 병렬 에이전트)

병렬 에이전트 패턴 처음 적용. 한 작업을 3개 영역으로 분할.

**Agent BN (검색)**: SearchPage 완성, PopularKeywords 가로 스크롤 칩

**Agent MY (MY + 카드)**: MyPage 5그룹 메뉴, CardApplyPage 2카드 캐러셀, CardBackModal FaceID + CVC, HomePage 카드 클릭 연동

**Agent FX (버그 + 지도 + 내역)**: CoachMark max-w 430px 강제 + position fixed, StoreMapScreen Kakao → Google Maps 전환, FrequentPlaces 신규, HistoryPage 메인 탭화, BottomNav safe-area-inset-bottom env() 적용

**Agent VR (검증)**: 44항목 체크리스트 일괄 점검 (다른 에이전트 작업 완료 후 실행)

#### Sprint R1~R10 — 긴급 복구 + dotLottie

Phase 3-B 작업 중 일부 디자인 회귀 발생. 10개 sprint로 긴급 복구.

| Sprint | 내용 |
|--------|------|
| R1+R7 | 3버튼(충전/환불/이용내역) 카드 내부 복원; 잔액 색상 white; CreditCard 아이콘 → 3D SVG |
| R2 | CardActions 외부 컴포넌트 제거, chargeButtonRef BalanceCardExpanded로 전달 |
| R3→R9 | 직관 캐시백 메시지 이모지 제거, lucide-react 아이콘 5종 (Bus/Coffee/Utensils/ShoppingBag/Smartphone) |
| R4 | 인라인 캐시백 배너 완전 삭제 |
| R5 | BannerCarousel teal-600 → primary-100 라이트 블루 (디자인 톤 통일) |
| R8 | shouldShowCashbackModalOnNextHome state, registerCard 시 true (카드 등록 후 첫 홈에서만 모달) |
| R10 | @lottiefiles/dotlottie-react 설치, face-id.lottie + State Machine 통합 (이후 청크 C에서 우회) |

기획 의도
- 회귀는 발견 즉시 별도 sprint로 격리
- R1~R10 = "긴급 복구" 명시. 정상 흐름 작업과 구분
- 작업 단위가 명확해야 PROGRESS.md 추적 가능

### 9.4 Phase 3 청크 작업 (피드백 반영)

기간: 2026-05-15
의도: Phase 3 완료 후 피드백 수렴. 작업을 4개 청크로 분할.

#### 청크 A — 디자인 시스템 복원

기획 의도: Phase 3-B 회귀로 인한 디자인 시스템 일관성 점검. 토큰화 + safe-area 정리.

| Task | 파일 | 변경 |
|------|------|------|
| A1 | ScreenContainer | maxWidth 390px 복원 (tokens.layout.viewport 일치), safe-area-inset 추가 |
| A2 | BalanceCardExpanded | 워터마크 button 화, onCardIconClick prop, opacity 0.15/hover 0.25; refundButtonRef 분리; LOW_BALANCE=10000 복원; getCashbackIntuition teal 색상 |
| A3 | HomePage | AnnouncementBanner 복원; refundButtonRef useRef 추가 |

#### 청크 B — 흐름 로직

기획 의도: 신규 사용자 + 기존 사용자 분기. 코치마크 3단계 자동 진행 (cardApply → charge → refund → cashbackModal).

| Task | 파일 | 변경 |
|------|------|------|
| B1 | UserContext | monthlyCashback 상태, useCallback, shipCard, chargeBalance ID 반환, refundTransaction(id) |
| B2 | OnboardingContext | hasSeen* 3종, markSeen(key), completeAllCoachmarks |
| B3 | CoachMarkOverlay | 버튼 row justifyContent space-between (건너뛰기 좌 / 다음 우) |
| B4 | HomePage | 신규/기존 사용자 분기 (CardApplyCTA/CashbackEntryCard), 코치마크 자동 진행 |
| B5 | MonthlyCashbackModal | 슬라이드업/다운 350ms |
| B6 | CardApplyCTA (신규) | 신규 사용자 잔액 카드 자리 CTA |
| B7 | CashbackEntryCard (신규) | hasCard true 시 잔액 카드 아래 노출 |

#### 청크 C — 인터랙션 디테일 (Face ID 통합)

기획 의도: 카드 뒷면 모달을 Face ID 인증 인터랙션으로 변경. RefundPage를 NumPad → 충전 내역 리스트 방식으로 재작성.

| Task | 파일 | 변경 |
|------|------|------|
| C3 | CardBackFaceId (신규) | Dynamic Island 필 컴포넌트; 상단 슬라이드다운 → Lottie 재생 → 슬라이드업 |
| C4 | HomePage | showFaceId state; CardBackModal → CardBackFaceId 교체 |
| C5 | RefundPage | NumPad/금액입력 → 충전 내역 리스트; refundTransaction(id) 호출; 확인 다이얼로그 |
| C7 | CardApplyPage | useEffect: cardStatus === 'applying' 시 1000ms 후 shipCard 자동 호출 |

#### 청크 D — 캐시백 페이지 재작성 + 가상 데이터

기획 의도: "자동 차감" 표현 전면 제거 (캐시백은 적립만, 차감 없음). 12개월치 가상 거래 데이터 + 단골 매장 30% + 캐시백 월 한도 30K 자동 계산.

| Task | 파일 | 변경 |
|------|------|------|
| D1 | UserContext | STORES/REGULAR_STORES 상수, generateMockTransactions, 12개월 × 15~30건, 단골 30%, 5월 monthlyCashback 자동 합산 |
| D2 | PeriodPickerModal (신규) | 390px 앱 고정형 바텀시트, 슬라이드업 300ms, CashbackPage·HistoryPage 공용 |
| D3 | CashbackPage | "차감" 표현 전면 제거, primary[700] 요약 카드 + teal 진행바, 기간 선택 |
| D4 | HistoryPage | 타입 필터 칩 4종 (전체/충전/환불/결제), 기간 필터, spend 항목 store명 + teal 캐시백 표시 |

### 9.5 Phase 3 이후 (현재 진행 중)

#### 디자인 시스템 전수 검증 (2026-05-16)

3단계 자동 검증
1. 진단: grep으로 토큰 미사용 위치 카운트
2. 매핑: 비표준값 → 가까운 토큰 매핑 규칙 정의
3. 일괄 교체

결과
- fontSize 7건 → 모두 토큰화
- borderRadius 17건 → 10건 토큰화 + 7건 장식 예외 (주석 명시)
- spacing 199건 → 우선순위 파일 100% 토큰화

#### 큰글씨 모드 (진행 중)

`LARGETEXT.md` 사양 기반. 3단계로 분할.

| 단계 | 작업 | 상태 |
|------|------|------|
| 1 | typography.sizeLarge 토큰 + useTypography hook + AppContext.isLargeText | ✅ 완료 |
| 2 | HomePage 분기 + HomePageLarge 신규 (3단 잔액 카드 + 4카드) | ✅ 완료 |
| 3 | 7개 페이지 useTypography 확산 + 레이아웃 깨짐 검증 | 🔄 진행 중 |

#### 매장 데이터 통합 (2026-05-17)

konacard API 크롤링으로 13,021개 실제 가맹점 + 216개 QR결제 매장 수집. stores.json + qr-stores.json 분리.

다음 단계 (진행 중)
- data/stores.js 검색/필터 함수
- Google Maps Cluster 적용
- 카테고리 필터 12개 확장
- 검색 자동완성 + QR 매장 탭

#### Android 버전 (예정)

`ANDROID.md` 사양 기반. 폴더 분리 방식 (client → client-android 복사).

발표 직전 (5/29~5/30) 분리 절차
1. client-android 별도 폴더로 복사
2. 새 GitHub repo 생성
3. Vercel 새 프로젝트 + 새 URL
4. iOS URL + Android URL 두 개 시연

### 9.6 발표 시점 진행 상황 (2026-05-17 기준)

#### 완료

- [x] iOS 버전 (Apple HIG)
  - [x] 30개 페이지 모두 완료
  - [x] 70+ 컴포넌트 토큰화
  - [x] Face ID + 카드 뒷면 모달
  - [x] 코치마크 시스템 (Step 1, 2)
  - [x] 7대 전략 모두 구현
  - [x] 디자인 시스템 검증 (fontSize/borderRadius/spacing)
  - [x] 데이터 시스템 (가상 거래 12개월 + 캐시백 한도 30K)
  - [x] 13,021개 실제 가맹점 데이터 수집
  - [x] 큰글씨 모드 인프라 + HomePageLarge

#### 진행 중

- [ ] 큰글씨 모드 페이지 확산 (단계 3)
- [ ] 매장 시스템 단계 B, C (지도 클러스터링, QR 매장 탭)
- [ ] Android 버전 (client-android 분리 + Material 적용)

#### 예정

- [ ] 포트폴리오 사이트 (Plus-Ex 톤)
- [ ] 발표 자료
- [ ] MY 페이지 디테일 마무리

---

## 10. 디벨롭 백로그 (발표 후)

- 백엔드 연결 (Render + NeonDB)
- 진짜 PWA 변환 (오프라인 지원)
- React Native 또는 Capacitor로 네이티브 빌드
- 음성 안내 (TTS, 시니어 접근성)
- 다크 모드
- 큰글씨 모드 + 다크 모드 동시
- Material You 동적 색상 (Android)
- 강릉시 실제 API 연동 (정부 협업 필요)

---

## 11. 참고 자료

### 11.1 디자인 가이드라인

- Apple Human Interface Guidelines (HIG): https://developer.apple.com/design/human-interface-guidelines/
- Material Design 3: https://m3.material.io/
- 닐슨 휴리스틱 10원칙
- Shneiderman 8가지 황금률

### 11.2 라이브러리 문서

- React 18: https://react.dev
- Vite: https://vite.dev
- React Router v6: https://reactrouter.com
- @react-google-maps/api: https://react-google-maps-api-docs.netlify.app
- @googlemaps/markerclusterer: https://github.com/googlemaps/js-markerclusterer
- Framer Motion: https://www.framer.com/motion/
- Lucide Icons: https://lucide.dev
- Material Icons: https://fonts.google.com/icons

### 11.3 데이터 출처

- 강릉시 가맹점: https://search.konacard.co.kr/payable-merchants/gangneung
- 강릉시청: https://www.gn.go.kr
- 강원페이/강릉페이 안내: 강원도청 지역화폐 홈페이지

### 11.4 AI 도구

- Claude (Anthropic): https://claude.ai
- Claude Code (Antigravity IDE): https://docs.claude.com/en/docs/agents-and-tools/claude-code
- NotebookLM: https://notebooklm.google.com
- Perplexity AI: https://perplexity.ai

---

## 12. 협업 회고 (AI와 함께 작업하며)

### 12.1 AI를 잘 활용한 사례

**디자인 시스템 199건 spacing 위반 자동 검증**
- AI가 단순 매핑 + 컨텍스트 추론 (브랜드 마크 6px gap은 장식 예외) 둘 다 처리
- 10건 자동 토큰화 + 7건 보고 후 사용자 결정 요청
- 인간 판단력과 AI 자동화의 조합

**Face ID 무한 루프 디버깅**
- 사람이 보고 알 수 없는 .lottie 내부 구조 (Python으로 unzip + 분석)
- AI가 State Machine 19단계 구조를 파악하고 우회 방법 제시
- 수동 시도라면 며칠 걸렸을 작업이 30분

**대규모 데이터 변환**
- 13,643개 매장 → 우리 카테고리로 매핑 (200+ 분류 매핑 규칙)
- 매핑 규칙 작성을 AI에게 위임. 검증만 사람이 수행
- konacard 가맹점 → QR 매장 매칭 알고리즘 (이름 부분 일치)

**병렬 에이전트 패턴 (Phase 3-B)**
- 한 명의 AI에 30개 파일 위임 X
- 4개 영역으로 분할 → 4명의 AI에게 병렬 위임
- 각 에이전트는 자기 영역 깊이 작업
- 마지막에 검증 전용 에이전트 (Agent VR) 통합 회귀 점검
- 작업 속도 2~3배 향상

**문서 기반 컨텍스트 주입**
- 새 AI 세션마다 0부터 시작하는 문제 해결
- 8개 사양 문서 (CLAUDE.md, AGENTS.md, DESIGN.md, IA.md, Components.md, Patterns.md, Routes.md, PROGRESS.md) 운영
- 작업 시작 전 "이 문서 view 후 작업" 명시
- 일관성 + 할루시네이션 방지

**자동 커밋 + PROGRESS.md 작성**
- AI가 작업 완료 시 PROGRESS.md에 자동 기록
- "어떤 청크에서 무엇이 바뀌었는지" 발표 시점에 즉시 추적
- 회귀 발생 시 어느 청크가 문제인지 즉시 식별

### 12.2 하네스 엔지니어링의 성과

**개념**: AI를 단일 "전능한 도구"가 아닌, 여러 협업자가 함께 일하는 "오케스트라"로 운영. 각 협업자(에이전트)는 명확한 책임 + 명확한 인터페이스(사양 문서) + 명확한 검증 절차를 가짐.

**성과**
- Phase 3-B에서 4개 영역 병렬 작업으로 1일치 작업을 반나절에 완료
- 청크 A~D 작업에서 회귀 발생 즉시 식별 + R1~R10 sprint로 격리 복구
- 디자인 시스템 검증을 사람이 직접 검사 X → grep + AI 자동화로 199건 처리

**기여**: 단순히 "AI에게 코드 짜주세요"가 아닌 "AI에게 어떻게 일을 맡겨야 효율적인가"라는 메타 질문에 대한 실험적 답.

### 12.3 한계 + 주의점

**AI는 학습 데이터 시점에 의존**
- 토스, 카카오페이의 최신 디자인을 사람이 직접 확인 필요
- AI가 "토스에 송금 버튼 있어요"라고 잘못 답할 수 있음 (실제로 없음)
- 사용자 직접 시연 확인이 검증의 최후 보루

**과도한 위임은 디자인 의도 손실 위험**
- AI가 "효율적"이라고 한 결정이 디자인 의도와 어긋날 수 있음
- 예: 토큰화 시 모든 비표준값을 강제 매핑하면 미세 조정이 손실됨
- 사람이 "이것은 의도된 장식 예외"라고 판단해야 함

**컨텍스트 한계**
- 한 인스턴스에서 너무 큰 작업 시키면 디테일 놓침
- 큰 작업은 단계 분할 + 사양 문서로 일관성 확보

**병렬 에이전트의 충돌**
- 같은 파일을 두 에이전트가 동시에 수정 시 위험
- 영역 분할이 명확해야 함 (Agent BN/MY/FX는 파일 겹침 없음)
- 충돌 위험 있으면 순차 처리

### 12.4 인간 + AI 협업의 정수

AI는 "어떻게(How)"를 잘 한다. 사람은 "왜(Why)"를 결정한다.

이 프로젝트에서 가장 중요한 결정들은 사람이 했다.
- 시니어 사용자 우선 → 이용내역 바텀 네비에 배치
- 환불 동등 위계 → 잔액 카드 3슬롯
- 캐시백 직관 메시지 → 추상적 숫자 거부
- 큰글씨 모드 = 단순 폰트 X, 레이아웃 재설계
- 폴더 분리 방식 (client/client-android) → 토글 분기 X
- 13,000개 매장 전부 등록 → 임의 발췌 X

AI는 이 의도를 정확히 구현해주는 강력한 파트너였다.

### 12.5 디지털 인문예술 전공의 관점에서

이 프로젝트는 디지털 도구(AI)를 인문학적 사고(사용자 관점 + 가치 판단)와 결합한 실험이다.

기술 측면
- React + Vite + Material Design 3 등 현대 프론트엔드 스택 학습
- AI 협업 워크플로우 (하네스 엔지니어링) 설계
- 13,000개 데이터 자동 수집 및 변환

인문 측면
- 시니어 사용자의 멘탈 모델 분석
- 정보 위계의 윤리적 결정 (환불 동등 위계 = 사용자 권리)
- 가치 체감의 인지적 디자인 (숫자 → 직관 메시지)
- AI 도구를 어떻게 "윤리적으로" 활용할 것인가에 대한 실험

기술과 의도가 결합될 때 좋은 디자인이 나온다. AI는 그 결합을 가능하게 하는 도구다.

---

## 13. 실제 서비스 분석 + 캐시백 시스템 풀스택 구현 (2026-05-17)

### 13.1 작업 배경

발표 D-14 시점, 실제 강릉페이의 캐시백 이용안내 페이지(공식 앱 캡처)를 분석하면서 우리 mock 데이터가 실제 비즈니스 룰을 반영하지 못하고 있음을 발견.

### 13.2 실제 강릉페이 캐시백 룰 분석

공식 앱 캡처 (적립안내/사용안내/소멸안내 3탭) 분석 결과

| 항목 | 실제 룰 |
|------|--------|
| 적립률 | 결제 금액의 10% |
| 월 한도 | 30,000원 |
| 적립 기준 | 캐시백 사용분 제외한 결제 금액 (이중 보너스 방지) |
| 중복 적용 | 즉시 할인과 캐시백은 중복 X |
| 사용 가능 | 1원 이상부터 |
| 결제 한도 | 일반 카드 50만원 / 충전 계좌 연결 카드 200만원 |
| 환불 | 충전 잔액만 가능 (캐시백 환불 불가) |
| 소멸 | 적립 시점/방법별 유효기간 다름. 사용 취소된 캐시백은 60개월 |
| 사용 방식 | 자동/수동 모드 분기 가능 |

### 13.3 UX 의사결정

이걸 mock에 풀스택 구현할지 결정. 3가지 옵션 검토

| 옵션 | 작업 시간 | 임팩트 |
|------|---------|--------|
| 풀 구현 | 6~8시간 | 매우 큼 |
| 단순화 | 3~4시간 | 중간 |
| 무시 | 0시간 | 작음 |

선택: **풀 구현**

근거
- 실제 서비스 분석 + UX 개선 메시지 가장 강함
- "실제 강릉페이 시스템을 정확히 분석하고 자동/수동 모드 + 별도 지갑 + 월 한도까지 구현" 발표 임팩트
- 디지털인문예술 전공의 "기술 + 인문 결합" 메시지 부합

### 13.4 데이터 구조 재설계

#### 13.4.1 기존 구조 (문제)

```js
{
  balance: number,           // 충전 잔액만
  monthlyCashback: number,   // 누적 표시만 (사용 불가)
  transactions: [...]
}
```

문제
- 캐시백을 "표시용 숫자"로만 다룸
- 실제로는 별도 지갑인데 잔액과 합쳐서 인식
- 자동/수동 모드 없음
- 거래 내역에 결제 수단 분리 정보 없음

#### 13.4.2 새 구조

```js
{
  // 잔액 (별도 지갑)
  balance: number,                  // 충전 잔액 (사용 가능)
  cashbackBalance: number,          // 캐시백 잔액 (별도 지갑)
  
  // 캐시백 추적
  cashbackMode: 'auto' | 'manual',  // 사용 모드
  monthlyAccumulated: number,       // 이번달 적립 누적 (한도 추적)
  
  // 거래 내역 (상세 분해)
  transactions: [{
    id, date, type,                 // 'charge' | 'spend' | 'refund'
    storeName,
    totalAmount,                    // 총 금액
    paidByCashback,                 // 캐시백으로 결제 (spend만)
    paidByBalance,                  // 잔액으로 결제/충전/환불
    cashbackEarned,                 // 이 거래로 적립된 캐시백
    cashbackMode,                   // 이 거래 시점의 모드
  }]
}
```

설계 의도
- 각 거래마다 결제 수단 분리 추적 → 이용내역에서 정직한 표시
- 캐시백 적립을 transaction 단위로 기록 → 월 한도 정확한 추적
- cashbackMode를 거래에 함께 저장 → 과거 거래 검증 가능

### 13.5 비즈니스 로직 구현 (SPEND_BALANCE)

```js
case 'SPEND_BALANCE': {
  const { amount, storeName } = action.payload
  let paidByCashback = 0
  let paidByBalance = amount
  
  // 자동 모드: 캐시백 우선 차감
  if (state.cashbackMode === 'auto' && state.cashbackBalance > 0) {
    paidByCashback = Math.min(state.cashbackBalance, amount)
    paidByBalance = amount - paidByCashback
  }
  // 수동 모드: 충전 잔액만 사용
  
  if (paidByBalance > state.balance) return state  // 잔액 부족 차단
  
  // 캐시백 적립 (paidByBalance의 10%, 월 한도 30K)
  const potentialCashback = Math.floor(paidByBalance * 0.1)
  const remainingLimit = 30000 - state.monthlyAccumulated
  const cashbackEarned = Math.min(potentialCashback, Math.max(0, remainingLimit))
  
  return {
    ...state,
    balance: state.balance - paidByBalance,
    cashbackBalance: state.cashbackBalance - paidByCashback + cashbackEarned,
    monthlyAccumulated: state.monthlyAccumulated + cashbackEarned,
    transactions: [newTransaction, ...state.transactions],
  }
}
```

핵심 포인트
- **이중 보너스 방지**: 캐시백 사용분(paidByCashback)은 적립 기준에서 제외
- **월 한도 정확 적용**: 30,000원 도달 시 추가 결제는 적립 0원
- **잔액 부족 시 결제 자체 거부**: 단순 표시만이 아닌 실제 거부

### 13.6 가상 거래 데이터 재생성

12개월치 거래를 새 구조로 시뮬레이션 생성. 실제 강릉시 가맹점 데이터 사용.

특징
- 12개월 (2025-06 ~ 2026-05) 총 약 200~250건
- 5월은 1~15일만 (시연 시점 가정), 8~15건
- 다른 월은 15~30건
- 거래 유형 분포: 충전 15% / 환불 5% / 결제 80%
- 결제 매장 분포: 단골 30% / 일반 70%
- 캐시백 모드: 자동 80% / 수동 20%
- 단골 매장 5개 결정적 선택 (랜덤 X) - 매번 같은 단골
- 월별 시뮬레이션으로 캐시백 잔액 + 월 누적 정확 추적

기존 mock 데이터 (단순 매장명 + 금액)와의 차이

| 항목 | 기존 mock | 새 mock |
|------|----------|---------|
| 매장명 | 가짜 (테라로사, 초당순두부 등 임의) | 실제 강릉 매장 (도우카서트, 도토리식품 등) |
| 거래 구조 | amount 단일 | totalAmount + paidByCashback + paidByBalance |
| 캐시백 추적 | cashback 표시만 | cashbackEarned + cashbackMode + 잔액 변동 |
| 환불 처리 | refunded 플래그 | type === 'refund' + 거래 제거 |

### 13.7 UI 변경

#### 13.7.1 잔액 카드 (BalanceCardExpanded)

**Before**
```
강릉페이(1)    120,000원
캐시백 46% [████░░░] 한도 30,000원
직관 메시지: "커피 한 잔 값 아꼈어요" + 아이콘
```

**After**
```
강릉페이      120,000원
캐시백        15,000원   ← 별도 지갑 명시
━━━━━━━━━━━━━━━━━━━━━━
캐시백  [자동 사용 ✓] [수동 사용]  ← 모드 토글
━━━━━━━━━━━━━━━━━━━━━━
[충전] [환불] [QR결제]
```

핵심 변경
- "(1)" 제거 (시스템 용어 → 사용자 친화)
- 캐시백 잔액 별도 줄 (별도 지갑임을 시각적으로 명시)
- 46% / 직관 메시지 / 진행바 / 한도 표시 모두 제거 → 모드 토글로 대체
- getCashbackIntuition 함수 + lucide 아이콘 5종 제거

#### 13.7.2 이용내역 (HistoryPage) - 결제 수단 분리 표시

캐시백을 사용한 결제는 3줄 분리 표시

```
🍴 초당순두부
   5월 15일 12:30 · 자동             -15,000원
   ├ 캐시백 사용                     -3,000원
   └ 강릉페이                       -12,000원
   + 1,200원 적립
```

핵심
- 자동/수동 모드 명시
- 캐시백 사용분과 잔액 결제분 분리
- 적립 금액 별도 줄 (teal 색상)

이전 단순 표시
```
🍴 초당순두부 5월 15일      -15,000원 + 1,200원 적립
```

차이: 정직성. "캐시백이 어디서 왔는지, 어떻게 쓰였는지" 명확히 추적 가능.

#### 13.7.3 캐시백 페이지 3탭

3탭 구조 (실제 강릉페이와 동일)

- **적립 탭**: 결제 거래 중 cashbackEarned > 0 표시
- **사용 탭**: 결제 거래 중 paidByCashback > 0 표시
- **소멸 예정 탭**: 안내 + "현재 소멸 예정 없음"

상단 요약 카드
- 사용 가능 캐시백 (큰 폰트)
- 이번달 적립 / 30,000원 (한도 명시)
- 진행바 (teal)

#### 13.7.4 캐시백 이용안내 페이지 (신규)

`/cashback-info` 라우트 추가. 실제 강릉페이 3탭 안내 그대로 (적립안내/사용안내/소멸안내).

발표 메시지: "실제 강릉페이의 정책을 정확히 반영하여 사용자에게 투명하게 공개"

### 13.8 작업 단계 (7단계)

| 단계 | 내용 | 시간 |
|------|------|------|
| 1 | UserContext 구조 변경 (state + reducer) | 1.5h |
| 2 | 가상 거래 데이터 재생성 (실제 매장명 적용) | 1h |
| 3 | 잔액 카드 UI 변경 ((1) 제거 + 캐시백 줄 + 토글) | 2h |
| 4 | 이용내역 + 캐시백 페이지 UI (3줄 분리 + 3탭) | 2h |
| 5 | 캐시백 이용안내 페이지 (3탭) | 0.5h |
| 6 | 전체 검증 (grep + 빌드) | 0.5h |
| 7 | RefundPage 잔존 필드 정리 (단계 6에서 발견) | 0.3h |

**총 약 8시간**. 풀스택 추정과 일치.

### 13.9 AI 활용 패턴

#### 13.9.1 단계별 진단 → 사양 → 수정 → 검증

각 단계마다 동일 워크플로우 반복

```
1. 진단: AI가 관련 파일 view 후 현재 구조 보고
2. 사양: 사용자가 결정 사항 답변 (Q1~Q7 등)
3. 수정: AI가 사양대로 수정
4. 검증: 빌드 + grep + 시각 회귀
```

이 사이클로 회귀 위험 최소화. 진단에서 짚지 못한 누락(RefundPage)도 단계 6 grep으로 그물에 걸림.

#### 13.9.2 alias 활용한 점진적 마이그레이션

단계 1에서 UserContext 구조 변경 시 monthlyCashback 참조 컴포넌트가 4개 발견됨. 한 번에 다 수정하면 컨텍스트 분산 위험.

해결: 임시 alias 추가
```js
// 단계 1 임시
{
  monthlyCashback: state.monthlyAccumulated,  // 단계 2에서 제거 예정
  monthlyAccumulated,
  // ...
}
```

단계 3에서 참조 컴포넌트 일괄 교체 후 alias 제거. 단계 1-3 사이 빌드는 항상 0 오류 유지.

기획 의도: 큰 리팩토링도 빌드 깨짐 없이 점진적 이행 가능.

#### 13.9.3 grep 기반 잔존 위반 검증

단계 6에서 grep 4종으로 잔존 필드 확인

```bash
grep -rn "monthlyCashback" client/src
grep -rnE "\bt\.amount\b" client/src
grep -rnE "\bt\.cashback\b" client/src  # cashbackEarned 제외
grep -rnE "\bt\.store\b" client/src     # storeName 제외
```

결과: 단계 4 진단에서 누락된 RefundPage 3건 발견 → 단계 7로 추가 처리.

기획 의도: "AI가 다 했다"는 환상에 의존하지 않음. 정량 검증으로 추적 가능.

### 13.10 발표 메시지

#### 13.10.1 핵심 메시지

"실제 강릉페이 캐시백 시스템을 정확히 분석하고, 자동/수동 모드 + 별도 지갑 + 월 한도까지 풀스택으로 재구현했어요."

#### 13.10.2 어필 포인트

1. **실제 서비스 분석 깊이**
   - 공식 앱 캡처 → 정책 문서 분석 → 비즈니스 룰 추출
   - 단순 UI 모방이 아닌 정책 이해 기반 설계

2. **별도 지갑 구조 정확히 반영**
   - 잔액과 캐시백을 분리한 표시
   - 환불 시 캐시백 보존 (실제 룰 그대로)

3. **자동/수동 모드 분기**
   - 사용자 통제권 (Shneiderman #7 locus of control)
   - 한 번 설정 후 모든 결제에 반영

4. **이중 보너스 방지 로직**
   - 캐시백 사용분 제외한 결제 금액만 적립 기준
   - 강릉페이 공식 룰 정확 구현

5. **이용내역의 정직성**
   - 결제 수단 3줄 분리 표시
   - "캐시백이 어디서 왔고 어떻게 쓰였는지" 추적 가능

#### 13.10.3 디지털인문예술 전공 시각

- 기술: 풀스택 데이터 구조 재설계 + 비즈니스 로직 + UI 분기
- 인문: 사용자의 "내 돈 통제권" 보장. 정책의 투명한 공개. 시스템 용어의 사용자 친화 번역 ("(1)" 제거)
- 결합: 실제 정책을 분석하고 → 디자인 시스템으로 번역하고 → 사용자 친화 UI로 표현

---

## 14. 매장 시스템 풀스택 구현 (2026-05-17)

상세 내용은 별도 케이스 스터디 문서 참조: `client/docs/STORE_SYSTEM_CASE_STUDY.md`

### 14.1 핵심 요약

- 강릉시 공식 가맹점 13,021개 통째 수집 (konacard API 자동 크롤링)
- 1.5분 자동 수집 스크립트 (사용자 수동 작업 5시간 추정 → 자동화)
- 카테고리 12개 매핑 + QR결제 매장 216개 분리
- 13,000개 매장 표시 성능: Google Maps Cluster 적용
- 첫 진입 시 강릉역 기준 가까운 매장 큐레이션
- 시트 빈 공간 제거 (CSS flex `minHeight: 0` 함정 해결)
- "자주 가는 곳" 탭 → "가까운 곳" 탭으로 라벨 변경 (실시간 큐레이션 정확 반영)

### 14.2 핵심 UX 결정

1. **데이터 양 결정**: 임의 발췌 vs 전체 통합 → **전체 통합** (신뢰성 우선)
2. **지도 초기 상태**: 전부 표시 vs 클러스터 → **클러스터** (시각 노이즈 방지)
3. **빈 상태 처리**: 안내문 vs 큐레이션 → **큐레이션** (Nielsen #6 recognition)
4. **QR결제 매장**: 통합 vs 별도 탭 → **별도 탭** (사전 확인 = 결제 실패 예방)

### 14.3 발표 메시지

- "강릉시 공식 가맹점 13,021개를 통째로 가져왔어요. 임의 발췌가 아닌 전체 통합."
- "사용자가 한 페이지씩 수동 복사하던 작업 (5시간 추정)을 AI와 함께 1.5분으로 단축."
- "빈 안내문 대신 강릉역 기준 가까운 매장 큐레이션. '무엇을 할지 모르는 빈 화면'은 UX 죄악."

---

## 15. 통합 발표 메시지 (전체 프로젝트)

### 15.1 3가지 핵심 메시지

#### 메시지 1: "AI를 어떻게 활용할 것인가에 대한 실험"

- 단순 코드 생성기 X
- 하네스 엔지니어링 + 문서 인프라 + 단계별 검증
- 8개 사양 문서 (CLAUDE.md, AGENTS.md, DESIGN.md, IA.md, Components.md, Patterns.md, Routes.md, PROGRESS.md, LARGETEXT.md, ANDROID.md) 운영
- 병렬 에이전트 패턴 (Phase 3-B: BN/MY/FX/VR)

#### 메시지 2: "실제 서비스의 정직한 분석과 재현"

- 강릉시 공식 가맹점 13,021개 전체 수집
- 실제 강릉페이 캐시백 룰 정확 구현 (자동/수동 + 별도 지갑 + 월 한도)
- 정책 문서 분석 → 디자인 시스템 번역 → UI 구현

#### 메시지 3: "시니어 사용자 중심의 UX 결정"

- 정보 위계 재구성 (잔액 카드 최상단)
- 액션 동등 위계 (충전 = 환불 = QR결제)
- 캐시백 가치 체감 (별도 지갑으로 시각적 분리)
- 큰글씨 모드 별도 디자인 시스템 (LARGETEXT.md)
- 매장 큐레이션 (안내문 거부)

### 15.2 정량 지표

| 항목 | 수치 |
|------|------|
| 페이지 | 30개 |
| 컴포넌트 | 70+ |
| 실제 매장 데이터 | 13,021개 |
| QR결제 매장 | 216개 |
| 가상 거래 데이터 | 12개월 × 평균 20건 (약 240건) |
| 디자인 토큰 | 색상 50+ / 간격 10+ / 모서리 7개 / 타이포 11개 |
| 사양 문서 | 10개 (위 메시지 1 참조) |
| 발표 일정 | 5/31 (작업 시작 4월 → 8주) |

### 15.3 디지털인문예술 전공 관점에서의 의의

이 프로젝트는 디지털 도구(AI)와 인문학적 사고(사용자 권리 + 가치 판단)를 결합한 실험.

- 기술이 의도를 가능하게 한다 (AI 도구 활용)
- 의도가 기술을 의미 있게 한다 (UX 의사결정)
- 정책이 디자인을 정직하게 한다 (실제 서비스 분석)
- 사용자가 모든 결정의 중심이다 (시니어 + 환불권 + 투명성)

기술과 인문이 결합될 때 좋은 디자인이 나온다. AI는 그 결합을 가능하게 하는 도구다.

16. MY 페이지 토스 톤 재설계 + 챗봇 제거 (2026-05-18)
16.1 배경
AS-IS 강릉페이 MY 페이지 문제 진단 (캡처 기반 분석)
AS-IS 문제이유상단 3아이콘 (내정보/고객센터/설정)위계 없는 평면 구조지역농협 계좌 큰 카드우리 mock에 계좌 연결 없음가맹점 등록 슬라이드 (1/2)B2B 콘텐츠를 B2C 화면에 노출 (DESIGN.md 절대 금지)챗봇 푸루 진입 메뉴시니어 부적합 + 2018년 트렌드"새로워진 앱 사용 가이드" 광고자기 광고 노이즈
16.2 설계 결정: 챗봇 제거
의사결정 근거
항목챗봇 유지챗봇 제거시니어 적합성자연어 입력 부담적합 (단순 메뉴)2026년 트렌드X (2018년 트렌드)O (명확한 IA)토스/카카오페이둘 다 챗봇 미사용부합시연 임팩트약함 (mock 응답)"선택과 집중"
발표 메시지: "AI 시대라서 챗봇을 넣는 게 아니라, AI 시대이기 때문에 챗봇이 필요 없는 명확한 IA를 설계했어요."
대안: 고객지원 그룹에 "전화 1566-4335 한 줄"이 챗봇 100번보다 시니어에게 가치 있음.
16.3 토스 패턴 기반 MY 페이지 재구성
5그룹 구조
그룹항목내 카드카드 관리, 카드 배송 현황, 주 카드 변경, 분실신고/재발급회원정보회원정보 변경, 비밀번호 변경, 본인확인 정보고객지원고객센터, 자주 묻는 질문, 공지사항, 이용약관 (챗봇 제거)설정알림 설정, 언어 설정(value 표시), 큰글씨 모드(value 표시)가맹점 신청가맹점 신청/관리 (B2B 별도 분리)
16.4 프로필 카드 신규 추가
토스 표준 패턴 적용
👤 홍길동
   h***@gmail.com     ← 이메일 마스킹 (h + *** + @domain)
   010-1234-****      ← 전화 마스킹 (뒤 4자리)
                [편집]
마스킹 함수

이메일: hong@gmail.com → h***@gmail.com (1글자 + 별표)
전화: 010-1234-5678 → 010-1234-**** (뒤 4자리)

16.5 앱 버전 정보 + 최신 배지
앱 버전 v1.0.0  ✓ 최신
최신 버전을 사용 중이에요
UX 의도: 시니어가 "내가 옛날 버전 쓰는 거 아닌가" 불안 해소. CheckCircle 아이콘 (lucide-react).
16.6 AI 활용 패턴

AS-IS 강릉페이 캡처 분석 → 기능 나열형 IA 문제 진단
토스 MY 페이지 패턴 분석 → 5그룹 구조로 번역
MyMenuGroup.jsx에 value prop 지원 추가 (언어 설정 "한국어", 큰글씨 "꺼짐" 우측 표시)


17. ScreenContainer 아키텍처 개선 + 회귀 사이클 (2026-05-18)
17.1 발견: 구조적 결함
ScreenContainer 통합 수정 과정에서 근본 구조 결함 발견
문제: ScreenContainer가 display: block인데 자식 28건이 flex: 1 패턴 사용 → 무력화
기존 ScreenContainer (display: block)
└─ 자식 (flex: 1) ← 부모가 flex container 아님. flex: 1 무력화.

수정 후 ScreenContainer (display: flex + flexDirection: column)
└─ 자식 (flex: 1) ← 정상 동작
이게 paddingBottom: 139px 같은 hack이 12개 페이지에 누적된 근본 원인.
17.2 통합 수정 (Phase A + B)
Phase A (statusBar 배경 연동)
jsx// Before
backgroundColor: colors.surface.background  // 항상 회색

// After
backgroundColor: statusBarBg || colors.surface.background  // prop 연동
효과: statusBarBg prop 설정된 페이지에서 safe-area-inset-top 영역도 prop 색 적용.
Phase B (flex column 통합)
jsx// Before
minHeight: '100dvh',
display: 'block',

// After
height: '100dvh',
display: 'flex',
flexDirection: 'column',
효과: 자식 28건의 flex: 1 패턴이 의도대로 동작. BottomNav 영역 자동 분리.
17.3 회귀 사이클에서 배운 것
회귀 1: statusBar prop이 모바일에서 무력화
원인: isDesktop && <StatusBar> 조건부 렌더. 모바일에서 StatusBar 컴포넌트 미렌더 → statusBarBg prop이 모바일에서 효과 없음.
해결: ScreenContainer 자체 backgroundColor를 prop에 연동 (Phase A).
회귀 2: ChargePage statusBar 사라짐
원인: ChargePage가 ScreenContainer 미사용 + ChargeScreen이 position: fixed. ScreenContainer 수정 효과 없음.
해결: ChargePage에 ScreenContainer 추가 + ChargeScreen position: fixed 제거.
회귀 3: StorePage 회색 띠 (데스크탑)
진단 과정: 음수 marginTop 시도 → env(safe-area-inset-top)이 데스크탑에서 0 → 효과 없음 → 부모 overflow: hidden이 추가 차단 → StatusBar 컴포넌트 자체가 41px 고정 공간 차지가 진짜 원인.
해결: transparentStatusBar prop 신설. StatusBar를 absolute positioning으로 띄움 + 배경 투명 + 지도가 그 자리 채움.
jsx// StorePage
<ScreenContainer transparentStatusBar>
  // 지도가 StatusBar 41px 자리까지 채움
  // 시간/배터리 텍스트는 absolute로 떠 있음 (zIndex 10)
핵심 교훈: "CSS로 해결 안 되면 JS 분기" 전에 진짜 원인 파악이 먼저. 음수 marginTop이 실패한 이유를 알았기 때문에 transparentStatusBar라는 근본 해결 가능.
17.4 statusBar 페이지별 정책 확립
페이지본문 배경statusBar이유HomePage회색prop 없음 (회색)본문과 일치HomePageLarge회색prop 없음 (회색)본문과 일치StorePage지도transparentStatusBar지도 풀블리드MyPage회색prop 없음 (회색)본문과 일치HistoryPage흰색surface.card본문과 일치CashbackPage흰색surface.card본문과 일치RefundPage (일반)흰색surface.card본문과 일치RefundPage (큰글씨)회색surface.background큰글씨 디자인 시스템그 외 하위 페이지흰색surface.card헤더 흰색과 일치
원칙: "statusBar 색 = 본문 첫 화면 색". 별도 색이면 띠로 보임.
17.5 paddingBottom hack 정리
ScreenContainer flex column화로 불필요해진 hack 발견
찾은 hack (12건)
- BottomNav 있는 페이지: 139px / 120px
- BottomNav 없는 페이지: 100px

처리
- BottomNav 있는 7건: 제거 (flex column이 자동 분리)
- BottomNav 없는 5건: 보류 (다른 목적 가능성)
AI 활용 패턴: grep으로 12건 전수 발견 → 영향 범위 분석 → 단계적 제거. "한 번에 다 지우지 않고 BottomNav 있는 것만" 판단이 회귀 방지.

18. UX 디테일 개선 사이클 (2026-05-18)
18.1 잔액 카드 캐시백 통합 박스
기존 문제 (3가지)

캐시백 진행바 + 직관 메시지 (이전 단계에서 제거됨) → 부활 필요
자동/수동 토글 대비 불명확 (활성/비활성 구분 안 됨)
진행바 박스 + 토글이 별개 박스로 따로 노는 느낌

새 통합 박스 구조
┌─ 다크 블루 카드 ──────────────┐
│ 강릉페이      180,701원         │
│ 캐시백          6,173원 (teal)  │
│                                │
│ ┌─ 캐시백 통합 박스 (흰 배경) ─┐│
│ │ 캐시백              58%       ││  ← 라벨 + % 우측
│ │ [████░░░░░░░]                 ││  ← 진행바 (teal)
│ │ 이번달 적립  17,451원/30,000원││  ← 금액 정보
│ │ ─────────────────────────────││  ← 구분선
│ │ [✓ 자동 사용] [수동 사용]    ││  ← 토글 (활성 primary)
│ └──────────────────────────────┘│
│                                │
│ [충전] [환불] [QR결제]          │
└────────────────────────────────┘
UX 의사결정 과정

1차: 직관 메시지("커피 한 잔 값 모았어요") + 아이콘 5개 → 부활
2차: "초록색이 혼자 튀고 따로 논다" → 글래스 톤으로 수정
3차: "흰 배경이었어야 했다" → 흰 배경 + teal 진행바로 정정
4차: "직관 메시지 지우고 캐시백으로" + 토글과 한 박스로 통합

교훈: 시각 디자인은 텍스트 사양만으로 정확히 전달이 어렵다. 시각 검증 → 피드백 → 수정 사이클이 필수. "구려", "혼자 따로 놈" 같은 표현이 정확한 디자인 크리틱.
자동/수동 토글 대비 강화
jsx// 활성: primary 배경 + 흰 텍스트 + Check 아이콘
// 비활성: 흰 배경 + gray-500 텍스트 + gray-200 border 2px
이전 글래스 톤 (rgba 0.25 / 0.08) → 흰 배경 박스 안에서 색 대비 명확하게 변경.
18.2 큰글씨 모드 잔액 카드 분리
큰글씨 모드 (HomePageLarge)에서 잔액 카드를 일반 모드 BalanceCardExpanded와 완전 분리.
일반 모드큰글씨 모드구조한 다크 카드 (잔액 + 캐시백 + 통합 박스 + 3버튼)잔액 카드 + 캐시백 카드 분리버튼3개 (충전/환불/QR결제)2개 (충전/QR결제)높이일반68px (큰글씨)
큰글씨 모드 원칙: 정보 밀도 다운 + 강조 확실 (LARGETEXT.md 4.4절). 일반 모드 컴포넌트 재사용 X.
18.3 이용내역 디테일 개선 3건
1. 날짜 년도 표시 추가
문제: 12개월 (2025-06 ~ 2026-05) 데이터에서 월/일만 표시하면 연도 구분 불가.
해결: 공통 유틸 client/src/utils/date.js 신설
jsxformatDate(iso)                    // "26.05.17"
formatDate(iso, { withTime: true }) // "26.05.17 14:30"
적용

HistoryPage: "26.05.17 14:30" (시:분 중요)
RefundPage: "26.05.17 14:30" (충전 시각 중요)
CashbackPage: "26.05.17" (일자만으로 충분)

기존 3개 페이지가 각자 인라인 fmtDate 정의 → 형식도 다 달랐음 (M/D HH:mm / YYYY-MM-DD HH:mm / YYYY.MM.DD). 공통 유틸로 통일.
2. 기간 선택 X 버튼 제거 + 전체 기간 옵션 추가
문제: 특정 달 선택 후 옆에 X 버튼이 나타남 → 디자인 시스템에 없는 패턴.
해결

X 버튼 JSX 제거 + lucide X import orphan 제거
PeriodPickerModal에 showAll prop 추가 (default false)
HistoryPage만 showAll 전달 → 맨 위에 "전체 기간" 옵션

설계 의도: CashbackPage는 월별 한도 30K 집계 의미라 "전체 기간"이 부적합. showAll prop으로 호출처 분기 = 캡슐화.
3. 카드 미신청 시 이용내역 빈 상태
문제: 카드 없는 사용자가 BottomNav "이용내역" 탭으로 진입 가능. 가상 거래 데이터 노출.
해결: HistoryPage에 hasCard 분기 추가
!hasCard → 빈 상태 화면
  Receipt 아이콘 (80px 원형, primary-50 배경)
  "아직 이용 내역이 없어요"
  "카드 신청 후 강릉페이를 이용하시면 이용 내역을 확인할 수 있어요"
  [카드 신청하기] → /card-apply

hasCard → 기존 거래 목록
진입 경로 분석: HistoryPage만 BottomNav로 hasCard 무관 진입 가능. CashbackPage/RefundPage는 hasCard 조건 진입 경로라 차단됨 → HistoryPage만 처리.
18.4 BottomNavBar 정렬 보정
문제: 아이콘 + 텍스트 그룹이 BottomNavBar 영역에서 약간 위로 치우쳐 보임.
진단 (정량적)
NavTab minHeight: 49px
paddingTop: 8px (spacing[2])
paddingBottom: 4px
→ 아이콘+텍스트 실제 위치: 8 + (49-42)/2 = 11.5 ≠ 시각 중앙 24.5
→ 2px 위로 치우침 확인
원인 2가지

paddingTop/paddingBottom 비대칭 (8px vs 4px) → 주원인
외부 컨테이너 alignItems: flex-end (QR 원형 버튼 잔재) → 부원인

수정 (3줄)
jsx// 외부 컨테이너
alignItems: 'flex-end' → 'center'

// NavTab
paddingTop: 8px 제거
paddingBottom: 4px 제거
gap: 2px → 4px (토스 패턴)
padding 제거로 justifyContent: center가 정중앙 담당.
18.5 MY 페이지 하위 페이지 + 지원금 하위 페이지 statusBar 일괄 통일
대상: 지원금/혜택 하위 3건 + MY 하위 6건 + 알림 1건 + 기부 3건 = 총 13건
공통 패턴
jsx<ScreenContainer statusBarBg={colors.surface.card}>
SupportDetailPage는 colors import 누락 → orphan 처리 포함.

19. AI 협업 패턴 총정리 (2026-05-18 세션)
19.1 회귀 방지 워크플로우
이번 세션에서 회귀 발생 → 진단 → 수정 사이클 10회 이상 반복. 누적 회귀 없이 정착한 패턴.
1. 진단 (view + grep) → 원인 파악
2. 사용자 Q1~Qn 결정 요청
3. 수정 (명시 파일만)
4. 빌드 0 오류 확인
5. 사용자 시각 검증
→ 회귀 발견 시 1로 되돌아가기
핵심: 사용자 시각 검증이 코드 검증보다 신뢰할 수 있다. "하나도 안 됐어", "구려", "혼자 따로 노는 느낌" 같은 직관적 피드백이 코드 진단의 출발점.
19.2 자주 쓴 grep 패턴
bash# statusBar prop 현황 전수
grep -rn "statusBarBg" client/src/pages --include="*.jsx"

# 100dvh 중복 사용
grep -rnE "(100vh|100dvh)" client/src/pages client/src/components

# ScreenContainer 사용처
grep -rn "<ScreenContainer" client/src/pages --include="*.jsx"

# dead code (orphan import)
grep -rn "import.*from" client/src/pages/SomePage.jsx
19.3 "사양 정신" 원칙의 실제 적용 사례
사례 1: 일반 모드 캐시백 카드 분리 회귀
사용자 의도: "큰글씨 모드만 분리하자"
AI 수정: 일반 모드까지 분리 → 즉시 회귀
원칙: 명시하지 않은 영역은 수정 금지. "큰글씨"라는 단어가 있으면 HomePageLarge만.
사례 2: statusBar 흰색 통일 오류
사용자 의도: "각 페이지 본문 배경과 일치"
AI 해석: "흰색으로 통일" → HomePage/HomePageLarge까지 흰색 강제
원칙: 사용자 표현이 지시처럼 보여도 맥락을 읽어야 함. "흰색 없애" = "이 페이지 본문과 맞춰".
사례 3: 충전 버튼 테두리 문제
원인: CardApply 분기 자식 height: 100dvh → ScreenContainer flex column 수정과 충돌. 이중 100dvh.
해결: 진단에서 발견 → "사양 정신"으로 4개 파일 동시 정리.
19.4 발표에서 활용할 "회귀 케이스 스터디" 메시지
"회귀가 발생할 때마다 진단 사이클을 돌렸어요. 단순 수정이 아니라 원인 파악 → 구조적 해결. 10번의 회귀 사이클을 통해 ScreenContainer 아키텍처, statusBar 정책, 날짜 유틸, 캐시백 통합 박스까지 점점 더 정직한 구조로 수렴했어요."
---

**문서 작성일**: 2026-05-17
**문서 버전**: 3.0 (캐시백 시스템 풀스택 + 매장 시스템 추가)
**최종 수정자**: 주현호 (with Claude)