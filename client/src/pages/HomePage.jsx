import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useUser } from '../context/UserContext'
import { useOnboarding } from '../context/OnboardingContext'
import { colors, layout, spacing } from '../tokens/tokens'
import CoachMarkOverlay from '../components/common/CoachMarkOverlay'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import TopAppBarLargeText from '../components/layout/TopAppBarLargeText'
import BottomNavBar from '../components/layout/BottomNavBar'
import HomePageLarge from './HomePageLarge'

import WidgetAddBanner from '../components/home/WidgetAddBanner'
import BannerCarousel from '../components/home/BannerCarousel'
import BalanceCardExpanded from '../components/home/BalanceCardExpanded'
import CardApplyCTA from '../components/home/CardApplyCTA'
import CashbackEntryCard from '../components/home/CashbackEntryCard'
import MonthlyCashbackModal from '../components/home/MonthlyCashbackModal'
import CardBackFaceId from '../components/home/CardBackFaceId'
import SectionHeader from '../components/home/SectionHeader'
import StoreRecommendCard from '../components/home/StoreRecommendCard'
import ExploreScrollCard from '../components/home/ExploreScrollCard'

const mockStores = [
  { id: 1, name: '초당순두부', category: '음식점', distance: '0.3km' },
  { id: 2, name: '강릉중앙시장', category: '마트', distance: '1.1km' },
  { id: 3, name: '보헤미안커피', category: '카페', distance: '0.8km' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isLargeText } = useApp()
  const { hasCard, balance, monthlyCashback } = useUser()
  const {
    hasSeenCardApplyCoach,
    hasSeenChargeCoach,
    hasSeenRefundCoach,
    hasSeenCashbackModal,
    markSeen,
    completeAllCoachmarks,
  } = useOnboarding()

  const chargeButtonRef = useRef(null)
  const refundButtonRef = useRef(null)
  const applyButtonRef = useRef(null)

  const [coachStep, setCoachStep] = useState(null) // 'cardApply' | 'charge' | 'refund' | null
  const [showCashbackModal, setShowCashbackModal] = useState(false)
  const [showFaceId, setShowFaceId] = useState(false)
  const [showCardBack, setShowCardBack] = useState(false)

  const handleCardIconClick = () => {
    if (showFaceId || showCardBack) return
    setShowFaceId(true)
  }

  const handleFaceIdComplete = () => {
    setShowFaceId(false)
    setShowCardBack(true)
  }

  // B4: 코치마크 자동 노출 단계 결정
  useEffect(() => {
    if (!hasCard && !hasSeenCardApplyCoach) {
      setCoachStep('cardApply')
      return
    }
    if (hasCard && !hasSeenChargeCoach) {
      setCoachStep('charge')
      return
    }
    if (hasCard && hasSeenChargeCoach && !hasSeenRefundCoach) {
      setCoachStep('refund')
      return
    }
    // 코치마크 모두 본 후 + 캐시백 모달 안 봤으면 자동 노출
    if (hasCard && hasSeenChargeCoach && hasSeenRefundCoach && !hasSeenCashbackModal) {
      setCoachStep(null)
      const t = setTimeout(() => setShowCashbackModal(true), 500)
      return () => clearTimeout(t)
    }
    setCoachStep(null)
  }, [hasCard, hasSeenCardApplyCoach, hasSeenChargeCoach, hasSeenRefundCoach, hasSeenCashbackModal])

  const cashbackPercent = Math.min(100, Math.floor((monthlyCashback / 30000) * 100))

  if (isLargeText) return <HomePageLarge />

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
        {/* H-01: 위젯 추가 배너 */}
        <WidgetAddBanner />

        {/* 캐러셀 */}
        <div style={{ marginBottom: spacing[3] }}>
          <BannerCarousel />
        </div>

        {/* B4: 카드 보유 여부 분기 */}
        {hasCard ? (
          <>
            <BalanceCardExpanded
              balance={{ cashback: monthlyCashback, card: balance, charge: 0 }}
              cashbackMax={30000}
              cashbackPercent={cashbackPercent}
              onCardIconClick={handleCardIconClick}
              chargeButtonRef={chargeButtonRef}
              refundButtonRef={refundButtonRef}
              cardBackOpen={showCardBack}
              onCardBackClose={() => setShowCardBack(false)}
            />
            {/* B7: 진입 카드 */}
            <div style={{ marginTop: spacing[2] }}>
              <CashbackEntryCard onClick={() => navigate('/cashback')} />
            </div>
          </>
        ) : (
          // B6: 신규 사용자 CTA 카드
          <CardApplyCTA applyButtonRef={applyButtonRef} />
        )}

        {/* 결제 가능 매장 */}
        <SectionHeader
          title="결제 가능 매장"
          onViewAll={() => navigate('/store')}
        />
        <StoreRecommendCard stores={mockStores} />

        {/* 강릉페이 120% 활용하기 */}
        <div style={{ marginTop: spacing[4], marginBottom: spacing[3] }}>
          <ExploreScrollCard />
        </div>

        <div style={{ height: layout.margin }} />
      </div>

      {/* C3/C4: Dynamic Island Face ID */}
      <CardBackFaceId
        open={showFaceId}
        onClose={handleFaceIdComplete}
      />
      <MonthlyCashbackModal
        open={showCashbackModal}
        onClose={() => {
          setShowCashbackModal(false)
          markSeen('cashbackModal')
        }}
        monthlyCashback={monthlyCashback}
      />
      <BottomNavBar />

      {/* B4: 코치마크 오버레이 */}
      {coachStep === 'cardApply' && (
        <CoachMarkOverlay
          targetRef={applyButtonRef}
          placement="bottom"
          message="강릉페이 카드를 신청해보세요. 신청하기를 누르면 1초 만에 카드를 받을 수 있어요."
          step={1}
          totalSteps={1}
          onNext={() => {
            markSeen('cardApply')
            setCoachStep(null)
          }}
          onSkip={() => {
            markSeen('cardApply')
            setCoachStep(null)
          }}
        />
      )}

      {coachStep === 'charge' && (
        <CoachMarkOverlay
          targetRef={chargeButtonRef}
          message="[충전] 버튼을 눌러 강릉페이 잔액을 충전할 수 있습니다."
          step={1}
          totalSteps={2}
          onNext={() => markSeen('charge')}
          onSkip={() => completeAllCoachmarks()}
        />
      )}

      {coachStep === 'refund' && (
        <CoachMarkOverlay
          targetRef={refundButtonRef}
          message="[환불] 버튼으로 충전한 금액을 다시 환불받을 수 있습니다."
          step={2}
          totalSteps={2}
          onNext={() => markSeen('refund')}
          onSkip={() => completeAllCoachmarks()}
        />
      )}
    </ScreenContainer>
  )
}
