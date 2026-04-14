import { useState } from 'react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

const slides = [
  {
    id: 0,
    bgColor: colors.primary[700],
    textColor: colors.onDark.primary,
    subTextColor: 'rgba(255,255,255,0.85)',
    title: '강릉페이 카드를\n신청하세요',
    description: '최대 10% 캐시백 혜택',
    buttonLabel: '신청하기',
    buttonBg: 'rgba(255,255,255,0.25)',
    buttonTextColor: colors.onDark.primary,
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
  },
  {
    id: 1,
    bgColor: colors.teal[600],
    textColor: colors.onDark.primary,
    subTextColor: 'rgba(255,255,255,0.85)',
    title: '캐시백 충전하고',
    description: '강릉 전역에서 사용하세요',
    buttonLabel: '충전하기',
    buttonBg: 'rgba(255,255,255,0.25)',
    buttonTextColor: colors.onDark.primary,
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
  {
    id: 2,
    bgColor: colors.donationBg,
    textColor: colors.banner.darkRed,
    subTextColor: colors.banner.pink,
    title: '따뜻한 나눔',
    description: '강릉 사랑나눔 기부통',
    buttonLabel: '기부하기',
    buttonBg: 'rgba(153,27,27,0.1)',
    buttonTextColor: colors.banner.darkRed,
    illustration: (
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 58 C40 58 18 44 18 30 C18 22.27 24.27 16 32 16 C36.18 16 40 18.36 40 18.36 C40 18.36 43.82 16 48 16 C55.73 16 62 22.27 62 30 C62 44 40 58 40 58 Z" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="2" />
        <path d="M30 36 L36 42 L50 28" stroke="#E11D48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="58" cy="20" r="5" fill="#FCA5A5" />
        <circle cx="22" cy="22" r="3" fill="#FBCFE8" />
        <circle cx="60" cy="58" r="4" fill="#FCA5A5" />
        <circle cx="20" cy="55" r="3" fill="#FBCFE8" />
      </svg>
    ),
  },
]

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [startX, setStartX] = useState(null)

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (startX === null) return
    const diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
    }
    setStartX(null)
  }

  const handleMouseDown = (e) => {
    setStartX(e.clientX)
  }

  const handleMouseUp = (e) => {
    if (startX === null) return
    const diff = startX - e.clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1))
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
    }
    setStartX(null)
  }

  const slide = slides[currentIndex]

  return (
    <div
      style={{
        margin: `0 ${layout.margin}`,
        borderRadius: layout.radiusCard,
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          backgroundColor: slide.bgColor,
          borderRadius: layout.radiusCard,
          height: '160px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${spacing[4]} 0 ${spacing[5]}`,
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.35s ease',
        }}
      >
        {/* 좌측 텍스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2], flex: 1 }}>
          <p
            style={{
              margin: 0,
              color: slide.textColor,
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
            }}
          >
            {slide.title}
          </p>
          <p
            style={{
              margin: 0,
              color: slide.subTextColor,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.medium,
            }}
          >
            {slide.description}
          </p>
          {slide.buttonLabel && (
            <button
              style={{
                marginTop: spacing[1],
                alignSelf: 'flex-start',
                backgroundColor: slide.buttonBg,
                color: slide.buttonTextColor,
                border: 'none',
                borderRadius: layout.radiusPill,
                padding: `6px 14px`,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.semibold,
                cursor: 'pointer',
              }}
            >
              {slide.buttonLabel}
            </button>
          )}
        </div>

        {/* 우측 일러스트 */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {slide.illustration}
        </div>

        {/* 하단 dot 인디케이터 */}
        <div
          style={{
            position: 'absolute',
            bottom: spacing[2],
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: spacing[1],
            alignItems: 'center',
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx) }}
              style={{
                width: idx === currentIndex ? '18px' : '6px',
                height: '6px',
                borderRadius: layout.radiusPill,
                backgroundColor: idx === currentIndex ? colors.onDark.primary : 'rgba(255,255,255,0.45)',
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
