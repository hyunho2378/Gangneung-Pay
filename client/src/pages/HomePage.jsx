import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info, ChevronRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useUser } from '../context/UserContext'
import { useOnboarding } from '../context/OnboardingContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import CoachMarkOverlay from '../components/common/CoachMarkOverlay'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import TopAppBarLargeText from '../components/layout/TopAppBarLargeText'
import BottomNavBar from '../components/layout/BottomNavBar'

import WidgetAddBanner from '../components/home/WidgetAddBanner'
// AnnouncementBanner: R4 — 인라인 캐시백 배너 제거 (MonthlyCashbackModal로 대체)
import BannerCarousel from '../components/home/BannerCarousel'
import BalanceCardExpanded from '../components/home/BalanceCardExpanded'
// CardActions: R2 — 카드 내부 3슬롯 복원으로 외부 컴포넌트 제거
import MonthlyCashbackModal from '../components/home/MonthlyCashbackModal'
import SectionHeader from '../components/home/SectionHeader'
import StoreRecommendCard from '../components/home/StoreRecommendCard'
import ExploreScrollCard from '../components/home/ExploreScrollCard'
import CardBackModal from '../components/home/CardBackModal'
// HIDDEN: PromoBundle, ServiceShortcutGrid, RecentPaymentEmpty, PromoHorizontalCard
// import PromoBundle from '../components/home/PromoBundle'
// import ServiceShortcutGrid from '../components/home/ServiceShortcutGrid'
// import RecentPaymentEmpty from '../components/home/RecentPaymentEmpty'
// import PromoHorizontalCard from '../components/home/PromoHorizontalCard'

const mockStores = [
  { id: 1, name: '초당순두부', category: '음식점', distance: '0.3km' },
  { id: 2, name: '강릉중앙시장', category: '마트', distance: '1.1km' },
  { id: 3, name: '보헤미안커피', category: '카페', distance: '0.8km' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isLargeText } = useApp()
  const { hasCard, balance: userBalance, shouldShowCashbackModalOnNextHome, consumeCashbackModalTrigger } = useUser()
  const { hasSeenHomeCoachmark, hasSeenMonthlyCashbackModal, markCoachmarkSeen } = useOnboarding()

  const [showCardBack, setShowCardBack] = useState(false)
  const [showCashbackModal, setShowCashbackModal] = useState(false)

  // R8: 5월 캐시백 모달 — 카드 등록 완료 후 첫 홈 복귀 시에만 자동 노출 (신규 사용자 첫 진입 시 금지)
  useEffect(() => {
    if (!hasCard) return
    if (shouldShowCashbackModalOnNextHome && !hasSeenMonthlyCashbackModal) {
      setShowCashbackModal(true)
      consumeCashbackModalTrigger()
    }
  }, [hasCard, shouldShowCashbackModalOnNextHome, hasSeenMonthlyCashbackModal])

  const handleCashbackModalClose = () => {
    setShowCashbackModal(false)
    markCoachmarkSeen('monthlyCashback')
  }

  // S7: 코치마크 ref 설정
  // 기존 사용자: 충전 버튼 (CardActions)
  const chargeButtonRef = useRef(null)
  const [chargeButtonRect, setChargeButtonRect] = useState(null)
  // 신규 사용자: 캐러셀 신청하기 버튼
  const applyButtonRef = useRef(null)
  const [applyButtonRect, setApplyButtonRect] = useState(null)

  useEffect(() => {
    if (chargeButtonRef.current && hasCard && !hasSeenHomeCoachmark) {
      setChargeButtonRect(chargeButtonRef.current.getBoundingClientRect())
    }
  }, [hasCard, hasSeenHomeCoachmark])

  useEffect(() => {
    if (applyButtonRef.current && !hasCard && !hasSeenHomeCoachmark) {
      setApplyButtonRect(applyButtonRef.current.getBoundingClientRect())
    }
  }, [hasCard, hasSeenHomeCoachmark])

  const cardBalance = { cashback: 0, card: userBalance, charge: 0 }

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

        {/* Task 8: 캐러셀 상단 이동 */}
        <div style={{ marginBottom: spacing[3] }}>
          <BannerCarousel applyButtonRef={applyButtonRef} />
        </div>

        {/* Task 4: 카드 보유 여부 분기 */}
        {hasCard ? (
          <>
            {/* R1: 잔액 카드 — 3버튼 카드 내부 통합, chargeButtonRef 전달 */}
            <BalanceCardExpanded
              balance={cardBalance}
              cashbackMax={30000}
              cashbackPercent={10.7}
              onFlip={() => setShowCardBack(true)}
              chargeButtonRef={chargeButtonRef}
            />
          </>
        ) : (
          // 신규 사용자: 카드 신청 CTA 카드
          <div
            onClick={() => navigate('/card-apply')}
            style={{
              margin: layout.margin,
              backgroundColor: colors.primary[50],
              border: `1px solid ${colors.primary[100]}`,
              borderRadius: layout.radiusCard,
              padding: spacing[5],
              cursor: 'pointer',
            }}
          >
            <div style={{
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              fontFamily: typography.fontFamily,
              marginBottom: spacing[1],
            }}>
              강릉페이 카드를 신청하세요
            </div>
            <div style={{
              fontSize: typography.size.xs,
              color: colors.gray[500],
              fontFamily: typography.fontFamily,
              marginBottom: spacing[4],
            }}>
              최대 10% 캐시백
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); navigate('/card-apply') }}
              style={{
                backgroundColor: colors.primary[700],
                border: 'none',
                borderRadius: layout.radiusButton,
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                padding: `${spacing[2]} ${spacing[4]}`,
                cursor: 'pointer',
                minHeight: layout.touchMin,
                fontFamily: typography.fontFamily,
              }}
            >
              신청하기
            </button>
          </div>
        )}

        {/* Task 7: 5월 캐시백 안내 진입 카드 */}
        <div
          onClick={() => setShowCashbackModal(true)}
          style={{
            margin: `${spacing[2]} ${layout.margin}`,
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: `${spacing[3]} ${spacing[4]}`,
            display: 'flex',
            alignItems: 'center',
            gap: spacing[3],
            cursor: 'pointer',
            border: `1px solid ${colors.gray[100]}`,
          }}
        >
          <Info size={20} color={colors.primary[700]} strokeWidth={1.8} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              color: colors.gray[900],
              fontFamily: typography.fontFamily,
            }}>
              5월 캐시백 안내
            </div>
            <div style={{
              fontSize: typography.size.xs,
              color: colors.gray[500],
              fontFamily: typography.fontFamily,
              marginTop: '2px',
            }}>
              이번 달 받은 캐시백 확인하기
            </div>
          </div>
          <ChevronRight size={16} color={colors.gray[400]} strokeWidth={1.8} />
        </div>

        {/* 결제 가능 매장 */}
        <SectionHeader
          title="결제 가능 매장"
          onViewAll={() => navigate('/store')}
        />
        <StoreRecommendCard stores={mockStores} />

        {/* Task 9: 강릉페이 120% 활용하기 캐러셀 복원 */}
        <div style={{ marginTop: spacing[4], marginBottom: spacing[3] }}>
          <ExploreScrollCard />
        </div>

        <div style={{ height: layout.margin }} />
      </div>

      <CardBackModal isOpen={showCardBack} onClose={() => setShowCardBack(false)} onAuthenticated={() => setShowCardBack(false)} />
      <MonthlyCashbackModal isOpen={showCashbackModal} onClose={handleCashbackModalClose} />
      <BottomNavBar />

      {/* Task 11: 신규 사용자 코치마크 — 캐러셀 신청하기 버튼 */}
      {!hasCard && !hasSeenHomeCoachmark && applyButtonRect && (
        <CoachMarkOverlay
          targetRect={applyButtonRect}
          message="강릉페이 카드를 신청해보세요. 신청하기를 누르면 1초 만에 카드를 받을 수 있어요."
          step={1}
          totalSteps={1}
          onNext={() => {
            markCoachmarkSeen('homeCoachmark')
            navigate('/card-apply')
          }}
          onSkip={() => markCoachmarkSeen('homeCoachmark')}
        />
      )}

      {/* 기존 사용자 코치마크 — 충전 버튼 */}
      {hasCard && !hasSeenHomeCoachmark && chargeButtonRect && (
        <CoachMarkOverlay
          targetRect={chargeButtonRect}
          message="[충전] 버튼을 눌러 강릉페이 잔액을 충전할 수 있습니다. 다음을 눌러 충전 화면으로 이동해보세요."
          step={1}
          totalSteps={2}
          onNext={() => {
            markCoachmarkSeen('homeCoachmark')
            navigate('/charge', { state: { fromCoach: true } })
          }}
          onSkip={() => markCoachmarkSeen('homeCoachmark')}
        />
      )}
    </ScreenContainer>
  )
}
