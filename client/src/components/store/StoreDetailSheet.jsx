// StoreDetailSheet.jsx — M03 (p.45)
// 매장 상세 바텀시트

import { Phone, MapPin, Clock } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import BottomSheet from '../common/BottomSheet'

export default function StoreDetailSheet({ isOpen, onClose, store }) {
  const {
    name = '매장명',
    category = '기타',
    distance,
    phone,
    address,
    hours,
  } = store || {}

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div style={{ fontFamily: typography.fontFamily }}>
        {/* 매장 이미지 placeholder */}
        <div
          style={{
            height: '120px',
            backgroundColor: colors.gray[200],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="5" y="10" width="30" height="22" rx="3" stroke={colors.gray[400]} strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="21" r="6" stroke={colors.gray[400]} strokeWidth="1.5" fill="none" />
            <circle cx="20" cy="21" r="3" fill={colors.gray[300]} />
            <path d="M14 10 L15 7 L25 7 L26 10" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 매장 정보 헤더 */}
        <div style={{ padding: `${spacing[4]} ${layout.margin}` }}>
          <div
            style={{
              fontSize: typography.size.xl,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              marginBottom: spacing[1],
            }}
          >
            {name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            <span
              style={{
                fontSize: typography.size.xs,
                fontWeight: typography.weight.medium,
                color: colors.primary[700],
                backgroundColor: colors.primary[50],
                borderRadius: layout.radiusPill,
                padding: '2px 10px',
              }}
            >
              {category}
            </span>
            {distance && (
              <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>
                {distance}
              </span>
            )}
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: '8px', backgroundColor: colors.surface.background }} />

        {/* 상세 정보 행들 */}
        <div style={{ padding: `${spacing[2]} ${layout.margin}` }}>
          {phone && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
                padding: `${spacing[3]} 0`,
                borderBottom: `1px solid ${colors.gray[100]}`,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: colors.primary[50],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Phone size={16} color={colors.primary[700]} />
              </div>
              <span
                style={{
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                }}
              >
                {phone}
              </span>
            </div>
          )}

          {address && (
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[3],
                padding: `${spacing[3]} 0`,
                borderBottom: `1px solid ${colors.gray[100]}`,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: colors.primary[50],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                <MapPin size={16} color={colors.primary[700]} />
              </div>
              <span
                style={{
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                  lineHeight: 1.5,
                  paddingTop: '6px',
                }}
              >
                {address}
              </span>
            </div>
          )}

          {hours && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[3],
                padding: `${spacing[3]} 0`,
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: colors.primary[50],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Clock size={16} color={colors.primary[700]} />
              </div>
              <span
                style={{
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                }}
              >
                {hours}
              </span>
            </div>
          )}
        </div>

        {/* 하단 버튼 2개 */}
        <div
          style={{
            display: 'flex',
            gap: spacing[3],
            padding: `${spacing[4]} ${layout.margin}`,
            paddingBottom: `calc(${layout.bottomNavHeight} + ${spacing[2]})`,
          }}
        >
          <button
            onClick={() => phone && window.open(`tel:${phone}`)}
            style={{
              flex: 1,
              height: '48px',
              backgroundColor: 'transparent',
              color: colors.primary[700],
              border: `1.5px solid ${colors.primary[700]}`,
              borderRadius: layout.radiusButton,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[2],
            }}
          >
            <Phone size={16} />
            전화하기
          </button>
          <button
            style={{
              flex: 1,
              height: '48px',
              backgroundColor: colors.primary[700],
              color: colors.onDark.primary,
              border: 'none',
              borderRadius: layout.radiusButton,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[2],
              boxShadow: shadow.button,
            }}
          >
            <MapPin size={16} />
            길찾기
          </button>
        </div>
      </div>
    </BottomSheet>
  )
}
