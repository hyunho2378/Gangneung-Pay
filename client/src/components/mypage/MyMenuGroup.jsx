import { ChevronRight } from 'lucide-react'
import { colors, typography, layout, spacing } from '../../tokens/tokens'

export default function MyMenuGroup({ title, items }) {
  return (
    <div>
      {/* 그룹 제목 행 */}
      <div
        style={{
          backgroundColor: colors.gray[50],
          padding: `${spacing[2]} ${layout.margin}`,
        }}
      >
        <span
          style={{
            fontSize: typography.size.xs,
            fontWeight: typography.weight.semibold,
            color: colors.gray[500],
            fontFamily: typography.fontFamily,
          }}
        >
          {title}
        </span>
      </div>

      {/* 메뉴 항목 목록 */}
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          style={{
            width: '100%',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            textAlign: 'left',
            backgroundColor: colors.surface.card,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: `${spacing[3]} ${layout.margin}`,
            minHeight: layout.touchMin,
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}
        >
          <span
            style={{
              fontSize: typography.size.sm,
              color: colors.gray[900],
              fontFamily: typography.fontFamily,
            }}
          >
            {item.label}
          </span>
          <ChevronRight size={16} color={colors.gray[400]} />
        </button>
      ))}
    </div>
  )
}
