// CategoryFilterChip.jsx — M04 (p.43,44)
// St-03: 카테고리 아이콘 + 텍스트 병기 (S6, Nielsen #6 Recognition rather than recall)

import { colors, typography, layout } from '../../tokens/tokens'

export default function CategoryFilterChip({ label, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon ? '4px' : 0,
        backgroundColor: active ? colors.primary[700] : colors.surface.card,
        color: active ? colors.onDark.primary : colors.gray[700],
        border: active ? 'none' : `1px solid ${colors.gray[200]}`,
        borderRadius: layout.radiusPill,
        padding: '7px 14px',
        fontSize: typography.size.sm,
        fontWeight: active ? typography.weight.semibold : typography.weight.regular,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        boxShadow: active ? 'none' : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {icon}
      {label}
    </button>
  )
}
