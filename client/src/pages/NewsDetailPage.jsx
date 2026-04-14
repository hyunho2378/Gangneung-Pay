import { useParams, useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const mockNewsDetail = {
  '1': {
    title: '강릉페이 4월 캐시백 10% 이벤트',
    date: '2025.04.01',
    body: '4월 한달간 강릉페이 카드로 결제 시 캐시백 적립률이 기존 5%에서 10%로 인상됩니다.\n\n대상: 강릉페이 사용자 전원\n기간: 2025년 4월 1일 ~ 4월 30일\n한도: 월 최대 3만원 캐시백\n\n강릉페이로 강릉 지역 가맹점에서 결제하시면 자동으로 캐시백이 적립됩니다. 이번 달도 강릉페이를 많이 이용해 주세요!',
  },
  '2': {
    title: '강릉시 지역화폐 우수상 수상',
    date: '2025.03.20',
    body: '강릉시가 행정안전부 주관 지역화폐 활성화 우수 지자체로 선정되었습니다.\n\n강릉페이는 2024년 기준 가맹점 3,200개, 누적 발행액 1,200억원을 달성하며 강원도 내 최우수 지역화폐로 인정받았습니다.\n\n앞으로도 강릉페이는 지역 경제 활성화를 위해 다양한 혜택과 서비스를 제공하겠습니다.',
  },
  '3': {
    title: '봄맞이 강릉 여행 페스티벌',
    date: '2025.03.15',
    body: '봄을 맞아 강릉시에서 특별 여행 이벤트를 진행합니다.\n\n기간: 2025년 3월 ~ 5월\n혜택: 강릉페이 결제 시 추가 5% 할인\n대상 가맹점: 강릉시 내 관광·숙박·음식 가맹점 전체\n\n오죽헌, 경포해수욕장, 안목 커피거리 등 강릉의 아름다운 명소를 강릉페이로 더욱 알뜰하게 즐기세요!',
  },
  '4': {
    title: '강릉페이 앱 업데이트 안내',
    date: '2025.03.10',
    body: '강릉페이 앱 v3.2.1이 출시되었습니다.\n\n주요 변경사항:\n- 결제 속도 개선\n- 캐시백 내역 조회 UI 개선\n- 일부 기기에서 발생하던 오류 수정\n- 보안 강화\n\n앱 스토어에서 업데이트 해주시면 새로운 기능을 이용하실 수 있습니다.',
  },
  '5': {
    title: '강릉 중앙시장 신규 가맹점 추가',
    date: '2025.03.05',
    body: '강릉 중앙시장 내 신규 가맹점 20개가 강릉페이 결제 가맹점으로 등록되었습니다.\n\n신규 등록 가맹점:\n- 전통먹거리 10개 점포\n- 의류·잡화 5개 점포\n- 생활용품 5개 점포\n\n이제 강릉 중앙시장 대부분의 매장에서 강릉페이로 결제하실 수 있습니다.',
  },
}

export default function NewsDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const news = mockNewsDetail[id] || {
    title: '소식',
    date: '',
    body: '내용을 불러올 수 없습니다.',
  }

  return (
    <ScreenContainer>
      <TopAppBarBack title="강릉이 소식" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '24px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 기사 헤더 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            padding: layout.margin,
            borderBottom: `1px solid ${colors.gray[100]}`,
          }}
        >
          {news.date && (
            <p
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[400],
                margin: '0 0 8px',
              }}
            >
              {news.date}
            </p>
          )}
          <p
            style={{
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              margin: 0,
              lineHeight: 1.4,
              fontFamily: typography.fontFamily,
            }}
          >
            {news.title}
          </p>
        </div>

        {/* 기사 본문 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            margin: layout.margin,
            borderRadius: layout.radiusCard,
            padding: layout.margin,
            boxShadow: shadow.card,
          }}
        >
          {news.body.split('\n').map((line, index) => (
            <p
              key={index}
              style={{
                fontSize: typography.size.sm,
                color: line === '' ? undefined : colors.gray[800],
                margin: line === '' ? '8px 0' : '0',
                lineHeight: 1.7,
                fontFamily: typography.fontFamily,
                minHeight: line === '' ? '8px' : undefined,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </ScreenContainer>
  )
}
