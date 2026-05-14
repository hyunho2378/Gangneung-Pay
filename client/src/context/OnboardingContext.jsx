/**
 * OnboardingContext (Task 2)
 * Strategy: S7
 * Nielsen: #10 help and documentation
 * Session-scoped — 새로고침 시 초기화 (localStorage 금지 정책)
 */

import { createContext, useContext, useState } from 'react'

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [seen, setSeen] = useState({
    homeCoachmark: false,
    chargeCoachmark: false,
    cardRegisterCoachmark: false,
  })

  function markCoachmarkSeen(key) {
    setSeen(prev => ({ ...prev, [key]: true }))
  }

  function resetCoachmarks() {
    setSeen({ homeCoachmark: false, chargeCoachmark: false, cardRegisterCoachmark: false })
  }

  return (
    <OnboardingContext.Provider value={{
      hasSeenHomeCoachmark: seen.homeCoachmark,
      hasSeenChargeCoachmark: seen.chargeCoachmark,
      hasSeenCardRegisterCoachmark: seen.cardRegisterCoachmark,
      markCoachmarkSeen,
      resetCoachmarks,
    }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboarding() {
  return useContext(OnboardingContext)
}
