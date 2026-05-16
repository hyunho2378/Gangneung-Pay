import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

function QRIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="2" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" fill="none" />
      <rect x="4" y="4" width="3" height="3" fill="white" />
      <rect x="11" y="2" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" fill="none" />
      <rect x="13" y="4" width="3" height="3" fill="white" />
      <rect x="2" y="11" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" fill="none" />
      <rect x="4" y="13" width="3" height="3" fill="white" />
      <rect x="11" y="11" width="3" height="3" fill="white" />
      <rect x="16" y="11" width="3" height="3" fill="white" />
      <rect x="11" y="16" width="3" height="3" fill="white" />
      <rect x="16" y="16" width="3" height="3" fill="white" />
    </svg>
  )
}

export default function QRFloatingBar() {
  const navigate = useNavigate()

  return (
    <div style={{
      position: 'fixed',
      bottom: layout.bottomNavHeight,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '390px',
      height: layout.qrBarHeight,
      backgroundColor: colors.primary[900],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing[2],
      cursor: 'pointer',
      zIndex: 190,
    }}
    onClick={() => navigate('/qr')}
    >
      <QRIcon />
      <span style={{
        color: colors.onDark.primary,
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        fontFamily: typography.fontFamily,
        letterSpacing: '-0.01em',
      }}>
        QR결제하기
      </span>
    </div>
  )
}
