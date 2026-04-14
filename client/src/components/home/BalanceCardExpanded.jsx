import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function BalanceCardExpanded({
  balance = { cashback: 3200, card: 120000, charge: 0 },
  onCardManage,
  onCharge,
  onQR,
}) {
  const fmt = (n) => n.toLocaleString('ko-KR') + '원'

  return (
    <div style={{ margin: layout.margin }}>
      {/* 다크 블루 카드 */}
      <div
        style={{
          backgroundColor: colors.surface.darkCard,
          borderRadius: layout.radiusCard,
          padding: spacing[4],
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

        {/* 잔액 정보 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.xs }}>캐시백</span>
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.sm, fontWeight: typography.weight.medium }}>
              {fmt(balance.cashback)}
            </span>
          </div>

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
            <span style={{ color: colors.onDark.primary, fontSize: typography.size.sm, fontWeight: typography.weight.medium }}>
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

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.xs }}>충전잔액</span>
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.sm, fontWeight: typography.weight.medium }}>
              {fmt(balance.charge)}
            </span>
          </div>
        </div>

        {/* 강릉페이 로고 워터마크 */}
        <div
          style={{
            position: 'absolute',
            right: spacing[4],
            bottom: spacing[4],
            opacity: 0.18,
          }}
        >
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none">
            <rect x="0" y="0" width="60" height="36" rx="5" fill="#FFFFFF" />
            <text x="4" y="15" fontSize="9" fontWeight="700" fill="#1B4FD8" fontFamily="sans-serif">강릉페이</text>
            <rect x="4" y="20" width="16" height="10" rx="2" fill="#D0D0D0" />
            <rect x="4" y="32" width="8" height="2" rx="1" fill="#E0E0E0" />
          </svg>
        </div>

        {/* 하단 버튼 2개 */}
        <div
          style={{
            display: 'flex',
            gap: spacing[2],
            marginTop: spacing[4],
          }}
        >
          <button
            onClick={onCardManage}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              padding: `${spacing[2]} 0`,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            카드관리
          </button>
          <button
            onClick={onCharge}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              padding: `${spacing[2]} 0`,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            충전
          </button>
        </div>
      </div>

      {/* 하단 QR결제 버튼 */}
      <button
        onClick={onQR}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing[2],
          width: '100%',
          marginTop: spacing[3],
          backgroundColor: colors.primary[700],
          border: 'none',
          borderRadius: layout.radiusButton,
          color: colors.onDark.primary,
          fontSize: typography.size.md,
          fontWeight: typography.weight.bold,
          padding: `${spacing[3]} 0`,
          cursor: 'pointer',
          boxShadow: shadow.button,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.8" />
          <rect x="12" y="2" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.8" />
          <rect x="2" y="12" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.8" />
          <rect x="4.5" y="4.5" width="3" height="3" fill="white" rx="0.5" />
          <rect x="14.5" y="4.5" width="3" height="3" fill="white" rx="0.5" />
          <rect x="4.5" y="14.5" width="3" height="3" fill="white" rx="0.5" />
          <line x1="12" y1="12" x2="12" y2="12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="12" x2="15" y2="12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="12" x2="18" y2="12.01" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="15" x2="12" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="15" x2="20" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="20" y1="15" x2="20" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="20" x2="20" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        QR결제
      </button>
    </div>
  )
}
