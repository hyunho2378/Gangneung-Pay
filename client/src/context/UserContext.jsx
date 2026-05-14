/**
 * UserContext (Task 4)
 * 신규/기존 사용자 상태 관리
 * Session-scoped — 새로고침 시 리셋 (시연 편의 A안)
 */

import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [hasCard, setHasCard] = useState(false)
  const [cardStatus, setCardStatus] = useState('none') // 'none' | 'applying' | 'shipped' | 'registered'
  const [balance, setBalance] = useState(0)

  function applyCard() {
    setCardStatus('applying')
    setTimeout(() => setCardStatus('shipped'), 3000)
  }

  function registerCard() {
    setHasCard(true)
    setCardStatus('registered')
    setBalance(50000)
  }

  return (
    <UserContext.Provider value={{
      hasCard,
      cardStatus,
      balance,
      applyCard,
      registerCard,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
