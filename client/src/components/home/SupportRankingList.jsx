import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

const defaultItems = [
  { rank: 1, name: '지역사회서비스', amount: '월 최대 30만원' },
  { rank: 2, name: '국민내일배움카드', amount: '최대 300만원' },
  { rank: 3, name: '배우자 출산휴가 급여', amount: '최대 630만원' },
]

const MEDAL_COLORS = {
  1: { bg: colors.medal.goldBg,   icon: colors.medal.goldIcon,   border: colors.medal.goldBorder },
  2: { bg: colors.medal.silverBg, icon: colors.medal.silverIcon, border: colors.medal.silverBorder },
  3: { bg: colors.medal.bronzeBg, icon: colors.medal.bronzeIcon, border: colors.medal.bronzeBorder },
}

function MedalIcon({ rank }) {
  const c = MEDAL_COLORS[rank] || MEDAL_COLORS[3]
  return (
    <div
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: c.bg,
        border: `1.5px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="12" r="6" fill={c.icon} />
        <path d="M7 7 L10 2 L13 7" stroke={c.icon} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="10" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="white" fontFamily="sans-serif">
          {rank}
        </text>
      </svg>
    </div>
  )
}

export default function SupportRankingList({ items = defaultItems }) {
  return (
    <div
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        margin: layout.margin,
        padding: `${spacing[3]} ${spacing[4]}`,
        boxShadow: shadow.card,
      }}
    >
      {items.map((item, idx) => (
        <div
          key={item.rank}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing[3],
            paddingTop: spacing[3],
            paddingBottom: spacing[3],
            borderBottom: idx < items.length - 1 ? `1px solid ${colors.gray[100]}` : 'none',
            cursor: 'pointer',
          }}
        >
          {/* 메달 아이콘 */}
          <MedalIcon rank={item.rank} />

          {/* 텍스트 */}
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: `0 0 2px 0`,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
              }}
            >
              {item.name}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.regular,
                color: colors.gray[500],
              }}
            >
              {item.amount}
            </p>
          </div>

          {/* 보기 화살표 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
            <span
              style={{
                fontSize: typography.size.xs,
                color: colors.primary[600],
                fontWeight: typography.weight.medium,
              }}
            >
              보기
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3.5 L9 7 L5 10.5" stroke={colors.primary[600]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  )
}
