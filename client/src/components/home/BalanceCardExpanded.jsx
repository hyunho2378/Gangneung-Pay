/**
 * BalanceCardExpanded (Phase 2 redesigned)
 * Strategy: S1, S2, S3
 * Nielsen: #1 visibility, #2 match real world, #3 user control
 * Shneiderman: #3 informative feedback, #7 locus of control, #8 reduce memory load
 * A2: onCardIconClick(button), refundButtonRef, LOW_BALANCE, teal 직관 메시지, 글래스 보더
 */

import { useNavigate } from 'react-router-dom'
import { Bus, Coffee, Utensils, ShoppingBag, Smartphone } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import CardBackModal from './CardBackModal'

function getCashbackIntuition(amount) {
  if (amount >= 20000) return { text: '한 달 통신비 아꼈어요', Icon: Smartphone }
  if (amount >= 10000) return { text: '이번 달 외식비 굳었어요', Icon: ShoppingBag }
  if (amount >= 6000)  return { text: '맛있는 식사 한 끼 아꼈어요', Icon: Utensils }
  if (amount >= 3000)  return { text: '커피 한 잔 값 아꼈어요', Icon: Coffee }
  if (amount >= 1)     return { text: '버스 한 번 탔어요', Icon: Bus }
  return null
}

export default function BalanceCardExpanded({
  balance = { cashback: 0, card: 0, charge: 0 },
  cashbackMax = 30000,
  cashbackPercent = 0,
  onCardIconClick,
  cardCount = 1,
  cardIndex = 1,
  chargeButtonRef,
  refundButtonRef,
  cardBackOpen = false,
  onCardBackClose,
}) {
  const navigate = useNavigate()

  const cardName = cardCount === 1 ? '내 카드' : `강릉페이 ${cardIndex}`
  const fmt = (n) => n.toLocaleString('ko-KR') + '원'
  const clampedPercent = Math.min(100, Math.max(0, cashbackPercent))
  const intuition = getCashbackIntuition(balance.cashback)

  const glassBtn = {
    flex: 1,
    height: '48px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: layout.radiusSmall,
    color: colors.onDark.primary,
    fontSize: typography.size.sm,
    fontWeight: typography.weight.medium,
    cursor: 'pointer',
    fontFamily: typography.fontFamily,
  }

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
        {/* A2 [변경 3]: 워터마크 button, onCardIconClick prop, opacity 0.15 → hover 0.25 */}
        <button
          type="button"
          onClick={onCardIconClick}
          aria-label="카드 뒷면 보기"
          style={{
            position: 'absolute',
            right: spacing[5],
            top: spacing[5],
            opacity: 0.4,
            background: 'none',
            border: 'none',
            padding: spacing[2],
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            zIndex: 2,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.4' }}
        >
          <svg width="60" height="36" viewBox="0 0 60 36" fill="none">
            <rect x="0" y="0" width="60" height="36" rx="5" fill="#FFFFFF" />
            <text x="4" y="15" fontSize="9" fontWeight="700" fill="#1B4FD8" fontFamily="sans-serif">강릉페이</text>
            <rect x="4" y="20" width="16" height="10" rx="2" fill="#D0D0D0" />
            <rect x="4" y="32" width="8" height="2" rx="1" fill="#E0E0E0" />
          </svg>
        </button>

        {/* 카드명 + 카드 번호 */}
        <div style={{ marginBottom: spacing[4] }}>
          <p style={{
            margin: '0 0 3px 0',
            color: colors.onDark.primary,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.semibold,
          }}>
            {cardName}
          </p>
          <p style={{
            margin: 0,
            color: colors.onDark.secondary,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.regular,
            letterSpacing: '1px',
          }}>
            &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 1234
          </p>
        </div>

        {/* 잔액 레이블 + 금액 — A2 [변경 5]: LOW_BALANCE < 10000 시 warning */}
        <div style={{ marginBottom: spacing[4] }}>
          <p style={{
            margin: '0 0 4px 0',
            color: colors.onDark.secondary,
            fontSize: typography.size.xs,
          }}>
            잔액
          </p>
          <p style={{
            margin: 0,
            color: colors.onDark.primary,
            fontSize: typography.size.largeTitle,
            fontWeight: typography.weight.bold,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}>
            {fmt(balance.card)}
          </p>
        </div>

        {/* 캐시백 진행바 — FIX-H2: 화이트 박스 분리 */}
        <div style={{
          marginBottom: spacing[4],
          backgroundColor: colors.surface.card,
          borderRadius: layout.radiusSmall,
          padding: spacing[3],
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: spacing[2],
          }}>
            <span style={{
              color: colors.gray[700],
              fontSize: typography.size.xs,
              fontWeight: typography.weight.medium,
            }}>
              이번 달 캐시백
            </span>
            <span style={{
              color: colors.teal[500],
              fontSize: typography.size.sm,
              fontWeight: typography.weight.bold,
            }}>
              {clampedPercent}%
            </span>
          </div>
          <div style={{
            backgroundColor: colors.gray[100],
            borderRadius: layout.radiusPill,
            height: '6px',
            overflow: 'hidden',
            marginBottom: spacing[2],
          }}>
            <div style={{
              backgroundColor: colors.teal[500],
              borderRadius: layout.radiusPill,
              height: '100%',
              width: `${clampedPercent}%`,
              transition: 'width 0.5s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              color: colors.teal[500],
              fontSize: typography.size.xs,
              fontWeight: typography.weight.semibold,
            }}>
              {fmt(balance.cashback)} 적립
            </span>
            <span style={{ color: colors.gray[500], fontSize: typography.size.xs }}>
              한도 {fmt(cashbackMax)}
            </span>
          </div>

          {intuition && (
            <div style={{
              marginTop: spacing[2],
              backgroundColor: 'rgba(20,184,166,0.1)',
              borderRadius: layout.radiusSmall,
              padding: `${spacing[1]} ${spacing[3]}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
            }}>
              <intuition.Icon size={16} color={colors.teal[500]} strokeWidth={1.8} />
              <span style={{
                fontSize: typography.size.xs,
                color: colors.teal[500],
                fontWeight: typography.weight.medium,
              }}>
                {intuition.text}
              </span>
            </div>
          )}
        </div>

        {/* A2 [변경 4]: 충전(chargeButtonRef), 환불(refundButtonRef 분리), 이용내역 */}
        <div style={{
          display: 'flex',
          gap: spacing[2],
          paddingTop: spacing[3],
          borderTop: '1px solid rgba(255,255,255,0.15)',
        }}>
          <button ref={chargeButtonRef} onClick={() => navigate('/charge')} style={glassBtn}>
            충전
          </button>
          <button ref={refundButtonRef} onClick={() => navigate('/refund')} style={glassBtn}>
            환불
          </button>
          <button onClick={() => navigate('/qr')} style={glassBtn}>
            QR결제
          </button>
        </div>

        {/* 카드 뒷면 모달 — 카드 영역 내 absolute, overflow hidden으로 클립 */}
        <CardBackModal open={cardBackOpen} onClose={onCardBackClose} />
      </div>
    </div>
  )
}
