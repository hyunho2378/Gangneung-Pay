/**
 * BalanceCardExpanded (Phase 2 redesigned)
 * Strategy: S1, S2, S3
 * Nielsen: #1 visibility, #2 match real world, #3 user control
 * Shneiderman: #3 informative feedback, #7 locus of control, #8 reduce memory load
 * R1: 3버튼 [충전][환불][이용내역] 카드 내부 통합 복원
 * R7: 3D SVG 클릭 영역 (별도 아이콘 제거)
 * R9: 직관 캐시백 메시지 lucide 아이콘 적용
 */

import { useNavigate } from 'react-router-dom'
import { Bus, Coffee, Utensils, ShoppingBag, Smartphone } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

// R9: 적립액 → { text, Icon } 매핑 (lucide-react, 이모지 없음)
function getCashbackMessage(cashback) {
  if (cashback >= 20000) return { text: '한 달 통신비 아꼈어요', Icon: Smartphone }
  if (cashback >= 10000) return { text: '이번 달 외식비 굳었어요', Icon: ShoppingBag }
  if (cashback >= 6000)  return { text: '맛있는 식사 한 끼 아꼈어요', Icon: Utensils }
  if (cashback >= 3000)  return { text: '커피 한 잔 값 아꼈어요', Icon: Coffee }
  if (cashback >= 1)     return { text: '버스 한 번 탔어요', Icon: Bus }
  return null
}

export default function BalanceCardExpanded({
  balance = { cashback: 0, card: 0, charge: 0 },
  cashbackMax = 30000,
  cashbackPercent = 0,
  onFlip,
  cardCount = 1,
  cardIndex = 1,
  chargeButtonRef,
}) {
  const navigate = useNavigate()

  // H-07: 카드명 로직 (Nielsen #2, #6)
  const cardName = cardCount === 1 ? '내 카드' : `강릉페이 ${cardIndex}`

  const fmt = (n) => n.toLocaleString('ko-KR') + '원'
  const clampedPercent = Math.min(100, Math.max(0, cashbackPercent))

  const cashbackMsg = getCashbackMessage(balance.cashback)

  return (
    <div style={{ margin: layout.margin }}>
      <div
        style={{
          backgroundColor: colors.surface.darkCard,
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          boxShadow: shadow.button,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* R7: 3D SVG — 우상단 배치, 클릭 시 카드 뒷면 모달 */}
        <div
          onClick={onFlip}
          style={{
            position: 'absolute',
            right: spacing[5],
            top: spacing[5],
            opacity: 0.4,
            cursor: onFlip ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => { if (onFlip) e.currentTarget.style.opacity = '0.65' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.4' }}
        >
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none">
            <rect x="0" y="0" width="60" height="36" rx="5" fill="#FFFFFF" />
            <text x="4" y="15" fontSize="9" fontWeight="700" fill="#1B4FD8" fontFamily="sans-serif">강릉페이</text>
            <rect x="4" y="20" width="16" height="10" rx="2" fill="#D0D0D0" />
            <rect x="4" y="32" width="8" height="2" rx="1" fill="#E0E0E0" />
          </svg>
        </div>

        {/* 카드명 + 카드 번호 */}
        <div style={{ marginBottom: spacing[4] }}>
          <p
            style={{
              margin: `0 0 3px 0`,
              color: colors.onDark.primary,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.semibold,
            }}
          >
            {cardName}
          </p>
          <p
            style={{
              margin: 0,
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.regular,
              letterSpacing: '1px',
            }}
          >
            &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 1234
          </p>
        </div>

        {/* 잔액 레이블 + 금액 — R1: 색상 항상 white */}
        <div style={{ marginBottom: spacing[4] }}>
          <p
            style={{
              margin: `0 0 4px 0`,
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
            }}
          >
            잔액
          </p>
          <p
            style={{
              margin: 0,
              color: colors.onDark.primary,
              fontSize: typography.size.largeTitle,
              fontWeight: typography.weight.bold,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {fmt(balance.card)}
          </p>
        </div>

        {/* 캐시백 진행바 — S3, Nielsen #1, Shneiderman #3·#8 */}
        <div style={{ marginBottom: spacing[3] }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing[1],
            }}
          >
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.xs }}>
              이번 달 캐시백
            </span>
            <span
              style={{
                color: colors.teal[400],
                fontSize: typography.size.xs,
                fontWeight: typography.weight.semibold,
              }}
            >
              {clampedPercent}%
            </span>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: layout.radiusPill,
              height: '6px',
              overflow: 'hidden',
              marginBottom: spacing[1],
            }}
          >
            <div
              style={{
                backgroundColor: colors.teal[400],
                borderRadius: layout.radiusPill,
                height: '100%',
                width: `${clampedPercent}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: colors.teal[400], fontSize: typography.size.xs }}>
              {fmt(balance.cashback)} 적립
            </span>
            <span style={{ color: colors.onDark.secondary, fontSize: typography.size.xs }}>
              한도 {fmt(cashbackMax)}
            </span>
          </div>

          {/* R9: 직관 캐시백 메시지 — lucide 아이콘 + 텍스트 */}
          {cashbackMsg && (
            <div
              style={{
                marginTop: spacing[2],
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: layout.radiusSmall,
                padding: `${spacing[2]} ${spacing[3]}`,
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
              }}
            >
              <cashbackMsg.Icon size={16} color={colors.onDark.primary} strokeWidth={1.5} />
              <span
                style={{
                  fontSize: typography.size.xs,
                  color: colors.onDark.primary,
                  fontWeight: typography.weight.medium,
                }}
              >
                {cashbackMsg.text}
              </span>
            </div>
          )}
        </div>

        {/* R1 8행: 3슬롯 액션 버튼 row — 카드 내부 */}
        <div
          style={{
            display: 'flex',
            gap: spacing[2],
            paddingTop: spacing[3],
            borderTop: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {[
            { label: '충전', path: '/charge', ref: chargeButtonRef },
            { label: '환불', path: '/refund', ref: undefined },
            { label: '이용내역', path: '/history', ref: undefined },
          ].map(({ label, path, ref }) => (
            <button
              key={label}
              ref={ref}
              onClick={() => navigate(path)}
              style={{
                flex: 1,
                height: '48px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: 'none',
                borderRadius: layout.radiusSmall,
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                cursor: 'pointer',
                fontFamily: typography.fontFamily,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
