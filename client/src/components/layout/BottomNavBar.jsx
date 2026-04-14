import { useNavigate, useLocation } from 'react-router-dom'
import { colors, typography, layout, shadow } from '../../tokens/tokens'

// 홈 아이콘 SVG
function IconHome({ active }) {
  const c = active ? colors.primary[700] : colors.gray[400]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? c : 'none'}
        stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

// 매장 아이콘 SVG
function IconStore({ active }) {
  const c = active ? colors.primary[700] : colors.gray[400]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20L21 9C21 10.1 20.1 11 19 11C18.2 11 17.5 10.5 17.2 9.8C16.9 10.5 16.2 11 15.3 11C14.4 11 13.7 10.5 13.4 9.8C13.1 10.5 12.4 11 11.5 11C10.6 11 9.9 10.5 9.6 9.8C9.3 10.5 8.6 11 7.7 11C6.8 11 6.1 10.5 5.8 9.8C5.5 10.5 4.8 11 4 11C2.9 11 2 10.1 2 9L4 4Z"
        fill={active ? c : 'none'} stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 11V20H20V11" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 20V15H15V20" stroke={c} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

// 생활편의 아이콘 SVG
function IconLife({ active }) {
  const c = active ? colors.primary[700] : colors.gray[400]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" fill={active ? c : 'none'} fillOpacity={active ? 0.1 : 0} />
      <path d="M12 3V12L16.5 16.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill={c} />
    </svg>
  )
}

// 지원금 아이콘 SVG
function IconSupport({ active }) {
  const c = active ? colors.primary[700] : colors.gray[400]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M20 12V20H4V12" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 7H2V12H22V7Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={active ? c : 'none'} fillOpacity={active ? 0.1 : 0} />
      <path d="M12 7V20" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 7C12 7 9 7 9 4.5C9 3.1 10.1 2 11.5 2C12.3 2 12.9 2.4 12 4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 7C12 7 15 7 15 4.5C15 3.1 13.9 2 12.5 2C11.7 2 11.1 2.4 12 4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// 소통참여 아이콘 SVG
function IconCommunity({ active }) {
  const c = active ? colors.primary[700] : colors.gray[400]
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke={c} strokeWidth="1.8" fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
      <circle cx="17" cy="8" r="3" stroke={c} strokeWidth="1.8" fill={active ? c : 'none'} fillOpacity={active ? 0.15 : 0} />
      <path d="M3 20C3 17.2 5.7 15 9 15C10.2 15 11.3 15.3 12.2 15.9" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 20C14 17.2 15.3 15 17 15C19.2 15 21 17.2 21 20" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const TABS = [
  { key: 'home',      path: '/',          label: '홈',       Icon: IconHome },
  { key: 'store',     path: '/store',     label: '결제매장', Icon: IconStore },
  { key: 'life',      path: '/life',      label: '생활편의', Icon: IconLife },
  { key: 'support',   path: '/support',   label: '지원금·혜택', Icon: IconSupport },
  { key: 'community', path: '/community', label: '소통참여', Icon: IconCommunity },
]

export default function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()

  function getActiveKey() {
    const p = location.pathname
    if (p === '/') return 'home'
    if (p.startsWith('/store')) return 'store'
    if (p.startsWith('/life')) return 'life'
    if (p.startsWith('/support')) return 'support'
    if (p.startsWith('/community')) return 'community'
    return ''
  }
  const activeKey = getActiveKey()

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '390px',
      backgroundColor: colors.surface.card,
      boxShadow: shadow.nav,
      zIndex: 200,
      display: 'flex',
      paddingBottom: '20px', // safe area 근사
    }}>
      {TABS.map(({ key, path, label, Icon }) => {
        const active = activeKey === key
        return (
          <button
            key={key}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '8px',
              paddingBottom: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              gap: '2px',
              minHeight: '49px',
            }}
          >
            <Icon active={active} />
            <span style={{
              fontSize: typography.size.nav,
              fontWeight: active ? typography.weight.semibold : typography.weight.regular,
              color: active ? colors.primary[700] : colors.gray[400],
              fontFamily: typography.fontFamily,
              lineHeight: 1.2,
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
