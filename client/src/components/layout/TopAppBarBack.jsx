import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { colors, typography, layout } from '../../tokens/tokens'

export default function TopAppBarBack({ title, onBack, rightAction }) {
  const navigate = useNavigate()

  function handleBack() {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: colors.surface.card,
      height: layout.topBarHeight,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '4px',
      paddingRight: layout.margin,
      borderBottom: `1px solid ${colors.gray[200]}`,
    }}>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={handleBack}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: layout.touchMin,
          height: layout.touchMin,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <ArrowLeft size={22} color={colors.gray[900]} strokeWidth={2} />
      </button>

      {/* 제목 — 중앙 */}
      <span style={{
        flex: 1,
        textAlign: 'center',
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        color: colors.gray[900],
        fontFamily: typography.fontFamily,
        marginRight: rightAction ? '0' : layout.touchMin,
      }}>
        {title}
      </span>

      {/* 우측 액션 (선택적) */}
      {rightAction && (
        <div style={{ flexShrink: 0 }}>
          {rightAction}
        </div>
      )}
    </div>
  )
}
