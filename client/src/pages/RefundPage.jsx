/**
 * RefundPage (C5)
 * 충전 내역 리스트 → 항목 선택 → 확인 다이얼로그 → refundTransaction(id)
 * Strategy: S2 — 환불 동등 위계
 * Nielsen: #1 visibility, #3 user control
 */

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { useApp } from '../context/AppContext'
import { formatDate } from '../utils/date'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import { useTypography } from '../hooks/useTypography'
import ScreenContainer from '../components/layout/ScreenContainer'
import BottomNavBar from '../components/layout/BottomNavBar'

export default function RefundPage() {
  const navigate = useNavigate()
  const sizes = useTypography()
  const { transactions, balance, refundTransaction } = useUser()
  const { isLargeText } = useApp()
  const [confirmId, setConfirmId] = useState(null)

  // 큰글씨 모드: 본문/statusBar 회색 (surface.background)
  // 일반 모드: 흰색 (surface.card)
  const bodyBg = isLargeText ? colors.surface.background : colors.surface.card

  const chargeList = transactions.filter((t) => t.type === 'charge')

  const grouped = chargeList.reduce((acc, t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}년 ${d.getMonth() + 1}월`
    if (!acc[key]) acc[key] = []
    acc[key].push(t)
    return acc
  }, {})

  const fmt = (n) => n.toLocaleString('ko-KR') + '원'
  const fmtDate = (iso) => formatDate(iso, { withTime: true })

  const handleRefund = (id) => {
    refundTransaction(id)
    setConfirmId(null)
  }

  const confirmTarget = chargeList.find((t) => t.id === confirmId)

  const isRefundable = (chargeTx) => {
    if (balance <= 0) return { ok: false, reason: '잔액이 없습니다' }
    if (chargeTx.totalAmount > balance) return { ok: false, reason: '잔액 부족' }
    const d = new Date(chargeTx.date)
    if (!(d.getFullYear() === 2026 && d.getMonth() === 4)) {
      return { ok: false, reason: '환불 불가 (과거 거래)' }
    }
    const chargeDate = new Date(chargeTx.date).getTime()
    const spentAfter = transactions
      .filter((t) => t.type === 'spend' && new Date(t.date).getTime() >= chargeDate)
      .reduce((sum, t) => sum + t.totalAmount, 0)
    const requiredRatio = chargeTx.totalAmount > 10000 ? 0.6 : 0.8
    if (spentAfter / chargeTx.totalAmount < requiredRatio) {
      return { ok: false, reason: `${Math.floor(requiredRatio * 100)}% 이상 사용 후 환불 가능` }
    }
    return { ok: true }
  }

  return (
    <ScreenContainer statusBarBg={bodyBg}>
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
          fontSize: sizes.lg,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
        }}>
          환불
        </h1>
      </div>

      <div style={{ padding: layout.margin, flex: 1, minHeight: 0, overflowY: 'auto', backgroundColor: bodyBg }}>
        {/* 현재 잔액 */}
        <div style={{
          backgroundColor: colors.surface.darkCard,
          borderRadius: layout.radiusCard,
          padding: spacing[5],
          marginBottom: spacing[5],
          boxShadow: shadow.button,
        }}>
          <p style={{ margin: 0, color: colors.onDark.secondary, fontSize: sizes.xs }}>
            현재 잔액
          </p>
          <p style={{
            margin: `${spacing[1]} 0 0 0`,
            color: colors.onDark.primary,
            fontSize: sizes.largeTitle,
            fontWeight: typography.weight.bold,
          }}>
            {fmt(balance)}
          </p>
        </div>

        <div style={{
          marginBottom: spacing[4],
          padding: spacing[4],
          backgroundColor: colors.primary[50],
          borderRadius: layout.radiusCard,
          fontSize: sizes.xs,
          color: colors.gray[700],
          lineHeight: 1.6,
        }}>
          <p style={{ fontWeight: typography.weight.semibold, margin: `0 0 ${spacing[2]} 0`, color: colors.primary[700] }}>
            환불 가능 조건
          </p>
          <p style={{ margin: `0 0 ${spacing[1]} 0` }}>• 충전 잔액 기준 일정 비율 이상 사용 시 환불 가능</p>
          <p style={{ margin: `0 0 ${spacing[1]} 0` }}>• 충전 금액 1만원 초과: 60% 이상 사용</p>
          <p style={{ margin: `0 0 ${spacing[1]} 0` }}>• 충전 금액 1만원 이하: 80% 이상 사용</p>
          <p style={{ margin: 0 }}>• 과거 월 거래는 환불 불가</p>
        </div>

        <h2 style={{
          margin: `0 0 ${spacing[3]} 0`,
          fontSize: sizes.md,
          fontWeight: typography.weight.semibold,
          color: colors.gray[900],
        }}>
          충전 내역
        </h2>

        {balance === 0 ? (
          <div style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[8],
            textAlign: 'center',
          }}>
            <p style={{ color: colors.gray[700], fontWeight: typography.weight.semibold, margin: `0 0 ${spacing[2]} 0` }}>
              환불할 잔액이 없습니다
            </p>
            <p style={{ color: colors.gray[500], fontSize: sizes.xs, margin: 0 }}>
              충전 후 이용해보세요
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
            {Object.entries(grouped).map(([monthKey, items]) => (
              <div key={monthKey}>
                <div style={{
                  fontSize: sizes.xs,
                  fontWeight: typography.weight.semibold,
                  color: colors.gray[700],
                  paddingBottom: spacing[2],
                }}>
                  {monthKey}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
                  {items.map((t) => {
                    const result = isRefundable(t)
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
                      <div>
                        <p style={{ margin: 0, fontSize: sizes.sm, fontWeight: typography.weight.semibold, color: colors.gray[900] }}>
                          충전
                        </p>
                        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: sizes.xs, color: colors.gray[500] }}>
                          {fmtDate(t.date)}
                        </p>
                        <p style={{ margin: `${spacing[1]} 0 0 0`, fontSize: sizes.md, fontWeight: typography.weight.semibold, color: colors.gray[900] }}>
                          {fmt(t.totalAmount)}
                        </p>
                      </div>
                      {result.ok ? (
                        <button
                          onClick={() => setConfirmId(t.id)}
                          style={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${colors.primary[700]}`,
                            color: colors.primary[700],
                            borderRadius: layout.radiusButton,
                            padding: `${spacing[2]} ${spacing[4]}`,
                            fontSize: sizes.sm,
                            fontWeight: typography.weight.semibold,
                            cursor: 'pointer',
                            minHeight: layout.touchMin,
                            fontFamily: typography.fontFamily,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          환불
                        </button>
                      ) : (
                        <span style={{
                          fontSize: sizes.xs,
                          color: colors.gray[400],
                          whiteSpace: 'nowrap',
                          textAlign: 'right',
                          lineHeight: typography.lineHeight.normal,
                        }}>
                          {result.reason}
                        </span>
                      )}
                    </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 확인 다이얼로그 */}
      {confirmTarget && (
        <div style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 200,
        }}>
          <div style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: spacing[6],
            width: 'min(320px, calc(100% - 32px))',
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[4],
            fontFamily: typography.fontFamily,
          }}>
            <h3 style={{ margin: 0, fontSize: sizes.md, fontWeight: typography.weight.bold, color: colors.gray[900] }}>
              환불하시겠습니까?
            </h3>
            <p style={{ margin: 0, fontSize: sizes.sm, color: colors.gray[700] }}>
              {fmt(confirmTarget.totalAmount)}을 환불합니다.
            </p>
            <div style={{ display: 'flex', gap: spacing[2] }}>
              <button
                onClick={() => setConfirmId(null)}
                style={{
                  flex: 1,
                  backgroundColor: colors.gray[100],
                  border: 'none',
                  borderRadius: layout.radiusButton,
                  padding: `${spacing[3]} 0`,
                  fontSize: sizes.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.gray[700],
                  cursor: 'pointer',
                  minHeight: layout.touchMin,
                  fontFamily: typography.fontFamily,
                }}
              >
                취소
              </button>
              <button
                onClick={() => handleRefund(confirmTarget.id)}
                style={{
                  flex: 1,
                  backgroundColor: colors.primary[700],
                  border: 'none',
                  borderRadius: layout.radiusButton,
                  padding: `${spacing[3]} 0`,
                  fontSize: sizes.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.onDark.primary,
                  cursor: 'pointer',
                  minHeight: layout.touchMin,
                  fontFamily: typography.fontFamily,
                }}
              >
                환불하기
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavBar />
    </ScreenContainer>
  )
}
