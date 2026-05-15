/**
 * CoachMarkOverlay (A1)
 * Strategy: S7
 * Nielsen: #10 help and documentation
 * Shneiderman: #4 dialog closure, #8 reduce memory load
 * A1: ScreenContainer 기준 relative 좌표로 말풍선 위치 고정 (모바일 390px 안에만 표시)
 */

import { useState, useLayoutEffect, useEffect, useRef } from 'react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function CoachMarkOverlay({ targetRef, message, step, totalSteps, onNext, onSkip }) {
  const [containerRect, setContainerRect] = useState(null)
  const [targetRect, setTargetRect] = useState(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    const prevTouchAction = document.body.style.touchAction
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.touchAction = prevTouchAction
    }
  }, [])

  useLayoutEffect(() => {
    const updateRects = () => {
      const container = document.getElementById('screen-container')
      if (container) setContainerRect(container.getBoundingClientRect())
      if (targetRef?.current) setTargetRect(targetRef.current.getBoundingClientRect())
      rafRef.current = requestAnimationFrame(updateRects)
    }
    updateRects()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [targetRef])

  if (!containerRect) return null

  const hasTarget = targetRect != null && targetRect.width > 0

  let relativeTarget = null
  if (hasTarget) {
    relativeTarget = {
      top: targetRect.top - containerRect.top,
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      height: targetRect.height,
      bottom: targetRect.bottom - containerRect.top,
    }
  }

  const containerHeight = containerRect.height
  let tooltipPosition = {}
  let arrowDir = null

  if (relativeTarget) {
    const spaceBelow = containerHeight - relativeTarget.bottom
    if (spaceBelow >= 200) {
      tooltipPosition = { top: `${relativeTarget.bottom + 12}px` }
      arrowDir = 'top'
    } else {
      tooltipPosition = { bottom: `${containerHeight - relativeTarget.top + 12}px` }
      arrowDir = 'bottom'
    }
  } else {
    tooltipPosition = { top: '50%' }
  }

  return (
    <div
      onTouchMove={(e) => e.preventDefault()}
      onWheel={(e) => e.preventDefault()}
      style={{
        position: 'fixed',
        top: containerRect.top,
        left: containerRect.left,
        width: containerRect.width,
        height: containerRect.height,
        zIndex: 200,
        fontFamily: typography.fontFamily,
        pointerEvents: 'auto',
      }}
    >
      {relativeTarget ? (
        <div
          style={{
            position: 'absolute',
            top: relativeTarget.top - 6,
            left: relativeTarget.left - 6,
            width: relativeTarget.width + 12,
            height: relativeTarget.height + 12,
            borderRadius: layout.radiusButton,
            boxShadow: '0 0 0 9999px rgba(0,0,0,0.65)',
            border: '2px solid rgba(255,255,255,0.55)',
            pointerEvents: 'none',
          }}
        />
      ) : (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          pointerEvents: 'none',
        }} />
      )}

      <div
        style={{
          position: 'absolute',
          left: spacing[4],
          right: spacing[4],
          ...tooltipPosition,
        }}
      >
        {arrowDir === 'top' && (
          <div style={{ paddingLeft: '24px', marginBottom: '-1px' }}>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: `10px solid ${colors.surface.card}`,
            }} />
          </div>
        )}

        <div style={{
          backgroundColor: colors.surface.card,
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          boxShadow: shadow.modal,
        }}>
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

          <p style={{
            margin: `0 0 ${spacing[4]}`,
            fontSize: typography.size.sm,
            color: colors.gray[900],
            lineHeight: 1.6,
          }}>
            {message}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: spacing[3],
          }}>
            <button
              onClick={onSkip}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: typography.size.sm,
                color: colors.gray[500],
                padding: `${spacing[2]} 0`,
                fontFamily: typography.fontFamily,
                minHeight: layout.touchMin,
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
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `10px solid ${colors.surface.card}`,
            }} />
          </div>
        )}
      </div>
    </div>
  )
}
