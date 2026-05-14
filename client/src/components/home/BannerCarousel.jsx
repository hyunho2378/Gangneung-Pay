import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

const KAKAO_SLIDE = {
  id: 'kakao',
  bgColor: colors.kakaoBg,
  textColor: colors.kakaoDark,
  subTextColor: colors.explore.amberDark,
  title: '카카오페이로도\n결제하세요',
  description: '강릉페이를 카카오페이와 연결하면 더 편리하게',
  illustration: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 카카오톡 말풍선 isometric 스타일 */}
      <rect x="10" y="16" width="50" height="34" rx="10" fill="#FEE500" />
      <path d="M28 50 L32 58 L40 50" fill="#FEE500" />
      <circle cx="25" cy="33" r="3.5" fill="#3C1E1E" />
      <circle cx="35" cy="33" r="3.5" fill="#3C1E1E" />
      <circle cx="45" cy="33" r="3.5" fill="#3C1E1E" />
      {/* 입체 그림자 */}
      <rect x="13" y="19" width="50" height="34" rx="10" fill="#F5C800" opacity="0.5" style={{zIndex: -1}} />
      <circle cx="62" cy="18" r="6" fill="#FEE500" opacity="0.6" />
      <circle cx="14" cy="56" r="4" fill="#FEE500" opacity="0.4" />
    </svg>
  ),
}

const BASE_SLIDES = [
  {
    id: 'cashback',
    bgColor: colors.teal[600],
    textColor: colors.onDark.primary,
    subTextColor: 'rgba(255,255,255,0.85)',
    title: '캐시백 충전하고',
    description: '강릉 전역에서 사용하세요',
    buttonLabel: '충전하기',
    buttonPath: '/charge',
    illustration: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="28" fill="rgba(255,255,255,0.15)" />
        <circle cx="40" cy="40" r="20" fill="rgba(255,255,255,0.2)" />
        <path d="M34 32 L48 40 L34 48 Z" fill="rgba(255,255,255,0.9)" />
        <path d="M24 56 Q32 44 40 40 Q48 36 56 24" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
        <circle cx="56" cy="24" r="4" fill="rgba(255,255,255,0.7)" />
        <circle cx="24" cy="56" r="4" fill="rgba(255,255,255,0.7)" />
      </svg>
    ),
  },
]

const CARD_APPLY_SLIDE = {
  id: 'cardApply',
  bgColor: colors.primary[700],
  textColor: colors.onDark.primary,
  subTextColor: 'rgba(255,255,255,0.85)',
  title: '강릉페이 카드를\n신청하세요',
  description: '최대 10% 캐시백 혜택',
  buttonLabel: '신청하기',
  buttonPath: '/card-apply',
  illustration: (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="20" width="64" height="42" rx="8" fill="rgba(255,255,255,0.18)" />
      <rect x="8" y="20" width="64" height="42" rx="8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <rect x="16" y="34" width="20" height="14" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="16" y="50" width="10" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <rect x="30" y="50" width="10" height="4" rx="2" fill="rgba(255,255,255,0.35)" />
      <circle cx="56" cy="34" r="10" fill="rgba(255,255,255,0.25)" />
      <path d="M52 34 L56 38 L62 30" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="27" r="3" fill="rgba(255,255,255,0.6)" />
      <circle cx="62" cy="27" r="3" fill="rgba(255,255,255,0.6)" />
    </svg>
  ),
}

export default function BannerCarousel({ applyButtonRef }) {
  const navigate = useNavigate()
  const { hasCard } = useUser()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(null)

  const slides = hasCard
    ? [...BASE_SLIDES, KAKAO_SLIDE]
    : [CARD_APPLY_SLIDE, ...BASE_SLIDES, KAKAO_SLIDE]

  const slide = slides[currentIndex]
  const safeIndex = Math.min(currentIndex, slides.length - 1)
  const safeSlide = slides[safeIndex]

  const go = (dir) => {
    if (dir > 0) setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))
    else setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const handleTouchStart = (e) => setStartX(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (startX === null) return
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
    setStartX(null)
  }
  const handleMouseDown = (e) => setStartX(e.clientX)
  const handleMouseUp = (e) => {
    if (startX === null) return
    const diff = startX - e.clientX
    if (Math.abs(diff) > 40) go(diff > 0 ? 1 : -1)
    setStartX(null)
  }

  const handleSlideClick = () => {
    if (safeSlide.id === 'kakao') navigate('/kakao-guide')
  }

  return (
    <div style={{ margin: `0 ${layout.margin}`, borderRadius: layout.radiusCard, overflow: 'hidden', userSelect: 'none' }}>
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={handleSlideClick}
        style={{
          backgroundColor: safeSlide.bgColor,
          borderRadius: layout.radiusCard,
          height: '160px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${spacing[4]} 0 ${spacing[5]}`,
          position: 'relative',
          cursor: safeSlide.id === 'kakao' ? 'pointer' : 'default',
          transition: 'background-color 0.35s ease',
        }}
      >
        {/* 좌측 텍스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], flex: 1 }}>
          <p style={{
            margin: 0,
            color: safeSlide.textColor,
            fontSize: typography.size.md,
            fontWeight: typography.weight.bold,
            lineHeight: 1.35,
            whiteSpace: 'pre-line',
          }}>
            {safeSlide.title}
          </p>
          <p style={{
            margin: 0,
            color: safeSlide.subTextColor,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.medium,
          }}>
            {safeSlide.description}
          </p>
          {safeSlide.buttonLabel && safeSlide.id !== 'kakao' && (
            <button
              ref={safeSlide.id === 'cardApply' ? applyButtonRef : undefined}
              onClick={(e) => {
                e.stopPropagation()
                navigate(safeSlide.buttonPath)
              }}
              style={{
                marginTop: spacing[1],
                alignSelf: 'flex-start',
                backgroundColor: safeSlide.id === 'cardApply' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.25)',
                color: safeSlide.textColor,
                border: 'none',
                borderRadius: layout.radiusPill,
                padding: `6px 14px`,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.semibold,
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
              }}
            >
              {safeSlide.buttonLabel}
            </button>
          )}
        </div>

        {/* 우측 일러스트 */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {safeSlide.illustration}
        </div>

        {/* dot 인디케이터 */}
        <div style={{
          position: 'absolute',
          bottom: spacing[2],
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: spacing[1],
          alignItems: 'center',
        }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx) }}
              style={{
                width: idx === safeIndex ? '18px' : '6px',
                height: '6px',
                borderRadius: layout.radiusPill,
                backgroundColor: idx === safeIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
