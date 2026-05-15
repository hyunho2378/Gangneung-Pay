/**
 * HistoryPage (C3-4)
 * UserContext.transactions 시간순 표시
 * 타입 필터 (전체/충전/환불/결제) + 기간 필터 (PeriodPickerModal)
 * type 'spend': store명 + 적립 금액 teal-500
 * Nielsen #3 user control, #6 recognition
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Calendar, ChevronDown, X } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
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
  const navigate = useNavigate()
  const { transactions } = useUser()

  const [typeFilter, setTypeFilter] = useState('all')
  const [periodOpen, setPeriodOpen] = useState(false)
  const [periodFilter, setPeriodFilter] = useState(null) // null = 전체, {year, month} = 특정 월

  const filtered = transactions.filter((t) => {
    if (typeFilter !== 'all' && t.type !== typeFilter) return false
    if (periodFilter) {
      const d = new Date(t.date)
      if (d.getFullYear() !== periodFilter.year || d.getMonth() + 1 !== periodFilter.month) return false
    }
    return true
  })

  const fmt = (n) => n.toLocaleString('ko-KR') + '원'
  const fmtDate = (iso) => {
    const d = new Date(iso)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const getLabel = (t) => {
    if (t.type === 'charge') return { text: '충전', color: colors.primary[700], sign: '+' }
    if (t.type === 'refund') return { text: '환불', color: colors.error, sign: '-' }
    if (t.type === 'spend') return { text: t.store || '결제', color: colors.gray[900], sign: '-' }
    return { text: '기타', color: colors.gray[700], sign: '' }
  }

  const periodLabel = periodFilter
    ? `${periodFilter.year}년 ${periodFilter.month}월`
    : '기간 선택'

  return (
    <ScreenContainer>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: spacing[3],
        padding: `${spacing[3]} ${layout.margin}`,
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[200]}`,
        minHeight: layout.topBarHeight,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          aria-label="뒤로가기"
        >
          <ChevronLeft size={24} color={colors.gray[900]} />
        </button>
        <h1 style={{
          margin: 0,
          flex: 1,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
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
                  fontSize: typography.size.xs,
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
              fontSize: typography.size.xs,
              fontWeight: periodFilter ? typography.weight.semibold : typography.weight.regular,
              color: periodFilter ? colors.primary[700] : colors.gray[700],
            }}>
              {periodLabel}
            </span>
            <ChevronDown size={14} color={periodFilter ? colors.primary[700] : colors.gray[400]} />
          </button>

          {/* 기간 필터 초기화 버튼 */}
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
        overflowY: 'auto',
        paddingBottom: '139px',
        backgroundColor: colors.surface.background,
      }}>
        {filtered.length === 0 ? (
          <div style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[8],
            textAlign: 'center',
            color: colors.gray[500],
            fontSize: typography.size.sm,
          }}>
            이용 내역이 없습니다
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            {filtered.map((t) => {
              const label = getLabel(t)
              return (
                <div key={t.id} style={{
                  backgroundColor: colors.surface.card,
                  borderRadius: layout.radiusCard,
                  padding: spacing[4],
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: spacing[3],
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                      <span style={{
                        fontSize: typography.size.sm,
                        fontWeight: typography.weight.semibold,
                        color: label.color,
                      }}>
                        {label.text}
                      </span>
                      {t.type === 'charge' && t.refunded && (
                        <span style={{
                          fontSize: typography.size.xxs,
                          color: colors.gray[500],
                          backgroundColor: colors.gray[100],
                          padding: `2px ${spacing[2]}`,
                          borderRadius: layout.radiusPill,
                        }}>
                          환불됨
                        </span>
                      )}
                    </div>
                    <p style={{
                      margin: `${spacing[1]} 0 0 0`,
                      fontSize: typography.size.xs,
                      color: colors.gray[500],
                    }}>
                      {fmtDate(t.date)}
                    </p>
                    {/* 결제 건 캐시백 적립 표시 */}
                    {t.type === 'spend' && t.cashback > 0 && (
                      <p style={{
                        margin: `2px 0 0 0`,
                        fontSize: typography.size.xs,
                        color: colors.teal[500],
                      }}>
                        +{t.cashback.toLocaleString('ko-KR')}원 적립
                      </p>
                    )}
                  </div>
                  <span style={{
                    fontSize: typography.size.md,
                    fontWeight: typography.weight.bold,
                    color: label.color,
                    whiteSpace: 'nowrap',
                  }}>
                    {label.sign}{fmt(t.amount)}
                  </span>
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
