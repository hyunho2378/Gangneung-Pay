# 강릉페이 AS-IS 복제 — 진행 상황

업데이트: 2026-04-15 (세션 7 — Naver Maps API 연동, StoreMapScreen 실제 지도 구현)

---

## 빌드 상태

| 항목 | 상태 |
|------|------|
| `npm run build` | **0 오류** (1797 모듈, 278ms) |
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

## 세션 7에서 수정된 항목

### Naver Maps API 연동
- `client/.env` 생성 — `VITE_NAVER_MAP_CLIENT_ID=mjplt3dqpl`
- `client/.env.example` — Naver Maps 환경 변수 예시 추가
- `client/index.html` — `<script src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=%VITE_NAVER_MAP_CLIENT_ID%">` 추가 (Vite 빌드 시 치환)
- `client/src/components/store/StoreMapScreen.jsx` — 회색 placeholder → 실제 네이버 지도
  - 지도 중심: 강릉시 (lat 37.7519, lng 128.8761), zoom 13
  - 샘플 스토어 4개에 위도/경도 추가 (중앙시장, 테라로사, GS25 경포, 쏠비치)
  - 커스텀 마커 (primary[700] 원형, 흰색 테두리), 마커 클릭 시 상세 바텀시트 오픈
  - 필터 변경 시 마커 재렌더링
  - 지도 로딩 중 스피너 표시 (`mapReady` 상태)

### Vercel 환경 변수 설정 안내
Vercel 프로젝트 Settings > Environment Variables에 다음 항목 추가:
- **Key**: `VITE_NAVER_MAP_CLIENT_ID`
- **Value**: `mjplt3dqpl`
- **Environment**: Production, Preview, Development 모두 체크

설정 후 Vercel에서 재배포(Redeploy)해야 반영됩니다.

### Naver Cloud Console 설정 확인 (배포 전 필수)
- ncloud.com > Maps > Application > Web Service URL에 다음 도메인 등록 필요:
  - `http://localhost:5173` (dev)
  - Vercel 배포 도메인 (e.g. `https://gangneungpay.vercel.app`)
- 등록되지 않은 도메인에서는 지도가 표시되지 않음 (Authentication Failed)

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
| 지도 | 회색 placeholder (Naver Map API 없음) |
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
