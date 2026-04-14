import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import SettingsToggleRow from '../components/common/SettingsToggleRow'
import LanguageSheet from '../components/common/LanguageSheet'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { isLargeText, toggleLargeText } = useApp()

  const [notifications, setNotifications] = useState(true)
  const [marketingNotif, setMarketingNotif] = useState(false)
  const [biometric, setBiometric] = useState(true)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)

  return (
    <ScreenContainer>
      <TopAppBarBack title="설정" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '24px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 알림 설정 그룹 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            margin: `${layout.margin} ${layout.margin} 0`,
            borderRadius: layout.radiusCard,
            overflow: 'hidden',
            boxShadow: shadow.card,
          }}
        >
          <SettingsToggleRow
            label="알림 설정"
            description="결제, 충전 등 주요 알림"
            value={notifications}
            onChange={setNotifications}
          />
          <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
          <SettingsToggleRow
            label="마케팅 알림"
            description="이벤트, 혜택 정보 알림"
            value={marketingNotif}
            onChange={setMarketingNotif}
          />
          <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
          <SettingsToggleRow
            label="생체인증"
            description="지문 또는 얼굴 인식으로 로그인"
            value={biometric}
            onChange={setBiometric}
          />
          <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
          <SettingsToggleRow
            label="큰글씨 모드"
            description="텍스트 크기를 크게 표시"
            value={isLargeText}
            onChange={toggleLargeText}
          />
        </div>

        {/* 구분선 */}
        <div style={{ height: '8px' }} />

        {/* 언어/버전 그룹 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            margin: `0 ${layout.margin}`,
            borderRadius: layout.radiusCard,
            overflow: 'hidden',
            boxShadow: shadow.card,
          }}
        >
          <button
            onClick={() => setIsLanguageOpen(true)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                color: colors.gray[900],
              }}
            >
              언어 설정
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: typography.size.sm, color: colors.gray[500] }}>한국어</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke={colors.gray[400]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
          <div style={{ height: '1px', backgroundColor: colors.gray[100], margin: `0 ${layout.margin}` }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
            }}
          >
            <span
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.medium,
                color: colors.gray[900],
              }}
            >
              앱 버전
            </span>
            <span style={{ fontSize: typography.size.sm, color: colors.gray[500] }}>3.2.1</span>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: '8px' }} />

        {/* 로그아웃 버튼 */}
        <div
          style={{
            backgroundColor: colors.surface.card,
            margin: `0 ${layout.margin}`,
            borderRadius: layout.radiusCard,
            overflow: 'hidden',
            boxShadow: shadow.card,
          }}
        >
          <button
            style={{
              width: '100%',
              padding: '14px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: typography.size.sm,
              fontWeight: typography.weight.medium,
              color: colors.error,
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {isLanguageOpen && (
        <LanguageSheet onClose={() => setIsLanguageOpen(false)} />
      )}
    </ScreenContainer>
  )
}
