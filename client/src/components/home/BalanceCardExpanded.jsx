/**
 * BalanceCardExpanded (Phase 2 redesigned)
 * Strategy: S1, S2, S3
 * Nielsen: #1 visibility, #2 match real world, #3 user control
 * Shneiderman: #3 informative feedback, #7 locus of control, #8 reduce memory load
 * Task 5: 3버튼 [충전][환불][이용내역] (QR결제 → 이용내역)
 * Task 8: 카드 우측 상단 아이콘 버튼만 뒤집기 트리거 (카드 전체 onClick 제거)
 */

import { useNavigate } from 'react-router-dom'
import { CreditCard } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

const LOW_BALANCE = 10000

// S3: 혜택 체감 문구 — 금액 구간별 (Nielsen #1 visibility, Shneiderman #3 feedback)
function getCashbackMessage(amount) {
  if (amount >= 30000) return '이번 달 한도 달성!'
  if (amount >= 10000) return '점심 한 끼 값 아꼈어요'
  if (amount >= 3200) return '커피 한 잔 값 아꼈어요'
  return null
}

export default function BalanceCardExpanded({
  balance = { cashback: 3200, card: 120000, charge: 0 },
  cashbackMax = 30000,
  cashbackPercent = 10,
  onCharge,
  onRefund,
  onHistory,
  onFlip,
  cardCount = 1,
  cardIndex = 1,
  chargeButtonRef,
}) {
  const navigate = useNavigate()
  const handleCharge = onCharge ?? (() => navigate('/charge'))
  const handleRefund = onRefund ?? (() => navigate('/refund'))
  const handleHistory = onHistory ?? (() => navigate('/history'))
  // H-07: 카드명 로직 (Nielsen #2, #6)
  const cardName = cardCount === 1 ? '내 카드' : `강릉페이 ${cardIndex}`

  const fmt = (n) => n.toLocaleString('ko-KR') + '원'
  const clampedPercent = Math.min(100, Math.max(0, cashbackPercent))
  const isLowBalance = balance.card < LOW_BALANCE

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
        {/* 워터마크 — 우상단 절대 배치, 비파괴 SVG 보존 */}
        <div
          style={{
            position: 'absolute',
            right: spacing[5],
            top: spacing[5],
            opacity: 0.15,
            pointerEvents: 'none',
          }}
        >
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none">
            <rect x="0" y="0" width="60" height="36" rx="5" fill="#FFFFFF" />
            <text x="4" y="15" fontSize="9" fontWeight="700" fill="#1B4FD8" fontFamily="sans-serif">강릉페이</text>
            <rect x="4" y="20" width="16" height="10" rx="2" fill="#D0D0D0" />
            <rect x="4" y="32" width="8" height="2" rx="1" fill="#E0E0E0" />
          </svg>
        </div>

        {/* Task 8: 뒤집기 트리거 — 우측 상단 아이콘 버튼 (터치 44×44) */}
        {onFlip && (
          <button
            onClick={onFlip}
            aria-label="카드 뒷면 보기"
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              opacity: 0.4,
              zIndex: 1,
            }}
          >
            <CreditCard size={24} color={colors.onDark.primary} strokeWidth={1.8} />
          </button>
        )}

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

        {/* 잔액 레이블 + 금액 — Nielsen #1 visibility, S1·S3 */}
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
              color: isLowBalance ? colors.warning : colors.onDark.primary,
              fontSize: typography.size.largeTitle,
              fontWeight: typography.weight.bold,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              transition: 'color 0.3s ease',
            }}
          >
            {fmt(balance.card)}
          </p>
          {/* 잔액 부족 인라인 경고 — S5, Nielsen #5, Shneiderman #5 */}
          {isLowBalance && (
            <p
              style={{
                margin: `${spacing[1]} 0 0 0`,
                color: colors.warning,
                fontSize: typography.size.xs,
                fontWeight: typography.weight.medium,
              }}
            >
              잔액이 부족합니다. 충전 후 사용하세요.
            </p>
          )}
        </div>

        {/* 캐시백 진행바 통합 — S3, Nielsen #1, Shneiderman #3·#8 */}
        <div style={{ marginBottom: spacing[4] }}>
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
          {/* S3: 혜택 체감 문구 (Nielsen #1, Shneiderman #3) */}
          {getCashbackMessage(balance.cashback) && (
            <div
              style={{
                marginTop: spacing[2],
                backgroundColor: 'rgba(45,212,191,0.15)',
                borderRadius: layout.radiusSmall,
                padding: `${spacing[1]} ${spacing[3]}`,
                fontSize: typography.size.xs,
                color: colors.teal[400],
                fontWeight: typography.weight.medium,
              }}
            >
              {getCashbackMessage(balance.cashback)}
            </div>
          )}
        </div>

        {/* Task 5: 3버튼 행 — [충전][환불][이용내역] (S2 환불 동등 위계) */}
        <div style={{ display: 'flex', gap: spacing[2] }}>
          {/* S7 코치마크용 ref 연결 — 충전 버튼 */}
          <button
            ref={chargeButtonRef}
            onClick={handleCharge}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              padding: `${spacing[2]} 0`,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              minHeight: layout.touchMin,
              fontFamily: typography.fontFamily,
            }}
          >
            충전
          </button>
          {[
            { label: '환불', onClick: handleRefund },
            { label: '이용내역', onClick: handleHistory },
          ].map(({ label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: layout.radiusButton,
                color: colors.onDark.primary,
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                padding: `${spacing[2]} 0`,
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                minHeight: layout.touchMin,
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
