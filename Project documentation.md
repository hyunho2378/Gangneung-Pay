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