import { useNavigate } from 'react-router-dom'
import SupportGrantDetail from '../components/common/SupportGrantDetail'
import { colors } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const mockDetail = {
  tag: '현금',
  tagVariant: 'cash',
  title: '국민내일배움카드',
  period: '상시 신청 가능',
  target: '취업희망자, 재직자, 자영업자',
  content:
    '직업능력개발훈련 참여 시 훈련비의 일부를 지원합니다. 1인당 최대 300만원 한도 내에서 지원되며, 일부 훈련의 경우 추가 지원이 가능합니다.',
  method:
    '고용24 홈페이지(www.work24.go.kr) 또는 가까운 고용센터 방문 신청',
}

export default function SupportDetailPage() {
  const navigate = useNavigate()

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      <TopAppBarBack title="지원금 상세" onBack={() => navigate(-1)} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '24px' }}>
        <SupportGrantDetail grant={mockDetail} />
      </div>
    </ScreenContainer>
  )
}
