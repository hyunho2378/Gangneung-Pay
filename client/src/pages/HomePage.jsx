import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { colors, layout } from '../tokens/tokens'
import CoachMarkOverlay from '../components/common/CoachMarkOverlay'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import TopAppBarLargeText from '../components/layout/TopAppBarLargeText'
import BottomNavBar from '../components/layout/BottomNavBar'
// HIDDEN (Phase 3 feedback): QRFloatingBar → 바텀탭 QR 중앙 버튼으로 대체
// import QRFloatingBar from '../components/layout/QRFloatingBar'

import WidgetAddBanner from '../components/home/WidgetAddBanner'
import AnnouncementBanner from '../components/home/AnnouncementBanner'
import BalanceCardExpanded from '../components/home/BalanceCardExpanded'
import BannerCarousel from '../components/home/BannerCarousel'
// HIDDEN (Phase 3 feedback): OnboardingStepper → 코치마크로 대체
// import OnboardingStepper from '../components/home/OnboardingStepper'
import ServiceShortcutGrid from '../components/home/ServiceShortcutGrid'
import SectionHeader from '../components/home/SectionHeader'
import RecentPaymentEmpty from '../components/home/RecentPaymentEmpty'
import StoreRecommendCard from '../components/home/StoreRecommendCard'
// HIDDEN (Phase 3 feedback): ExploreScrollCard
// import ExploreScrollCard from '../components/home/ExploreScrollCard'
// HIDDEN (Phase 3 feedback): SupportRankingList
// import SupportRankingList from '../components/home/SupportRankingList'
import PromoHorizontalCard from '../components/home/PromoHorizontalCard'
import CardBackModal from '../components/home/CardBackModal'

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

  // S7 코치마크 — 홈 step 1 (충전 버튼 하이라이트)
  const chargeButtonRef = useRef(null)
  const [showCoach, setShowCoach] = useState(true)
  const [chargeButtonRect, setChargeButtonRect] = useState(null)
  const [showCardBack, setShowCardBack] = useState(false)

  useEffect(() => {
    if (chargeButtonRef.current && showCoach) {
      setChargeButtonRect(chargeButtonRef.current.getBoundingClientRect())
    }
  }, [showCoach])

  return (
    <ScreenContainer>
      {isLargeText ? <TopAppBarLargeText /> : <TopAppBar />}

      <div
        style={{
          overflowY: 'auto',
          paddingBottom: '139px',
          flex: 1,
          backgroundColor: colors.surface.background,
        }}
      >
        {/* H-01: S1 위젯 추가 배너 */}
        <WidgetAddBanner />

        {/* H-05: 인라인 공지 배너 (AnnouncementModal 대체) */}
        <AnnouncementBanner show={showAnnouncement} onClose={closeAnnouncement} />

        {/* H-03: 잔액 카드 최상단으로 이동 */}
        {/* CashbackProgressCard는 BalanceCardExpanded 내부로 통합됨 (Phase 2 H-04) */}
        <div
          onClick={() => setShowCardBack(true)}
          style={{ cursor: 'pointer' }}
          aria-label="카드 뒷면 보기"
        >
          <BalanceCardExpanded
            balance={mockBalance}
            cashbackMax={30000}
            cashbackPercent={10.7}
            chargeButtonRef={chargeButtonRef}
          />
        </div>

        {/* HIDDEN (Phase 3 feedback): OnboardingStepper → 코치마크로 대체 */}
        {/* <OnboardingStepper currentStep={3} /> */}

        {/* H-03: BannerCarousel 잔액카드 아래로 이동 */}
        <BannerCarousel />

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

        {/* HIDDEN (Phase 3 feedback): ExploreScrollCard */}
        {/* <ExploreScrollCard /> */}

        {/* HIDDEN (Phase 3 feedback): SupportRankingList */}
        {/* <SectionHeader title="지원금 랭킹" onViewAll={() => navigate('/support')} showViewAll={true} /> */}
        {/* <SupportRankingList items={mockRanking} /> */}

        <PromoHorizontalCard
          bgColor={colors.kakaoBg}
          textColor={colors.gray[900]}
          title="카카오페이로도 결제하세요"
          description="강릉페이를 카카오페이와 연결하면 더 편리하게"
          onClick={() => navigate('/kakao-guide')}
        />

        {/* H-06: B2BPromoCard 제거 */}

        <div style={{ height: layout.margin }} />
      </div>

      {/* HIDDEN (Phase 3 feedback): QRFloatingBar → 바텀탭 QR 중앙 버튼으로 대체 */}
      {/* <QRFloatingBar /> */}
      <CardBackModal isOpen={showCardBack} onClose={() => setShowCardBack(false)} />
      <BottomNavBar />

      {/* S7: 코치마크 Step 1 — 충전 버튼 안내 */}
      {showCoach && (
        <CoachMarkOverlay
          targetRect={chargeButtonRect}
          message="[충전] 버튼을 눌러 강릉페이 잔액을 충전할 수 있습니다. 다음을 눌러 충전 화면으로 이동해보세요."
          step={1}
          totalSteps={2}
          onNext={() => {
            setShowCoach(false)
            navigate('/charge', { state: { fromCoach: true } })
          }}
          onSkip={() => setShowCoach(false)}
        />
      )}
    </ScreenContainer>
  )
}
