import { ChevronRight } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import TagChip from './TagChip'

export default function SupportGrantCard({
  tag = '서비스',
  tagVariant = 'service',
  title = '지원금 항목',
  subtitle = '신청 기간 및 조건',
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: '12px',
        padding: spacing[4],
        boxShadow: shadow.card,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing[3],
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      {/* 좌측 내용 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* 태그 칩 */}
        <div style={{ marginBottom: spacing[2] }}>
          <TagChip label={tag} variant={tagVariant} />
        </div>

        {/* 제목 */}
        <p
          style={{
            margin: `0 0 4px 0`,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
            lineHeight: 1.4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </p>

        {/* 부제목 */}
        <p
          style={{
            margin: 0,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.regular,
            color: colors.gray[500],
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 화살표 */}
      <div style={{ flexShrink: 0 }}>
        <ChevronRight size={18} color={colors.gray[400]} strokeWidth={1.8} />
      </div>
    </div>
  )
}
