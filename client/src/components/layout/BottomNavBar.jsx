/**
 * BottomNavBar (A2)
 * 5탭 균등: 홈·결제매장·혜택·이용내역·MY
 * QR 중앙 원형 제거 — QR 진입은 잔액 카드 3번 슬롯으로 이동
 * Strategy: Nielsen #4 consistency, Shneiderman #1
 */

import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Store, Gift, Receipt, User } from 'lucide-react'
import { colors, typography, layout, shadow, spacing } from '../../tokens/tokens'

export default function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  function getActiveKey() {
    const p = location.pathname
    if (p === '/') return 'home'
    if (p.startsWith('/store')) return 'store'
    if (p.startsWith('/support')) return 'support'
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
      <NavTab
        label="홈"
        icon={<Home size={24} strokeWidth={1.8} />}
        active={activeKey === 'home'}
        onClick={() => navigate('/')}
        height={NAV_HEIGHT}
      />
      <NavTab
        label="결제매장"
        icon={<Store size={24} strokeWidth={1.8} />}
        active={activeKey === 'store'}
        onClick={() => navigate('/store')}
        height={NAV_HEIGHT}
      />
      <NavTab
        label="이용내역"
        icon={<Receipt size={24} strokeWidth={1.8} />}
        active={activeKey === 'history'}
        onClick={() => navigate('/history')}
        height={NAV_HEIGHT}
      />
      <NavTab
        label="지원금·혜택"
        icon={<Gift size={24} strokeWidth={1.8} />}
        active={activeKey === 'support'}
        onClick={() => navigate('/support')}
        height={NAV_HEIGHT}
      />
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
      <span style={{ color, display: 'flex' }}>{icon}</span>
      <span style={{
        fontSize: typography.size.nav,
        fontWeight: active ? typography.weight.medium : typography.weight.regular,
        color,
        fontFamily: typography.fontFamily,
        lineHeight: 1.2,
      }}>
        {label}
      </span>
    </button>
  )
}
