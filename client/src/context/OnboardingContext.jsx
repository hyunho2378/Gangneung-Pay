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
    cardApplyCoachmark: false,
    monthlyCashback: false,
  })

  function markCoachmarkSeen(key) {
    setSeen(prev => ({ ...prev, [key]: true }))
  }

  function resetCoachmarks() {
    setSeen({
      homeCoachmark: false,
      chargeCoachmark: false,
      cardRegisterCoachmark: false,
      cardApplyCoachmark: false,
      monthlyCashback: false,
    })
  }

  return (
    <OnboardingContext.Provider value={{
      hasSeenHomeCoachmark: seen.homeCoachmark,
      hasSeenChargeCoachmark: seen.chargeCoachmark,
      hasSeenCardRegisterCoachmark: seen.cardRegisterCoachmark,
      hasSeenCardApplyCoachmark: seen.cardApplyCoachmark,
      hasSeenMonthlyCashbackModal: seen.monthlyCashback,
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
