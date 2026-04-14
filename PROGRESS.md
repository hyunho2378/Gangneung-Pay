# 강릉페이 AS-IS 복제 — 진행 상황

업데이트: 2026-04-14 (세션 5 — 코드 QA 완료, border 토큰 2개 추가)

---

## 빌드 상태

| 항목 | 상태 |
|------|------|
| `npm run build` | **0 오류** (1796 모듈, 304ms) |
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

### 발견된 잠재적 레이아웃 이슈 (시각 QA 시 확인 필요)
- `ServiceShortcutGrid`, `CashbackProgressCard`, `BalanceCardExpanded`는 내부에 `margin: layout.margin`이 있으나, `HomePage.jsx`에서 `padding: \`0 ${layout.margin}\`` 래퍼로 한 번 더 감쌈 → 이중 수평 마진(32px) 가능성
  - BannerCarousel은 자체 `margin: \`0 ${layout.margin}\`` 사용 (16px), 래퍼 없음
  - 실제 브라우저에서 확인 필요, 스크린샷 기준 맞으면 유지

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
- [ ] 이중 마진 이슈 확인 및 필요 시 수정

---

## 다음 작업 (새 세션 시작 시)

**우선순위 1 — 브라우저 시각적 QA**
- `npm run dev` 실행 후 각 화면 직접 확인
- CLAUDE.md QA 체크리스트 항목별 검증
- 발견된 시각 버그 수정
- 특히 이중 마진 이슈 (`ServiceShortcutGrid`, `BalanceCardExpanded`, `CashbackProgressCard`) 확인

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
