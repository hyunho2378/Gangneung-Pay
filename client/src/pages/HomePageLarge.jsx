import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useTypography } from '../hooks/useTypography'
import { colors, spacing, layout, shadow, typography } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import BottomNavBar from '../components/layout/BottomNavBar'
import TopAppBarLargeText from '../components/layout/TopAppBarLargeText'
import { ChevronRight, Receipt, HelpCircle } from 'lucide-react'

// LARGETEXT.md 4.4절 — 3단 + 2버튼 잔액 카드
function BalanceCardLarge({ balance, monthlyCashback, sizes, navigate, fmt }) {
  return (
    <div style={{
      borderRadius: layout.radiusCard,
      overflow: 'hidden',
      boxShadow: shadow.card,
    }}>
      {/* 1단: 캐시백 — surface.background 배경 */}
      <div style={{
        backgroundColor: colors.surface.background,
        padding: `${spacing[4]} ${spacing[5]}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{
          fontSize: sizes.md,
          fontWeight: typography.weight.medium,
          color: colors.gray[500],
          fontFamily: typography.fontFamily,
        }}>
          캐시백
        </span>
        <span style={{
          fontSize: sizes.xl,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          fontFamily: typography.fontFamily,
        }}>
          {fmt(monthlyCashback)}원
        </span>
      </div>

      {/* 1단과 2-3단 사이 구분선 */}
      <div style={{ height: '1px', backgroundColor: colors.gray[200] }} />

      {/* 2-3단 + 버튼 — surface.card 배경 */}
      <div style={{
        backgroundColor: colors.surface.card,
        padding: `${spacing[4]} ${spacing[5]} ${spacing[5]}`,
      }}>
        {/* 2단: 강릉페이(1) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing[3],
        }}>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.medium,
            color: colors.gray[500],
            fontFamily: typography.fontFamily,
          }}>
            강릉페이(1)
          </span>
          <span style={{
            fontSize: sizes.xl,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
            fontFamily: typography.fontFamily,
          }}>
            {fmt(balance)}원
          </span>
        </div>

        {/* 3단: 충전 잔액 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: spacing[5],
          marginBottom: spacing[4],
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}>
          <span style={{
            fontSize: sizes.sm,
            fontWeight: typography.weight.regular,
            color: colors.gray[400],
            fontFamily: typography.fontFamily,
          }}>
            충전 잔액
          </span>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.medium,
            color: colors.gray[700],
            fontFamily: typography.fontFamily,
          }}>
            {fmt(balance)}원
          </span>
        </div>

        {/* 2버튼: QR결제 (outline) + 충전 (fill), height 68px */}
        <div style={{ display: 'flex', gap: spacing[3] }}>
          <button
            onClick={() => navigate('/qr')}
            style={{
              flex: 1,
              height: '68px',
              borderRadius: layout.radiusButton,
              border: `1px solid ${colors.gray[200]}`,
              backgroundColor: colors.surface.card,
              color: colors.gray[900],
              fontSize: sizes.md,
              fontWeight: typography.weight.bold,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
            }}
          >
            QR결제
          </button>
          <button
            onClick={() => navigate('/charge')}
            style={{
              flex: 1,
              height: '68px',
              borderRadius: layout.radiusButton,
              border: 'none',
              backgroundColor: colors.primary[700],
              color: colors.surface.card,
              fontSize: sizes.md,
              fontWeight: typography.weight.bold,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
            }}
          >
            충전
          </button>
        </div>
      </div>
    </div>
  )
}

// LARGETEXT.md 4.5절 — 캐시백 카드
function CashbackCardLarge({ monthlyCashback, sizes, fmt, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        boxShadow: shadow.card,
        padding: spacing[5],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <div>
        {/* 1줄: 캐시백 10% */}
        <div style={{ marginBottom: spacing[2] }}>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.regular,
            color: colors.gray[700],
            fontFamily: typography.fontFamily,
          }}>
            캐시백{' '}
          </span>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.bold,
            color: colors.primary[700],
            fontFamily: typography.fontFamily,
          }}>
            10%
          </span>
        </div>

        {/* 2줄: 받은 금액 */}
        <div style={{
          fontSize: sizes.lg,
          fontWeight: typography.weight.bold,
          color: colors.teal[500],
          fontFamily: typography.fontFamily,
          marginBottom: spacing[1],
        }}>
          받은 금액 {fmt(monthlyCashback)}원
        </div>

        {/* 3줄: 이번 달 최대 */}
        <div style={{
          fontSize: sizes.sm,
          color: colors.gray[500],
          fontFamily: typography.fontFamily,
        }}>
          이번 달 최대 3만원
        </div>
      </div>

      {/* 우측 chevron 32px */}
      <ChevronRight size={32} color={colors.gray[400]} strokeWidth={1.8} />
    </div>
  )
}

// LARGETEXT.md 4.5절 — 액션 카드 (이용내역, 이용안내)
function ActionCardLarge({ title, icon: Icon, iconBg, iconColor, sizes, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        boxShadow: shadow.card,
        padding: spacing[5],
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <span style={{
        fontSize: sizes.lg,
        fontWeight: typography.weight.bold,
        color: colors.gray[900],
        fontFamily: typography.fontFamily,
      }}>
        {title}
      </span>

      {/* 우측 56×56 아이콘 박스 */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: layout.radiusCard,
        backgroundColor: iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={24} color={iconColor} strokeWidth={1.8} />
      </div>
    </div>
  )
}

// LARGETEXT.md 4.5절 환불 카드 + 4.6절 3D 일러스트
function RefundCardLarge({ sizes, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        boxShadow: shadow.card,
        padding: spacing[6],
        minHeight: '140px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <div>
        <div style={{
          fontSize: sizes.lg,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          fontFamily: typography.fontFamily,
          marginBottom: spacing[2],
        }}>
          환불(출금)
        </div>
        <div style={{
          fontSize: sizes.sm,
          color: colors.gray[500],
          fontFamily: typography.fontFamily,
        }}>
          충전 금액을 다시 돌려받아요
        </div>
      </div>

      {/* 4.6절 사양 — 80×80 3D 일러스트 SVG */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="50" rx="28" ry="24" fill="#22C55E" />
        <ellipse cx="40" cy="48" rx="28" ry="24" fill="#15803D" opacity="0.4" />
        <path d="M28 26 L52 26 L48 34 L32 34 Z" fill="#15803D" />
        <text x="40" y="56" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" fontFamily="sans-serif">₩</text>
        <circle cx="60" cy="32" r="10" fill="#FBBF24" />
        <text x="60" y="37" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400E" fontFamily="sans-serif">₩</text>
      </svg>
    </div>
  )
}

export default function HomePageLarge() {
  const navigate = useNavigate()
  const sizes = useTypography()
  const { balance, monthlyCashback } = useUser()
  const fmt = (n) => n.toLocaleString('ko-KR')

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarLargeText />

      <div style={{
        overflowY: 'auto',
        paddingTop: spacing[3],
        paddingLeft: layout.margin,
        paddingRight: layout.margin,
        paddingBottom: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[4],
      }}>
        {/* 잔액 카드 — LARGETEXT.md 4.4절 */}
        <BalanceCardLarge
          balance={balance}
          monthlyCashback={monthlyCashback}
          sizes={sizes}
          navigate={navigate}
          fmt={fmt}
        />

        {/* 캐시백 카드 — LARGETEXT.md 4.5절 */}
        <CashbackCardLarge
          monthlyCashback={monthlyCashback}
          sizes={sizes}
          fmt={fmt}
          onClick={() => navigate('/cashback')}
        />

        {/* 이용 내역 카드 — LARGETEXT.md 4.5절 액션 카드 */}
        <ActionCardLarge
          title="이용 내역"
          icon={Receipt}
          iconBg={colors.primary[100]}
          iconColor={colors.primary[700]}
          sizes={sizes}
          onClick={() => navigate('/history')}
        />

        {/* 환불(출금) 카드 — LARGETEXT.md 4.5절 환불 카드 */}
        <RefundCardLarge sizes={sizes} onClick={() => navigate('/refund')} />

        {/* 강릉페이 이용안내 카드 — LARGETEXT.md 4.5절 액션 카드 */}
        <ActionCardLarge
          title="강릉페이 이용안내"
          icon={HelpCircle}
          iconBg={colors.gray[100]}
          iconColor={colors.gray[700]}
          sizes={sizes}
          onClick={() => navigate('/customer-center')}
        />
      </div>

      <BottomNavBar />
    </ScreenContainer>
  )
}
