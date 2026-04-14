import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import TopAppBarLargeText from '../components/layout/TopAppBarLargeText'
import BottomNavBar from '../components/layout/BottomNavBar'
import QRFloatingBar from '../components/layout/QRFloatingBar'

import BannerCarousel from '../components/home/BannerCarousel'
import OnboardingStepper from '../components/home/OnboardingStepper'
import BalanceCardExpanded from '../components/home/BalanceCardExpanded'
import CashbackProgressCard from '../components/home/CashbackProgressCard'
import ServiceShortcutGrid from '../components/home/ServiceShortcutGrid'
import SectionHeader from '../components/home/SectionHeader'
import RecentPaymentEmpty from '../components/home/RecentPaymentEmpty'
import StoreRecommendCard from '../components/home/StoreRecommendCard'
import ExploreScrollCard from '../components/home/ExploreScrollCard'
import SupportRankingList from '../components/home/SupportRankingList'
import PromoHorizontalCard from '../components/home/PromoHorizontalCard'
import B2BPromoCard from '../components/home/B2BPromoCard'
import AnnouncementModal from '../components/common/AnnouncementModal'

const mockBalance = { cashback: 3200, card: 120000, charge: 0 }

const mockStores = [
  { id: 1, name: '초당순두부', category: '음식점', distance: '0.3km' },
  { id: 2, name: '강릉중앙시장', category: '마트', distance: '1.1km' },
  { id: 3, name: '보헤미안커피', category: '카페', distance: '0.8km' },
]

const mockRanking = [
  { rank: 1, name: '지역사회서비스', amount: '월 최대 30만원' },
  { rank: 2, name: '국민내일배움카드', amount: '최대 300만원' },
  { rank: 3, name: '배우자 출산휴가', amount: '최대 630만원' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isLargeText, showAnnouncement, closeAnnouncement } = useApp()

  return (
    <ScreenContainer>
      {isLargeText ? <TopAppBarLargeText /> : <TopAppBar />}

      {showAnnouncement && (
        <AnnouncementModal onClose={closeAnnouncement} />
      )}

      <div
        style={{
          overflowY: 'auto',
          paddingBottom: '139px',
          flex: 1,
          backgroundColor: colors.surface.background,
        }}
      >
        <BannerCarousel />

        <OnboardingStepper currentStep={3} />

        <BalanceCardExpanded balance={mockBalance} />

        <CashbackProgressCard current={3200} max={30000} percent={10.7} />

        <ServiceShortcutGrid />

        <div
          style={{
            height: '1px',
            backgroundColor: colors.gray[200],
            margin: `${layout.margin} 0`,
          }}
        />

        <SectionHeader
          title="최근 결제 내역"
          onViewAll={() => navigate('/history')}
        />
        <RecentPaymentEmpty />

        <SectionHeader
          title="결제 가능 매장"
          onViewAll={() => navigate('/store')}
        />
        <StoreRecommendCard stores={mockStores} />

        <ExploreScrollCard />

        <SectionHeader
          title="지원금 랭킹"
          onViewAll={() => navigate('/support')}
          showViewAll={true}
        />
        <SupportRankingList items={mockRanking} />

        <PromoHorizontalCard
          bgColor={colors.kakaoBg}
          textColor={colors.gray[900]}
          title="카카오페이로도 결제하세요"
          description="강릉페이를 카카오페이와 연결하면 더 편리하게"
          onClick={() => navigate('/kakao-guide')}
        />

        <B2BPromoCard variant="register" />

        <B2BPromoCard variant="portal" />

        <div style={{ height: layout.margin }} />
      </div>

      <QRFloatingBar />
      <BottomNavBar />
    </ScreenContainer>
  )
}
