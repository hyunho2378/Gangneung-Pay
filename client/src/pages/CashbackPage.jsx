/**
 * CashbackPage (단계 4 — 캐시백 시스템 풀스택 재구축)
 * 3탭 (적립 / 사용 / 소멸) + CashbackSummaryCard + PeriodPicker
 * 새 transaction 구조: storeName / totalAmount / paidByCashback / cashbackEarned
 * Nielsen #1 visibility, #3 user control, #6 recognition
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronDown } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import { useTypography } from '../hooks/useTypography'
import { usePlatform } from '../hooks/usePlatform'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import PeriodPickerModal from '../components/common/PeriodPickerModal'
import EmptyState from '../components/common/EmptyState'
import { formatDate } from '../utils/date'

const MAX_MONTHLY = 30000

const TABS = [
  { key: 'earned', label: '적립' },
  { key: 'used', label: '사용' },
  { key: 'expiring', label: '소멸 예정' },
]

// ─── 요약 카드 ───────────────────────────────────────────────────────────────

function CashbackSummaryCard({ cashbackBalance, periodAccumulated, periodLabel, sizes, fmt }) {
  const percent = Math.min(100, Math.floor((periodAccumulated / MAX_MONTHLY) * 100))

  return (
    <div style={{
      margin: layout.margin,
      padding: spacing[5],
      backgroundColor: colors.primary[700],
      borderRadius: layout.radiusCard,
      color: colors.onDark.primary,
    }}>
      <div style={{ marginBottom: spacing[3] }}>
        <div style={{
          fontSize: sizes.sm,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: spacing[1],
        }}>
          사용 가능 캐시백
        </div>
        <div style={{
          fontSize: sizes.largeTitle,
          fontWeight: typography.weight.bold,
          lineHeight: 1.1,
        }}>
          {fmt(cashbackBalance)}원
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: `${spacing[3]} 0 ${spacing[2]}`,
        borderTop: `1px solid rgba(255,255,255,0.2)`,
        fontSize: sizes.sm,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>{periodLabel} 적립</span>
        <span style={{ fontWeight: typography.weight.medium }}>
          {fmt(periodAccumulated)}원 / {fmt(MAX_MONTHLY)}원
        </span>
      </div>

      <div style={{
        height: '6px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: layout.radiusPill,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${percent}%`,
          backgroundColor: colors.teal[400],
          borderRadius: layout.radiusPill,
          transition: 'width 300ms ease',
        }} />
      </div>

      <div style={{
        marginTop: spacing[2],
        fontSize: sizes.xs,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'right',
      }}>
        {percent}% 달성
      </div>
    </div>
  )
}

// ─── 적립 리스트 ─────────────────────────────────────────────────────────────

function EarnedList({ transactions, sizes, fmt, fmtDate }) {
  if (transactions.length === 0) {
    return <EmptyState message="이 기간에 적립 내역이 없어요" />
  }

  return (
    <div style={{ margin: `0 ${layout.margin}`, display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      {transactions.map((t) => (
        <div key={t.id} style={{
          backgroundColor: colors.surface.card,
          borderRadius: layout.radiusCard,
          padding: spacing[4],
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
              {t.storeName}
            </div>
            <div style={{
              marginTop: spacing[1],
              fontSize: sizes.xs,
              color: colors.gray[500],
            }}>
              {fmtDate(t.date)} · 결제 {fmt(t.totalAmount)}원
            </div>
          </div>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.bold,
            color: colors.teal[500],
            whiteSpace: 'nowrap',
          }}>
            +{fmt(t.cashbackEarned)}원
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── 사용 리스트 ─────────────────────────────────────────────────────────────

function UsedList({ transactions, sizes, fmt, fmtDate }) {
  if (transactions.length === 0) {
    return <EmptyState message="이 기간에 캐시백 사용 내역이 없어요" />
  }

  return (
    <div style={{ margin: `0 ${layout.margin}`, display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      {transactions.map((t) => (
        <div key={t.id} style={{
          backgroundColor: colors.surface.card,
          borderRadius: layout.radiusCard,
          padding: spacing[4],
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
              {t.storeName}
            </div>
            <div style={{
              marginTop: spacing[1],
              fontSize: sizes.xs,
              color: colors.gray[500],
            }}>
              {fmtDate(t.date)} · 결제 {fmt(t.totalAmount)}원
            </div>
          </div>
          <span style={{
            fontSize: sizes.md,
            fontWeight: typography.weight.bold,
            color: colors.warning,
            whiteSpace: 'nowrap',
          }}>
            -{fmt(t.paidByCashback)}원
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── 소멸 예정 안내 ──────────────────────────────────────────────────────────

function ExpiringInfo({ sizes }) {
  return (
    <div style={{ padding: `0 ${layout.margin}`, display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
      <div style={{
        backgroundColor: colors.surface.card,
        borderRadius: layout.radiusCard,
        padding: spacing[6],
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: sizes.md,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          marginBottom: spacing[2],
        }}>
          소멸 예정 캐시백이 없어요
        </div>
        <div style={{
          fontSize: sizes.sm,
          color: colors.gray[500],
          lineHeight: 1.6,
        }}>
          캐시백은 적립 시점부터 60개월 동안 사용할 수 있어요
        </div>
      </div>

      <div style={{
        padding: spacing[4],
        backgroundColor: colors.surface.card,
        border: `1px solid ${colors.gray[200]}`,
        borderRadius: layout.radiusCard,
      }}>
        <div style={{
          fontSize: sizes.sm,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          marginBottom: spacing[2],
        }}>
          소멸 안내
        </div>
        <ul style={{
          margin: 0,
          paddingLeft: spacing[5],
          fontSize: sizes.xs,
          color: colors.gray[700],
          lineHeight: 1.7,
        }}>
          <li>익월 소멸 예정 적립금은 매월 첫 영업일에 알림</li>
          <li>사용 취소된 캐시백은 취소된 날로부터 60개월 사용 가능</li>
          <li>유효기간 만료된 캐시백은 복구되지 않음</li>
          <li>회원 탈퇴 시 적립된 캐시백은 모두 소멸</li>
        </ul>
      </div>
    </div>
  )
}

// ─── 페이지 ──────────────────────────────────────────────────────────────────

export default function CashbackPage() {
  const navigate = useNavigate()
  const sizes = useTypography()
  const { transactions, cashbackBalance } = useUser()
  const isAndroid = usePlatform() === 'android'

  const [tab, setTab] = useState('earned')
  const [periodOpen, setPeriodOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(2026)
  const [selectedMonth, setSelectedMonth] = useState(5)

  const inSelectedPeriod = (t) => {
    const d = new Date(t.date)
    return d.getFullYear() === selectedYear && d.getMonth() + 1 === selectedMonth
  }

  const earnedTxs = transactions
    .filter((t) => t.type === 'spend' && t.cashbackEarned > 0 && inSelectedPeriod(t))

  const usedTxs = transactions
    .filter((t) => t.type === 'spend' && t.paidByCashback > 0 && inSelectedPeriod(t))

  const periodAccumulated = transactions
    .filter((t) => t.type === 'spend' && inSelectedPeriod(t))
    .reduce((sum, t) => sum + (t.cashbackEarned || 0), 0)

  const fmt = (n) => n.toLocaleString('ko-KR')
  const fmtDate = (iso) => formatDate(iso)

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack
        title="캐시백 내역"
        onBack={() => navigate(-1)}
        rightAction={
          <button
            onClick={() => navigate('/cashback-info')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: `${spacing[1]} ${spacing[2]}`,
              fontSize: sizes.sm,
              fontWeight: typography.weight.medium,
              color: colors.primary[700],
              fontFamily: typography.fontFamily,
            }}
          >
            이용안내
          </button>
        }
      />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingBottom: spacing[6],
        backgroundColor: colors.surface.background,
      }}>
        {/* 요약 카드 */}
        <CashbackSummaryCard
          cashbackBalance={cashbackBalance}
          periodAccumulated={periodAccumulated}
          periodLabel={`${selectedYear}년 ${selectedMonth}월`}
          sizes={sizes}
          fmt={fmt}
        />

        {/* 탭 헤더 */}
        <div style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[100]}`,
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}>
          {TABS.map(({ key, label }) => {
            const active = tab === key
            return (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  flex: 1,
                  height: '48px',
                  background: 'none',
                  border: 'none',
                  borderBottom: active ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
                  fontSize: sizes.sm,
                  fontWeight: active ? typography.weight.semibold : typography.weight.regular,
                  color: active ? colors.primary[700] : colors.gray[500],
                  cursor: 'pointer',
                  fontFamily: typography.fontFamily,
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* 기간 선택 — 적립/사용 탭만 */}
        {tab !== 'expiring' && (
          <button
            onClick={() => setPeriodOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              margin: `${spacing[3]} ${layout.margin}`,
              padding: `${spacing[2]} ${spacing[3]}`,
              backgroundColor: colors.surface.card,
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: isAndroid ? layout.radiusPill : layout.radiusChip,
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              minHeight: layout.touchMin,
            }}
          >
            <Calendar size={16} color={colors.primary[700]} />
            <span style={{
              fontSize: sizes.sm,
              fontWeight: typography.weight.medium,
              color: colors.gray[900],
            }}>
              {selectedYear}년 {selectedMonth}월
            </span>
            <ChevronDown size={16} color={colors.gray[400]} />
          </button>
        )}

        {tab === 'expiring' && <div style={{ height: spacing[3] }} />}

        {/* 탭 콘텐츠 */}
        {tab === 'earned' && (
          <EarnedList transactions={earnedTxs} sizes={sizes} fmt={fmt} fmtDate={fmtDate} />
        )}
        {tab === 'used' && (
          <UsedList transactions={usedTxs} sizes={sizes} fmt={fmt} fmtDate={fmtDate} />
        )}
        {tab === 'expiring' && <ExpiringInfo sizes={sizes} />}
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
