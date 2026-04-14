# ROUTES.md — 강릉페이 라우팅 구조
79개 화면 전부 커버 | React Router v6

## App.jsx 라우트 전체

```jsx
<Routes>
  {/* 바텀탭 5개 */}
  <Route path="/"          element={<HomePage />} />        {/* 홈 */}
  <Route path="/store"     element={<StorePage />} />       {/* 결제매장 */}
  <Route path="/life"      element={<LifePage />} />        {/* 생활편의 */}
  <Route path="/support"   element={<SupportPage />} />     {/* 지원금·혜택 */}
  <Route path="/community" element={<CommunityPage />} />   {/* 소통참여 */}

  {/* 결제/충전 */}
  <Route path="/qr"        element={<QRPage />} />          {/* p.10 */}
  <Route path="/charge"    element={<ChargePage />} />      {/* p.14,15,19 */}
  <Route path="/cashback"  element={<CashbackPage />} />    {/* p.11,12 */}
  <Route path="/history"   element={<HistoryPage />} />     {/* p.13 */}

  {/* 서비스 안내 */}
  <Route path="/service-edit"   element={<ServiceEditPage />} />     {/* p.22 */}
  <Route path="/kakao-guide"    element={<KakaoPayGuidePage />} />   {/* p.27 */}
  <Route path="/transport-card" element={<TransportCardPage />} />   {/* p.51 */}
  <Route path="/usage-guide"    element={<UsageGuidePage />} />      {/* p.16,17,38 */}

  {/* 메뉴/설정 */}
  <Route path="/menu"            element={<MenuPage />} />           {/* p.34,41 */}
  <Route path="/settings"        element={<SettingsPage />} />       {/* p.36 */}
  <Route path="/notification"    element={<NotificationPage />} />   {/* p.42 */}
  <Route path="/customer-center" element={<CustomerCenterPage />} /> {/* p.35 */}
  <Route path="/chatbot"         element={<ChatbotPage />} />        {/* p.75~79 */}
  <Route path="/card-lost"       element={<CardLostPage />} />       {/* p.39,40 */}
  <Route path="/coupon"          element={<CouponPage />} />         {/* p.56 */}

  {/* 지원금 */}
  <Route path="/support/:id"      element={<SupportDetailPage />} /> {/* p.58~61 */}
  <Route path="/support-wish"     element={<WishSupportPage />} />   {/* p.57 */}
  <Route path="/custom-info"      element={<CustomInfoPage />} />    {/* p.29 */}

  {/* 소통참여 */}
  <Route path="/donation"          element={<DonationPage />} />         {/* p.67,69,70 */}
  <Route path="/donation/:id"      element={<DonationDetailPage />} />   {/* p.68 */}
  <Route path="/donation-history"  element={<DonationHistoryPage />} />  {/* p.71 */}
  <Route path="/news"              element={<NewsListPage />} />          {/* p.63 */}
  <Route path="/place/:id"         element={<PlaceDetailPage />} />      {/* p.72 */}
</Routes>
```

## 화면별 스팟 스샷 참조

| 경로 | 관련 스샷 페이지 |
|------|----------------|
| `/` | p.1, 6, 7, 8, 9, 21, 23, 26, 28, 30 (홈 전체 스크롤) |
| `/` (큰글씨) | p.31, 32, 33, 73 |
| `/store` | p.24, 25, 43, 44, 45 |
| `/life` | p.46, 47, 48, 49, 50 |
| `/support` | p.52, 53, 54, 55 |
| `/community` | p.62, 64, 65, 66 |
| `/qr` | p.10 |
| `/charge` | p.14, 15, 19, 74 |
| `/cashback` | p.11, 12 |
| `/history` | p.13 |
| `/menu` | p.34, 41 |
| `/settings` | p.36 |
| `/notification` | p.42 |
| `/chatbot` | p.75, 76, 77, 78, 79 |
| `/donation` | p.67, 69, 70 |
| 모달/팝업 | p.5, 18, 20, 37 |
| 이용안내 | p.16, 17, 38 |