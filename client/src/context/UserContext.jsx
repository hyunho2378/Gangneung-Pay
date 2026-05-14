/**
 * UserContext (Task 4)
 * 신규/기존 사용자 상태 관리
 * Session-scoped — 새로고침 시 리셋 (시연 편의)
 */

import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [hasCard, setHasCard] = useState(false)
  const [cardStatus, setCardStatus] = useState('none') // 'none' | 'applying' | 'shipped' | 'registered'
  const [balance, setBalance] = useState(0)
  const [transactions, setTransactions] = useState([])

  function applyCard() {
    setCardStatus('applying')
    setTimeout(() => setCardStatus('shipped'), 1000)
  }

  function registerCard() {
    setHasCard(true)
    setCardStatus('registered')
    setBalance(0)
  }

  function chargeBalance(amount) {
    setBalance(prev => prev + amount)
    setTransactions(prev => [
      { id: Date.now(), type: 'charge', amount, date: new Date().toISOString() },
      ...prev,
    ])
  }

  function refundBalance(amount) {
    setBalance(prev => Math.max(0, prev - amount))
    setTransactions(prev => [
      { id: Date.now(), type: 'refund', amount, date: new Date().toISOString() },
      ...prev,
    ])
  }

  function spendBalance(amount) {
    setBalance(prev => Math.max(0, prev - amount))
    setTransactions(prev => [
      { id: Date.now(), type: 'spend', amount, date: new Date().toISOString() },
      ...prev,
    ])
  }

  return (
    <UserContext.Provider value={{
      hasCard,
      cardStatus,
      balance,
      transactions,
      applyCard,
      registerCard,
      chargeBalance,
      refundBalance,
      spendBalance,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
