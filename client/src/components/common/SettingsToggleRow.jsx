// SettingsToggleRow.jsx — I05 (p.36)
// 설정 토글 행

import { colors, typography, layout, spacing } from '../../tokens/tokens'

export default function SettingsToggleRow({ label, description, value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: layout.margin,
        borderBottom: `1px solid ${colors.gray[100]}`,
        fontFamily: typography.fontFamily,
      }}
    >
      {/* 좌측: 라벨 + 설명 */}
      <div style={{ flex: 1, marginRight: spacing[4] }}>
        <div
          style={{
            fontSize: typography.size.md,
            fontWeight: typography.weight.regular,
            color: colors.gray[900],
            lineHeight: 1.4,
          }}
        >
          {label}
        </div>
        {description && (
          <div
            style={{
              fontSize: typography.size.xs,
              color: colors.gray[500],
              marginTop: '2px',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
        )}
      </div>

      {/* 우측: 토글 스위치 */}
      <button
        onClick={() => onChange && onChange(!value)}
        role="switch"
        aria-checked={value}
        style={{
          flexShrink: 0,
          width: '48px',
          height: '28px',
          borderRadius: layout.radiusPill,
          backgroundColor: value ? colors.primary[700] : colors.gray[300],
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background-color 0.2s ease',
          padding: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: value ? '23px' : '3px',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            backgroundColor: colors.surface.card,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            transition: 'left 0.2s ease',
            display: 'block',
          }}
        />
      </button>
    </div>
  )
}
