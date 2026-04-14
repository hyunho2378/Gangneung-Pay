import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

const CONTENT = {
  register: {
    title: '강릉페이 가맹점 신청하기',
    description: '간편하게 등록하고 매출을 늘려보세요',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="18" rx="3" stroke={colors.primary[700]} strokeWidth="1.8" />
        <path d="M3 10 H25" stroke={colors.primary[700]} strokeWidth="1.5" />
        <line x1="9" y1="15" x2="19" y2="15" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="19" x2="15" y2="19" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="21" cy="20" r="4" fill={colors.primary[700]} />
        <line x1="21" y1="18" x2="21" y2="22" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="19" y1="20" x2="23" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  portal: {
    title: '내 가게 매출 내역 확인하기',
    description: '가맹점 포탈에서 확인하세요',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="3" width="22" height="22" rx="4" stroke={colors.primary[700]} strokeWidth="1.8" />
        <path d="M3 10 H25" stroke={colors.primary[700]} strokeWidth="1.5" />
        <path d="M7 6 H7.01 M11 6 H11.01 M15 6 H15.01" stroke={colors.primary[700]} strokeWidth="2" strokeLinecap="round" />
        <rect x="7" y="14" width="5" height="8" rx="1" fill={colors.primary[100]} stroke={colors.primary[700]} strokeWidth="1.2" />
        <rect x="15" y="17" width="5" height="5" rx="1" fill={colors.primary[100]} stroke={colors.primary[700]} strokeWidth="1.2" />
        <path d="M7 19 L12 16 L16 18 L21 14" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
}

export default function B2BPromoCard({ variant = 'register', onClick }) {
  const content = CONTENT[variant] || CONTENT.register

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        margin: layout.margin,
        padding: spacing[4],
        boxShadow: shadow.card,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        borderLeft: `4px solid ${colors.primary[700]}`,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* 아이콘 */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: layout.radiusSmall,
          backgroundColor: colors.primary[100],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {content.icon}
      </div>

      {/* 텍스트 */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: `0 0 ${spacing[1]} 0`,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
          }}
        >
          {content.title}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.regular,
            color: colors.gray[500],
          }}
        >
          {content.description}
        </p>
      </div>

      {/* 화살표 */}
      <div style={{ flexShrink: 0 }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 5 L13 10 L7.5 15" stroke={colors.primary[700]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
