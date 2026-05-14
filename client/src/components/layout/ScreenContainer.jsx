import { colors } from '../../tokens/tokens'

export default function ScreenContainer({ children }) {
  return (
    <div style={{
      maxWidth: '430px',
      margin: '0 auto',
      minHeight: '100dvh',
      backgroundColor: colors.surface.background,
      position: 'relative',
      overflowX: 'hidden',
    }}>
      {children}
    </div>
  )
}
