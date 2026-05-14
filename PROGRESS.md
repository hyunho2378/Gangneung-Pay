# 강릉페이 Phase 3 피드백 반영 — 진행 상황

업데이트: 2026-05-15 (Sprint 1-6 완료 — main 브랜치 18개 태스크)

브랜치: main

---

## Sprint 1-6 — main 브랜치 18개 태스크 (2026-05-15) ✅ 완료

**빌드 결과: 0 오류 (1828 모듈, 404ms)**

| # | 파일 | 내용 |
|---|------|------|
| T2 | `context/OnboardingContext.jsx` | `hasSeenMonthlyCashbackModal`, `hasSeenCardApplyCoachmark` 상태 추가 |
| T4 | `context/UserContext.jsx` | `chargeBalance`, `refundBalance`, `spendBalance`, `transactions` 추가; `applyCard` setTimeout 1000ms |
| T5 | `components/home/CardActions.jsx` (신규) | 충전/환불/이용내역 3버튼 컴포넌트; `chargeButtonRef` prop |
| T5 | `components/home/BalanceCardExpanded.jsx` | 하단 3버튼 행 제거 |
| T7 | `components/home/MonthlyCashbackModal.jsx` (신규) | 5월 캐시백 안내 바텀시트; 메가폰 SVG; 확인 CTA |
| T8 | `components/home/BannerCarousel.jsx` | `KAKAO_SLIDE` 카카오 노란 슬라이드; `CARD_APPLY_SLIDE` hasCard 분기; `applyButtonRef` prop |
| T9 | `pages/HomePage.jsx` | ExploreScrollCard 복원; CardActions 통합; 캐러셀 상단 이동; 5월 캐시백 진입 카드; 신규/기존 사용자 코치마크 2종 |
| T10 | `pages/CardApplyPage.jsx` | 2카드 캐러셀 + 혜택 리스트 + 카테고리 아이콘 완전 재작성; 전체 토큰화 |
| T15 | `pages/RefundPage.jsx` | NumPad + UserContext잔액 + refundBalance 호출; 완료 화면 |
| T16 | `components/layout/ScreenContainer.jsx` | `maxWidth: 390px → 430px` |
| T16 | `components/payment/ChargeScreen.jsx` | `position:fixed inset:0 → 430px 센터링` 패턴 |
| T4 | `pages/ChargePage.jsx` | UserContext balance/chargeBalance 연동 |

### Task 18 QA 결과

| 항목 | 결과 |
|------|------|
| localStorage 미사용 | ✅ 0건 |
| 하드코딩 색상 없음 | ✅ (SVG 장식 제외) |
| TypeScript 없음 | ✅ 0건 |
| 이모지 없음 | ✅ 0건 |
| 빌드 0 오류 | ✅ (1828 모듈, 404ms) |

---

## Phase 3 진행 상황

### Phase 3-B — 기능 구현 (2026-05-15) ✅ 완료

**빌드 결과: 0 오류 (1824 모듈, 309ms)**

#### Agent BN — 검색
| 항목 | 파일 | 내용 |
|------|------|------|
| 재작성 | `pages/SearchPage.jsx` | 검색 input + 최근 검색 + 결과 리스트 완전 구현 |
| 신규 | `components/search/PopularKeywords.jsx` | 자주 찾는 키워드 8개 가로 스크롤 칩 |

#### Agent MY — MY · 카드
| 항목 | 파일 | 내용 |
|------|------|------|
| 재작성 | `pages/MyPage.jsx` | 프로필 헤더 + 5그룹 메뉴 + 로그아웃 |
| 재작성 | `pages/CardApplyPage.jsx` | 2카드 선택 캐러셀 + 혜택 3항목 + CTA |
| 신규 | `components/mypage/MyMenuGroup.jsx` | 그룹 제목 + 항목 리스트 컴포넌트 |
| 신규 | `components/home/CardBackModal.jsx` | FaceID mock + CVC/카드정보 모달 |
| 수정 | `pages/HomePage.jsx` | 카드 클릭 → CardBackModal 연동 |

#### Agent FX — 버그수정 · 지도 · 내역
| 항목 | 파일 | 내용 |
|------|------|------|
| 버그수정 | `components/common/CoachMarkOverlay.jsx` | max-w 430px 강제, 건너뛰기 position:fixed |
| 전환 | `components/store/StoreMapScreen.jsx` | Kakao → Google Maps (@react-google-maps/api) |
| 신규 | `components/store/FrequentPlaces.jsx` | 자주 가는 곳 가로 스크롤 카드 |
| 수정 | `components/payment/TransactionHistory.jsx` | 카드관리 탭 제거, 환불 사례 추가 |
| 수정 | `pages/HistoryPage.jsx` | TopAppBar + BottomNavBar 추가 (메인 탭화) |
| 개선 | `components/layout/BottomNavBar.jsx` | safe-area-inset-bottom env() 적용 |
| 정리 | `client/index.html` | Kakao Maps 스크립트 제거 |

---

### Phase 3-A — IA 구조 재편 (2026-05-15) ✅ 완료

| 항목 | 파일 | 내용 |
|------|------|------|
| 환경 | `.env`, `.env.example` | `VITE_GOOGLE_MAPS_API_KEY` 추가 |
| 패키지 | `package.json` | `@react-google-maps/api` 설치 |
| 숨김 | `HomePage.jsx` | OnboardingStepper, SupportRankingList, ExploreScrollCard, QRFloatingBar 주석 처리 |
| 숨김 | `StorePage.jsx` | QRFloatingBar 주석 처리 |
| 숨김 | `LifePage.jsx` | QRFloatingBar 주석 처리 |
| 숨김 | `SupportPage.jsx` | QRFloatingBar 주석 처리 |
| 숨김 | `CommunityPage.jsx` | QRFloatingBar 주석 처리 |
| 재작성 | `BottomNavBar.jsx` | 5탭: 홈·결제매장·QR중앙·이용내역·MY |
| 수정 | `TopAppBar.jsx` | Menu → Bell, 검색 → /search |
| 신규 | `pages/MyPage.jsx` | 스텁 → Phase 3-B 완성 |
| 신규 | `pages/SearchPage.jsx` | 스텁 → Phase 3-B 완성 |
| 신규 | `pages/CardApplyPage.jsx` | 스텁 → Phase 3-B 완성 |
| 라우트 | `App.jsx` | `/my`, `/search`, `/card-apply` 추가; `/menu` → `/my` 리다이렉트 |
| 문서 | `ROUTES.md` | Phase 3 기준 전면 업데이트 |

**Phase 3-A 빌드 결과: 0 오류 (1819 모듈, 373ms)**

---

## Phase 3 다음 단계

| 에이전트 | 담당 | 상태 |
|---------|------|------|
| Agent BN | SearchPage·PopularKeywords | ✅ 완료 |
| Agent MY | MyPage·CardApplyPage·CardBackModal·HomePage | ✅ 완료 |
| Agent FX | CoachMark·Google Maps·FrequentPlaces·HistoryPage | ✅ 완료 |
| Agent VR | 최종 검증 체크리스트 44항목 | 대기 (사용자 승인 후) |

---

## Phase 2 진행 상황

### Sprint A — P0 완료 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `tokens.js` | `typography.size.largeTitle: '34px'`, `warningBg`, `warningBorder` 추가 | H-08, Q-01 |
| `BalanceCardExpanded.jsx` | 3버튼 [충전][환불][QR결제], 잔액 34px, 캐시백 통합, 저잔액 경고 | H-02, H-04, H-08 |
| `ChargeScreen.jsx` | 3단계 step (입력→확인→완료), 단계표시기, 잔액 상시 표시 | C-01, C-02, C-06 |
| `QRScannerScreen.jsx` | 잔액 0원/부족 경고 배너, [충전] CTA, 잔액 표시 강조 | Q-01, Q-02 |
| `ChargePage.jsx` | `balance={120000}` prop 추가 | C-02 |
| `QRPage.jsx` | `onCharge={() => navigate('/charge')}` prop 추가 | Q-01 |
| `HomePage.jsx` | CashbackProgressCard 제거, BalanceCardExpanded에 cashbackMax/Percent 전달 | H-04 |

### Sprint A 빌드 결과
- `npm run build` — **0 오류** (1796 모듈, 261ms)

### Sprint B — P1 완료 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `WidgetAddBanner.jsx` (신규) | 위젯 추가하기 pill → glassmorphism 슬라이드 (400ms/1.5s/400ms) | H-01 (S1) |
| `AnnouncementBanner.jsx` (신규) | 인라인 공지 배너 (X 버튼 닫기) | H-05 |
| `HomePage.jsx` | WidgetBanner/AnnouncementBanner 추가, BalanceCard 최상단 이동, BannerCarousel 이동, AnnouncementModal/B2BPromoCard 제거 | H-01, H-03, H-05, H-06 |
| `CashbackDetail.jsx` | 요약 카드 (이번달 적립/월 한도/달성률), cashback 금액 수정, 탭 레이블 자동 적립/수동 확인 | Cb-01, Cb-02, Cb-03 |
| `StoreDetailSheet.jsx` | lastUpdated 최근 업데이트 날짜 표시, 가맹점주 정보 수정 링크 | St-01, St-02 |
| `TransactionHistory.jsx` | 현재 잔액 표시, 환불 신청 배너 | Hi-01, Hi-02 |
| `HistoryPage.jsx` | `balance={120000}` `onRefund` prop 추가 | Hi-01, Hi-02 |

### Sprint B 빌드 결과
- `npm run build` — **0 오류** (1796 모듈, 243ms)

### Sprint C — P2 완료 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `BalanceCardExpanded.jsx` | cardCount/cardIndex prop → 카드명 "내 카드"/"강릉페이 N" | H-07 |
| `QRScannerScreen.jsx` | cardCount prop + cardName, 스캔 상태 펄스 피드백 (750ms toggle) | H-07, Q-03 |
| `ChargeScreen.jsx` | chargeLimit prop + 한도 표시, Disabled 사유 텍스트, 환불 요약 인라인 | C-03, C-04, C-05 |
| `CategoryFilterChip.jsx` | icon prop 추가 (아이콘+텍스트 병기) | St-03 |
| `StoreMapScreen.jsx` | CATEGORY_ICONS 7종 SVG, searchQuery state + input 활성화 | St-03, St-04 |
| `CashbackDetail.jsx` | 캐시백 사용 안내 인라인 배너 (SummaryCard 하단) | Cb-04 |
| `TransactionHistory.jsx` | MOCK_HISTORY 4건, TransactionItem UI, 환불 가능 배지 | Hi-03, Hi-04 |

### Sprint C 빌드 결과
- `npm run build` — **0 오류** (1796 모듈, 345ms)

### Sprint 1 — QR 실제 카메라 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `package.json` | `html5-qrcode ^2.3.8` 추가 | Q-Camera |
| `QRScannerScreen.jsx` | Html5Qrcode 실제 카메라 피드, 권한 거부 한국어 안내, 스캔 성공 결제 확인 바텀시트, 결제하기 → 체크 애니메이션 → 홈, 언마운트 cleanup | Q-Camera |
| `index.css` | html5-qrcode 주입 DOM override | Q-Camera |

### Sprint 1 빌드 결과
- `npm run build` — **0 오류** (1821 모듈, 320ms)

### Sprint 2 — S3 혜택 체감 구조 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `BalanceCardExpanded.jsx` | `getCashbackMessage()` 함수 추가, 캐시백 금액 구간별 체감 문구 표시 (커피/점심/한도달성) | S3 |

### Sprint 2 빌드 결과
- `npm run build` — **0 오류** (1821 모듈, 277ms)

### Sprint 3 — S6 가맹점 정보 신뢰 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `StoreDetailSheet.jsx` | "마지막 업데이트" 항상 표시, "가맹점 정보 수정 요청" 버튼 → 가맹점주 바텀시트 → [가맹점주 포털로 이동] | St-01, St-02 |
| `StoreMapScreen.jsx` | SAMPLE_STORES 4개 항목에 `lastUpdated` 날짜 추가 | St-01 |

### Sprint 3 빌드 결과
- `npm run build` — **0 오류** (1821 모듈, 300ms)

### Sprint 4 — 닐슨/슈나이더만 잔여 이슈 (2026-05-13)

| 파일 | 변경 내용 | 기준 |
|------|-----------|------|
| `QRScannerScreen.jsx` | `cameraState === 'init'` 시 회전 스피너 + "카메라 준비 중" 표시 | Nielsen #1 |
| `ChargeScreen.jsx` | `amount > chargeLimit` 시 [다음] 비활성 + "1회 충전 한도 N원을 초과했습니다" 에러 | Nielsen #5, #9 |

### Sprint 4 빌드 결과
- `npm run build` — **0 오류** (1821 모듈, 309ms)

### Sprint 5 — 전체 QA (2026-05-13)

| 항목 | 결과 |
|------|------|
| localStorage 미사용 | ✅ |
| 하드코딩 색상 없음 (SVG 장식 제외) | ✅ |
| TypeScript 없음 | ✅ |
| 최종 빌드 0 오류 | ✅ (1821 모듈, 331ms) |

### Sprint D — S7 완료 (2026-05-13)

| 파일 | 변경 내용 | 이슈 ID |
|------|-----------|---------|
| `CoachMarkOverlay.jsx` (신규) | 스포트라이트 + 말풍선 + 단계 인디케이터 + 건너뛰기/다음 | S7 |
| `BalanceCardExpanded.jsx` | `chargeButtonRef` prop 추가, 충전 버튼 분리 | S7 |
| `HomePage.jsx` | useRef/useState/useEffect 추가, CoachMarkOverlay Step 1 통합 | S7 |
| `ChargePage.jsx` | useLocation 추가, CoachMarkOverlay Step 2 통합 (fromCoach state) | S7 |

### Sprint D 빌드 결과
- `npm run build` — **0 오류** (1797 모듈, 260ms)

---

## Phase 2 DIAGNOSIS 이슈 해결 현황

| 이슈 ID | 내용 | 상태 |
|---------|------|------|
| H-01 | WidgetAddBanner 신규 (S1) | **완료** |
| H-02 | 환불 버튼 동등 노출 | **완료** |
| H-03 | 정보 위계 재구성 | **완료** |
| H-04 | 캐시백 BalanceCard 통합 | **완료** |
| H-05 | AnnouncementModal → 인라인 배너 | **완료** |
| H-06 | B2BPromoCard 홈 제거 | **완료** |
| H-07 | 카드명 수정 | **완료** |
| H-08 | 잔액 34px Large Title | **완료** |
| C-01 | 3단계 충전 플로우 | **완료** |
| C-02 | 잔액 상시 표시 (ChargeScreen) | **완료** |
| C-03 | 충전 한도 표시 | **완료** |
| C-04 | Disabled 버튼 사유 | **완료** |
| C-05 | 환불 요약 인라인 | **완료** |
| C-06 | 충전 완료 단계 | **완료** |
| Q-01 | QR 잔액 부족 경고 | **완료** |
| Q-02 | QR 잔액 폰트 상향 | **완료** (sm 크기 + 색상 강조) |
| Q-03 | 스캔 상태 피드백 | **완료** |
| St-01 | 업데이트 날짜 | **완료** |
| St-02 | 가맹점주 링크 | **완료** |
| St-03 | CategoryFilterChip 아이콘 | **완료** |
| St-04 | 검색 input 활성화 | **완료** |
| Cb-01 | 캐시백 요약 카드 | **완료** |
| Cb-02 | 캐시백 금액 수정 | **완료** |
| Cb-03 | 탭 레이블 변경 | **완료** |
| Cb-04 | 캐시백 사용 안내 | **완료** |
| Hi-01 | 환불 진입점 | **완료** |
| Hi-02 | 잔액 표시 (History) | **완료** |
| Hi-03 | 거래 리스트 UI | **완료** |
| Hi-04 | 환불 가능 기간 | **완료** |

---

## Phase 1 산출물 (main 브랜치 보존)

업데이트: 2026-04-15 (세션 7 — Naver Maps API 연동)

---

## 빌드 상태

| 항목 | 상태 |
|------|------|
| `npm run build` | **0 오류** (1821 모듈, 331ms) |
| dev 서버 | `http://localhost:5173/` |
| 페이지 파일 | **30개** 완성 |
| 하드코딩 색상 | **완전 해소** (SVG 장식 제외) |

---

## 완료된 파일 목록

### Setup 파일
- `client/src/tokens/tokens.js` — 색상 토큰 전면 완료
- `client/src/index.css` — Tailwind v4 @theme 블록
- `client/src/context/AppContext.jsx`
- `client/src/App.jsx` — 30개 route
- `client/src/pages/SplashPage.jsx`

### 컴포넌트 (43개 전부 완료)
```
components/
  layout/       ScreenContainer TopAppBar TopAppBarLargeText TopAppBarBack BottomNavBar QRFloatingBar
  home/         BannerCarousel OnboardingStepper BalanceCard BalanceCardExpanded CashbackProgressCard
                ServiceShortcutGrid SectionHeader RecentPaymentEmpty StoreRecommendCard
                PromoHorizontalCard B2BPromoCard SupportRankingList ExploreScrollCard
  common/       EmptyState TagChip BottomSheet AnnouncementModal RefundGuideModal
                MonthPickerSheet LanguageSheet NotificationItem SettingsToggleRow
                MenuDrawer SupportGrantCard SupportGrantDetail DonationCard
  payment/      QRScannerScreen ChargeScreen QuickAmountChip NumPad CashbackDetail TransactionHistory
  store/        StoreMapScreen StoreListItem StoreDetailSheet CategoryFilterChip
  chatbot/      ChatBotScreen
```

### 완료된 페이지 (30개)
```
pages/
  SplashPage, HomePage, StorePage, LifePage, SupportPage, CommunityPage
  QRPage, ChargePage, CashbackPage, HistoryPage
  MenuPage, SettingsPage, NotificationPage, CustomerCenterPage, ChatbotPage
  CardLostPage, CouponPage, SupportDetailPage, WishSupportPage, CustomInfoPage
  DonationPage, DonationDetailPage, DonationHistoryPage
  NewsListPage, NewsDetailPage, PlaceDetailPage
  ServiceEditPage, KakaoPayGuidePage, TransportCardPage, UsageGuidePage
```

---

## Kakao Maps 교체 (세션 4)

### 변경 파일
- `client/.env` — `VITE_NAVER_MAP_CLIENT_ID` → `VITE_KAKAO_MAP_KEY=6a973ca61f77f2f6dcc60b32dff65346`
- `client/.env.example` — 동일하게 교체
- `client/index.html` — Naver 스크립트 → `//dapi.kakao.com/v2/maps/sdk.js?appkey=%VITE_KAKAO_MAP_KEY%&libraries=services,clusterer`
- `client/src/components/store/StoreMapScreen.jsx`
  - `window.naver` → `window.kakao` 전체 교체
  - `Map` 옵션: `zoom: 13` → `level: 5`
  - 마커: Naver `icon.content` HTML 방식 → Kakao `MarkerImage` (SVG data URI)
  - 이벤트: `window.naver.maps.Event.addListener` → `window.kakao.maps.event.addListener` (소문자 event)
  - 포커스: `mapRef.current.setZoom(15)` → `mapRef.current.setLevel(3)`

### Vercel 환경 변수 설정 (필수)
Vercel 프로젝트 Settings > Environment Variables에 추가:
- **Key**: `VITE_KAKAO_MAP_KEY`
- **Value**: `6a973ca61f77f2f6dcc60b32dff65346`
- **Environment**: Production, Preview, Development 모두 체크

설정 후 Vercel에서 재배포(Redeploy)해야 반영됩니다.

### Kakao Developers 콘솔 설정 (배포 전 필수)
https://developers.kakao.com → 내 애플리케이션 → 앱 설정 → 플랫폼 → Web:
- `http://localhost:5173` (개발)
- `https://gangneung-pay.vercel.app` (프로덕션)

등록되지 않은 도메인에서는 지도 로딩 실패 (RefererNotAllowedKeyError).

### 세션 7에서 수정된 항목 (Naver Maps — 교체됨)
- 세션 7에서 Naver Maps API로 지도 연동 작업 진행 (현재 Kakao Maps로 대체됨)

---

## 세션 6에서 수정된 항목

### 로고 및 파비콘 적용
- `client/index.html` — `<title>` → "강릉페이", `apple-touch-icon` 링크 추가
- `client/public/favicon.svg` — 강릉페이로고_블루.svg 복사
- `SplashPage.jsx` — 흰 배경 + 블루 로고 이미지 (180px) + 회색 부제목
- `TopAppBar.jsx` — 블루 로고 이미지(22px) + "강릉페이" 텍스트 (bold 20px primary[700])
- `TopAppBarLargeText.jsx` — 블루 로고 이미지(28px) + 동일 텍스트
- `BalanceCard.jsx` — 화이트 로고 워터마크 (우상단, opacity 0.7)

### 스페이싱 전면 감사 — HomePage
- `HomePage.jsx` — 모든 컴포넌트를 감싸던 `padding: \`0 ${layout.margin}\`` 래퍼 div 전부 제거
- 원인: 컴포넌트 자체 `margin: layout.margin` + 래퍼 16px = 이중 수평 마진(32px)

### 스페이싱 전면 감사 — 기타 페이지
- `LifePage.jsx` — PromoHorizontalCard 주변 `<div style={{ padding: \`0 ${layout.margin} ${layout.margin}\` }}>` 래퍼 제거
- `CommunityPage.jsx` — 소식/함께만들기 섹션 래퍼를 `paddingTop: layout.margin` 전용으로 변경, 카드 목록에 `padding: \`0 ${layout.margin}\`` 추가 → SectionHeader(자체 16px) 정렬 통일
- `WishSupportPage.jsx` — `paddingBottom: '24px'` + `padding: layout.margin` 충돌 해소 → `padding: \`${layout.margin} ${layout.margin} 24px\``
- `SupportPage.jsx` — 중복 `paddingBottom: '139px'` 제거 (shorthand `padding` 이미 포함)
- `DonationPage.jsx` — 중복 `paddingBottom: '24px'` 제거
- `NewsListPage.jsx` — 중복 `paddingBottom: '24px'` 제거
- `UsageGuidePage.jsx` — 중복 `paddingBottom: '24px'` 제거
- `SettingsPage.jsx` — 첫 카드 그룹 `margin: \`16px ${layout.margin} 0\`` → `\`${layout.margin} ${layout.margin} 0\``

### 하드코딩 margin `'0 16px'` 전면 교체 (7개 파일)
- `SettingsPage.jsx`, `UsageGuidePage.jsx`, `NewsListPage.jsx`, `ServiceEditPage.jsx`
- `CustomerCenterPage.jsx`, `NotificationPage.jsx`, `MenuPage.jsx`
- 모두 `margin: \`0 ${layout.margin}\`` 으로 교체 (divider 구분선 등)

### 빌드 결과
- `npm run build` — **0 오류**, 1797 모듈, 216ms

---

## 세션 5에서 수정된 항목

### 코드 QA 결과
- 전체 30개 페이지 + 43개 컴포넌트 코드 검토 완료
- 라우팅 구조 정상 (30개 route, App.jsx 일치)
- AppContext: isLargeText, showAnnouncement 정상 동작
- BottomNavBar: 5탭 활성/비활성 토큰 사용 정상
- BannerCarousel: 3슬라이드 스와이프, 토큰 색상 정상

### tokens.js 추가 항목 (세션 5)
- `alertBorder: '#FECACA'` — TransportCardPage 경고 박스 테두리 (red-200)
- `warmBorder: '#FED7AA'` — CardLostPage 주의사항 박스 테두리 (orange-200)

### 누락 하드코딩 수정 (세션 5)
1. `TransportCardPage.jsx:122` — `#FECACA` → `colors.alertBorder`
2. `CardLostPage.jsx:89` — `#FED7AA` → `colors.warmBorder`

### 의도적으로 유지한 SVG 내부 색상 (최종 확인)
- `QRScannerScreen.jsx` — QR 전용 흑/백 배경
- `LanguageSheet.jsx` — 국기 SVG 내부 국가 고유 색상
- `BannerCarousel.jsx` — 기부 배너 심장 일러스트 분홍 계열
- `BalanceCard.jsx`, `BalanceCardExpanded.jsx` — 카드 이미지 SVG 내부 칩/번호
- `ChatBotScreen.jsx`, `OnboardingStepper.jsx` — 아이콘 SVG 내 흰색
- `StoreMapScreen.jsx` — 지도 마커 SVG 흰점
- `KakaoPayGuidePage.jsx` — 카카오 채팅 아이콘 SVG 내부

---

## QA 체크리스트 코드 검토 결과

| 항목 | 결과 |
|------|------|
| 하드코딩 색상값 없음 | ✅ (SVG 장식 제외 전부 해소) |
| localStorage 미사용 | ✅ |
| 라우팅 30개 route | ✅ |
| 바텀탭 5개 활성/비활성 | ✅ |
| BannerCarousel 스와이프 | ✅ |
| AppContext 큰글씨/공지 | ✅ |
| 스플래시 2초 타이머 | ✅ |
| QR 충전 결제 컴포넌트 | ✅ |
| 토큰 import 일관성 | ✅ |

### 스페이싱 이슈 — 세션 6에서 전면 수정 완료
- HomePage 이중 마진 해소 (래퍼 div 전부 제거)
- 7개 페이지 divider `margin: '0 16px'` 토큰화
- 6개 페이지 paddingBottom 충돌/중복 해소

---

## 진행 중 / 미완료

### 브라우저 시각적 QA (미실시)
- [ ] 스플래시 2초 → 홈 전환
- [ ] 홈 스크롤 전체 (배너, 잔액카드, 캐시백, 서비스, 공지 팝업)
- [ ] 바텀탭 5개 (홈/매장/생활/지원금/소통)
- [ ] QR결제 바 → `/qr` 이동
- [ ] 충전 화면 `/charge`
- [ ] 메뉴 드로어 `/menu`
- [ ] 지원금 상세 `/support/:id`
- [ ] 기부 화면 `/donation`
- [ ] 챗봇 화면 `/chatbot`
- [ ] 390px / 375px 레이아웃 깨짐 없음

---

## 다음 작업 (새 세션 시작 시)

**우선순위 1 — 브라우저 시각적 QA**
- `npm run dev` 실행 후 각 화면 직접 확인
- CLAUDE.md QA 체크리스트 항목별 검증
- 발견된 시각 버그 수정

---

## 버그 수정 사항 (이미 적용됨)

1. `AnnouncementModal.jsx` — `isOpen = true` 기본값 설정
2. `HomePage.jsx` — PromoHorizontalCard props 수정 (`backgroundColor`→`bgColor`, `onPress`→`onClick`)
3. `Home.jsx` — 불필요한 stub 파일 삭제
4. `NewsDetailPage.jsx` 신규 생성 + App.jsx에 `/news/:id` 라우트 추가
5. `HistoryPage.jsx` — `useState('all')` → `useState('history')` 수정
6. `tokens.js` — `primary[200/300/400]` 추가
7. `tokens.js` — `colors.tag` 그룹 추가, `TagChip.jsx` 하드코딩 제거
8. `CashbackDetail.jsx` — controlled props 지원 추가
   `CashbackPage.jsx` — `selectedMonth` 형식 통일, `MonthPickerSheet` props 수정
9. **세션 3** — 13개 파일 하드코딩 색상 → tokens 참조로 교체
10. **세션 4** — 15개 파일 하드코딩 색상 완전 해소 + tokens.js 9개 그룹/항목 추가
11. **세션 5** — border 색상 2개 토큰 추가 (`alertBorder`, `warmBorder`), 관련 2개 파일 수정

---

## 주요 설계 결정

| 항목 | 결정 |
|------|------|
| 스타일링 | inline style + tokens.js (하드코딩 없음) |
| Tailwind | v4 @tailwindcss/vite, @theme 블록, tailwind.config.js 없음 |
| 아이콘 | lucide-react(기능) + inline SVG(장식) |
| 큰글씨 모드 | Context API — useApp().isLargeText |
| 지도 | Kakao Maps JavaScript API v2 (`window.kakao.maps`) |
| 스플래시 | 2초 후 홈으로 |
| B2B 콘텐츠 | AS-IS 그대로 복제 |
| 상태 관리 | useState/useReducer + Context API (localStorage 금지) |
| 라우터 | React Router v6, BrowserRouter |

---

## 파일 구조 요약

```
client/src/
  App.jsx              ← 라우팅 + 스플래시 진입점
  context/AppContext.jsx
  tokens/tokens.js     ← 유일한 디자인 토큰 소스 (완전 정비)
  index.css            ← Tailwind v4 + @theme
  pages/               ← 30개 전부 완료
  components/
    layout/   (6)
    home/    (13)
    common/   (9)
    payment/  (6)
    store/    (4)
    chatbot/  (1)
```
