/**
 * CashbackInfoPage (단계 5 — 캐시백 시스템 풀스택 재구축)
 * 3탭 안내 (적립안내 / 사용안내 / 소멸안내)
 * Nielsen #10 help and documentation
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { colors, spacing, layout, typography } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'

const TABS = [
  { key: 'earn', label: '적립안내' },
  { key: 'use', label: '사용안내' },
  { key: 'expire', label: '소멸안내' },
]

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        height: '48px',
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: active ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
        fontSize: typography.size.md,
        fontWeight: active ? typography.weight.bold : typography.weight.regular,
        color: active ? colors.primary[700] : colors.gray[500],
        cursor: 'pointer',
        fontFamily: typography.fontFamily,
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: spacing[6] }}>
      <h2 style={{
        margin: 0,
        marginBottom: spacing[3],
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        color: colors.gray[900],
        fontFamily: typography.fontFamily,
      }}>
        {title}
      </h2>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing[3],
      }}>
        {children}
      </ul>
    </div>
  )
}

function Bullet({ children }) {
  return (
    <li style={{
      display: 'flex',
      gap: spacing[2],
      fontSize: typography.size.sm,
      color: colors.gray[700],
      lineHeight: 1.6,
      fontFamily: typography.fontFamily,
    }}>
      <span style={{ flexShrink: 0, color: colors.gray[500] }}>·</span>
      <span>{children}</span>
    </li>
  )
}

function EarnInfo() {
  return (
    <div>
      <Section title="적립방법">
        <Bullet>App에 카드 등록 후, 결제 또는 이벤트 참여를 통해 적립할 수 있습니다.</Bullet>
      </Section>

      <Section title="적립기준">
        <Bullet>캐시백이란 결제 시 제공되는 적립금으로 적립 시 별도의 유효기간이 존재합니다.</Bullet>
        <Bullet>즉시 할인과 캐시백은 중복 적용되지 않습니다. 자세한 사항은 [카드 관리 &gt; 혜택정보]를 확인해주세요.</Bullet>
        <Bullet>결제 시 캐시백을 사용한 경우, 사용한 캐시백을 제외한 결제 금액 기준으로 적립됩니다.</Bullet>
      </Section>
    </div>
  )
}

function UseInfo() {
  return (
    <div>
      <Section title="사용기준">
        <Bullet>적립된 캐시백은 1원 이상부터 사용 가능합니다.</Bullet>
        <Bullet>적립된 캐시백 사용 시 일반 카드는 50만원, 충전 계좌를 연결하여 한도 상향한 카드는 200만원까지 사용 가능합니다.</Bullet>
        <Bullet>캐시백은 결제 정책에 따라 카드 충전 잔액 또는 보유한 다른 수단과 함께 쓰일 수 있습니다.</Bullet>
        <Bullet>캐시백의 현금 전환 및 매매는 불가능합니다.</Bullet>
      </Section>

      <Section title="사용제한">
        <Bullet>일부 상품/가맹점의 경우, 캐시 사용 제한이 있습니다. 자세한 사항은 고객센터 1811-8682로 문의 바랍니다.</Bullet>
      </Section>
    </div>
  )
}

function ExpireInfo() {
  return (
    <div>
      <Section title="소멸알림">
        <Bullet>익월 소멸 예정 적립금이 매월 첫 영업일에 App Push 및 E-mail로 공지됩니다.</Bullet>
      </Section>

      <Section title="소멸기준">
        <Bullet>캐시백은 적립 시점/방법에 따라 유효기간이 다르며, 자세한 사항은 이용내역에서 확인 가능합니다.</Bullet>
        <Bullet>사용 취소된 캐시백은 취소된 날로부터 60개월 동안 사용할 수 있습니다.</Bullet>
        <Bullet>유효기간이 만료되어 소멸된 캐시백은 사용 불가하며 복구되지 않습니다.</Bullet>
        <Bullet>회원 탈퇴 시, 적립된 캐시백은 모두 소멸됩니다.</Bullet>
      </Section>
    </div>
  )
}

export default function CashbackInfoPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('earn')

  return (
    <ScreenContainer statusBarBg={colors.surface.card}>
      {/* 헤더 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${spacing[3]} ${layout.margin}`,
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[100]}`,
        minHeight: layout.topBarHeight,
      }}>
        <div style={{ width: '24px' }} />
        <h1 style={{
          margin: 0,
          fontSize: typography.size.lg,
          fontWeight: typography.weight.bold,
          color: colors.gray[900],
          fontFamily: typography.fontFamily,
        }}>
          캐시백 이용안내
        </h1>
        <button
          onClick={() => navigate(-1)}
          aria-label="닫기"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
          }}
        >
          <X size={24} color={colors.gray[700]} />
        </button>
      </div>

      {/* 3탭 */}
      <div style={{
        display: 'flex',
        backgroundColor: colors.surface.card,
        borderBottom: `1px solid ${colors.gray[100]}`,
      }}>
        {TABS.map(({ key, label }) => (
          <TabButton key={key} active={tab === key} onClick={() => setTab(key)}>
            {label}
          </TabButton>
        ))}
      </div>

      {/* 콘텐츠 */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: spacing[5],
        backgroundColor: colors.surface.card,
      }}>
        {tab === 'earn' && <EarnInfo />}
        {tab === 'use' && <UseInfo />}
        {tab === 'expire' && <ExpireInfo />}
      </div>
    </ScreenContainer>
  )
}
