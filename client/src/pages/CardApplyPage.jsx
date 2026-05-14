/**
 * CardApplyPage (Task 4)
 * Strategy: S7
 * Nielsen: #1 visibility (진행상태), #3 user control
 * Shneiderman: #4 closure, #8 reduce memory load
 * 신청 → 배송 완료 → 등록 완료 → 홈 복귀
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { colors, typography, layout, spacing } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

const CARDS = [
  {
    id: 'basic',
    name: '강릉페이 기본카드',
    desc: '연회비 없음 · 강릉 전역 사용',
    bg: colors.primary[700],
  },
  {
    id: 'plus',
    name: '강릉페이 플러스카드',
    desc: '캐시백 10% · 특별 혜택',
    bg: colors.primary[800],
  },
]

const BENEFITS = [
  '강릉 전 지역 가맹점에서 결제 가능',
  '카카오페이 연동 결제 지원',
  '충전금 환불 언제든지 가능',
]

export default function CardApplyPage() {
  const navigate = useNavigate()
  const { cardStatus, applyCard, registerCard } = useUser()
  const [selectedCard, setSelectedCard] = useState('basic')
  const [cardCode, setCardCode] = useState('')

  // 배송 완료 → 등록 화면
  if (cardStatus === 'shipped') {
    return (
      <ScreenContainer>
        <TopAppBarBack title="카드 등록" onBack={() => navigate(-1)} />
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px', backgroundColor: colors.surface.background }}>
          {/* 배송 완료 배너 */}
          <div
            style={{
              margin: `${spacing[4]} ${layout.margin} 0`,
              backgroundColor: colors.successBg,
              border: `1px solid ${colors.successBorder}`,
              borderRadius: layout.radiusCard,
              padding: `${spacing[3]} ${spacing[4]}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8 L7 12 L13 4" stroke={colors.success} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: typography.size.sm, color: colors.success, fontWeight: typography.weight.semibold, fontFamily: typography.fontFamily }}>
              배송 완료
            </span>
            <span style={{ fontSize: typography.size.xs, color: colors.gray[500], fontFamily: typography.fontFamily }}>
              카드를 등록해주세요
            </span>
          </div>

          {/* 카드 코드 입력 */}
          <div style={{ padding: `${spacing[5]} ${layout.margin}` }}>
            <div style={{ fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily, marginBottom: spacing[2] }}>
              카드 번호를 입력해주세요
            </div>
            <div style={{ fontSize: typography.size.xs, color: colors.gray[500], fontFamily: typography.fontFamily, marginBottom: spacing[4] }}>
              카드 앞면의 16자리 번호를 입력해주세요
            </div>
            <input
              value={cardCode}
              onChange={(e) => setCardCode(e.target.value)}
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              style={{
                width: '100%',
                height: '48px',
                border: `1px solid ${colors.gray[200]}`,
                borderRadius: layout.radiusButton,
                padding: `0 ${spacing[4]}`,
                fontSize: typography.size.sm,
                color: colors.gray[900],
                fontFamily: typography.fontFamily,
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: colors.surface.card,
              }}
            />
          </div>
        </div>

        {/* 등록 완료 CTA */}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: colors.surface.card,
            borderTop: `1px solid ${colors.gray[200]}`,
            padding: `${spacing[3]} ${layout.margin} ${spacing[5]}`,
          }}
        >
          <button
            onClick={() => { registerCard(); navigate('/') }}
            style={{
              width: '100%',
              height: '52px',
              backgroundColor: colors.primary[700],
              border: 'none',
              borderRadius: layout.radiusButton,
              color: colors.onDark.primary,
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              fontFamily: typography.fontFamily,
              cursor: 'pointer',
            }}
          >
            등록 완료
          </button>
        </div>
      </ScreenContainer>
    )
  }

  // 신청 처리 중
  if (cardStatus === 'applying') {
    return (
      <ScreenContainer>
        <TopAppBarBack title="카드 신청" onBack={() => navigate(-1)} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: spacing[4],
            backgroundColor: colors.surface.background,
          }}
        >
          {/* 스피너 */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <circle cx="20" cy="20" r="16" stroke={colors.gray[200]} strokeWidth="3" fill="none" />
            <path d="M20 4 A16 16 0 0 1 36 20" stroke={colors.primary[700]} strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
          <div style={{ fontSize: typography.size.sm, color: colors.gray[500], fontFamily: typography.fontFamily }}>
            신청 처리 중입니다...
          </div>
          <div style={{ fontSize: typography.size.xs, color: colors.gray[400], fontFamily: typography.fontFamily }}>
            잠시 후 배송 준비가 완료됩니다
          </div>
        </div>
      </ScreenContainer>
    )
  }

  // 기본: 카드 선택 화면 (cardStatus === 'none')
  return (
    <ScreenContainer>
      <TopAppBarBack title="카드 신청" />

      <div style={{ overflowY: 'auto', paddingBottom: '100px', flex: 1 }}>
        {/* 상단 설명 */}
        <div style={{ padding: `${spacing[5]} ${layout.margin} ${spacing[4]}` }}>
          <div
            style={{
              fontSize: typography.size.md,
              fontWeight: typography.weight.bold,
              color: colors.gray[900],
              fontFamily: typography.fontFamily,
            }}
          >
            원하시는 카드를 선택해 주세요
          </div>
          <div
            style={{
              fontSize: typography.size.xs,
              color: colors.gray[500],
              fontFamily: typography.fontFamily,
              marginTop: spacing[1],
            }}
          >
            강릉페이 카드는 강릉 전역 가맹점에서 사용 가능합니다
          </div>
        </div>

        {/* 카드 선택 섹션 */}
        {CARDS.map((card, index) => {
          const isSelected = selectedCard === card.id
          return (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              style={{
                margin: index === 0
                  ? `${spacing[4]} ${layout.margin} ${spacing[3]}`
                  : `${spacing[3]} ${layout.margin}`,
                borderRadius: layout.radiusCard,
                backgroundColor: card.bg,
                padding: spacing[5],
                border: isSelected ? `3px solid ${colors.warning}` : '3px solid transparent',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.onDark.primary, fontFamily: typography.fontFamily }}>
                    {card.name}
                  </div>
                  <div style={{ fontSize: typography.size.xs, color: colors.onDark.secondary, fontFamily: typography.fontFamily, marginTop: spacing[1] }}>
                    {card.desc}
                  </div>
                </div>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? colors.onDark.primary : 'transparent',
                    border: isSelected ? 'none' : `2px solid ${colors.onDark.secondary}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isSelected && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: card.bg }} />
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* 혜택 섹션 */}
        <div style={{ margin: `${spacing[2]} ${layout.margin}` }}>
          <div
            style={{
              fontSize: typography.size.xs,
              fontWeight: typography.weight.semibold,
              color: colors.gray[500],
              fontFamily: typography.fontFamily,
              marginBottom: spacing[3],
            }}
          >
            카드 주요 혜택
          </div>
          {BENEFITS.map((benefit, index) => (
            <div
              key={index}
              style={{ display: 'flex', gap: spacing[2], alignItems: 'center', padding: `${spacing[2]} 0` }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8 L7 12 L13 4" stroke={colors.success} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: typography.size.xs, color: colors.gray[700], fontFamily: typography.fontFamily }}>
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 CTA */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          padding: `${spacing[3]} ${layout.margin} ${spacing[5]}`,
        }}
      >
        <button
          onClick={applyCard}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: colors.primary[700],
            border: 'none',
            borderRadius: layout.radiusButton,
            color: colors.onDark.primary,
            fontSize: typography.size.md,
            fontWeight: typography.weight.bold,
            fontFamily: typography.fontFamily,
            cursor: 'pointer',
          }}
        >
          신청하기
        </button>
      </div>
    </ScreenContainer>
  )
}
