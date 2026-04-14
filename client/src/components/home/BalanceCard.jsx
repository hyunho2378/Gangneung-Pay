import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import LogoWhite from '../../assets/logos/강릉페이로고_화이트.svg'

export default function BalanceCard({
  balance = { cashback: 3200, card: 120000, charge: 0 },
  expanded = false,
  onToggle,
}) {
  const fmt = (n) => n.toLocaleString('ko-KR') + '원'

  return (
    <div
      onClick={onToggle}
      style={{
        backgroundColor: colors.surface.darkCard,
        borderRadius: layout.radiusCard,
        margin: layout.margin,
        padding: spacing[4],
        cursor: onToggle ? 'pointer' : 'default',
        boxShadow: shadow.button,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 카드 번호 */}
      <p
        style={{
          margin: `0 0 ${spacing[4]} 0`,
          color: colors.onDark.secondary,
          fontSize: typography.size.xs,
          fontWeight: typography.weight.regular,
          letterSpacing: '1px',
        }}
      >
        &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 1234
      </p>

      {/* 잔액 정보 행 3개 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        {/* 캐시백 */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.regular,
            }}
          >
            캐시백
          </span>
          <span
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
            }}
          >
            {fmt(balance.cashback)}
          </span>
        </div>

        {/* 강릉페이(1) — 메인 잔액 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.15)',
            borderBottom: '1px solid rgba(255,255,255,0.15)',
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
          }}
        >
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
            }}
          >
            강릉페이(1)
          </span>
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.balance,
              fontWeight: typography.weight.bold,
              lineHeight: 1,
            }}
          >
            {fmt(balance.card)}
          </span>
        </div>

        {/* 충전잔액 */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.regular,
            }}
          >
            충전잔액
          </span>
          <span
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
            }}
          >
            {fmt(balance.charge)}
          </span>
        </div>
      </div>

      {/* 강릉페이 로고 워터마크 */}
      <div
        style={{
          position: 'absolute',
          right: spacing[4],
          top: spacing[4],
          opacity: 0.7,
        }}
      >
        <img src={LogoWhite} alt="강릉페이" style={{ height: '18px' }} />
      </div>

      {/* 펼침 토글 화살표 */}
      {onToggle && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: spacing[3],
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            style={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
            }}
          >
            <path
              d="M5 7.5 L10 12.5 L15 7.5"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  )
}
