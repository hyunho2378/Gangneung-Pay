/**
 * RefundPage (Task 15)
 * Strategy: S2 — 환불 동등 위계, 직진형 플로우
 * Nielsen: #1 visibility, #3 user control, #5 error prevention
 * Shneiderman: #3 informative feedback, #4 closure, #8 reduce memory load
 * 충전 화면과 동일 디자인 — 케밥/질문창 없는 직진형
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import NumPad from '../components/payment/NumPad'

const MAX_AMOUNT = 999999999

const QUICK_AMOUNTS = [
  { label: '5천원', value: 5000 },
  { label: '1만원', value: 10000 },
  { label: '5만원', value: 50000 },
  { label: '10만원', value: 100000 },
]

export default function RefundPage() {
  const navigate = useNavigate()
  const { balance, refundBalance } = useUser()
  const [amount, setAmount] = useState(0)
  const [done, setDone] = useState(false)
  const [toast, setToast] = useState(false)

  const handleNumPress = (key) => {
    if (key === 'backspace') {
      setAmount(prev => {
        const str = String(prev)
        if (str.length <= 1) return 0
        return parseInt(str.slice(0, -1), 10)
      })
      return
    }
    setAmount(prev => {
      const str = prev === 0 ? '' : String(prev)
      const next = str + key
      const parsed = parseInt(next, 10)
      if (isNaN(parsed) || parsed > MAX_AMOUNT) return prev
      return parsed
    })
  }

  const handleQuickSet = (val) => {
    setAmount(val === '전액' ? balance : Math.min(val, MAX_AMOUNT))
  }

  const isOver = amount > balance
  const canRefund = amount > 0 && !isOver

  const handleRefund = () => {
    refundBalance(amount)
    setDone(true)
    setToast(true)
    setTimeout(() => {
      navigate('/')
    }, 1500)
  }

  // 완료 화면
  if (done) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '430px',
        backgroundColor: colors.surface.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing[5],
        fontFamily: typography.fontFamily,
        zIndex: 100,
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: colors.successBg,
          border: `2px solid ${colors.successBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M7 18L14 25L29 10" stroke={colors.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: `0 0 ${spacing[2]}`, fontSize: typography.size.xl, fontWeight: typography.weight.bold, color: colors.gray[900] }}>
            환불 완료
          </p>
          <p style={{ margin: 0, fontSize: typography.size.md, color: colors.gray[500] }}>
            {amount.toLocaleString('ko-KR')}원이 환불되었습니다
          </p>
        </div>
        <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.gray[400] }}>
          홈으로 이동합니다...
        </p>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: colors.surface.background,
      display: 'flex',
      flexDirection: 'column',
      fontFamily: typography.fontFamily,
      zIndex: 100,
    }}>
      {/* 헤더 */}
      <div style={{
        backgroundColor: colors.surface.card,
        display: 'flex',
        alignItems: 'center',
        padding: `${spacing[3]} ${layout.margin}`,
        paddingTop: '52px',
        gap: spacing[3],
        borderBottom: `1px solid ${colors.gray[100]}`,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: spacing[1],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={24} color={colors.gray[900]} />
        </button>
        <span style={{ fontSize: typography.size.md, fontWeight: typography.weight.semibold, color: colors.gray[900] }}>
          환불
        </span>
      </div>

      {/* 잔액 + 금액 표시 */}
      <div style={{
        backgroundColor: colors.surface.card,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${spacing[5]} ${layout.margin} ${spacing[4]}`,
        gap: spacing[2],
      }}>
        <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>
          환불 가능 금액{' '}
          <span style={{ color: colors.primary[700], fontWeight: typography.weight.semibold }}>
            {balance.toLocaleString('ko-KR')}원
          </span>
        </span>

        <span style={{
          fontSize: '36px',
          fontWeight: typography.weight.bold,
          color: isOver ? colors.error : amount > 0 ? colors.gray[900] : colors.gray[400],
          letterSpacing: '-0.5px',
          transition: 'color 0.2s ease',
        }}>
          {amount > 0 ? `${amount.toLocaleString('ko-KR')}원` : '0원'}
        </span>

        {isOver && (
          <span style={{ fontSize: typography.size.xs, color: colors.error, fontWeight: typography.weight.medium }}>
            환불 가능 금액을 초과했습니다
          </span>
        )}
      </div>

      {/* 빠른 금액 버튼 */}
      <div style={{
        backgroundColor: colors.surface.card,
        display: 'flex',
        flexDirection: 'row',
        gap: spacing[2],
        padding: `${spacing[3]} ${layout.margin} ${spacing[4]}`,
        borderBottom: `1px solid ${colors.gray[100]}`,
        flexWrap: 'wrap',
      }}>
        {QUICK_AMOUNTS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => handleQuickSet(value)}
            style={{
              flex: 1,
              minWidth: '60px',
              height: '36px',
              backgroundColor: colors.surface.background,
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: layout.radiusChip,
              fontSize: typography.size.xs,
              fontWeight: typography.weight.medium,
              color: colors.gray[700],
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => handleQuickSet('전액')}
          style={{
            flex: 1,
            minWidth: '60px',
            height: '36px',
            backgroundColor: colors.primary[50],
            border: `1px solid ${colors.primary[200]}`,
            borderRadius: layout.radiusChip,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.semibold,
            color: colors.primary[700],
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
          }}
        >
          전액
        </button>
      </div>

      {/* 숫자패드 */}
      <div style={{ flex: 1, backgroundColor: colors.surface.background, paddingTop: spacing[3] }}>
        <NumPad onPress={handleNumPress} />
      </div>

      {/* 환불하기 버튼 */}
      <div style={{
        padding: `${spacing[4]} ${layout.margin}`,
        paddingBottom: `calc(${layout.bottomNavHeight} + ${spacing[4]})`,
        backgroundColor: colors.surface.card,
        borderTop: `1px solid ${colors.gray[100]}`,
      }}>
        <button
          onClick={canRefund ? handleRefund : undefined}
          disabled={!canRefund}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: canRefund ? colors.primary[700] : colors.gray[200],
            color: canRefund ? colors.onDark.primary : colors.gray[400],
            border: 'none',
            borderRadius: layout.radiusButton,
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            cursor: canRefund ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease',
            boxShadow: canRefund ? shadow.button : 'none',
            fontFamily: typography.fontFamily,
          }}
        >
          환불하기
        </button>
        {!amount && (
          <p style={{ margin: `${spacing[2]} 0 0`, textAlign: 'center', fontSize: typography.size.xs, color: colors.gray[400] }}>
            환불 금액을 입력하세요
          </p>
        )}
      </div>
    </div>
  )
}
