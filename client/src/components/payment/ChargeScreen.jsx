// ChargeScreen.jsx — P02 (p.14,15,19)
// 충전 금액 입력 전체 화면

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import QuickAmountChip from './QuickAmountChip'
import NumPad from './NumPad'

const MAX_AMOUNT = 999999999

export default function ChargeScreen({ onClose, onRefundGuide, onCharge }) {
  const [amount, setAmount] = useState(0)

  const handleNumPress = (key) => {
    if (key === 'backspace') {
      setAmount((prev) => {
        const str = String(prev)
        if (str.length <= 1) return 0
        return parseInt(str.slice(0, -1), 10)
      })
      return
    }
    setAmount((prev) => {
      const str = prev === 0 ? '' : String(prev)
      const next = str + key
      const parsed = parseInt(next, 10)
      if (isNaN(parsed)) return prev
      if (parsed > MAX_AMOUNT) return prev
      return parsed
    })
  }

  const handleQuickAdd = (value) => {
    setAmount((prev) => Math.min(prev + value, MAX_AMOUNT))
  }

  const formattedAmount = amount.toLocaleString('ko-KR')
  const hasAmount = amount > 0

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: colors.surface.background,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: typography.fontFamily,
        zIndex: 100,
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          display: 'flex',
          alignItems: 'center',
          padding: `${spacing[3]} ${layout.margin}`,
          paddingTop: '52px',
          gap: spacing[3],
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}
      >
        <button
          onClick={onClose}
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
        <span
          style={{
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            color: colors.gray[900],
          }}
        >
          충전
        </span>
      </div>

      {/* 금액 표시 영역 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: `${spacing[8]} ${layout.margin} ${spacing[5]}`,
          gap: spacing[2],
        }}
      >
        <span
          style={{
            fontSize: '36px',
            fontWeight: typography.weight.bold,
            color: hasAmount ? colors.gray[900] : colors.gray[400],
            letterSpacing: '-0.5px',
            transition: 'color 0.2s ease',
          }}
        >
          {hasAmount ? `${formattedAmount}원` : '0원'}
        </span>

        <button
          onClick={onRefundGuide}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: typography.size.xs,
            fontWeight: typography.weight.medium,
            color: colors.primary[600],
            padding: 0,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          환불안내보기
        </button>
      </div>

      {/* 빠른 금액 버튼 행 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          display: 'flex',
          flexDirection: 'row',
          gap: spacing[2],
          padding: `${spacing[3]} ${layout.margin} ${spacing[4]}`,
          borderBottom: `1px solid ${colors.gray[100]}`,
        }}
      >
        <QuickAmountChip label="+1만원" onClick={() => handleQuickAdd(10000)} />
        <QuickAmountChip label="+5만원" onClick={() => handleQuickAdd(50000)} />
        <QuickAmountChip label="+10만원" onClick={() => handleQuickAdd(100000)} />
      </div>

      {/* 숫자패드 */}
      <div
        style={{
          flex: 1,
          backgroundColor: colors.surface.background,
          paddingTop: spacing[3],
        }}
      >
        <NumPad onPress={handleNumPress} />
      </div>

      {/* 하단 충전 버튼 */}
      <div
        style={{
          padding: `${spacing[4]} ${layout.margin}`,
          paddingBottom: `calc(${layout.bottomNavHeight} + ${spacing[4]})`,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[100]}`,
        }}
      >
        <button
          onClick={() => hasAmount && onCharge && onCharge(amount)}
          disabled={!hasAmount}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: hasAmount ? colors.primary[700] : colors.gray[200],
            color: hasAmount ? colors.onDark.primary : colors.gray[400],
            border: 'none',
            borderRadius: layout.radiusButton,
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            cursor: hasAmount ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s ease',
            boxShadow: hasAmount ? shadow.button : 'none',
          }}
        >
          바로 충전하기
        </button>
      </div>
    </div>
  )
}
