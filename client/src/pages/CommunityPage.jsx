import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import BottomNavBar from '../components/layout/BottomNavBar'
import QRFloatingBar from '../components/layout/QRFloatingBar'
import SectionHeader from '../components/home/SectionHeader'

const mockNews = [
  { id: '1', title: '강릉페이 4월 캐시백 이벤트', date: '2025.04.01', summary: '4월 한달간 강릉페이 캐시백 적립률이 상향됩니다.' },
  { id: '2', title: '강릉시 지역화폐 우수상 수상', date: '2025.03.20', summary: '행정안전부 지역화폐 우수 지자체로 선정되었습니다.' },
  { id: '3', title: '봄맞이 강릉 여행 페스티벌', date: '2025.03.15', summary: '3월~5월 강릉 여행 특별 할인 이벤트가 진행됩니다.' },
]

const communityMenus = [
  { id: '1', title: '사랑나눔 기부통', desc: '강릉 지역 이웃을 위한 기부', route: '/donation', active: true },
  { id: '2', title: '강릉통합예약', desc: '강릉시 시설 통합 예약', route: null, active: false },
  { id: '3', title: '학원학습', desc: '학원·교육 정보', route: null, active: false },
  { id: '4', title: '강릉 오죽헌 특별관람', desc: '오죽헌 특별 관람 예약', route: '/place/1', active: true },
]

export default function CommunityPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBar />

      <div
        style={{
          overflowY: 'auto',
          paddingBottom: '139px',
          flex: 1,
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 강릉시 소식 배너 */}
        <div
          style={{
            backgroundColor: colors.primary[700],
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 8h20v12a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" fill="white" opacity="0.9" />
              <path d="M4 8l10-5 10 5" stroke="white" strokeWidth="1.5" />
              <rect x="10" y="13" width="8" height="7" rx="1" fill={colors.primary[700]} />
            </svg>
          </div>
          <div>
            <p
              style={{
                color: colors.surface.card,
                fontSize: typography.size.md,
                fontWeight: typography.weight.bold,
                margin: 0,
              }}
            >
              강릉시 소식
            </p>
            <p
              style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: typography.size.xs,
                margin: '4px 0 0',
              }}
            >
              강릉시의 최신 소식을 확인하세요
            </p>
          </div>
        </div>

        {/* 소식 섹션 */}
        <div style={{ paddingTop: layout.margin }}>
          <SectionHeader
            title="강릉시 소식"
            onViewAll={() => navigate('/news')}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: `0 ${layout.margin}` }}>
            {mockNews.map((news) => (
              <div
                key={news.id}
                onClick={() => navigate(`/news/${news.id}`)}
                style={{
                  backgroundColor: colors.surface.card,
                  borderRadius: layout.radiusCard,
                  padding: layout.margin,
                  boxShadow: shadow.card,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontSize: typography.size.sm,
                        fontWeight: typography.weight.semibold,
                        color: colors.gray[900],
                        margin: 0,
                      }}
                    >
                      {news.title}
                    </p>
                    <p
                      style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[500],
                        margin: '6px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {news.summary}
                    </p>
                    <p
                      style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[400],
                        margin: '6px 0 0',
                      }}
                    >
                      {news.date}
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                    <path d="M6 4l4 4-4 4" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 함께 만들기 섹션 */}
        <div style={{ paddingTop: layout.margin }}>
          <SectionHeader title="함께 만들기" showViewAll={false} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: `0 ${layout.margin}` }}>
            {communityMenus.map((menu) => (
              <div
                key={menu.id}
                onClick={() => menu.active && menu.route && navigate(menu.route)}
                style={{
                  backgroundColor: colors.surface.card,
                  borderRadius: layout.radiusCard,
                  padding: layout.margin,
                  boxShadow: shadow.card,
                  cursor: menu.active ? 'pointer' : 'default',
                  opacity: menu.active ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
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
                    {menu.title}
                  </p>
                  <p
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.gray[500],
                      margin: '4px 0 0',
                    }}
                  >
                    {menu.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {!menu.active && (
                    <span
                      style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[400],
                        backgroundColor: colors.gray[100],
                        padding: '2px 8px',
                        borderRadius: layout.radiusPill,
                      }}
                    >
                      준비중
                    </span>
                  )}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: layout.margin }} />
      </div>

      <QRFloatingBar />
      <BottomNavBar />
    </ScreenContainer>
  )
}
