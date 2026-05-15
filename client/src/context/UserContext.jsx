/**
 * UserContext (FIX-2)
 * balance/monthlyCashback/transactions → 단일 useReducer
 * 동기화 보장 + React Strict Mode 이중 실행 대응
 * Session-scoped — 새로고침 시 리셋 (localStorage 금지 정책)
 */

import { createContext, useContext, useReducer, useState, useCallback } from 'react'

const UserContext = createContext(null)

// ─── Mock 데이터 생성 (모듈 최상위, 1회 실행) ───────────────────────────────

const STORES = [
  '초당순두부', '강릉중앙시장', '보헤미안커피', '테라로사 본점',
  '강릉짬뽕순두부', '안목해변카페', '강문해변 회센터', '경포대 횟집',
  '정동진역 카페', '오죽한옥마을', '주문진수산시장', '사천해변 식당',
  '옥천오일장', '강릉커피거리 베이커리', '교동반점', '동인동 분식',
  '강릉터미널 편의점', '한솥도시락 강릉점', 'GS25 강릉경포점',
  '강릉의료원 약국', '강릉시청 구내식당', '초당두부마을',
  '송정해변 횟집', '영진해변 카페', '강릉항 활어센터',
]

const REGULAR_STORES = ['초당순두부', '테라로사 본점', '교동반점', 'GS25 강릉경포점']

function generateMockTransactions() {
  const transactions = []
  const now = new Date('2026-05-15')
  const MAX_MONTHLY = 30000

  for (let monthOffset = 0; monthOffset < 12; monthOffset++) {
    const year = now.getFullYear()
    const month = now.getMonth() - monthOffset
    const date = new Date(year, month, 1)
    const yyyy = date.getFullYear()
    const mm = date.getMonth()

    const isCurrentMonth = (yyyy === 2026 && mm === 4)
    const maxDay = isCurrentMonth ? 15 : 28
    const count = isCurrentMonth ? 8 + Math.floor(Math.random() * 8) : 15 + Math.floor(Math.random() * 16)
    let monthlyAccumulated = 0
    const monthTransactions = []

    for (let i = 0; i < count; i++) {
      const day = 1 + Math.floor(Math.random() * maxDay)
      const hour = 8 + Math.floor(Math.random() * 14)
      const minute = Math.floor(Math.random() * 60)
      const dateIso = new Date(yyyy, mm, day, hour, minute).toISOString()

      const rand = Math.random()
      let tx

      if (rand < 0.15) {
        const amount = [10000, 30000, 50000, 100000][Math.floor(Math.random() * 4)]
        tx = {
          id: `tx_mock_${yyyy}${mm}${i}_c`,
          type: 'charge',
          amount,
          date: dateIso,
          refunded: false,
        }
      } else if (rand < 0.2) {
        const amount = [10000, 30000, 50000][Math.floor(Math.random() * 3)]
        tx = {
          id: `tx_mock_${yyyy}${mm}${i}_r`,
          type: 'refund',
          amount,
          date: dateIso,
        }
      } else {
        const useRegular = Math.random() < 0.3
        const store = useRegular
          ? REGULAR_STORES[Math.floor(Math.random() * REGULAR_STORES.length)]
          : STORES[Math.floor(Math.random() * STORES.length)]
        const amount = 1000 + Math.floor(Math.random() * 49000)
        const rawCashback = Math.floor(amount * 0.1)
        const remainingLimit = Math.max(0, MAX_MONTHLY - monthlyAccumulated)
        const cashback = Math.min(rawCashback, remainingLimit)
        monthlyAccumulated += cashback
        tx = {
          id: `tx_mock_${yyyy}${mm}${i}_s`,
          type: 'spend',
          amount,
          store,
          date: dateIso,
          cashback,
        }
      }
      monthTransactions.push(tx)
    }
    transactions.push(...monthTransactions)
  }

  transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
  return transactions
}

const initialMockTransactions = generateMockTransactions()
const initialMonthlyCashback = Math.min(
  30000,
  initialMockTransactions
    .filter((t) => {
      const d = new Date(t.date)
      return t.type === 'spend' && d.getFullYear() === 2026 && d.getMonth() === 4
    })
    .reduce((sum, t) => sum + (t.cashback || 0), 0)
)

// ─────────────────────────────────────────────────────────────────────────────

const initialState = {
  balance: 0,
  monthlyCashback: initialMonthlyCashback,
  transactions: initialMockTransactions,
}

function userReducer(state, action) {
  switch (action.type) {
    case 'CHARGE': {
      const { id, amount, date } = action.payload
      return {
        ...state,
        balance: state.balance + amount,
        transactions: [
          { id, type: 'charge', amount, date, refunded: false },
          ...state.transactions,
        ],
      }
    }
    case 'REFUND': {
      const { chargeId } = action.payload
      const target = state.transactions.find(
        (t) => t.id === chargeId && t.type === 'charge' && !t.refunded
      )
      if (!target) return state
      const refundId = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const refundEntry = {
        id: refundId,
        type: 'refund',
        amount: target.amount,
        date: new Date().toISOString(),
        refundOf: chargeId,
      }
      return {
        ...state,
        balance: state.balance - target.amount,
        transactions: [
          refundEntry,
          ...state.transactions.map((t) =>
            t.id === chargeId ? { ...t, refunded: true } : t
          ),
        ],
      }
    }
    case 'SPEND': {
      const { id, amount, date } = action.payload
      const newBalance = Math.max(0, state.balance - amount)
      const cashbackEarned = Math.floor(amount * 0.1)
      const newCashback = Math.min(30000, state.monthlyCashback + cashbackEarned)
      return {
        ...state,
        balance: newBalance,
        monthlyCashback: newCashback,
        transactions: [
          { id, type: 'spend', amount, date, cashback: cashbackEarned },
          ...state.transactions,
        ],
      }
    }
    default:
      return state
  }
}

export function UserProvider({ children }) {
  const [hasCard, setHasCard] = useState(false)
  const [cardStatus, setCardStatus] = useState('none')
  const [state, dispatch] = useReducer(userReducer, initialState)

  const applyCard = useCallback(() => setCardStatus('applying'), [])
  const shipCard = useCallback(() => setCardStatus('shipped'), [])
  const registerCard = useCallback(() => {
    setHasCard(true)
    setCardStatus('registered')
  }, [])

  const chargeBalance = useCallback((amount) => {
    const id = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const date = new Date().toISOString()
    dispatch({ type: 'CHARGE', payload: { id, amount, date } })
    return id
  }, [])

  const refundTransaction = useCallback((chargeId) => {
    dispatch({ type: 'REFUND', payload: { chargeId } })
  }, [])

  const spendBalance = useCallback((amount) => {
    const id = `tx_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const date = new Date().toISOString()
    dispatch({ type: 'SPEND', payload: { id, amount, date } })
  }, [])

  return (
    <UserContext.Provider value={{
      hasCard,
      cardStatus,
      balance: state.balance,
      monthlyCashback: state.monthlyCashback,
      transactions: state.transactions,
      applyCard,
      shipCard,
      registerCard,
      chargeBalance,
      refundTransaction,
      spendBalance,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
