import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false)
  const [showAnnouncement, setShowAnnouncement] = useState(true)

  return (
    <AppContext.Provider value={{
      isLargeText,
      toggleLargeText: () => setIsLargeText(v => !v),
      showAnnouncement,
      closeAnnouncement: () => setShowAnnouncement(false),
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
