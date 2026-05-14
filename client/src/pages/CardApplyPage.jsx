import { useState } from 'react'
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
  const [selectedCard, setSelectedCard] = useState('basic')

  return (
    <ScreenContainer>
      <TopAppBarBack title="카드 신청" />

      <div style={{ overflowY: 'auto', paddingBottom: '100px', flex: 1 }}>
        {/* 상단 설명 */}
        <div
          style={{
            padding: `${spacing[5]} ${layout.margin} ${spacing[4]}`,
          }}
        >
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
                margin:
                  index === 0
                    ? `${spacing[4]} ${layout.margin} ${spacing[3]}`
                    : `${spacing[3]} ${layout.margin}`,
                borderRadius: layout.radiusCard,
                backgroundColor: card.bg,
                padding: spacing[5],
                border: isSelected
                  ? `3px solid ${colors.warning}`
                  : '3px solid transparent',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                {/* 왼쪽: 카드 정보 */}
                <div>
                  <div
                    style={{
                      fontSize: typography.size.sm,
                      fontWeight: typography.weight.bold,
                      color: colors.onDark.primary,
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    {card.name}
                  </div>
                  <div
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.onDark.secondary,
                      fontFamily: typography.fontFamily,
                      marginTop: spacing[1],
                    }}
                  >
                    {card.desc}
                  </div>
                </div>

                {/* 오른쪽: 선택 원 */}
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
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: card.bg,
                      }}
                    />
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
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: spacing[2],
                alignItems: 'center',
                padding: `${spacing[2]} 0`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8 L7 12 L13 4"
                  stroke={colors.success}
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: typography.size.xs,
                  color: colors.gray[700],
                  fontFamily: typography.fontFamily,
                }}
              >
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
          onClick={() =>
            alert('카드 신청이 접수되었습니다. 배송까지 3~5일이 소요됩니다.')
          }
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
