/**
 * CashbackPage — 캐시백 내역
 * "차감" 관련 표현 전면 제거 (강릉페이는 적립만 있음)
 * Nielsen #1 visibility, #3 user control
 * Shneiderman #3 informative feedback
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronDown } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import PeriodPickerModal from '../components/common/PeriodPickerModal'

export default function CashbackPage() {
  const navigate = useNavigate()
  const { transactions } = useUser()

  const [periodOpen, setPeriodOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2026)
  const [selectedMonth, setSelectedMonth] = useState(5)

  const filteredSpends = transactions.filter((t) => {
    const d = new Date(t.date)
    return (
      t.type === 'spend' &&
      d.getFullYear() === selectedYear &&
      d.getMonth() + 1 === selectedMonth
    )
  })

  const periodCashback = filteredSpends.reduce((sum, t) => sum + (t.cashback || 0), 0)
  const displayCashback = Math.min(30000, periodCashback)
  const percent = Math.min(100, Math.floor((displayCashback / 30000) * 100))

  const fmt = (n) => n.toLocaleString('ko-KR')
  const fmtDate = (iso) => {
    const d = new Date(iso)
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  }

  return (
    <ScreenContainer>
      <TopAppBarBack title="캐시백 내역" onBack={() => navigate(-1)} />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: spacing[6],
        backgroundColor: colors.surface.background,
      }}>
        {/* 이번 달 적립 요약 카드 */}
        <div style={{
          backgroundColor: colors.primary[700],
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          margin: layout.margin,
        }}>
          <p style={{
            margin: 0,
            fontSize: typography.size.sm,
            color: colors.onDark.secondary,
          }}>
            {selectedYear}년 {selectedMonth}월 적립
          </p>
          <p style={{
            margin: `${spacing[1]} 0`,
            fontSize: typography.size.largeTitle,
            fontWeight: typography.weight.bold,
            color: colors.onDark.primary,
            lineHeight: 1.2,
          }}>
            {fmt(displayCashback)}원
          </p>
          <p style={{
            margin: `0 0 ${spacing[3]}`,
            fontSize: typography.size.xs,
            color: colors.onDark.secondary,
          }}>
            월 한도 30,000원
          </p>

          {/* 진행바 */}
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            height: '6px',
            borderRadius: layout.radiusPill,
            overflow: 'hidden',
          }}>
            <div style={{
              background: colors.teal[400],
              width: `${percent}%`,
              height: '100%',
              borderRadius: layout.radiusPill,
              transition: 'width 0.3s ease',
            }} />
          </div>

          <p style={{
            margin: `${spacing[2]} 0 0`,
            fontSize: typography.size.xs,
            color: colors.onDark.secondary,
          }}>
            {percent}% 달성
          </p>
        </div>

        {/* 안내 문구 */}
        <p style={{
          margin: `0 ${layout.margin} ${spacing[4]}`,
          fontSize: typography.size.xs,
          color: colors.gray[500],
          lineHeight: 1.5,
        }}>
          매월 30,000원까지 적립되며, 한도 초과 후엔 적립이 중단됩니다.
        </p>

        {/* 기간 선택 버튼 */}
        <button
          onClick={() => setPeriodOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            margin: `0 ${layout.margin} ${spacing[3]}`,
            padding: `${spacing[2]} ${spacing[3]}`,
            backgroundColor: colors.surface.card,
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: layout.radiusChip,
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
            minHeight: layout.touchMin,
          }}
        >
          <Calendar size={16} color={colors.primary[700]} />
          <span style={{
            fontSize: typography.size.sm,
            fontWeight: typography.weight.medium,
            color: colors.gray[900],
          }}>
            {selectedYear}년 {selectedMonth}월
          </span>
          <ChevronDown size={16} color={colors.gray[400]} />
        </button>

        {/* 적립 내역 리스트 */}
        {filteredSpends.length === 0 ? (
          <div style={{
            margin: `0 ${layout.margin}`,
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[8],
            textAlign: 'center',
            color: colors.gray[400],
            fontSize: typography.size.sm,
          }}>
            해당 월의 캐시백 적립 내역이 없습니다
          </div>
        ) : (
          <div style={{
            margin: `0 ${layout.margin}`,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[2],
          }}>
            {filteredSpends.map((t) => (
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
                  <p style={{
                    margin: 0,
                    fontSize: typography.size.sm,
                    fontWeight: typography.weight.semibold,
                    color: colors.gray[900],
                  }}>
                    {t.store}
                  </p>
                  <p style={{
                    margin: `${spacing[1]} 0 0`,
                    fontSize: typography.size.xs,
                    color: colors.gray[500],
                  }}>
                    {fmtDate(t.date)} · {fmt(t.amount)}원 결제
                  </p>
                </div>
                <span style={{
                  fontSize: typography.size.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.teal[500],
                  whiteSpace: 'nowrap',
                }}>
                  +{fmt(t.cashback)}원
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <PeriodPickerModal
        open={periodOpen}
        onClose={() => setPeriodOpen(false)}
        onSelect={(y, m) => { setSelectedYear(y); setSelectedMonth(m) }}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
    </ScreenContainer>
  )
}
