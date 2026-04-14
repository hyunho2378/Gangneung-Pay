import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

const defaultCampaign = {
  id: 1,
  name: '강릉 아이들을 위한 희망나눔',
  targetAmount: 5000000,
  currentAmount: 3200000,
  participants: 128,
  color: colors.purpleBg,
  iconColor: colors.purpleAccent,
}

function CampaignIcon({ color }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 26 C16 26 5 18 5 11 C5 7.69 7.69 5 11 5 C13.48 5 16 7 16 7 C16 7 18.52 5 21 5 C24.31 5 27 7.69 27 11 C27 18 16 26 16 26 Z"
        fill={color}
        fillOpacity="0.3"
        stroke={color}
        strokeWidth="1.8"
      />
      <path
        d="M12 14 L15 17 L20 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function DonationCard({ campaign = defaultCampaign }) {
  const percent = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100))
  const fmtWon = (n) => {
    if (n >= 10000) return Math.floor(n / 10000).toLocaleString('ko-KR') + '만원'
    return n.toLocaleString('ko-KR') + '원'
  }

  return (
    <div
      style={{
        backgroundColor: colors.surface.card,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: shadow.card,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 상단 색상 배경 + 아이콘 */}
      <div
        style={{
          backgroundColor: campaign.color || colors.purpleBg,
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 데코 원 */}
        <div
          style={{
            position: 'absolute',
            right: '-16px',
            bottom: '-16px',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.25)',
          }}
        />
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <CampaignIcon color={campaign.iconColor || colors.purpleAccent} />
        </div>
      </div>

      {/* 하단 정보 */}
      <div style={{ padding: spacing[3], display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        {/* 캠페인명 */}
        <p
          style={{
            margin: 0,
            fontSize: typography.size.xs,
            fontWeight: typography.weight.bold,
            color: colors.gray[900],
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {campaign.name}
        </p>

        {/* 목표 금액 진행률 */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px',
            }}
          >
            <span
              style={{
                fontSize: typography.size.xxs,
                fontWeight: typography.weight.semibold,
                color: campaign.iconColor || colors.primary[700],
              }}
            >
              {percent}%
            </span>
            <span
              style={{
                fontSize: typography.size.xxs,
                color: colors.gray[500],
              }}
            >
              목표 {fmtWon(campaign.targetAmount)}
            </span>
          </div>
          {/* 진행바 */}
          <div
            style={{
              backgroundColor: colors.gray[100],
              borderRadius: layout.radiusPill,
              height: '5px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: campaign.iconColor || colors.primary[700],
                borderRadius: layout.radiusPill,
                height: '100%',
                width: `${percent}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </div>

        {/* 참여자 수 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="4.5" cy="3.5" r="2" stroke={colors.gray[400]} strokeWidth="1.2" />
            <path d="M1 10 C1 7.79 2.57 6 4.5 6" stroke={colors.gray[400]} strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="3.5" r="2" stroke={colors.gray[400]} strokeWidth="1.2" />
            <path d="M5 10 C5 7.79 6.57 6 8 6 C9.43 6 11 7.79 11 10" stroke={colors.gray[400]} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span
            style={{
              fontSize: typography.size.xxs,
              color: colors.gray[500],
            }}
          >
            {campaign.participants.toLocaleString('ko-KR')}명 참여
          </span>
        </div>
      </div>
    </div>
  )
}
