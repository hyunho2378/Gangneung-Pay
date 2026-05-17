/**
 * CardApplyCTA (B6)
 * 신규 사용자 전용 — 잔액 카드 자리 카드 신청 CTA
 */

import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

export default function CardApplyCTA({ applyButtonRef }) {
  const navigate = useNavigate()

  return (
    <div style={{ margin: layout.margin }}>
      <div style={{
        backgroundColor: colors.surface.darkCard,
        borderRadius: layout.radiusCard,
        padding: spacing[6],
        boxShadow: shadow.button,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[3],
      }}>
        <h3 style={{
          margin: 0,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.bold,
          color: colors.onDark.primary,
          lineHeight: 1.3,
          fontFamily: typography.fontFamily,
        }}>
          강릉페이 카드를<br />신청하세요
        </h3>
        <p style={{
          margin: 0,
          fontSize: typography.size.sm,
          color: colors.onDark.secondary,
          fontFamily: typography.fontFamily,
        }}>
          최대 10% 캐시백 혜택
        </p>
        <button
          ref={applyButtonRef}
          onClick={() => navigate('/card-apply')}
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: layout.radiusButton,
            color: colors.onDark.primary,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            padding: `${spacing[2]} ${spacing[5]}`,
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
            minHeight: layout.touchMin,
            marginTop: spacing[2],
          }}
        >
          신청하기
        </button>
      </div>
    </div>
  )
}
