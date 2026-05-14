// FrequentPlaces.jsx — 자주 가는 곳 가로 스크롤 카드

import { Store } from 'lucide-react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

const FREQUENT = [
  { id: 1, name: '초당순두부', category: '음식점', address: '금성로' },
  { id: 2, name: '테라로사', category: '카페', address: '구정면' },
  { id: 3, name: 'GS25 경포점', category: '편의점', address: '경포로' },
]

export default function FrequentPlaces() {
  return (
    <div
      style={{
        backgroundColor: colors.surface.card,
        paddingTop: spacing[4],
        paddingBottom: spacing[3],
        borderBottom: `1px solid ${colors.gray[100]}`,
      }}
    >
      {/* 제목 행 */}
      <div
        style={{
          padding: `0 ${layout.margin} ${spacing[2]}`,
          fontSize: typography.size.sm,
          fontWeight: typography.weight.semibold,
          color: colors.gray[900],
        }}
      >
        자주 가는 곳
      </div>

      {/* 가로 스크롤 카드 행 */}
      <div
        style={{
          display: 'flex',
          gap: spacing[3],
          padding: `0 ${layout.margin}`,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: spacing[1],
        }}
      >
        {FREQUENT.map((place) => (
          <div
            key={place.id}
            style={{
              width: '80px',
              flexShrink: 0,
              backgroundColor: colors.gray[50],
              border: `1px solid ${colors.gray[100]}`,
              borderRadius: layout.radiusSmall,
              padding: `${spacing[3]} ${spacing[2]}`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: spacing[1],
            }}
          >
            {/* 카테고리 아이콘 원 */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: colors.primary[50],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Store size={16} color={colors.primary[700]} />
            </div>

            {/* 매장명 */}
            <span
              style={{
                fontSize: typography.size.xxs,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {place.name}
            </span>

            {/* 카테고리 */}
            <span
              style={{
                fontSize: typography.size.xxs,
                color: colors.gray[400],
                textAlign: 'center',
              }}
            >
              {place.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
