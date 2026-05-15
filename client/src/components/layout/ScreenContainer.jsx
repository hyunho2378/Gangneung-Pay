import { colors } from '../../tokens/tokens'

export default function ScreenContainer({ children }) {
  return (
    <div id="screen-container" style={{
      maxWidth: '390px',
      margin: '0 auto',
      minHeight: '100dvh',
      backgroundColor: colors.surface.background,
      position: 'relative',
      overflowX: 'hidden',
      paddingBottom: 'env(safe-area-inset-bottom)',
      paddingTop: 'env(safe-area-inset-top)',
    }}>
      {children}
    </div>
  )
}
