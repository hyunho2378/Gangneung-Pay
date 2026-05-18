import { useNavigate } from 'react-router-dom'
import { colors, layout, typography } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

export default function DonationHistoryPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="기부한 내역" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.surface.background,
          paddingBottom: '24px',
        }}
      >
        {/* 기부 아이콘 */}
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: colors.donationBg,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 10c-3 0-6 2.5-6 6 0 5 6 10 6 10s6-5 6-10c0-3.5-3-6-6-6z"
              fill={colors.error}
              opacity="0.3"
              stroke={colors.error}
              strokeWidth="1.5"
            />
            <path
              d="M8 30l3-4h18l3 4"
              stroke={colors.error}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
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
          기부 내역이 없습니다
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
          따뜻한 마음을 나눠보세요
        </p>

        <button
          onClick={() => navigate('/donation')}
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
          기부하러 가기
        </button>
      </div>
    </ScreenContainer>
  )
}
