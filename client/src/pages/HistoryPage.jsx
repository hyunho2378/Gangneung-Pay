/**
 * HistoryPage (단계 4 — 캐시백 시스템 풀스택 재구축)
 * 새 transaction 구조: storeName / totalAmount / paidByCashback / paidByBalance / cashbackEarned / cashbackMode
 * spend: 캐시백 사용 분리 박스 + 자동/수동 라벨 + 적립 표시
 * Nielsen #1 visibility, #3 user control, #6 recognition
 */

import { useState } from 'react'
import { Calendar, ChevronDown, X } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import { useTypography } from '../hooks/useTypography'
import ScreenContainer from '../components/layout/ScreenContainer'
import BottomNavBar from '../components/layout/BottomNavBar'
import PeriodPickerModal from '../components/common/PeriodPickerModal'

const TYPE_FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'charge', label: '충전' },
  { key: 'refund', label: '환불' },
  { key: 'spend', label: '결제' },
]

export default function HistoryPage() {
  const sizes = useTypography()
  const { transactions } = useUser()

  const [typeFilter, setTypeFilter] = useState('all')
  const [periodOpen, setPeriodOpen] = useState(false)
  const [periodFilter, setPeriodFilter] = useState(null)

  const filtered = transactions.filter((t) => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false
    if (periodFilter) {
      const d = new Date(t.date)
      if (d.getFullYear() !== periodFilter.year || d.getMonth() + 1 !== periodFilter.month) return false
    }
    return true
  })

  const fmt = (n) => n.toLocaleString('ko-KR')
  const fmtDate = (iso) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const periodLabel = periodFilter
    ? `${periodFilter.year}년 ${periodFilter.month}월`
    : '기간 선택'

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: `${spacing[3]} ${layout.margin}`,
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[200]}`,
        minHeight: layout.topBarHeight,
      }}>
        <h1 style={{
          margin: 0,
          fontSize: sizes.lg,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          fontFamily: typography.fontFamily,
        }}>
          이용 내역
        </h1>
      </div>

      {/* 필터 바 */}
      <div style={{
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[100]}`,
        padding: `${spacing[2]} ${layout.margin}`,
      }}>
        {/* 타입 필터 칩 */}
        <div style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[2] }}>
          {TYPE_FILTERS.map(({ key, label }) => {
            const active = typeFilter === key
            return (
              <button
                key={key}
                onClick={() => setTypeFilter(key)}
                style={{
                  padding: `${spacing[1]} ${spacing[3]}`,
                  borderRadius: layout.radiusPill,
                  border: `1px solid ${active ? colors.primary[700] : colors.gray[200]}`,
                  backgroundColor: active ? colors.primary[700] : 'transparent',
                  color: active ? colors.onDark.primary : colors.gray[700],
                  fontSize: sizes.xs,
                  fontWeight: active ? typography.weight.semibold : typography.weight.regular,
                  cursor: 'pointer',
                  fontFamily: typography.fontFamily,
                  minHeight: '32px',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* 기간 필터 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <button
            onClick={() => setPeriodOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[1],
              padding: `${spacing[1]} ${spacing[3]}`,
              borderRadius: layout.radiusPill,
              border: `1px solid ${periodFilter ? colors.primary[700] : colors.gray[200]}`,
              backgroundColor: periodFilter ? colors.primary[50] : 'transparent',
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              minHeight: '32px',
            }}
          >
            <Calendar size={14} color={periodFilter ? colors.primary[700] : colors.gray[500]} />
            <span style={{
              fontSize: sizes.xs,
              fontWeight: periodFilter ? typography.weight.semibold : typography.weight.regular,
              color: periodFilter ? colors.primary[700] : colors.gray[700],
            }}>
              {periodLabel}
            </span>
            <ChevronDown size={14} color={periodFilter ? colors.primary[700] : colors.gray[400]} />
          </button>

          {periodFilter && (
            <button
              onClick={() => setPeriodFilter(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: spacing[1],
              }}
              aria-label="기간 필터 초기화"
            >
              <X size={16} color={colors.gray[400]} />
            </button>
          )}
        </div>
      </div>

      <div style={{
        padding: layout.margin,
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        backgroundColor: colors.surface.background,
      }}>
        {filtered.length === 0 ? (
          <div style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[8],
            textAlign: 'center',
            color: colors.gray[500],
            fontSize: sizes.sm,
          }}>
            이용 내역이 없습니다
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {filtered.map((t) => {
              const isCharge = t.type === 'charge'
              const isRefund = t.type === 'refund'
              const isSpend = t.type === 'spend'

              const headerText = isCharge ? '충전' : isRefund ? '환불' : t.storeName
              const sign = isCharge ? '+' : '-'
              const amountColor = isCharge
                ? colors.primary[700]
                : isRefund
                  ? colors.warning
                  : colors.gray[900]

              return (
                <div key={t.id} style={{
                  backgroundColor: colors.surface.card,
                  borderRadius: layout.radiusCard,
                  padding: spacing[4],
                }}>
                  {/* 1줄: 헤더 라벨 + 총액 */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: spacing[3],
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: sizes.sm,
                        fontWeight: typography.weight.semibold,
                        color: colors.gray[900],
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {headerText}
                      </div>
                      <div style={{
                        marginTop: spacing[1],
                        fontSize: sizes.xs,
                        color: colors.gray[500],
                      }}>
                        {fmtDate(t.date)}
                        {isSpend && t.cashbackMode && (
                          <> · {t.cashbackMode === 'auto' ? '자동' : '수동'}</>
                        )}
                      </div>
                    </div>
                    <span style={{
                      fontSize: sizes.md,
                      fontWeight: typography.weight.bold,
                      color: amountColor,
                      whiteSpace: 'nowrap',
                    }}>
                      {sign}{fmt(t.totalAmount)}원
                    </span>
                  </div>

                  {/* 결제 수단 분리 (캐시백 사용한 경우만) */}
                  {isSpend && t.paidByCashback > 0 && (
                    <div style={{
                      marginTop: spacing[3],
                      paddingLeft: spacing[3],
                      borderLeft: `2px solid ${colors.gray[200]}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: spacing[1],
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: sizes.xs,
                        color: colors.gray[700],
                      }}>
                        <span>캐시백 사용</span>
                        <span style={{
                          color: colors.teal[500],
                          fontWeight: typography.weight.medium,
                        }}>
                          -{fmt(t.paidByCashback)}원
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: sizes.xs,
                        color: colors.gray[700],
                      }}>
                        <span>강릉페이</span>
                        <span>-{fmt(t.paidByBalance)}원</span>
                      </div>
                    </div>
                  )}

                  {/* 적립 표시 */}
                  {isSpend && t.cashbackEarned > 0 && (
                    <div style={{
                      marginTop: spacing[2],
                      fontSize: sizes.xs,
                      color: colors.teal[500],
                      fontWeight: typography.weight.medium,
                    }}>
                      +{fmt(t.cashbackEarned)}원 적립
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      <BottomNavBar />

      <PeriodPickerModal
        open={periodOpen}
        onClose={() => setPeriodOpen(false)}
        onSelect={(y, m) => setPeriodFilter({ year: y, month: m })}
        selectedYear={periodFilter?.year ?? 2026}
        selectedMonth={periodFilter?.month ?? 5}
      />
    </ScreenContainer>
  )
}
