/**
 * UserContext — 캐시백 시스템 풀스택 재구축 (단계 2)
 * 잔액/캐시백 분리 지갑, 자동/수동 모드, 월 한도 30,000원
 * 12개월 가상 거래 데이터 (실제 강릉시 가맹점 기반)
 * Session-scoped — 새로고침 시 리셋 (localStorage 금지 정책)
 */

import { createContext, useContext, useReducer, useState, useCallback } from 'react'
import storesData from '../data/stores.json'

const UserContext = createContext(null)

// ─── 실제 매장 데이터 ────────────────────────────────────────────────────────

const SPEND_CANDIDATES = storesData
  .filter((s) => ['음식점', '카페', '편의점', '마트'].includes(s.category))
  .map((s) => ({ name: s.name, category: s.category }))

const REGULAR_STORE_POOL = storesData
  .filter((s) => ['음식점', '카페'].includes(s.category))

function pickRegulars() {
  const indices = [0, 50, 100, 150, 200]
  return indices
    .filter((i) => i < REGULAR_STORE_POOL.length)
    .map((i) => ({
      name: REGULAR_STORE_POOL[i].name,
      category: REGULAR_STORE_POOL[i].category,
    }))
}

const REGULAR_STORES = pickRegulars()

// ─── Mock 거래 데이터 생성 ──────────────────────────────────────────────────

function generateMockTransactions() {
  const transactions = []

  let cumulativeBalance = 0
  let cumulativeCashback = 0
  let monthlyAccumulated = 0

  const monthsList = []
  for (let offset = 11; offset >= 0; offset--) {
    const d = new Date(2026, 4 - offset, 1)
    monthsList.push({ year: d.getFullYear(), month: d.getMonth() })
  }

  for (const { year, month } of monthsList) {
    monthlyAccumulated = 0

    const isCurrentMonth = (year === 2026 && month === 4)
    const maxDay = isCurrentMonth ? 15 : 28
    const txCount = isCurrentMonth
      ? 8 + Math.floor(Math.random() * 8)
      : 15 + Math.floor(Math.random() * 16)

    const monthTxs = []

    for (let i = 0; i < txCount; i++) {
      const day = 1 + Math.floor(Math.random() * maxDay)
      const hour = 9 + Math.floor(Math.random() * 13)
      const minute = Math.floor(Math.random() * 60)
      const date = new Date(year, month, day, hour, minute)

      const r = Math.random()

      if (r < 0.15) {
        const chargeAmount = [10000, 30000, 50000, 100000, 200000][Math.floor(Math.random() * 5)]
        cumulativeBalance += chargeAmount
        monthTxs.push({
          id: date.getTime() + i,
          date: date.toISOString(),
          type: 'charge',
          storeName: null,
          totalAmount: chargeAmount,
          paidByCashback: 0,
          paidByBalance: chargeAmount,
          cashbackEarned: 0,
          cashbackMode: null,
        })
      } else if (r < 0.20 && cumulativeBalance > 50000) {
        const refundAmount = [10000, 20000, 30000][Math.floor(Math.random() * 3)]
        if (cumulativeBalance >= refundAmount) {
          cumulativeBalance -= refundAmount
          monthTxs.push({
            id: date.getTime() + i,
            date: date.toISOString(),
            type: 'refund',
            storeName: null,
            totalAmount: refundAmount,
            paidByCashback: 0,
            paidByBalance: refundAmount,
            cashbackEarned: 0,
            cashbackMode: null,
          })
        }
      } else {
        const isRegular = Math.random() < 0.3
        const pool = isRegular ? REGULAR_STORES : SPEND_CANDIDATES
        if (pool.length === 0) continue
        const store = pool[Math.floor(Math.random() * pool.length)]

        const amount = 1000 + Math.floor(Math.random() * 49) * 1000

        const mode = Math.random() < 0.8 ? 'auto' : 'manual'

        if (cumulativeBalance + cumulativeCashback < amount && mode === 'auto') continue
        if (cumulativeBalance < amount && mode === 'manual') continue

        let paidByCashback = 0
        let paidByBalance = amount
        if (mode === 'auto' && cumulativeCashback > 0) {
          paidByCashback = Math.min(cumulativeCashback, amount)
          paidByBalance = amount - paidByCashback
        }

        if (paidByBalance > cumulativeBalance) continue

        const eligibleAmount = paidByBalance
        const potentialCashback = Math.floor(eligibleAmount * 0.1)
        const remainingLimit = 30000 - monthlyAccumulated
        const cashbackEarned = Math.min(potentialCashback, Math.max(0, remainingLimit))

        cumulativeBalance -= paidByBalance
        cumulativeCashback = cumulativeCashback - paidByCashback + cashbackEarned
        monthlyAccumulated += cashbackEarned

        monthTxs.push({
          id: date.getTime() + i,
          date: date.toISOString(),
          type: 'spend',
          storeName: store.name,
          totalAmount: amount,
          paidByCashback,
          paidByBalance,
          cashbackEarned,
          cashbackMode: mode,
        })
      }
    }

    monthTxs.sort((a, b) => new Date(a.date) - new Date(b.date))
    transactions.push(...monthTxs)
  }

  transactions.sort((a, b) => new Date(b.date) - new Date(a.date))

  return transactions
}

// ─── 초기 상태 계산 ──────────────────────────────────────────────────────────

function calculateInitialState() {
  const transactions = generateMockTransactions()
  const chronological = [...transactions].reverse()

  let balance = 0
  let cashbackBalance = 0
  let monthlyAccumulated = 0
  const currentMonth = 4
  const currentYear = 2026

  for (const tx of chronological) {
    const txDate = new Date(tx.date)
    const txMonth = txDate.getMonth()
    const txYear = txDate.getFullYear()

    if (tx.type === 'charge') {
      balance += tx.paidByBalance
    } else if (tx.type === 'refund') {
      balance -= tx.paidByBalance
    } else if (tx.type === 'spend') {
      balance -= tx.paidByBalance
      cashbackBalance = cashbackBalance - tx.paidByCashback + tx.cashbackEarned

      if (txYear === currentYear && txMonth === currentMonth) {
        monthlyAccumulated += tx.cashbackEarned
      }
    }
  }

  return {
    balance: Math.max(0, balance),
    cashbackBalance: Math.max(0, cashbackBalance),
    cashbackMode: 'auto',
    monthlyAccumulated: Math.max(0, monthlyAccumulated),
    transactions,
  }
}

const initialState = calculateInitialState()

// ─── Reducer ─────────────────────────────────────────────────────────────────

function userReducer(state, action) {
  switch (action.type) {

    case 'CHARGE_BALANCE': {
      const { id, amount, date } = action.payload
      const newTransaction = {
        id,
        date,
        type: 'charge',
        storeName: null,
        totalAmount: amount,
        paidByCashback: 0,
        paidByBalance: amount,
        cashbackEarned: 0,
        cashbackMode: null,
      }
      return {
        ...state,
        balance: state.balance + amount,
        transactions: [newTransaction, ...state.transactions],
      }
    }

    case 'SPEND_BALANCE': {
      const { amount, storeName } = action.payload

      let paidByCashback = 0
      let paidByBalance = amount

      if (state.cashbackMode === 'auto' && state.cashbackBalance > 0) {
        paidByCashback = Math.min(state.cashbackBalance, amount)
        paidByBalance = amount - paidByCashback
      }

      if (paidByBalance > state.balance) return state

      const potentialCashback = Math.floor(paidByBalance * 0.1)
      const remainingMonthlyLimit = 30000 - state.monthlyAccumulated
      const cashbackEarned = Math.min(potentialCashback, Math.max(0, remainingMonthlyLimit))

      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'spend',
        storeName,
        totalAmount: amount,
        paidByCashback,
        paidByBalance,
        cashbackEarned,
        cashbackMode: state.cashbackMode,
      }

      return {
        ...state,
        balance: state.balance - paidByBalance,
        cashbackBalance: state.cashbackBalance - paidByCashback + cashbackEarned,
        monthlyAccumulated: state.monthlyAccumulated + cashbackEarned,
        transactions: [newTransaction, ...state.transactions],
      }
    }

    case 'REFUND_TRANSACTION': {
      const { transactionId } = action.payload
      const target = state.transactions.find((t) => t.id === transactionId)

      if (!target || target.type !== 'charge') return state

      const refundAmount = target.paidByBalance

      if (refundAmount > state.balance) return state

      const newTransaction = {
        id: Date.now(),
        date: new Date().toISOString(),
        type: 'refund',
        storeName: null,
        totalAmount: refundAmount,
        paidByCashback: 0,
        paidByBalance: refundAmount,
        cashbackEarned: 0,
        cashbackMode: null,
      }

      return {
        ...state,
        balance: state.balance - refundAmount,
        transactions: [
          newTransaction,
          ...state.transactions.filter((t) => t.id !== transactionId),
        ],
      }
    }

    case 'SET_CASHBACK_MODE': {
      return {
        ...state,
        cashbackMode: action.payload.mode,
      }
    }

    default:
      return state
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

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
    dispatch({ type: 'CHARGE_BALANCE', payload: { id, amount, date } })
    return id
  }, [])

  const spendBalance = useCallback((amount, storeName = null) => {
    dispatch({ type: 'SPEND_BALANCE', payload: { amount, storeName } })
  }, [])

  const refundTransaction = useCallback((transactionId) => {
    dispatch({ type: 'REFUND_TRANSACTION', payload: { transactionId } })
  }, [])

  const setCashbackMode = useCallback((mode) => {
    dispatch({ type: 'SET_CASHBACK_MODE', payload: { mode } })
  }, [])

  return (
    <UserContext.Provider value={{
      hasCard,
      cardStatus,
      balance: state.balance,
      cashbackBalance: state.cashbackBalance,
      cashbackMode: state.cashbackMode,
      monthlyAccumulated: state.monthlyAccumulated,
      transactions: state.transactions,
      applyCard,
      shipCard,
      registerCard,
      chargeBalance,
      spendBalance,
      refundTransaction,
      setCashbackMode,
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
