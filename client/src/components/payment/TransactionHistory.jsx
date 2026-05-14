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
  { id: 5, store: '환불 처리', date: '2025.04.13', amount: 12000, type: 'refund', refundable: false },
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
        환불 신청하기
      </button>
    </div>
  )
}

// Hi-03: 거래 항목 UI 컴포넌트 (Nielsen #2, #4 Consistency)
function TransactionItem({ item }) {
  const isCharge = item.type === 'charge'
  const isRefund = item.type === 'refund'

  let amountPrefix = '-'
  if (isCharge || isRefund) amountPrefix = '+'

  const amountColor = isRefund ? colors.success : isCharge ? colors.primary[700] : colors.gray[900]

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
            backgroundColor: isCharge ? colors.primary[50] : isRefund ? colors.successBg : colors.gray[100],
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
          ) : isRefund ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3 L8 13 M4 9 L8 13 L12 9" stroke={colors.success} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          color: amountColor,
        }}
      >
        {amountPrefix}{item.amount.toLocaleString('ko-KR')}원
      </span>
    </div>
  )
}

export default function TransactionHistory({ balance = 120000, onRefund }) {
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
      {/* 탭 콘텐츠 */}
      <div style={{ flex: 1, backgroundColor: colors.surface.card, marginTop: spacing[2] }}>
        {/* Hi-02: 현재 잔액 표시 */}
        <BalanceSummary balance={balance} />
        {/* Hi-01: 환불 진입점 배너 */}
        <RefundBanner onRefund={handleRefund} />
        {/* Hi-03: 거래 리스트 UI, Hi-04: 환불 가능 기간 배지 */}
        {MOCK_HISTORY.map((item) => (
          <TransactionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
