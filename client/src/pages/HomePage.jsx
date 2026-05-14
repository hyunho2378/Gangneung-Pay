import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useUser } from '../context/UserContext'
import { useOnboarding } from '../context/OnboardingContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
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
// HIDDEN (Task 6): ServiceShortcutGrid 빠른 메뉴 그리드 제거
// import ServiceShortcutGrid from '../components/home/ServiceShortcutGrid'
import SectionHeader from '../components/home/SectionHeader'
// HIDDEN (Task 6): RecentPaymentEmpty 최근 결제 섹션 제거
// import RecentPaymentEmpty from '../components/home/RecentPaymentEmpty'
import StoreRecommendCard from '../components/home/StoreRecommendCard'
// HIDDEN (Phase 3 feedback): ExploreScrollCard
// import ExploreScrollCard from '../components/home/ExploreScrollCard'
// HIDDEN (Phase 3 feedback): SupportRankingList
// import SupportRankingList from '../components/home/SupportRankingList'
// HIDDEN (Task 6): PromoHorizontalCard → Task 7 PromoBundle으로 대체
// import PromoHorizontalCard from '../components/home/PromoHorizontalCard'
import PromoBundle from '../components/home/PromoBundle'
import CardBackModal from '../components/home/CardBackModal'

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
  // Task 4: 신규/기존 사용자 분기
  const { hasCard, balance: userBalance } = useUser()
  // Task 2: OnboardingContext 기반 코치마크 (세션 내 1회 표시)
  const { hasSeenHomeCoachmark, markCoachmarkSeen } = useOnboarding()

  // Task 8: 카드 뒤집기 상태 (카드 본체 onClick 제거, 아이콘 버튼만 트리거)
  const [showCardBack, setShowCardBack] = useState(false)

  // S7: 코치마크 충전 버튼 위치 추적
  const chargeButtonRef = useRef(null)
  const [chargeButtonRect, setChargeButtonRect] = useState(null)

  useEffect(() => {
    if (chargeButtonRef.current && hasCard && !hasSeenHomeCoachmark) {
      setChargeButtonRect(chargeButtonRef.current.getBoundingClientRect())
    }
  }, [hasCard, hasSeenHomeCoachmark])

  // Task 4: hasCard=true 시 UserContext 잔액 사용
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

        {/* H-05: 인라인 공지 배너 */}
        <AnnouncementBanner show={showAnnouncement} onClose={closeAnnouncement} />

        {/* Task 4: 카드 보유 여부 분기 */}
        {hasCard ? (
          // 기존 사용자: 잔액 카드 (Task 8: 카드 본체 onClick 제거, onFlip prop으로 트리거)
          <BalanceCardExpanded
            balance={cardBalance}
            cashbackMax={30000}
            cashbackPercent={10.7}
            chargeButtonRef={chargeButtonRef}
            onFlip={() => setShowCardBack(true)}
          />
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
            <div
              style={{
                fontSize: typography.size.md,
                fontWeight: typography.weight.bold,
                color: colors.gray[900],
                fontFamily: typography.fontFamily,
                marginBottom: spacing[1],
              }}
            >
              강릉페이 카드를 신청하세요
            </div>
            <div
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[500],
                fontFamily: typography.fontFamily,
                marginBottom: spacing[4],
              }}
            >
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

        {/* HIDDEN (Phase 3 feedback): OnboardingStepper → 코치마크로 대체 */}
        {/* <OnboardingStepper currentStep={3} /> */}

        {/* H-03: BannerCarousel */}
        <BannerCarousel />

        {/* HIDDEN (Task 6): ServiceShortcutGrid 빠른 메뉴 그리드 */}
        {/* <ServiceShortcutGrid /> */}

        {/* HIDDEN (Task 6): 구분선 + 최근 결제 내역 섹션 */}
        {/* <div style={{ height: '1px', backgroundColor: colors.gray[200], margin: `${layout.margin} 0` }} /> */}
        {/* <SectionHeader title="최근 결제 내역" onViewAll={() => navigate('/history')} /> */}
        {/* <RecentPaymentEmpty /> */}

        {/* 결제 가능 매장 */}
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

        {/* Task 7: PromoBundle — 카드 신청 + 카카오페이 묶음 */}
        <PromoBundle />

        {/* HIDDEN (Task 6): PromoHorizontalCard 카카오페이 배너 → PromoBundle으로 대체 */}
        {/* <PromoHorizontalCard bgColor={colors.kakaoBg} textColor={colors.gray[900]} title="카카오페이로도 결제하세요" description="강릉페이를 카카오페이와 연결하면 더 편리하게" onClick={() => navigate('/kakao-guide')} /> */}

        {/* H-06: B2BPromoCard 제거 */}

        <div style={{ height: layout.margin }} />
      </div>

      {/* HIDDEN (Phase 3 feedback): QRFloatingBar → 바텀탭 QR 중앙 버튼으로 대체 */}
      {/* <QRFloatingBar /> */}
      <CardBackModal isOpen={showCardBack} onClose={() => setShowCardBack(false)} />
      <BottomNavBar />

      {/* S7: 코치마크 — 카드 보유 시, 세션 내 1회 (Task 2: OnboardingContext) */}
      {hasCard && !hasSeenHomeCoachmark && (
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
