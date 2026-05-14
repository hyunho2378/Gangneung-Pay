/**
 * RefundPage (Task 11)
 * Strategy: S2
 * Nielsen: #3 user control, #6 recognition
 * Shneiderman: #4 closure
 * 환불 직진형 — 케밥 메뉴/질문창 없이 충전내역 리스트 즉시 표시
 */

import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const REFUNDABLE_CHARGES = [
  { id: 1, date: '2026.05.10', chargedAmount: 50000, refundable: 38000 },
  { id: 2, date: '2026.04.22', chargedAmount: 30000, refundable: 30000 },
]

export default function RefundPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBarBack title="환불 신청" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: colors.surface.background,
          paddingBottom: spacing[8],
        }}
      >
        <div
          style={{
            padding: `${spacing[4]} ${layout.margin} ${spacing[2]}`,
            fontSize: typography.size.xs,
            color: colors.gray[500],
            fontFamily: typography.fontFamily,
          }}
        >
          환불 가능한 충전 내역
        </div>

        {REFUNDABLE_CHARGES.length === 0 ? (
          <div
            style={{
              padding: `${spacing[10]} ${layout.margin}`,
              textAlign: 'center',
              fontSize: typography.size.sm,
              color: colors.gray[400],
              fontFamily: typography.fontFamily,
            }}
          >
            환불 가능한 충전 내역이 없습니다
          </div>
        ) : (
          REFUNDABLE_CHARGES.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: colors.surface.card,
                marginBottom: '1px',
                padding: `${spacing[4]} ${layout.margin}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: shadow.card,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: typography.size.sm,
                    fontWeight: typography.weight.semibold,
                    color: colors.gray[900],
                    fontFamily: typography.fontFamily,
                  }}
                >
                  {item.date} 충전
                </div>
                <div
                  style={{
                    fontSize: typography.size.xs,
                    color: colors.gray[500],
                    marginTop: '2px',
                    fontFamily: typography.fontFamily,
                  }}
                >
                  충전 {item.chargedAmount.toLocaleString('ko-KR')}원 · 잔여 환불액{' '}
                  {item.refundable.toLocaleString('ko-KR')}원
                </div>
              </div>
              <button
                style={{
                  backgroundColor: colors.primary[700],
                  border: 'none',
                  borderRadius: layout.radiusButton,
                  color: colors.onDark.primary,
                  fontSize: typography.size.xs,
                  fontWeight: typography.weight.semibold,
                  padding: `${spacing[2]} ${spacing[3]}`,
                  cursor: 'pointer',
                  minHeight: layout.touchMin,
                  fontFamily: typography.fontFamily,
                  flexShrink: 0,
                }}
              >
                환불하기
              </button>
            </div>
          ))
        )}
      </div>
    </ScreenContainer>
  )
}
