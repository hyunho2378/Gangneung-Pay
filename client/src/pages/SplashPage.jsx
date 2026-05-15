import LogoWhite from '../assets/logos/강릉페이로고_화이트.svg'
import { colors, typography, spacing } from '../tokens/tokens'

export default function SplashPage() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: colors.primary[700],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[4],
      fontFamily: typography.fontFamily,
    }}>
      <img
        src={LogoWhite}
        alt="강릉페이"
        style={{
          width: '90px',
          height: 'auto',
        }}
      />
      <span style={{
        color: colors.onDark.primary,
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        letterSpacing: '-0.02em',
      }}>
        강릉페이
      </span>
    </div>
  )
}
