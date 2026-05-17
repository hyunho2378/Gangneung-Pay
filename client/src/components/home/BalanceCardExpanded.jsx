/**
 * BalanceCardExpanded — 한 다크 카드 (잔액 + 캐시백 + 토글 + 3버튼)
 * 큰글씨 모드(HomePageLarge)는 잔액/캐시백 분리 구조, 일반 모드는 한 카드 통합 구조 유지
 * 자동/수동 토글: 글래스 톤 + 활성 시 체크 아이콘 (대비 강화)
 * Strategy: S1, S3 | Nielsen: #1, #3, #7 | Shneiderman: #7
 */

import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import CardBackModal from './CardBackModal'

export default function BalanceCardExpanded({
  chargeButtonRef,
  refundButtonRef,
  onCardIconClick,
  cardBackOpen = false,
  onCardBackClose,
}) {
  const navigate = useNavigate()
  const { balance, cashbackBalance, cashbackMode, setCashbackMode } = useUser()

  const fmt = (n) => n.toLocaleString('ko-KR') + '원'

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

  const toggleBtn = (active) => ({
    flex: 1,
    padding: `${spacing[2]} ${spacing[3]}`,
    backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
    color: colors.onDark.primary,
    border: `1px solid ${active ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
    borderRadius: layout.radiusButton,
    fontSize: typography.size.xs,
    fontWeight: typography.weight.bold,
    cursor: 'pointer',
    transition: 'all 200ms',
    fontFamily: typography.fontFamily,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
  })

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
        {/* 워터마크 카드 SVG (클릭 시 Face ID) */}
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

        {/* 카드명 + 카드번호 */}
        <div style={{ marginBottom: spacing[4] }}>
          <p style={{
            margin: '0 0 3px 0',
            color: colors.onDark.primary,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.semibold,
          }}>
            강릉페이
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

        {/* 잔액 표시 — 강릉페이 + 캐시백 별도 줄 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[2],
          marginBottom: spacing[4],
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontSize: typography.size.sm,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: typography.weight.medium,
            }}>
              강릉페이
            </span>
            <span style={{
              fontSize: typography.size.largeTitle,
              color: colors.onDark.primary,
              fontWeight: typography.weight.bold,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              {fmt(balance)}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}>
            <span style={{
              fontSize: typography.size.sm,
              color: 'rgba(255,255,255,0.7)',
              fontWeight: typography.weight.medium,
            }}>
              캐시백
            </span>
            <span style={{
              fontSize: typography.size.xl,
              color: colors.teal[400],
              fontWeight: typography.weight.bold,
            }}>
              {fmt(cashbackBalance)}
            </span>
          </div>
        </div>

        {/* 캐시백 사용 모드 토글 — 글래스 톤 + 활성 시 체크 (대비 강화) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          padding: `${spacing[3]} ${spacing[4]}`,
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: layout.radiusCard,
          marginBottom: spacing[4],
        }}>
          <span style={{
            fontSize: typography.size.sm,
            color: colors.onDark.primary,
            fontWeight: typography.weight.medium,
          }}>
            캐시백
          </span>
          <div style={{ display: 'flex', flex: 1, gap: spacing[2] }}>
            <button
              onClick={() => setCashbackMode('auto')}
              style={toggleBtn(cashbackMode === 'auto')}
            >
              {cashbackMode === 'auto' && <Check size={14} />}
              자동 사용
            </button>
            <button
              onClick={() => setCashbackMode('manual')}
              style={toggleBtn(cashbackMode === 'manual')}
            >
              {cashbackMode === 'manual' && <Check size={14} />}
              수동 사용
            </button>
          </div>
        </div>

        {/* 충전 / 환불 / QR결제 — 글래스 톤 통일 */}
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

        <CardBackModal open={cardBackOpen} onClose={onCardBackClose} />
      </div>
    </div>
  )
}
