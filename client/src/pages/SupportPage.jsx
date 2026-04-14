import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import BottomNavBar from '../components/layout/BottomNavBar'
import QRFloatingBar from '../components/layout/QRFloatingBar'
import SupportGrantCard from '../components/common/SupportGrantCard'

const mockGrants = [
  {
    id: '1',
    tag: '서비스이용권',
    tagVariant: 'service',
    title: '지역사회서비스 투자사업',
    subtitle: '2025.01.01 ~ 2025.12.31',
    desc: '지역 복지 서비스 이용권',
  },
  {
    id: '2',
    tag: '현금',
    tagVariant: 'cash',
    title: '국민내일배움카드',
    subtitle: '상시 신청 가능',
    desc: '직업훈련비 지원',
  },
  {
    id: '3',
    tag: '현금',
    tagVariant: 'cash',
    title: '배우자 출산휴가 급여',
    subtitle: '출산 후 90일 이내',
    desc: '배우자 출산 시 지원',
  },
  {
    id: '4',
    tag: '이용권',
    tagVariant: 'voucher',
    title: '이·중·고 학생 교육비',
    subtitle: '매 학기 신청',
    desc: '교육비 지원',
  },
  {
    id: '5',
    tag: '서비스이용권',
    tagVariant: 'service',
    title: '청년 주거급여 분리지급',
    subtitle: '연중 신청',
    desc: '청년 주거 지원',
  },
]

const tabs = ['맞춤', '추천·할인', '청년', '저장됨']

export default function SupportPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  return (
    <ScreenContainer>
      <TopAppBar />

      {/* 탭 바 */}
      <div
        style={{
          display: 'flex',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[200]}`,
          overflowX: 'auto',
          flexShrink: 0,
          scrollbarWidth: 'none',
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flexShrink: 0,
              padding: '14px 20px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === index ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
              color: activeTab === index ? colors.primary[700] : colors.gray[500],
              fontSize: typography.size.sm,
              fontWeight: activeTab === index ? typography.weight.semibold : typography.weight.medium,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 맞춤 정보 설정 버튼 */}
      <div style={{ padding: `12px ${layout.margin} 0`, flexShrink: 0, backgroundColor: colors.surface.background }}>
        <button
          onClick={() => navigate('/custom-info')}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: colors.primary[100],
            border: 'none',
            borderRadius: layout.radiusButton,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3" stroke={colors.primary[700]} strokeWidth="1.5" />
              <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                color: colors.primary[700],
              }}
            >
              맞춤 정보 설정하기
            </span>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* 스크롤 영역 */}
      <div
        style={{
          overflowY: 'auto',
          paddingBottom: '139px',
          flex: 1,
          backgroundColor: colors.surface.background,
          padding: `12px ${layout.margin} 139px`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockGrants.map((grant) => (
            <SupportGrantCard
              key={grant.id}
              tag={grant.tag}
              tagVariant={grant.tagVariant}
              title={grant.title}
              subtitle={grant.subtitle}
              onClick={() => navigate(`/support/${grant.id}`)}
            />
          ))}
        </div>

        {/* 원하는 지원금 배너 */}
        <div
          style={{
            marginTop: '20px',
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            padding: layout.margin,
            boxShadow: shadow.card,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/support-wish')}
        >
          <div>
            <p
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                margin: 0,
              }}
            >
              원하는 지원금을 저장해보세요
            </p>
            <p
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[500],
                margin: '4px 0 0',
              }}
            >
              나에게 맞는 지원금을 찜해두세요
            </p>
          </div>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke={colors.primary[700]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <QRFloatingBar />
      <BottomNavBar />
    </ScreenContainer>
  )
}
