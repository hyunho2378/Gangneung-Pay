/**
 * MyPage — 토스 톤 재설계
 * 프로필 카드 + 5그룹 메뉴 + 앱 버전 + 로그아웃
 * 시니어 부적합 항목 제거
 */

import { CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import { useTypography } from '../hooks/useTypography'
import ScreenContainer from '../components/layout/ScreenContainer'
import BottomNavBar from '../components/layout/BottomNavBar'
import MyMenuGroup from '../components/mypage/MyMenuGroup'

const USER_PROFILE = {
  name: '홍길동',
  email: 'hong@gmail.com',
  phone: '010-1234-5678',
}

function maskEmail(email) {
  const [local, domain] = email.split('@')
  return `${local[0]}***@${domain}`
}

function maskPhone(phone) {
  return phone.replace(/(\d{3})-(\d{4})-(\d{4})/, '$1-$2-****')
}

export default function MyPage() {
  const navigate = useNavigate()
  const sizes = useTypography()
  const { isLargeText, toggleLargeText } = useApp()

  const initial = USER_PROFILE.name.charAt(0)

  const groups = [
    {
      title: '내 카드',
      items: [
        { label: '카드 관리', href: '/card-management' },
        { label: '카드 배송 현황', href: '/card-lost' },
        { label: '주 카드 변경', href: '/card-lost' },
        { label: '분실신고 / 재발급', href: '/card-lost' },
      ],
    },
    {
      title: '회원정보',
      items: [
        { label: '회원 정보 변경', href: '/settings' },
        { label: '비밀번호 변경', href: '/settings' },
        { label: '본인확인 정보', href: '/settings' },
      ],
    },
    {
      title: '고객지원',
      items: [
        { label: '고객센터', href: '/customer-center' },
        { label: '자주 묻는 질문', href: '/customer-center' },
        { label: '공지사항', href: '/notification' },
        { label: '이용약관', href: '/settings' },
      ],
    },
    {
      title: '설정',
      items: [
        { label: '알림 설정', href: '/notification' },
        { label: '언어 설정', value: '한국어', href: '/settings' },
        { label: '큰글씨 모드', value: isLargeText ? '켜짐' : '꺼짐', onClick: toggleLargeText },
      ],
    },
    {
      title: '가맹점 신청',
      items: [
        { label: '가맹점 신청 / 관리', href: '/service-edit' },
      ],
    },
  ]

  return (
    <ScreenContainer statusBarBg={colors.surface.background}>
      <div style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        backgroundColor: colors.surface.background,
      }}>
        {/* 프로필 카드 */}
        <div style={{
          margin: layout.margin,
          padding: spacing[5],
          backgroundColor: colors.surface.card,
          borderRadius: layout.radiusCard,
          boxShadow: shadow.card,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
        }}>
          {/* 아바타 이니셜 */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: layout.radiusPill,
            backgroundColor: colors.primary[100],
            color: colors.primary[700],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: sizes.xl,
            fontWeight: typography.weight.bold,
            flexShrink: 0,
            fontFamily: typography.fontFamily,
          }}>
            {initial}
          </div>

          {/* 이름 + 마스킹 이메일/전화 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: sizes.lg,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              marginBottom: spacing[1],
              fontFamily: typography.fontFamily,
            }}>
              {USER_PROFILE.name}
            </div>
            <div style={{
              fontSize: sizes.sm,
              color: colors.gray[500],
              lineHeight: 1.5,
              fontFamily: typography.fontFamily,
            }}>
              {maskEmail(USER_PROFILE.email)}<br />
              {maskPhone(USER_PROFILE.phone)}
            </div>
          </div>

          {/* 편집 버튼 */}
          <button
            onClick={() => navigate('/settings')}
            style={{
              padding: `${spacing[2]} ${spacing[3]}`,
              backgroundColor: 'transparent',
              border: `1px solid ${colors.gray[200]}`,
              borderRadius: layout.radiusPill,
              fontSize: sizes.xs,
              color: colors.gray[700],
              cursor: 'pointer',
              fontFamily: typography.fontFamily,
              flexShrink: 0,
            }}
          >
            편집
          </button>
        </div>

        {/* 메뉴 5그룹 */}
        {groups.map((g) => (
          <MyMenuGroup key={g.title} title={g.title} items={g.items} />
        ))}

        {/* 앱 버전 정보 */}
        <div style={{
          marginTop: spacing[3],
          padding: spacing[5],
          textAlign: 'center',
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[100]}`,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[2],
            marginBottom: spacing[1],
          }}>
            <span style={{
              fontSize: sizes.sm,
              color: colors.gray[700],
              fontFamily: typography.fontFamily,
            }}>
              앱 버전 v1.0.0
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={14} color={colors.success} />
              <span style={{
                fontSize: sizes.xs,
                color: colors.success,
                fontWeight: typography.weight.medium,
                fontFamily: typography.fontFamily,
              }}>
                최신
              </span>
            </div>
          </div>
          <div style={{
            fontSize: sizes.xs,
            color: colors.gray[500],
            fontFamily: typography.fontFamily,
          }}>
            최신 버전을 사용 중이에요
          </div>
        </div>

        {/* 로그아웃 */}
        <button
          onClick={() => alert('로그아웃')}
          style={{
            width: '100%',
            padding: `${spacing[4]} ${spacing[4]}`,
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: sizes.sm,
            color: colors.gray[500],
            cursor: 'pointer',
            fontFamily: typography.fontFamily,
          }}
        >
          로그아웃
        </button>
      </div>

      <BottomNavBar />
    </ScreenContainer>
  )
}
