import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import TagChip from './TagChip'
import { usePlatform } from '../../hooks/usePlatform'

const defaultGrant = {
  tag: '서비스',
  tagVariant: 'service',
  title: '지역사회서비스 지원금',
  period: '2025.01.01 ~ 2025.12.31',
  content: '강릉시 거주 주민을 대상으로 지역 상권 활성화를 위한 지원금을 지원합니다. 강릉페이 카드로 결제 시 캐시백 형태로 지원됩니다.',
  target: '강릉시 주민등록 주소지를 가진 만 19세 이상 시민',
  method: '강릉페이 앱 내 신청 메뉴에서 본인인증 후 간편 신청 가능합니다. 신청 후 영업일 기준 3일 이내 지급됩니다.',
}

function SectionBlock({ title, content }) {
  return (
    <div style={{ paddingTop: spacing[4], paddingBottom: spacing[4] }}>
      <h4
        style={{
          margin: `0 0 ${spacing[2]} 0`,
          fontSize: typography.size.sm,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
        }}
      >
        {title}
      </h4>
      <p
        style={{
          margin: 0,
          fontSize: typography.size.sm,
          fontWeight: typography.weight.regular,
          color: colors.gray[700],
          lineHeight: 1.6,
        }}
      >
        {content}
      </p>
    </div>
  )
}

export default function SupportGrantDetail({ grant = defaultGrant, onLearnMore, onApply }) {
  const isAndroid = usePlatform() === 'android'
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.surface.background,
        minHeight: '100%',
      }}
    >
      {/* 상단 카드 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          padding: `${spacing[5]} ${spacing[4]}`,
          marginBottom: spacing[2],
        }}
      >
        {/* 태그 */}
        <div style={{ marginBottom: spacing[3] }}>
          <TagChip label={grant.tag} variant={grant.tagVariant} />
        </div>

        {/* 제목 */}
        <h2
          style={{
            margin: `0 0 ${spacing[2]} 0`,
            fontSize: typography.size.xl,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
            lineHeight: 1.35,
          }}
        >
          {grant.title}
        </h2>

        {/* 기간 */}
        <p
          style={{
            margin: 0,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.regular,
            color: colors.gray[500],
          }}
        >
          신청 기간: {grant.period}
        </p>
      </div>

      {/* 본문 카드 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          padding: `0 ${spacing[4]}`,
          marginBottom: spacing[2],
        }}
      >
        {/* 설명 */}
        <div style={{ paddingTop: spacing[4], paddingBottom: spacing[4], borderBottom: `1px solid ${colors.gray[100]}` }}>
          <p
            style={{
              margin: 0,
              fontSize: typography.size.sm,
              fontWeight: typography.weight.regular,
              color: colors.gray[700],
              lineHeight: 1.7,
            }}
          >
            {grant.content}
          </p>
        </div>

        {/* 지원 대상 */}
        <div style={{ borderBottom: `1px solid ${colors.gray[100]}` }}>
          <SectionBlock title="지원 대상" content={grant.target} />
        </div>

        {/* 지원 내용 */}
        <div style={{ borderBottom: `1px solid ${colors.gray[100]}` }}>
          <SectionBlock title="지원 내용" content={grant.content} />
        </div>

        {/* 신청 방법 */}
        <SectionBlock title="신청 방법" content={grant.method} />
      </div>

      {/* 하단 고정 액션바 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          padding: `${spacing[3]} ${spacing[4]}`,
          paddingBottom: `calc(${spacing[4]} + env(safe-area-inset-bottom, 0px))`,
          display: 'flex',
          gap: spacing[3],
          boxShadow: shadow.modal,
          marginTop: 'auto',
          flexShrink: 0,
        }}
      >
        {/* 더 알아보기 */}
        <button
          onClick={onLearnMore}
          style={{
            flex: 1,
            height: '52px',
            backgroundColor: 'none',
            background: 'none',
            border: `1.5px solid ${colors.primary[700]}`,
            borderRadius: isAndroid ? layout.radiusPill : layout.radiusButton,
            color: colors.primary[700],
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            cursor: 'pointer',
          }}
        >
          더 알아보기
        </button>

        {/* 신청하기 */}
        <button
          onClick={onApply}
          style={{
            flex: 2,
            height: '52px',
            backgroundColor: colors.primary[700],
            border: 'none',
            borderRadius: isAndroid ? layout.radiusPill : layout.radiusButton,
            color: colors.onDark.primary,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.bold,
            cursor: 'pointer',
            boxShadow: shadow.button,
          }}
        >
          신청하기
        </button>
      </div>
    </div>
  )
}
