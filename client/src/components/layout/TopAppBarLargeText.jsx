import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { colors, typography, layout } from '../../tokens/tokens'
import LogoBlue from '../../assets/logos/강릉페이로고_블루.svg'

export default function TopAppBarLargeText() {
  const navigate = useNavigate()
  const { toggleLargeText } = useApp()

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: colors.surface.card,
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: layout.margin,
      paddingRight: layout.margin,
      borderBottom: `1px solid ${colors.gray[200]}`,
    }}>
      {/* 로고 — 큰글씨 모드에서 더 크게 */}
      <img src={LogoBlue} alt="강릉페이" style={{ height: '28px' }} />

      {/* 우측: 큰글씨 끄기 pill + 메뉴 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={toggleLargeText}
          style={{
            padding: '6px 14px',
            borderRadius: layout.radiusPill,
            border: `1px solid ${colors.primary[500]}`,
            backgroundColor: colors.primary[100],
            color: colors.primary[700],
            fontSize: '13px',
            fontWeight: typography.weight.semibold,
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
          }}
        >
          큰글씨 끄기
        </button>

        <button
          onClick={() => navigate('/menu')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.gray[700],
            fontSize: '14px',
            fontWeight: typography.weight.medium,
            fontFamily: typography.fontFamily,
            padding: '4px 8px',
          }}
        >
          메뉴
        </button>
      </div>
    </div>
  )
}
