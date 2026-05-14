/**
 * CardBackModal (Task 3)
 * Face ID 3단계 애니메이션 → 카드 정보 노출
 * state A 대기 (200ms) → B 스캐닝 (1500ms) → C 성공 (300ms) → 카드 정보
 */

import { useState, useEffect } from 'react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

const CARD_INFO = [
  { label: '카드번호', value: '**** **** **** 1234' },
  { label: 'CVC', value: '123' },
  { label: '유효기간', value: '01 / 29' },
  { label: '카드 종류', value: '체크카드' },
]

export default function CardBackModal({ isOpen, onClose }) {
  // 'idle' | 'scanning' | 'success' | 'done'
  const [authPhase, setAuthPhase] = useState('idle')

  useEffect(() => {
    if (!isOpen) {
      setAuthPhase('idle')
      return
    }
    const t1 = setTimeout(() => setAuthPhase('scanning'), 200)
    const t2 = setTimeout(() => setAuthPhase('success'), 1700)  // 200+1500
    const t3 = setTimeout(() => setAuthPhase('done'), 2000)     // 200+1500+300
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [isOpen])

  if (!isOpen) return null

  // Phase 1: Face ID 인증 애니메이션
  if (authPhase !== 'done') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.85)',
          fontFamily: typography.fontFamily,
        }}
      >
        <style>{`
          @keyframes faceIdScan {
            0%   { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -260; }
          }
          @keyframes faceIdFadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to   { opacity: 1; transform: scale(1); }
          }
        `}</style>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: spacing[4],
          }}
        >
          {authPhase === 'success' ? (
            /* State C: 체크마크 페이드인 */
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              style={{ animation: 'faceIdFadeIn 0.3s ease-out' }}
            >
              <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.8)" strokeWidth="2" fill="none" />
              <path
                d="M24 40 L35 51 L56 29"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          ) : (
            /* State A/B: 얼굴 윤곽선 */
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              {/* 둥근 사각형 외곽 프레임 */}
              <rect
                x="8"
                y="8"
                width="64"
                height="64"
                rx="16"
                stroke={authPhase === 'scanning' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
                strokeWidth="2"
                fill="none"
                strokeDasharray={authPhase === 'scanning' ? '20 10' : undefined}
                style={authPhase === 'scanning'
                  ? { animation: 'faceIdScan 1.5s linear infinite' }
                  : undefined
                }
              />
              {/* 눈 2개 */}
              <circle cx="29" cy="34" r="3" fill="rgba(255,255,255,0.8)" />
              <circle cx="51" cy="34" r="3" fill="rgba(255,255,255,0.8)" />
              {/* 코 라인 */}
              <path d="M40 38 L40 45" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
              {/* 입 라인 */}
              <path
                d="M30 52 Q40 58 50 52"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}

          <span
            style={{
              color: 'white',
              fontSize: typography.size.md,
              fontFamily: typography.fontFamily,
            }}
          >
            {authPhase === 'success' ? '인증 완료' : 'Face ID로 인증'}
          </span>
        </div>
      </div>
    )
  }

  // Phase 2: 카드 정보 노출
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 오버레이 */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: colors.surface.overlay,
        }}
      />

      {/* 모달 카드 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '320px',
          maxWidth: 'calc(100% - 32px)',
          backgroundColor: colors.primary[800],
          borderRadius: layout.radiusCard,
          padding: spacing[6],
        }}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: spacing[4],
            right: spacing[4],
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.onDark.secondary,
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5 L15 15 M15 5 L5 15"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* 인증 배지 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: spacing[4],
          }}
        >
          <div
            style={{
              backgroundColor: colors.successBg,
              border: `1px solid ${colors.successBorder}`,
              borderRadius: layout.radiusPill,
              padding: `${spacing[1]} ${spacing[3]}`,
              fontSize: typography.size.xxs,
              color: colors.success,
              fontWeight: typography.weight.semibold,
              fontFamily: typography.fontFamily,
            }}
          >
            생체인증으로 확인됨
          </div>
        </div>

        {/* FaceID 아이콘 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: spacing[4],
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="2" y="2" width="44" height="44" rx="10" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
            <path d="M8 2 L2 2 L2 8" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 2 L46 2 L46 8" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 46 L2 46 L2 40" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 46 L46 46 L46 40" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="18" cy="20" r="2" fill="rgba(255,255,255,0.8)" />
            <circle cx="30" cy="20" r="2" fill="rgba(255,255,255,0.8)" />
            <path d="M18 30 Q24 34 30 30" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M24 14 L24 17" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 구분선 */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            marginBottom: spacing[4],
          }}
        />

        {/* 카드 정보 */}
        {CARD_INFO.map((row) => (
          <div
            key={row.label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: spacing[3],
            }}
          >
            <span
              style={{
                color: colors.onDark.secondary,
                fontSize: typography.size.xs,
                fontFamily: typography.fontFamily,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                fontFamily: typography.fontFamily,
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
