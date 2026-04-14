import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const placeInfo = {
  title: '강릉 오죽헌',
  category: '역사·문화',
  distance: '2.1km',
  description: '율곡 이이와 신사임당의 생가지. 조선시대 대표적인 문화재로, 현존하는 가장 오래된 목조 건물 중 하나입니다. 강릉 시내에 위치하며 한국의 역사와 문화를 느낄 수 있는 곳입니다.',
  hours: '평일 09:00 ~ 18:00 / 주말 09:00 ~ 18:00',
  price: '어른 3,000원 / 청소년 2,000원 / 어린이 1,000원',
  address: '강원특별자치도 강릉시 율곡로 3139번길 24',
  phone: '033-660-3301',
}

export default function PlaceDetailPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBarBack title={placeInfo.title} onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '24px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 이미지 대체 색상 박스 */}
        <div
          style={{
            height: '200px',
            backgroundColor: colors.tag.cashBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="20" width="48" height="32" rx="4" fill={colors.success} opacity="0.3" />
            <path d="M32 8l-24 14v30h48V22L32 8z" fill={colors.success} opacity="0.2" />
            <rect x="24" y="36" width="16" height="16" rx="2" fill={colors.success} opacity="0.5" />
            <path d="M32 8v10" stroke={colors.success} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ padding: `20px ${layout.margin}` }}>
          {/* 제목 + 카테고리 + 거리 */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <h1
                style={{
                  fontSize: typography.size.xl,
                  fontWeight: typography.weight.bold,
                  color: colors.gray[900],
                  margin: 0,
                }}
              >
                {placeInfo.title}
              </h1>
              {/* 강릉페이 사용 가능 배지 */}
              <span
                style={{
                  fontSize: typography.size.xs,
                  fontWeight: typography.weight.medium,
                  color: colors.primary[700],
                  backgroundColor: colors.primary[100],
                  padding: '3px 8px',
                  borderRadius: layout.radiusPill,
                  flexShrink: 0,
                }}
              >
                강릉페이 사용 가능
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span
                style={{
                  fontSize: typography.size.xs,
                  color: colors.gray[500],
                  backgroundColor: colors.gray[100],
                  padding: '3px 8px',
                  borderRadius: layout.radiusPill,
                }}
              >
                {placeInfo.category}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="5" r="2" stroke={colors.gray[400]} strokeWidth="1.2" />
                  <path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 7 4 7s4-4 4-7c0-2.2-1.8-4-4-4z" stroke={colors.gray[400]} strokeWidth="1.2" />
                </svg>
                <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>{placeInfo.distance}</span>
              </div>
            </div>
          </div>

          {/* 설명 텍스트 */}
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusCard,
              padding: layout.margin,
              boxShadow: shadow.card,
              marginBottom: '16px',
            }}
          >
            <p
              style={{
                fontSize: typography.size.sm,
                color: colors.gray[700],
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {placeInfo.description}
            </p>
          </div>

          {/* 영업 정보 */}
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusCard,
              padding: layout.margin,
              boxShadow: shadow.card,
            }}
          >
            <p
              style={{
                fontSize: typography.size.xs,
                fontWeight: typography.weight.semibold,
                color: colors.gray[500],
                margin: '0 0 12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              이용 정보
            </p>

            {[
              { icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke={colors.gray[500]} strokeWidth="1.3" />
                  <path d="M8 4.5V8l2.5 2" stroke={colors.gray[500]} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ), label: '운영 시간', value: placeInfo.hours },
              { icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="5.5" stroke={colors.gray[500]} strokeWidth="1.3" />
                  <path d="M8 4.5v7M6 6h3a1 1 0 010 2H6" stroke={colors.gray[500]} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ), label: '입장료', value: placeInfo.price },
              { icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="6.5" r="2" stroke={colors.gray[500]} strokeWidth="1.3" />
                  <path d="M4 14c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke={colors.gray[500]} strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ), label: '주소', value: placeInfo.address },
              { icon: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4.5 2.5c.3 1 .7 2 .4 2.7l-1 1c.7 1.7 2 3 3.7 3.7l1-1c.7-.3 1.7 0 2.7.4.3 1.3-.7 2-1.3 2.3C6.3 12 3.5 9.2 3.8 6c.2-.6.8-2.3 2-1.5h-.3z" stroke={colors.gray[500]} strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
              ), label: '전화', value: placeInfo.phone },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  padding: i > 0 ? '10px 0 0' : '0',
                  marginTop: i > 0 ? '10px' : 0,
                  borderTop: i > 0 ? `1px solid ${colors.gray[100]}` : 'none',
                }}
              >
                <div style={{ flexShrink: 0, marginTop: '1px' }}>{item.icon}</div>
                <div>
                  <p style={{ fontSize: typography.size.xs, color: colors.gray[400], margin: '0 0 2px' }}>{item.label}</p>
                  <p style={{ fontSize: typography.size.sm, color: colors.gray[700], margin: 0, lineHeight: 1.4 }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScreenContainer>
  )
}
