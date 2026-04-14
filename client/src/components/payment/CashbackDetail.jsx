// CashbackDetail.jsx — P05 (p.11,12)
// 캐시백 상세 화면

import { useState } from 'react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import MonthPickerSheet from '../common/MonthPickerSheet'

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
      <div
        style={{
          fontSize: typography.size.sm,
          fontWeight: typography.weight.bold,
          color: colors.teal[500],
        }}
      >
        +{item.amount.toLocaleString('ko-KR')}원
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
}) {
  const [pickerOpenInternal, setPickerOpenInternal] = useState(false)
  const [selectedMonthInternal, setSelectedMonthInternal] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  // controlled 모드: 부모가 selectedMonth를 전달하면 그걸 사용, 아니면 내부 state 사용
  const selectedMonth = selectedMonthProp !== undefined ? selectedMonthProp : selectedMonthInternal
  const handlePickerOpen = onMonthPickerOpen !== undefined
    ? onMonthPickerOpen
    : () => setPickerOpenInternal(true)
  const pickerOpen = onMonthPickerOpen !== undefined ? false : pickerOpenInternal

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
      {/* 탭 바 */}
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
              {tab === 'auto' ? '자동' : '수동'}
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
