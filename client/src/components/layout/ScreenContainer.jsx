import { useState, useEffect } from 'react'
import { colors } from '../../tokens/tokens'
import StatusBar from './StatusBar'

export default function ScreenContainer({ children, statusBarBg, statusBarLight }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => {
      // 데스크탑 판정: 폭 768px 이상 + 비터치 디바이스 (둘 다 만족)
      const wideScreen = window.innerWidth >= 768
      const noTouch = !('ontouchstart' in window) && navigator.maxTouchPoints === 0
      setIsDesktop(wideScreen && noTouch)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div id="screen-container" style={{
      maxWidth: '390px',
      margin: '0 auto',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: statusBarBg || colors.surface.background,
      position: 'relative',
      overflowX: 'hidden',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingTop: 'env(safe-area-inset-top)',
      // 데스크탑 한정 폰 프레임 효과
      ...(isDesktop && {
        borderLeft: `1px solid ${colors.gray[200]}`,
        borderRight: `1px solid ${colors.gray[200]}`,
      }),
    }}>
      {isDesktop && <StatusBar backgroundColor={statusBarBg} light={statusBarLight} />}
      {children}
    </div>
  )
}
