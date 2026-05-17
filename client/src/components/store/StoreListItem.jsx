// StoreListItem.jsx — M02 (p.24,44)
// 매장 목록 아이템

import { ChevronRight } from 'lucide-react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

const CATEGORY_COLORS = {
  음식점: colors.store.category.food,
  카페: colors.store.category.cafe,
  편의점: colors.store.category.convenience,
  숙박: colors.store.category.lodging,
  관광: colors.store.category.tour,
  마트: colors.store.category.mart,
  기타: colors.gray[400],
}

const GANGNEUNG_STATION = { lat: 37.7647, lng: 128.8990 }

function formatDistance(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return null
  const R = 6371
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat - GANGNEUNG_STATION.lat)
  const dLng = toRad(lng - GANGNEUNG_STATION.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(GANGNEUNG_STATION.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2
  const km = 2 * R * Math.asin(Math.sqrt(a))
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km.toFixed(1)}km`
}

function StoreIcon({ category }) {
  const bg = CATEGORY_COLORS[category] || CATEGORY_COLORS['기타']
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        {category === '음식점' && (
          <>
            <path d="M7 3 L7 9 Q7 11 10 11 Q13 11 13 9 L13 3" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M10 11 L10 17" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M8 3 L8 7 M10 3 L10 7 M12 3 L12 7" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" />
          </>
        )}
        {category === '카페' && (
          <>
            <path d="M5 8 L5 14 Q5 16 7 16 L13 16 Q15 16 15 14 L15 8 Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <path d="M15 9 Q18 9 18 11 Q18 13 15 13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M8 5 Q8 3 10 3 Q12 3 12 5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        )}
        {(category === '편의점' || category === '마트') && (
          <>
            <path d="M4 7 L7 4 L13 4 L16 7 L16 17 L4 17 Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <rect x="8" y="11" width="4" height="6" rx="1" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none" />
            <path d="M4 7 L16 7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          </>
        )}
        {category === '숙박' && (
          <>
            <path d="M3 16 L3 8 L10 4 L17 8 L17 16" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
            <rect x="7" y="11" width="6" height="5" rx="1" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none" />
          </>
        )}
        {category === '관광' && (
          <>
            <circle cx="10" cy="10" r="6" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
            <path d="M10 4 L10 16 M4 10 L16 10" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <path d="M5.5 6.5 Q8 9 10 10 Q12 11 14.5 13.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" />
          </>
        )}
        {(!['음식점','카페','편의점','숙박','관광','마트'].includes(category)) && (
          <>
            <rect x="5" y="5" width="10" height="10" rx="2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" fill="none" />
            <path d="M5 9 L15 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            <path d="M9 5 L9 15" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          </>
        )}
      </svg>
    </div>
  )
}

export default function StoreListItem({ store, onClick }) {
  const { name, category, distance, lat, lng, isQR } = store || {}
  const distanceLabel = distance || formatDistance(lat, lng)

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[3]} ${layout.margin}`,
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: `1px solid ${colors.gray[100]}`,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 좌측 아이콘 */}
      <StoreIcon category={category} />

      {/* 중앙 정보 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            color: colors.gray[900],
            marginBottom: '3px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          {/* 카테고리 칩 */}
          <span
            style={{
              fontSize: typography.size.xxs,
              fontWeight: typography.weight.medium,
              color: colors.primary[700],
              backgroundColor: colors.primary[50],
              borderRadius: layout.radiusPill,
              padding: '1px 8px',
            }}
          >
            {category}
          </span>
          {isQR && (
            <span
              style={{
                fontSize: typography.size.xxs,
                fontWeight: typography.weight.semibold,
                color: '#FFFFFF',
                backgroundColor: colors.teal[500],
                borderRadius: layout.radiusPill,
                padding: '1px 8px',
              }}
            >
              QR
            </span>
          )}
          {distanceLabel && (
            <span
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[500],
              }}
            >
              {distanceLabel}
            </span>
          )}
        </div>
      </div>

      {/* 우측 화살표 */}
      <ChevronRight size={18} color={colors.gray[400]} />
    </button>
  )
}
