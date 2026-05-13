/**
 * CashbackDetail (Phase 2 redesigned)
 * Strategy: S3
 * Nielsen: #1 visibility, #3 user control
 * Shneiderman: #3 informative feedback, #8 reduce memory load
 * Phase 1 ref: components/payment/CashbackDetail.jsx
 * Changed: summary card top (Cb-01), cashback amount field (Cb-02), tab labels (Cb-03)
 */

import { useState } from 'react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import MonthPickerSheet from '../common/MonthPickerSheet'

function SummaryCard({ items, cashbackMax }) {
  const earned = items.reduce((sum, item) => {
    const v = item.cashback ?? item.amount ?? 0
    return v > 0 ? sum + v : sum
  }, 0)
  const percent = cashbackMax > 0 ? Math.min((earned / cashbackMax) * 100, 100) : 0

  return (
    <div
      style={{
        margin: `${spacing[3]} ${layout.margin}`,
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        padding: spacing[4],
        boxShadow: shadow.card,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[3] }}>
        <div>
          <div style={{ fontSize: typography.size.xs, color: colors.gray[500], marginBottom: '2px' }}>
            이번달 적립
          </div>
          <div
            style={{
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              color: colors.teal[500],
            }}
          >
            {earned.toLocaleString('ko-KR')}원
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: typography.size.xs, color: colors.gray[500], marginBottom: '2px' }}>
            월 한도
          </div>
          <div
            style={{
              fontSize: typography.size.sm,
              fontWeight: typography.weight.semibold,
              color: colors.gray[700],
            }}
          >
            {cashbackMax.toLocaleString('ko-KR')}원
          </div>
        </div>
      </div>
      <div
        style={{
          height: '6px',
          backgroundColor: colors.gray[100],
          borderRadius: '3px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percent}%`,
            backgroundColor: colors.teal[400],
            borderRadius: '3px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
      <div
        style={{
          marginTop: spacing[1],
          fontSize: typography.size.xxs,
          color: colors.gray[500],
          textAlign: 'right',
        }}
      >
        {percent.toFixed(1)}% 달성
      </div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing[10]} ${layout.margin}`,
        gap: spacing[3],
      }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="28" fill={colors.gray[100]} />
        <path
          d="M20 28 Q28 20 36 28 Q28 36 20 28 Z"
          stroke={colors.gray[400]}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="28" r="4" fill={colors.gray[300]} />
      </svg>
      <span
        style={{
          fontSize: typography.size.sm,
          color: colors.gray[400],
          fontWeight: typography.weight.medium,
        }}
      >
        {message}
      </span>
    </div>
  )
}

function CashbackItem({ item }) {
  const cashbackValue = item.cashback ?? item.amount ?? 0
  const isPositive = cashbackValue >= 0
  const displayValue = Math.abs(cashbackValue).toLocaleString('ko-KR') + '원'

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
      <div>
        <div
          style={{
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            color: colors.gray[900],
            marginBottom: '2px',
          }}
        >
          {item.storeName}
        </div>
        <div
          style={{
            fontSize: typography.size.xs,
            color: colors.gray[500],
          }}
        >
          {item.date}
        </div>
      </div>
      {/* Cb-02: item.cashback 우선 사용, 부호 색상 구분 */}
      <div
        style={{
          fontSize: typography.size.sm,
          fontWeight: typography.weight.bold,
          color: isPositive ? colors.teal[500] : colors.error,
        }}
      >
        {isPositive ? '+' : '-'}{displayValue}
      </div>
    </div>
  )
}

export default function CashbackDetail({
  mode = 'auto',
  onModeChange,
  items = [],
  selectedMonth: selectedMonthProp,
  onMonthPickerOpen,
  cashbackMax = 30000,
}) {
  const [pickerOpenInternal, setPickerOpenInternal] = useState(false)
  const [selectedMonthInternal, setSelectedMonthInternal] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  const selectedMonth = selectedMonthProp !== undefined ? selectedMonthProp : selectedMonthInternal
  const handlePickerOpen = onMonthPickerOpen !== undefined
    ? onMonthPickerOpen
    : () => setPickerOpenInternal(true)

  const formatMonthLabel = (value) => {
    const [year, month] = value.split('-')
    return `${year}년 ${parseInt(month, 10)}월`
  }

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
      {/* Cb-01: 이번달 캐시백 요약 카드 */}
      <SummaryCard items={items} cashbackMax={cashbackMax} />

      {/* Cb-04: 캐시백 사용 안내 (Nielsen #10 help and documentation) */}
      <div
        style={{
          margin: `0 ${layout.margin} ${spacing[2]}`,
          padding: `${spacing[3]} ${spacing[4]}`,
          backgroundColor: colors.primary[50],
          border: `1px solid ${colors.primary[100]}`,
          borderRadius: layout.radiusSmall,
          display: 'flex',
          gap: spacing[2],
          alignItems: 'flex-start',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
          <circle cx="7" cy="7" r="6.5" stroke={colors.primary[700]} strokeWidth="1.2" fill="none" />
          <path d="M7 6 L7 10" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="7" cy="4" r="0.8" fill={colors.primary[700]} />
        </svg>
        <p style={{ margin: 0, fontSize: typography.size.xxs, color: colors.gray[600], lineHeight: 1.5 }}>
          적립된 캐시백은 강릉페이 결제 시 자동으로 차감됩니다. 월 한도 초과 후엔 적립이 중단됩니다.
        </p>
      </div>

      {/* Cb-03: 탭 레이블 '자동 적립' / '수동 확인' */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}
      >
        {['auto', 'manual'].map((tab) => {
          const isActive = mode === tab
          return (
            <button
              key={tab}
              onClick={() => onModeChange && onModeChange(tab)}
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
              {tab === 'auto' ? '자동 적립' : '수동 확인'}
            </button>
          )
        })}
      </div>

      {/* 수동 탭: 기간 선택 버튼 */}
      {mode === 'manual' && (
        <div
          style={{
            backgroundColor: colors.surface.card,
            padding: `${spacing[3]} ${layout.margin}`,
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}
        >
          <button
            onClick={handlePickerOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: spacing[2],
              backgroundColor: colors.primary[50],
              color: colors.primary[700],
              border: `1px solid ${colors.primary[100]}`,
              borderRadius: layout.radiusPill,
              padding: `${spacing[1]} ${spacing[3]}`,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="2" stroke={colors.primary[700]} strokeWidth="1.5" fill="none" />
              <path d="M1 5 L13 5" stroke={colors.primary[700]} strokeWidth="1.5" />
              <path d="M4 1 L4 3 M10 1 L10 3" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {formatMonthLabel(selectedMonth)}
          </button>
        </div>
      )}

      {/* 내역 리스트 */}
      <div style={{ flex: 1, backgroundColor: colors.surface.card, marginTop: spacing[2] }}>
        {items.length === 0 ? (
          <EmptyState
            message={
              mode === 'auto'
                ? '자동 캐시백 내역이 없습니다'
                : `${formatMonthLabel(selectedMonth)} 수동 캐시백 내역이 없습니다`
            }
          />
        ) : (
          items.map((item, idx) => <CashbackItem key={item.id || idx} item={item} />)
        )}
      </div>

      {/* 월 선택 바텀시트 — uncontrolled(내부) 모드에서만 직접 렌더링 */}
      {mode === 'manual' && onMonthPickerOpen === undefined && (
        <MonthPickerSheet
          isOpen={pickerOpenInternal}
          onClose={() => setPickerOpenInternal(false)}
          selected={selectedMonthInternal}
          onSelect={(val) => {
            setSelectedMonthInternal(val)
            setPickerOpenInternal(false)
          }}
        />
      )}
    </div>
  )
}
