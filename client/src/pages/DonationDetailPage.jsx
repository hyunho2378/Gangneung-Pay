import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const mockCampaigns = {
  '1': { id: '1', name: '강릉 사랑나눔 기부통', targetAmount: 10000000, currentAmount: 3200000, participants: 128, color: colors.donationBg, desc: '강릉시 어려운 이웃들을 위해 따뜻한 손길을 나눠주세요. 기부된 금액은 강릉시 복지관을 통해 취약계층에게 전달됩니다.' },
  '2': { id: '2', name: '아동 교육 지원', targetAmount: 5000000, currentAmount: 4100000, participants: 89, color: colors.chatBg, desc: '교육의 기회를 놓친 아이들에게 학습 기회를 제공합니다. 기부금은 교육 교재, 학원비 등에 사용됩니다.' },
  '3': { id: '3', name: '노인 복지 지원', targetAmount: 8000000, currentAmount: 2000000, participants: 45, color: colors.greenBg, desc: '홀로 계신 어르신들의 일상을 지원합니다. 식사 지원, 의료비, 생활용품 등에 사용됩니다.' },
  '4': { id: '4', name: '청년 창업 지원', targetAmount: 6000000, currentAmount: 5500000, participants: 230, color: colors.warmBg, desc: '강릉의 청년들이 꿈을 펼칠 수 있도록 창업 초기 비용을 지원합니다.' },
}

const quickAmounts = [1000, 5000, 10000]

export default function DonationDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const campaign = mockCampaigns[id] || mockCampaigns['1']

  const [amount, setAmount] = useState('')
  const [isDonated, setIsDonated] = useState(false)

  const percent = Math.round((campaign.currentAmount / campaign.targetAmount) * 100)

  const handleDonate = () => {
    if (amount > 0) {
      setIsDonated(true)
    }
  }

  return (
    <ScreenContainer>
      <TopAppBarBack title="기부 캠페인" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '100px',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 상단 이미지 대체 색상 박스 */}
        <div
          style={{
            height: '200px',
            backgroundColor: campaign.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <path
              d="M32 12c-5 0-10 4-10 10 0 8 10 16 10 16s10-8 10-16c0-6-5-10-10-10z"
              fill={colors.error}
              opacity="0.4"
            />
            <path
              d="M20 38c-8 0-14 4-14 10v4h52v-4c0-6-6-10-14-10"
              fill={colors.gray[300]}
              opacity="0.4"
            />
          </svg>
        </div>

        <div style={{ padding: `20px ${layout.margin}` }}>
          {/* 캠페인명 */}
          <p
            style={{
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              margin: '0 0 16px',
            }}
          >
            {campaign.name}
          </p>

          {/* 진행률 */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>
                참여자 {campaign.participants.toLocaleString()}명
              </span>
              <span style={{ fontSize: typography.size.sm, fontWeight: typography.weight.semibold, color: colors.teal[500] }}>
                {percent}%
              </span>
            </div>
            <div
              style={{
                height: '8px',
                backgroundColor: colors.gray[200],
                borderRadius: layout.radiusPill,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${percent}%`,
                  backgroundColor: colors.teal[500],
                  borderRadius: layout.radiusPill,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: typography.size.xs, color: colors.teal[500], fontWeight: typography.weight.medium }}>
                {campaign.currentAmount.toLocaleString()}원 모금
              </span>
              <span style={{ fontSize: typography.size.xs, color: colors.gray[400] }}>
                목표 {campaign.targetAmount.toLocaleString()}원
              </span>
            </div>
          </div>

          {/* 설명 */}
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusCard,
              padding: layout.margin,
              boxShadow: shadow.card,
              marginBottom: '20px',
            }}
          >
            <p
              style={{
                fontSize: typography.size.sm,
                color: colors.gray[700],
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {campaign.desc}
            </p>
          </div>

          {/* 기부 금액 입력 */}
          {!isDonated ? (
            <div
              style={{
                backgroundColor: colors.surface.card,
                borderRadius: layout.radiusCard,
                padding: layout.margin,
                boxShadow: shadow.card,
              }}
            >
              <p
                style={{
                  fontSize: typography.size.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.gray[900],
                  margin: '0 0 12px',
                }}
              >
                기부 금액
              </p>

              {/* 빠른 선택 */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {quickAmounts.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => setAmount(qa)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: layout.radiusButton,
                      border: `1.5px solid ${amount === qa ? colors.primary[700] : colors.gray[200]}`,
                      backgroundColor: amount === qa ? colors.primary[100] : colors.surface.card,
                      color: amount === qa ? colors.primary[700] : colors.gray[700],
                      fontSize: typography.size.xs,
                      fontWeight: amount === qa ? typography.weight.semibold : typography.weight.medium,
                      cursor: 'pointer',
                    }}
                  >
                    {qa.toLocaleString()}원
                  </button>
                ))}
              </div>

              {/* 직접 입력 */}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="직접 입력 (원)"
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  border: `1.5px solid ${colors.gray[200]}`,
                  borderRadius: layout.radiusButton,
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                backgroundColor: colors.successBg,
                borderRadius: layout.radiusCard,
                padding: '24px',
                textAlign: 'center',
                border: `1px solid ${colors.successBorder}`,
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
                <circle cx="20" cy="20" r="16" fill={colors.success} opacity="0.15" />
                <path d="M13 20l5 5 9-10" stroke={colors.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p style={{ fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.success, margin: '0 0 4px' }}>
                기부 완료!
              </p>
              <p style={{ fontSize: typography.size.sm, color: colors.gray[600], margin: 0 }}>
                따뜻한 마음 감사합니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 하단 기부하기 버튼 */}
      {!isDonated && (
        <div
          style={{
            padding: `12px ${layout.margin} 24px`,
            backgroundColor: colors.surface.card,
            borderTop: `1px solid ${colors.gray[200]}`,
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleDonate}
            disabled={!amount || amount <= 0}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: (!amount || amount <= 0) ? colors.gray[200] : colors.primary[700],
              border: 'none',
              borderRadius: layout.radiusButton,
              color: (!amount || amount <= 0) ? colors.gray[400] : colors.surface.card,
              fontSize: typography.size.md,
              fontWeight: typography.weight.semibold,
              cursor: (!amount || amount <= 0) ? 'default' : 'pointer',
            }}
          >
            {amount ? `${Number(amount).toLocaleString()}원 기부하기` : '기부하기'}
          </button>
        </div>
      )}
    </ScreenContainer>
  )
}
