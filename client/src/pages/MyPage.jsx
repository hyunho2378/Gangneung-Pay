import { useNavigate } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import BottomNavBar from '../components/layout/BottomNavBar'
import MyMenuGroup from '../components/mypage/MyMenuGroup'

export default function MyPage() {
  const navigate = useNavigate()

  const groups = [
    {
      title: '내 카드',
      items: [
        { label: '내 카드 보기', onClick: () => navigate('/history') },
        { label: '카드 관리', onClick: () => navigate('/history') },
        { label: '분실신고/재발급', onClick: () => navigate('/card-lost') },
        { label: '교통카드 기능', onClick: () => navigate('/transport-card') },
      ],
    },
    {
      title: '회원정보',
      items: [
        { label: '회원정보 변경', onClick: () => navigate('/settings') },
        { label: '비밀번호 변경', onClick: () => navigate('/settings') },
        { label: '본인확인 정보', onClick: () => navigate('/settings') },
      ],
    },
    {
      title: '고객지원',
      items: [
        { label: '고객센터', onClick: () => navigate('/customer-center') },
        { label: '챗봇 상담', onClick: () => navigate('/chatbot') },
        { label: '이용 약관', onClick: () => navigate('/settings') },
      ],
    },
    {
      title: '설정',
      items: [
        { label: '설정', onClick: () => navigate('/settings') },
        { label: '알림 설정', onClick: () => navigate('/notification') },
      ],
    },
    {
      title: '가맹점',
      items: [
        { label: '가맹점 신청', onClick: () => navigate('/service-edit') },
        { label: '가맹점 포털', onClick: () => navigate('/service-edit') },
      ],
    },
  ]

  return (
    <ScreenContainer>
      <TopAppBar />

      <div style={{ overflowY: 'auto', paddingBottom: '100px', flex: 1 }}>
        {/* 프로필 헤더 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            borderBottom: `1px solid ${colors.gray[100]}`,
            padding: `${spacing[6]} ${layout.margin} ${spacing[5]}`,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing[4],
          }}
        >
          {/* 아바타 원 */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: colors.gray[200],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={32} color={colors.gray[400]} />
          </div>

          {/* 이름 + 연락처 */}
          <div>
            <div
              style={{
                fontSize: typography.size.lg,
                fontWeight: typography.weight.bold,
                color: colors.gray[900],
                fontFamily: typography.fontFamily,
              }}
            >
              홍길동
            </div>
            <div
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[400],
                fontFamily: typography.fontFamily,
                marginTop: spacing[1],
              }}
            >
              010-1234-5678
            </div>
          </div>
        </div>

        {/* 메뉴 그룹 */}
        {groups.map((g, index) => (
          <div key={g.title} style={{ marginTop: index === 0 ? 0 : spacing[3] }}>
            <MyMenuGroup title={g.title} items={g.items} />
          </div>
        ))}

        {/* 로그아웃 버튼 */}
        <button
          onClick={() => alert('로그아웃')}
          style={{
            margin: `${spacing[6]} ${layout.margin}`,
            width: 'calc(100% - 32px)',
            padding: spacing[4],
            backgroundColor: colors.surface.card,
            border: `1px solid ${colors.gray[200]}`,
            borderRadius: layout.radiusButton,
            color: colors.error,
            fontSize: typography.size.sm,
            fontWeight: typography.weight.semibold,
            fontFamily: typography.fontFamily,
            cursor: 'pointer',
          }}
        >
          로그아웃
        </button>
      </div>

      <BottomNavBar />
    </ScreenContainer>
  )
}
