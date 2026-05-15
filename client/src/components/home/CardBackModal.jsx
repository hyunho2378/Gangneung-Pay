/**
 * CardBackModal (C2-1 rev2)
 * 잔액 카드 영역 내 absolute 포지셔닝 — 카드 밖으로 절대 벗어나지 않음
 * 60초 자동 종료 타이머
 * Nielsen #1 visibility, #3 user control
 * Shneiderman #4 closure
 */

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

function CardBackSVG() {
  return (
    <svg width="100%" viewBox="0 0 280 176" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="176" rx="12" fill={colors.primary[700]} />
      <rect width="280" height="176" rx="12" fill="url(#backGrad)" />
      <defs>
        <linearGradient id="backGrad" x1="0" y1="0" x2="280" y2="176" gradientUnits="userSpaceOnUse">
          <stop stopColor={colors.primary[600]} />
          <stop offset="1" stopColor={colors.primary[800]} />
        </linearGradient>
      </defs>
      {/* 마그네틱 선 */}
      <rect x="0" y="28" width="280" height="44" fill="rgba(0,0,0,0.55)" />
      {/* 서명란 */}
      <rect x="16" y="92" width="180" height="32" rx="4" fill="white" fillOpacity="0.9" />
      <text x="24" y="113" fontSize="11" fill={colors.gray[400]} fontFamily="sans-serif">AUTHORIZED SIGNATURE</text>
      {/* CVC 박스 */}
      <rect x="206" y="92" width="58" height="32" rx="4" fill="white" fillOpacity="0.9" />
      <text x="235" y="112" textAnchor="middle" fontSize="16" fontWeight="700" fill={colors.primary[700]} fontFamily="monospace">123</text>
      {/* CVC 레이블 */}
      <text x="225" y="86" fontSize="9" fill="rgba(255,255,255,0.65)" fontFamily="sans-serif">CVC</text>
      {/* 카드번호 */}
      <text x="16" y="152" fontSize="12" fill="rgba(255,255,255,0.8)" letterSpacing="2.5" fontFamily="monospace">•••• •••• •••• 1234</text>
      {/* 유효기간 */}
      <text x="16" y="170" fontSize="9" fill="rgba(255,255,255,0.55)" fontFamily="sans-serif">12/28</text>
    </svg>
  )
}

export default function CardBackModal({ open, onClose }) {
  const [seconds, setSeconds] = useState(60)

  useEffect(() => {
    if (!open) {
      setSeconds(60)
      return
    }
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(interval)
          onClose?.()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [open])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        padding: spacing[4],
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        transform: open ? 'translateY(0)' : 'translateY(100%)',
        opacity: open ? 1 : 0,
        transition: 'transform 300ms cubic-bezier(0.32, 0.72, 0, 1), opacity 300ms',
        pointerEvents: open ? 'auto' : 'none',
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing[3],
      }}>
        <span style={{
          fontSize: typography.size.md,
          fontWeight: typography.weight.semibold,
          color: colors.gray[900],
        }}>
          카드 뒷면
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
          <span style={{
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            color: seconds <= 10 ? colors.error : colors.primary[700],
            fontVariantNumeric: 'tabular-nums',
            fontFamily: 'monospace',
          }}>
            {mm}:{ss}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: spacing[1],
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="닫기"
          >
            <X size={20} color={colors.gray[500]} />
          </button>
        </div>
      </div>

      {/* 카드 뒷면 SVG */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ width: '100%' }}>
          <CardBackSVG />
        </div>
      </div>
    </div>
  )
}
