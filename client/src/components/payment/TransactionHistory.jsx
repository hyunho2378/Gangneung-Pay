/**
 * TransactionHistory (Phase 2 redesigned)
 * Strategy: S2
 * Nielsen: #1 visibility, #2 match real world
 * Shneiderman: #3 informative feedback
 * Phase 1 ref: components/payment/TransactionHistory.jsx
 * Changed: balance display (Hi-02), refund entry banner (Hi-01),
 *          transaction list UI (Hi-03), refund period badge (Hi-04)
 */

import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

// Hi-03: 거래 내역 목업 데이터
const MOCK_HISTORY = [
  { id: 1, store: '초당순두부', date: '2025.04.12', amount: 12000, type: 'payment', refundable: true },
  { id: 2, store: '테라로사 강릉 본점', date: '2025.04.10', amount: 8500, type: 'payment', refundable: true },
  { id: 3, store: '강릉중앙시장', date: '2025.04.07', amount: 35000, type: 'payment', refundable: false },
  { id: 4, store: '충전', date: '2025.04.05', amount: 50000, type: 'charge', refundable: false },
]

function BalanceSummary({ balance }) {
  return (
    <div
      style={{
        padding: `${spacing[3]} ${layout.margin}`,
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[100]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>현재 잔액</span>
      <span
        style={{
          fontSize: typography.size.sm,
          fontWeight: typography.weight.bold,
          color: colors.primary[700],
        }}
      >
        {balance.toLocaleString('ko-KR')}원
      </span>
    </div>
  )
}

function RefundBanner({ onRefund }) {
  return (
    <div
      style={{
        margin: `${spacing[2]} ${layout.margin}`,
        backgroundColor: colors.primary[50],
        border: `1px solid ${colors.primary[100]}`,
        borderRadius: layout.radiusSmall,
        padding: `${spacing[3]} ${spacing[4]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ fontSize: typography.size.xs, color: colors.gray[700] }}>
        충전금은 언제든지 환불 신청이 가능합니다
      </span>
      <button
        onClick={onRefund}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: typography.size.xs,
          fontWeight: typography.weight.semibold,
          color: colors.primary[700],
          whiteSpace: 'nowrap',
          padding: 0,
          fontFamily: typography.fontFamily,
        }}
      >
        환불 신청 &gt;
      </button>
    </div>
  )
}

// Hi-03: 거래 항목 UI 컴포넌트 (Nielsen #2, #4 Consistency)
function TransactionItem({ item }) {
  const isCharge = item.type === 'charge'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing[3]} ${layout.margin}`,
        borderBottom: `1px solid ${colors.gray[100]}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: layout.radiusSmall,
            backgroundColor: isCharge ? colors.primary[50] : colors.gray[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {isCharge ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3 L8 13 M4 7 L8 3 L12 7" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="4" width="12" height="9" rx="2" stroke={colors.gray[500]} strokeWidth="1.5" fill="none" />
              <path d="M2 7 L14 7" stroke={colors.gray[500]} strokeWidth="1.5" />
              <path d="M5 10 L8 10" stroke={colors.gray[400]} strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <div>
          <div
            style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              color: colors.gray[900],
              marginBottom: '2px',
            }}
          >
            {item.store}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            <span style={{ fontSize: typography.size.xxs, color: colors.gray[500] }}>{item.date}</span>
            {/* Hi-04: 환불 가능 기간 배지 (S2, Nielsen #1) */}
            {item.refundable && (
              <span
                style={{
                  fontSize: typography.size.xxs,
                  color: colors.success,
                  backgroundColor: colors.successBg,
                  border: `1px solid ${colors.successBorder}`,
                  borderRadius: layout.radiusPill,
                  padding: '1px 6px',
                }}
              >
                환불 가능
              </span>
            )}
          </div>
        </div>
      </div>
      <span
        style={{
          fontSize: typography.size.sm,
          fontWeight: typography.weight.bold,
          color: isCharge ? colors.primary[700] : colors.gray[900],
        }}
      >
        {isCharge ? '+' : '-'}{item.amount.toLocaleString('ko-KR')}원
      </span>
    </div>
  )
}

function CardManagement() {
  return (
    <div style={{ padding: layout.margin }}>
      {/* 미니 카드 */}
      <div
        style={{
          backgroundColor: colors.surface.darkCard,
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          boxShadow: shadow.card,
          marginBottom: spacing[4],
          position: 'relative',
          overflow: 'hidden',
          height: '160px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.07)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-30px',
            right: '30px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.05)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
            }}
          >
            강릉페이
          </span>
          <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <rect x="1" y="1" width="26" height="20" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <rect x="8" y="5" width="12" height="12" rx="2" fill="rgba(255,255,255,0.25)" />
            <path d="M14 5 L14 17 M8 11 L20 11" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          </svg>
        </div>

        <div>
          <div
            style={{
              color: colors.onDark.secondary,
              fontSize: typography.size.xs,
              marginBottom: '4px',
            }}
          >
            강릉페이(1)
          </div>
          <div
            style={{
              color: colors.onDark.primary,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              letterSpacing: '2px',
            }}
          >
            **** **** **** 1234
          </div>
        </div>
      </div>

      {[
        { label: '카드 종류', value: '체크카드' },
        { label: '발급일', value: '2024.01.15' },
        { label: '유효기간', value: '01 / 29' },
        { label: '상태', value: '정상' },
      ].map(({ label, value }) => (
        <div
          key={label}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[3]} 0`,
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}
        >
          <span style={{ fontSize: typography.size.sm, color: colors.gray[500] }}>{label}</span>
          <span
            style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              color: colors.gray[900],
            }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TransactionHistory({ tab = 'history', onTabChange, balance = 120000, onRefund }) {
  const handleRefund = onRefund ?? (() => {})

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.surface.background,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 탭 바 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}
      >
        {[
          { key: 'history', label: '이용내역' },
          { key: 'card', label: '카드관리' },
        ].map(({ key, label }) => {
          const isActive = tab === key
          return (
            <button
              key={key}
              onClick={() => onTabChange && onTabChange(key)}
              style={{
                flex: 1,
                height: '48px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
                fontSize: typography.size.sm,
                fontWeight: isActive ? typography.weight.semibold : typography.weight.regular,
                color: isActive ? colors.primary[700] : colors.gray[500],
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ flex: 1, backgroundColor: colors.surface.card, marginTop: spacing[2] }}>
        {tab === 'history' ? (
          <>
            {/* Hi-02: 현재 잔액 표시 */}
            <BalanceSummary balance={balance} />
            {/* Hi-01: 환불 진입점 배너 */}
            <RefundBanner onRefund={handleRefund} />
            {/* Hi-03: 거래 리스트 UI, Hi-04: 환불 가능 기간 배지 */}
            {MOCK_HISTORY.map((item) => (
              <TransactionItem key={item.id} item={item} />
            ))}
          </>
        ) : (
          <CardManagement />
        )}
      </div>
    </div>
  )
}
