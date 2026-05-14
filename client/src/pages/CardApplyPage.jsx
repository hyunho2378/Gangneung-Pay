/**
 * CardApplyPage (Task 10)
 * Strategy: S7
 * Nielsen: #1 visibility, #3 user control, #8 memory load
 * Shneiderman: #4 closure, #8 reduce memory load
 * 이미지 3, 4 기준 전면 재작성
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'

// 카드 SVG 컴포넌트
function CardSVG({ type }) {
  const isTransit = type === 'transit'
  return (
    <svg width="220" height="138" viewBox="0 0 220 138" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 카드 배경 */}
      <rect width="220" height="138" rx="12" fill={colors.primary[700]} />
      <rect width="220" height="138" rx="12" fill="url(#cardGrad)" />
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="220" y2="138" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.primary[600]} />
          <stop offset="1" stopColor={colors.primary[800]} />
        </linearGradient>
      </defs>
      {/* 강릉 배경 일러스트 (추상적 산 실루엣) */}
      <path d="M0 100 Q40 70 80 85 Q120 60 160 80 Q190 65 220 75 L220 138 L0 138 Z" fill={colors.primary[800]} fillOpacity="0.35" />
      {/* 칩 */}
      <rect x="16" y="48" width="28" height="22" rx="4" fill="#E8C840" />
      <line x1="22" y1="48" x2="22" y2="70" stroke="#C8A830" strokeWidth="1" />
      <line x1="28" y1="48" x2="28" y2="70" stroke="#C8A830" strokeWidth="1" />
      <line x1="34" y1="48" x2="34" y2="70" stroke="#C8A830" strokeWidth="1" />
      <line x1="16" y1="55" x2="44" y2="55" stroke="#C8A830" strokeWidth="1" />
      <line x1="16" y1="62" x2="44" y2="62" stroke="#C8A830" strokeWidth="1" />
      {/* 강릉페이 텍스트 */}
      <text x="16" y="30" fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif">강릉페이</text>
      {/* 강릉시 로고 텍스트 */}
      <text x="16" y="122" fontSize="9" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">강릉시</text>
      {/* eZL 교통 로고 (교통카드 겸용 시) */}
      {isTransit && (
        <rect x="170" y="108" width="36" height="18" rx="4" fill="rgba(255,255,255,0.2)" />
      )}
      {isTransit && (
        <text x="174" y="121" fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.9)" fontFamily="sans-serif">eZL</text>
      )}
      {/* 카드 번호 */}
      <text x="16" y="107" fontSize="10" fill="rgba(255,255,255,0.6)" letterSpacing="2" fontFamily="monospace">•••• •••• •••• ••••</text>
    </svg>
  )
}

const CARD_TYPES = [
  {
    id: 'standard',
    name: '강릉페이(1)',
    badges: [],
    cost: null,
  },
  {
    id: 'transit',
    name: '강릉페이(교통)',
    badges: ['교통카드 겸용'],
    cost: '발급 비용 5,000원',
  },
]

const BENEFITS = [
  {
    iconBg: colors.warmBg,
    iconContent: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={colors.store.category.food} />
        <text x="10" y="15" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">W</text>
      </svg>
    ),
    text: (
      <span>
        결제할 때마다 <b>10%</b>
        <br />
        <span style={{ fontSize: typography.size.xxs, color: colors.gray[500] }}>월 <b>최대 3만원</b> 적립</span>
      </span>
    ),
  },
  {
    iconBg: colors.primary[50],
    iconContent: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={colors.primary[600]} />
        <text x="10" y="15" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">%</text>
      </svg>
    ),
    text: (
      <span>
        혜택가맹점 최대 <b>7%</b> 할인
      </span>
    ),
  },
  {
    iconBg: colors.greenBg,
    iconContent: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={colors.teal[500]} />
        <rect x="6" y="6" width="8" height="8" rx="1" fill="white" />
        <rect x="7.5" y="7.5" width="2" height="2" fill={colors.teal[500]} />
        <rect x="10.5" y="7.5" width="2" height="2" fill={colors.teal[500]} />
        <rect x="7.5" y="10.5" width="2" height="2" fill={colors.teal[500]} />
        <rect x="10.5" y="10.5" width="2" height="2" fill={colors.teal[500]} />
      </svg>
    ),
    text: (
      <span>
        지갑없이 <b>QR</b> 코드로 간편 결제
      </span>
    ),
  },
  {
    iconBg: colors.gray[100],
    iconContent: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={colors.gray[400]} />
        <rect x="6" y="5" width="8" height="10" rx="1" fill="white" />
        <line x1="8" y1="8" x2="12" y2="8" stroke={colors.gray[400]} strokeWidth="1" />
        <line x1="8" y1="10" x2="12" y2="10" stroke={colors.gray[400]} strokeWidth="1" />
        <line x1="8" y1="12" x2="11" y2="12" stroke={colors.gray[400]} strokeWidth="1" />
      </svg>
    ),
    text: (
      <span>
        소득공제 최대 <b>40%</b> 혜택
      </span>
    ),
  },
  {
    iconBg: colors.primary[50],
    iconContent: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill={colors.primary[500]} />
        <circle cx="10" cy="7" r="2.5" fill="white" />
        <path d="M5 16 Q5 12 10 12 Q15 12 15 16" fill="white" />
      </svg>
    ),
    text: (
      <span>
        만 <b>14세</b> 이상이면 누구나
        <br />
        <span style={{ fontSize: typography.size.xxs, color: colors.gray[500] }}>온라인으로 서류없이 간편 신청</span>
      </span>
    ),
  },
]

const CATEGORY_ICONS = [
  { label: '서적', color: colors.primary[500] },
  { label: '의료', color: colors.error },
  { label: '약국', color: colors.success },
  { label: '주유소', color: colors.warning },
  { label: '미용', color: colors.store.category.cafe },
  { label: '음식', color: colors.store.category.food },
  { label: '생활', color: colors.gray[500] },
]

// 카테고리 SVG 아이콘 map
function CategoryIcon({ label, color }) {
  const icons = {
    '서적': <path d="M4 3 Q4 2 5 2 L15 2 Q16 2 16 3 L16 17 Q16 18 15 18 L5 18 Q4 18 4 17 Z M7 2 L7 18 M10 5 L14 5 M10 8 L14 8" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    '의료': <><rect x="7" y="4" width="6" height="12" rx="1" fill="white" /><rect x="4" y="7" width="12" height="6" rx="1" fill="white" /></>,
    '약국': <><text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="900" fill="white" fontFamily="sans-serif">Rx</text></>,
    '주유소': <path d="M6 16 L6 6 Q6 4 8 4 L12 4 Q14 4 14 6 L14 10 L16 10 L16 14 Q16 16 14 16 Z M8 8 L12 8" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    '미용': <path d="M10 4 Q10 4 8 8 Q6 12 8 14 Q10 16 12 14 Q14 12 12 8 Q10 4 10 4 Z M10 10 L14 6" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    '음식': <path d="M7 4 L7 16 M7 4 Q11 4 11 8 Q11 12 7 12 M13 4 L13 8 Q16 8 16 12 L13 12 L13 16" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
    '생활': <path d="M4 10 L10 4 L16 10 M6 10 L6 16 L14 16 L14 10 M9 16 L9 12 L11 12 L11 16" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" />,
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      {icons[label] || <circle cx="10" cy="10" r="8" fill="white" fillOpacity="0.5" />}
    </svg>
  )
}

export default function CardApplyPage() {
  const navigate = useNavigate()
  const { cardStatus, applyCard, registerCard } = useUser()
  const [cardIndex, setCardIndex] = useState(0)
  const [cardCode, setCardCode] = useState('')

  const selectedCard = CARD_TYPES[cardIndex]

  // 배송 완료 → 등록 화면
  if (cardStatus === 'shipped') {
    return (
      <ScreenContainer>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          backgroundColor: colors.surface.background,
          fontFamily: typography.fontFamily,
        }}>
          {/* 헤더 */}
          <div style={{
            backgroundColor: colors.surface.card,
            display: 'flex',
            alignItems: 'center',
            padding: `${spacing[3]} ${layout.margin}`,
            paddingTop: '52px',
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: spacing[1], marginRight: spacing[3] }}>
              <ChevronLeft size={24} color={colors.gray[900]} />
            </button>
            <span style={{ fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.gray[900] }}>
              카드 등록
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
            <div style={{
              margin: `${spacing[4]} ${layout.margin} 0`,
              backgroundColor: colors.successBg,
              border: `1px solid ${colors.successBorder}`,
              borderRadius: layout.radiusCard,
              padding: `${spacing[3]} ${spacing[4]}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8 L7 12 L13 4" stroke={colors.success} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: typography.size.sm, color: colors.success, fontWeight: typography.weight.semibold }}>
                배송 완료
              </span>
              <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>
                카드를 등록해주세요
              </span>
            </div>

            <div style={{ padding: `${spacing[5]} ${layout.margin}` }}>
              <div style={{ fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.gray[900], marginBottom: spacing[2] }}>
                카드 번호를 입력해주세요
              </div>
              <div style={{ fontSize: typography.size.xs, color: colors.gray[500], marginBottom: spacing[4] }}>
                카드 앞면의 16자리 번호를 입력해주세요
              </div>
              <input
                value={cardCode}
                onChange={(e) => setCardCode(e.target.value)}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                style={{
                  width: '100%',
                  height: '48px',
                  border: `1px solid ${colors.gray[200]}`,
                  borderRadius: layout.radiusButton,
                  padding: `0 ${spacing[4]}`,
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                  fontFamily: typography.fontFamily,
                  boxSizing: 'border-box',
                  outline: 'none',
                  backgroundColor: colors.surface.card,
                }}
              />
            </div>
          </div>

          <div style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: colors.surface.card,
            borderTop: `1px solid ${colors.gray[200]}`,
            padding: `${spacing[3]} ${layout.margin} ${spacing[5]}`,
          }}>
            <button
              onClick={() => { registerCard(); navigate('/') }}
              style={{
                width: '100%',
                height: '52px',
                backgroundColor: colors.primary[700],
                border: 'none',
                borderRadius: layout.radiusButton,
                color: colors.onDark.primary,
                fontSize: typography.size.md,
                fontWeight: typography.weight.bold,
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
              }}
            >
              등록 완료
            </button>
          </div>
        </div>
      </ScreenContainer>
    )
  }

  // 신청 처리 중
  if (cardStatus === 'applying') {
    return (
      <ScreenContainer>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100dvh',
          gap: spacing[4],
          backgroundColor: colors.surface.background,
          fontFamily: typography.fontFamily,
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <circle cx="20" cy="20" r="16" stroke={colors.gray[200]} strokeWidth="3" fill="none" />
            <path d="M20 4 A16 16 0 0 1 36 20" stroke={colors.primary[700]} strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: typography.size.sm, color: colors.gray[500] }}>신청 처리 중입니다...</div>
          <div style={{ fontSize: typography.size.xs, color: colors.gray[400] }}>잠시 후 배송 준비가 완료됩니다</div>
        </div>
      </ScreenContainer>
    )
  }

  // 기본: 카드 선택 화면 (cardStatus === 'none')
  return (
    <ScreenContainer>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        backgroundColor: colors.surface.background,
        fontFamily: typography.fontFamily,
      }}>
        {/* 헤더 */}
        <div style={{
          backgroundColor: colors.surface.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `${spacing[3]} ${layout.margin}`,
          paddingTop: '52px',
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: spacing[1] }}>
            <ChevronLeft size={24} color={colors.gray[900]} />
          </button>
          <button style={{
            background: 'none',
            border: `1px solid ${colors.gray[300]}`,
            borderRadius: layout.radiusPill,
            padding: `${spacing[1]} ${spacing[3]}`,
            fontSize: typography.size.xs,
            color: colors.gray[600],
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
          }}>
            신청 안내
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '90px' }}>
          {/* 타이틀 */}
          <div style={{
            textAlign: 'center',
            padding: `${spacing[6]} ${layout.margin} ${spacing[5]}`,
          }}>
            <p style={{
              margin: 0,
              fontSize: typography.size.xl,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              lineHeight: 1.4,
            }}>
              강릉시에서
            </p>
            <p style={{
              margin: 0,
              fontSize: typography.size.xl,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              lineHeight: 1.4,
            }}>
              혜택받을 카드를 선택해주세요
            </p>
          </div>

          {/* 카드 선택 캐러셀 */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: `0 ${spacing[8]}`, marginBottom: spacing[4] }}>
            {/* 이전 화살표 */}
            <button
              onClick={() => setCardIndex(prev => Math.max(0, prev - 1))}
              disabled={cardIndex === 0}
              style={{
                position: 'absolute',
                left: spacing[2],
                background: 'none',
                border: 'none',
                cursor: cardIndex === 0 ? 'default' : 'pointer',
                opacity: cardIndex === 0 ? 0.3 : 1,
                padding: spacing[2],
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronLeft size={24} color={colors.gray[700]} />
            </button>

            {/* 카드 이미지 */}
            <div style={{ transition: 'all 0.3s ease' }}>
              <CardSVG type={selectedCard.id === 'transit' ? 'transit' : 'standard'} />
            </div>

            {/* 다음 화살표 */}
            <button
              onClick={() => setCardIndex(prev => Math.min(CARD_TYPES.length - 1, prev + 1))}
              disabled={cardIndex === CARD_TYPES.length - 1}
              style={{
                position: 'absolute',
                right: spacing[2],
                background: 'none',
                border: 'none',
                cursor: cardIndex === CARD_TYPES.length - 1 ? 'default' : 'pointer',
                opacity: cardIndex === CARD_TYPES.length - 1 ? 0.3 : 1,
                padding: spacing[2],
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ChevronRight size={24} color={colors.gray[700]} />
            </button>
          </div>

          {/* 카드 라벨 */}
          <div style={{ textAlign: 'center', marginBottom: spacing[5] }}>
            <span style={{
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
            }}>
              {selectedCard.name}
            </span>
            {selectedCard.badges.map(badge => (
              <span key={badge} style={{
                marginLeft: spacing[2],
                backgroundColor: colors.primary[50],
                color: colors.primary[700],
                fontSize: typography.size.xxs,
                fontWeight: typography.weight.semibold,
                padding: `2px 8px`,
                borderRadius: layout.radiusPill,
                border: `1px solid ${colors.primary[100]}`,
              }}>
                {badge}
              </span>
            ))}
            {selectedCard.cost && (
              <div style={{ marginTop: spacing[1], fontSize: typography.size.xs, color: colors.gray[500] }}>
                {selectedCard.cost}
              </div>
            )}
          </div>

          {/* 혜택 리스트 */}
          <div style={{
            margin: `0 ${layout.margin} ${spacing[4]}`,
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            boxShadow: shadow.card,
            overflow: 'hidden',
          }}>
            {BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing[3],
                  padding: `${spacing[4]} ${spacing[4]}`,
                  borderBottom: idx < BENEFITS.length - 1 ? `1px solid ${colors.gray[100]}` : 'none',
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: benefit.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {benefit.iconContent}
                </div>
                <div style={{
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                  lineHeight: 1.5,
                  fontFamily: typography.fontFamily,
                }}>
                  {benefit.text}
                </div>
              </div>
            ))}
          </div>

          {/* 점선 구분선 */}
          <div style={{
            margin: `0 ${layout.margin} ${spacing[4]}`,
            borderTop: `1.5px dashed ${colors.gray[200]}`,
          }} />

          {/* 다양한 매장 안내 */}
          <p style={{
            margin: `0 0 ${spacing[3]}`,
            textAlign: 'center',
            fontSize: typography.size.sm,
            color: colors.gray[500],
          }}>
            다양한 매장에서 혜택 누리세요!
          </p>

          {/* 카테고리 아이콘 가로 스크롤 */}
          <div style={{
            display: 'flex',
            gap: spacing[3],
            overflowX: 'auto',
            padding: `0 ${layout.margin} ${spacing[4]}`,
            scrollbarWidth: 'none',
          }}>
            {CATEGORY_ICONS.map(({ label, color }) => (
              <div key={label} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: spacing[1],
                flexShrink: 0,
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <CategoryIcon label={label} color={color} />
                </div>
                <span style={{
                  fontSize: typography.size.xxs,
                  color: colors.gray[500],
                  whiteSpace: 'nowrap',
                  fontFamily: typography.fontFamily,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 하단 CTA */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          padding: `${spacing[3]} ${layout.margin} ${spacing[5]}`,
        }}>
          <button
            onClick={applyCard}
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: colors.primary[700],
              border: 'none',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              boxShadow: shadow.button,
            }}
          >
            간편 신청하기
          </button>
        </div>
      </div>
    </ScreenContainer>
  )
}
