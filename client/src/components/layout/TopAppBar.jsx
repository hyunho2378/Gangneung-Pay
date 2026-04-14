import { Search, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { colors, typography, layout } from '../../tokens/tokens'
import LogoBlue from '../../assets/logos/강릉페이로고_블루.svg'

export default function TopAppBar() {
  const navigate = useNavigate()
  const { isLargeText, toggleLargeText } = useApp()

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: colors.surface.card,
      height: layout.topBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: layout.margin,
      paddingRight: '8px',
      borderBottom: `1px solid ${colors.gray[200]}`,
    }}>
      {/* 로고 */}
      <img src={LogoBlue} alt="강릉페이" style={{ height: '22px' }} />

      {/* 우측 액션 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {/* 큰글씨 pill */}
        <button
          onClick={toggleLargeText}
          style={{
            padding: '4px 10px',
            borderRadius: layout.radiusPill,
            border: `1px solid ${isLargeText ? colors.primary[300] : colors.gray[200]}`,
            backgroundColor: isLargeText ? colors.primary[100] : colors.surface.card,
            color: isLargeText ? colors.primary[700] : colors.gray[500],
            fontSize: '12px',
            fontWeight: typography.weight.medium,
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
            whiteSpace: 'nowrap',
          }}
        >
          {isLargeText ? '큰글씨 켜짐' : '큰글씨'}
        </button>

        {/* 검색 */}
        <button
          onClick={() => navigate('/store')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: layout.touchMin,
            height: layout.touchMin,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Search size={20} color={colors.gray[800]} strokeWidth={1.8} />
        </button>

        {/* 메뉴 */}
        <button
          onClick={() => navigate('/menu')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            width: layout.touchMin,
            height: layout.touchMin,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Menu size={20} color={colors.gray[800]} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  )
}
