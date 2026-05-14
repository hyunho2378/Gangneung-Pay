/**
 * BottomNavBar (Phase 3 rewrite)
 * Feedback: 햄버거 삭제 → 5탭 (홈·결제매장·QR중앙·이용내역·MY)
 * Strategy: Nielsen #4 consistency, Shneiderman #1
 * Hidden: 생활편의·지원금·소통참여 탭 → 라우트는 유지
 */

import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Store, QrCode, Receipt, User } from 'lucide-react'
import { colors, typography, layout, shadow, spacing } from '../../tokens/tokens'

export default function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  function getActiveKey() {
    const p = location.pathname
    if (p === '/') return 'home'
    if (p.startsWith('/store')) return 'store'
    if (p.startsWith('/qr')) return 'qr'
    if (p.startsWith('/history')) return 'history'
    if (p.startsWith('/my')) return 'my'
    return ''
  }
  const activeKey = getActiveKey()

  const NAV_HEIGHT = '49px'

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '430px',
      backgroundColor: colors.surface.card,
      boxShadow: shadow.nav,
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
    }}>
      {/* 홈 */}
      <NavTab
        label="홈"
        icon={<Home size={24} strokeWidth={1.8} />}
        active={activeKey === 'home'}
        onClick={() => navigate('/')}
        height={NAV_HEIGHT}
      />

      {/* 결제매장 */}
      <NavTab
        label="결제매장"
        icon={<Store size={24} strokeWidth={1.8} />}
        active={activeKey === 'store'}
        onClick={() => navigate('/store')}
        height={NAV_HEIGHT}
      />

      {/* QR결제 — 중앙 강조 */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '4px',
        minHeight: NAV_HEIGHT,
      }}>
        <button
          onClick={() => navigate('/qr')}
          aria-label="QR결제"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: colors.primary[700],
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'translateY(-12px)',
            boxShadow: '0 4px 12px rgba(29, 78, 216, 0.4)',
            flexShrink: 0,
          }}
        >
          <QrCode size={28} color={colors.onDark.primary} strokeWidth={1.8} />
        </button>
        <span style={{
          fontSize: typography.size.nav,
          fontWeight: typography.weight.semibold,
          color: activeKey === 'qr' ? colors.primary[700] : colors.gray[500],
          fontFamily: typography.fontFamily,
          lineHeight: 1.2,
          marginTop: '-8px',
        }}>
          QR결제
        </span>
      </div>

      {/* 이용내역 */}
      <NavTab
        label="이용내역"
        icon={<Receipt size={24} strokeWidth={1.8} />}
        active={activeKey === 'history'}
        onClick={() => navigate('/history')}
        height={NAV_HEIGHT}
      />

      {/* MY */}
      <NavTab
        label="MY"
        icon={<User size={24} strokeWidth={1.8} />}
        active={activeKey === 'my'}
        onClick={() => navigate('/my')}
        height={NAV_HEIGHT}
      />
    </div>
  )
}

function NavTab({ label, icon, active, onClick, height }) {
  const color = active ? colors.primary[700] : colors.gray[400]
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: spacing[2],
        paddingBottom: '4px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        gap: '2px',
        minHeight: height,
        color,
      }}
    >
      {/* lucide-react icon — currentColor 상속 */}
      <span style={{ color, display: 'flex' }}>{icon}</span>
      <span style={{
        fontSize: typography.size.nav,
        fontWeight: active ? typography.weight.semibold : typography.weight.regular,
        color,
        fontFamily: typography.fontFamily,
        lineHeight: 1.2,
      }}>
        {label}
      </span>
    </button>
  )
}
