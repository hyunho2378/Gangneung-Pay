/**
 * CoachMarkOverlay (Sprint D)
 * Strategy: S7
 * Nielsen: #10 help and documentation
 * Shneiderman: #4 dialog closure, #8 reduce memory load
 */

import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function CoachMarkOverlay({ targetRect, message, step, totalSteps, onNext, onSkip }) {
  const hasTarget = targetRect != null && targetRect.width > 0
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 812

  let tooltipPos = {}
  let arrowDir = null

  if (hasTarget) {
    if (viewportH - targetRect.bottom >= 180) {
      tooltipPos = { top: targetRect.bottom + 12 }
      arrowDir = 'top'
    } else {
      tooltipPos = { bottom: viewportH - targetRect.top + 12 }
      arrowDir = 'bottom'
    }
  } else {
    tooltipPos = { top: '50%', transform: 'translateY(-50%)' }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, fontFamily: typography.fontFamily }}>
      {/* 스포트라이트 or 전체 어둠 */}
      {hasTarget ? (
        <div
          style={{
            position: 'absolute',
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            borderRadius: layout.radiusButton,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
            border: '2px solid rgba(255,255,255,0.55)',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.65)', pointerEvents: 'none' }} />
      )}

      {/* 말풍선 */}
      <div style={{ position: 'absolute', left: layout.margin, right: layout.margin, ...tooltipPos }}>
        {arrowDir === 'top' && (
          <div style={{ paddingLeft: '24px', marginBottom: '-1px' }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: `10px solid ${colors.surface.card}`,
              }}
            />
          </div>
        )}

        <div
          style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[5],
            boxShadow: shadow.modal,
          }}
        >
          {/* 단계 인디케이터 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[3] }}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: i + 1 === step ? colors.primary[700] : colors.gray[200],
                }}
              />
            ))}
            <span style={{ fontSize: typography.size.xxs, color: colors.gray[400] }}>
              {step} / {totalSteps}
            </span>
          </div>

          <p
            style={{
              margin: `0 0 ${spacing[4]}`,
              fontSize: typography.size.sm,
              color: colors.gray[900],
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={onSkip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: typography.size.sm,
                color: colors.gray[400],
                padding: 0,
                fontFamily: typography.fontFamily,
              }}
            >
              건너뛰기
            </button>
            <button
              onClick={onNext}
              style={{
                backgroundColor: colors.primary[700],
                border: 'none',
                borderRadius: layout.radiusButton,
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                padding: `${spacing[2]} ${spacing[5]}`,
                cursor: 'pointer',
                minHeight: layout.touchMin,
                fontFamily: typography.fontFamily,
              }}
            >
              다음
            </button>
          </div>
        </div>

        {arrowDir === 'bottom' && (
          <div style={{ paddingLeft: '24px', marginTop: '-1px' }}>
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: `10px solid ${colors.surface.card}`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
