import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { OnboardingProvider } from './context/OnboardingContext'
import { UserProvider } from './context/UserContext'
import SplashPage from './pages/SplashPage'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import LifePage from './pages/LifePage'
import SupportPage from './pages/SupportPage'
import CommunityPage from './pages/CommunityPage'
import QRPage from './pages/QRPage'
import ChargePage from './pages/ChargePage'
import CashbackPage from './pages/CashbackPage'
import HistoryPage from './pages/HistoryPage'
import ServiceEditPage from './pages/ServiceEditPage'
import KakaoPayGuidePage from './pages/KakaoPayGuidePage'
import TransportCardPage from './pages/TransportCardPage'
import UsageGuidePage from './pages/UsageGuidePage'

import SettingsPage from './pages/SettingsPage'
import NotificationPage from './pages/NotificationPage'
import CustomerCenterPage from './pages/CustomerCenterPage'
import ChatbotPage from './pages/ChatbotPage'
import CardLostPage from './pages/CardLostPage'
import CouponPage from './pages/CouponPage'
import SupportDetailPage from './pages/SupportDetailPage'
import WishSupportPage from './pages/WishSupportPage'
import CustomInfoPage from './pages/CustomInfoPage'
import DonationPage from './pages/DonationPage'
import DonationDetailPage from './pages/DonationDetailPage'
import DonationHistoryPage from './pages/DonationHistoryPage'
import NewsListPage from './pages/NewsListPage'
import NewsDetailPage from './pages/NewsDetailPage'
import PlaceDetailPage from './pages/PlaceDetailPage'
// Phase 3 신규
import MyPage from './pages/MyPage'
import SearchPage from './pages/SearchPage'
import CardApplyPage from './pages/CardApplyPage'
import RefundPage from './pages/RefundPage'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <SplashPage />

  return (
    <AppProvider>
      <UserProvider>
      <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          {/* 바텀탭 5개 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/life" element={<LifePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/community" element={<CommunityPage />} />

          {/* 결제/충전 */}
          <Route path="/qr" element={<QRPage />} />
          <Route path="/charge" element={<ChargePage />} />
          <Route path="/cashback" element={<CashbackPage />} />
          <Route path="/history" element={<HistoryPage />} />

          {/* 서비스 안내 */}
          <Route path="/service-edit" element={<ServiceEditPage />} />
          <Route path="/kakao-guide" element={<KakaoPayGuidePage />} />
          <Route path="/transport-card" element={<TransportCardPage />} />
          <Route path="/usage-guide" element={<UsageGuidePage />} />

          {/* Phase 3 신규 */}
          <Route path="/my" element={<MyPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/card-apply" element={<CardApplyPage />} />
          <Route path="/refund" element={<RefundPage />} />

          {/* 메뉴/설정 */}
          <Route path="/menu" element={<Navigate to="/my" replace />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/customer-center" element={<CustomerCenterPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/card-lost" element={<CardLostPage />} />
          <Route path="/coupon" element={<CouponPage />} />

          {/* 지원금 */}
          <Route path="/support/:id" element={<SupportDetailPage />} />
          <Route path="/support-wish" element={<WishSupportPage />} />
          <Route path="/custom-info" element={<CustomInfoPage />} />

          {/* 소통참여 */}
          <Route path="/donation" element={<DonationPage />} />
          <Route path="/donation/:id" element={<DonationDetailPage />} />
          <Route path="/donation-history" element={<DonationHistoryPage />} />
          <Route path="/news" element={<NewsListPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/place/:id" element={<PlaceDetailPage />} />
        </Routes>
      </BrowserRouter>
      </OnboardingProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App
