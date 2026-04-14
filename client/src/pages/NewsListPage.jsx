import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const mockNews = [
  {
    id: '1',
    title: '강릉페이 4월 캐시백 10% 이벤트',
    date: '2025.04.01',
    summary: '4월 한달간 캐시백이 10%로 인상됩니다.',
  },
  {
    id: '2',
    title: '강릉시 지역화폐 우수상 수상',
    date: '2025.03.20',
    summary: '행정안전부 지역화폐 우수 지자체로 선정',
  },
  {
    id: '3',
    title: '봄맞이 강릉 여행 페스티벌',
    date: '2025.03.15',
    summary: '3월~5월 강릉 여행 특별 할인 이벤트',
  },
  {
    id: '4',
    title: '강릉페이 앱 업데이트 안내',
    date: '2025.03.10',
    summary: 'v3.2.1 출시 - 버그 수정 및 성능 개선',
  },
  {
    id: '5',
    title: '강릉 중앙시장 신규 가맹점 추가',
    date: '2025.03.05',
    summary: '20개 매장 신규 등록',
  },
]

export default function NewsListPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer>
      <TopAppBarBack title="강릉이 소식" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: colors.surface.background,
          padding: `${layout.margin} ${layout.margin} 24px`,
        }}
      >
        <div
          style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            overflow: 'hidden',
            boxShadow: shadow.card,
          }}
        >
          {mockNews.map((news, index) => (
            <div key={news.id}>
              <button
                onClick={() => navigate(`/news/${news.id}`)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '8px',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.gray[400],
                      margin: '0 0 4px',
                    }}
                  >
                    {news.date}
                  </p>
                  <p
                    style={{
                      fontSize: typography.size.sm,
                      fontWeight: typography.weight.semibold,
                      color: colors.gray[900],
                      margin: '0 0 4px',
                    }}
                  >
                    {news.title}
                  </p>
                  <p
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.gray[500],
                      margin: 0,
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {news.summary}
                  </p>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: '4px' }}
                >
                  <path
                    d="M6 4l4 4-4 4"
                    stroke={colors.gray[400]}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {index < mockNews.length - 1 && (
                <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </ScreenContainer>
  )
}
