import { colors, typography } from '../tokens/tokens'

export default function SplashPage() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100dvh',
      backgroundColor: colors.primary[700],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
    }}>
      {/* 로고 아이콘 */}
      <div style={{ marginBottom: '20px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="80" rx="20" fill="rgba(255,255,255,0.2)" />
          <rect x="18" y="28" width="44" height="6" rx="3" fill="white" />
          <rect x="18" y="40" width="30" height="6" rx="3" fill="white" />
          <rect x="18" y="52" width="44" height="6" rx="3" fill="rgba(255,255,255,0.6)" />
        </svg>
      </div>

      {/* 앱 이름 */}
      <p style={{
        color: colors.onDark.primary,
        fontSize: '28px',
        fontWeight: typography.weight.black,
        letterSpacing: '-0.02em',
        fontFamily: typography.fontFamily,
      }}>
        강릉페이
      </p>

      {/* 부제목 */}
      <p style={{
        color: colors.onDark.secondary,
        fontSize: typography.size.sm,
        marginTop: '8px',
        fontFamily: typography.fontFamily,
      }}>
        강릉시 지역화폐
      </p>
    </div>
  )
}
