import { useNavigate } from 'react-router-dom'
import { colors, layout, typography } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

export default function WishSupportPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBarBack title="원하는 지원금" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.background,
          padding: `${layout.margin} ${layout.margin} 24px`,
        }}
      >
        {/* 별 SVG 아이콘 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: colors.wishBg,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 6l3.7 11.4H35l-9.4 6.8 3.6 11.1L20 29l-9.2 6.3 3.6-11.1L5 17.4h11.3L20 6z"
              stroke={colors.warning}
              strokeWidth="2"
              strokeLinejoin="round"
              fill={colors.warning}
              opacity="0.3"
            />
          </svg>
        </div>

        <p
          style={{
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            color: colors.gray[700],
            margin: '0 0 8px',
            textAlign: 'center',
          }}
        >
          아직 저장된 지원금이 없습니다
        </p>
        <p
          style={{
            fontSize: typography.size.sm,
            color: colors.gray[400],
            margin: 0,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          나에게 맞는 지원금을 찾아{'\n'}별표로 저장해보세요
        </p>

        <button
          onClick={() => navigate('/support')}
          style={{
            marginTop: '32px',
            padding: '14px 40px',
            backgroundColor: colors.primary[700],
            border: 'none',
            borderRadius: layout.radiusButton,
            color: colors.surface.card,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            cursor: 'pointer',
          }}
        >
          지원금 찾아보기
        </button>
      </div>
    </ScreenContainer>
  )
}
