import LogoBlue from '../assets/logos/강릉페이로고_블루.svg'
import { colors, typography } from '../tokens/tokens'

export default function SplashPage() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100dvh',
      backgroundColor: colors.surface.card,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
    }}>
      {/* 로고 */}
      <img
        src={LogoBlue}
        alt="강릉페이"
        style={{ width: '180px', marginBottom: '16px' }}
      />

      {/* 부제목 */}
      <p style={{
        color: colors.gray[500],
        fontSize: typography.size.sm,
        marginTop: '8px',
        fontFamily: typography.fontFamily,
      }}>
        강릉시 지역화폐
      </p>
    </div>
  )
}
