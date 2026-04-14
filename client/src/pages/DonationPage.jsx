import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import DonationCard from '../components/common/DonationCard'

const mockCampaigns = [
  {
    id: '1',
    name: '강릉 사랑나눔 기부통',
    targetAmount: 10000000,
    currentAmount: 3200000,
    participants: 128,
    color: colors.donationBg,
  },
  {
    id: '2',
    name: '아동 교육 지원',
    targetAmount: 5000000,
    currentAmount: 4100000,
    participants: 89,
    color: colors.chatBg,
  },
  {
    id: '3',
    name: '노인 복지 지원',
    targetAmount: 8000000,
    currentAmount: 2000000,
    participants: 45,
    color: colors.greenBg,
  },
  {
    id: '4',
    name: '청년 창업 지원',
    targetAmount: 6000000,
    currentAmount: 5500000,
    participants: 230,
    color: colors.warmBg,
  },
]

const tabs = ['일시기부', '정기기부', '모금하기']

export default function DonationPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <ScreenContainer>
      <TopAppBarBack title="기부" onBack={() => navigate(-1)} />

      {/* 탭 바 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '14px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === index ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
              color: activeTab === index ? colors.primary[700] : colors.gray[500],
              fontSize: typography.size.sm,
              fontWeight: activeTab === index ? typography.weight.semibold : typography.weight.medium,
              cursor: 'pointer',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 스크롤 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '24px',
          backgroundColor: colors.surface.background,
          padding: `${layout.margin} ${layout.margin} 24px`,
        }}
      >
        {activeTab === 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {mockCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => navigate(`/donation/${campaign.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <DonationCard campaign={campaign} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60px',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: colors.gray[100],
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 6v20M6 16h20" stroke={colors.gray[400]} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontSize: typography.size.sm, color: colors.gray[500], margin: 0, textAlign: 'center' }}>
              정기기부 서비스 준비중입니다
            </p>
          </div>
        )}

        {activeTab === 2 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '60px',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                backgroundColor: colors.gray[100],
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 6v20M6 16h20" stroke={colors.gray[400]} strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            <p style={{ fontSize: typography.size.sm, color: colors.gray[500], margin: 0, textAlign: 'center' }}>
              모금하기 서비스 준비중입니다
            </p>
          </div>
        )}
      </div>
    </ScreenContainer>
  )
}
