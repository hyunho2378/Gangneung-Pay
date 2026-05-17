import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBar from '../components/layout/TopAppBar'
import BottomNavBar from '../components/layout/BottomNavBar'
// HIDDEN (Phase 3 feedback): QRFloatingBar → 바텀탭 QR 중앙 버튼으로 대체
// import QRFloatingBar from '../components/layout/QRFloatingBar'
import PromoHorizontalCard from '../components/home/PromoHorizontalCard'

const tourCards = [
  { id: 1, title: '강릉 오죽헌', desc: '율곡 이이와 신사임당의 생가', color: colors.tag.cashBg },
  { id: 2, title: '경포해수욕장', desc: '강릉 대표 해수욕장', color: colors.primary[100] },
  { id: 3, title: '안목해변 커피거리', desc: '커피 명소 안목해변', color: colors.kakaoBg },
  { id: 4, title: '강릉중앙시장', desc: '전통 재래시장', color: colors.pinkBg },
]

const travelCourses = [
  { id: 1, title: '1박2일 강릉 여행', desc: '오죽헌 → 경포해수욕장 → 안목 커피거리 → 강릉중앙시장', duration: '1박2일' },
  { id: 2, title: '당일치기 강릉', desc: '강릉역 → 중앙시장 → 안목해변 → 경포해수욕장', duration: '당일치기' },
]

export default function LifePage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = ['강릉관광', '강릉여행코스']

  return (
    <ScreenContainer>
      <TopAppBar />

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          backgroundColor: colors.surface.background,
        }}
      >
        {/* 상단 배너 */}
        <div
          style={{
            height: '160px',
            backgroundColor: colors.primary[700],
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: layout.margin,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: '12px' }}>
            <circle cx="24" cy="24" r="20" fill="rgba(255,255,255,0.2)" />
            <path d="M14 28 L20 20 L26 25 L32 17 L38 28 Z" fill="white" opacity="0.9" />
            <circle cx="16" cy="18" r="3" fill="white" opacity="0.8" />
          </svg>
          <p
            style={{
              color: colors.surface.card,
              fontSize: typography.size.lg,
              fontWeight: typography.weight.bold,
              margin: 0,
              textAlign: 'center',
            }}
          >
            강릉에서 즐기는 특별한 여행
          </p>
          <p
            style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: typography.size.sm,
              margin: '4px 0 0',
              textAlign: 'center',
            }}
          >
            강릉페이로 더 알뜰하게
          </p>
        </div>

        {/* 탭 바 */}
        <div
          style={{
            display: 'flex',
            backgroundColor: colors.surface.card,
            borderBottom: `1px solid ${colors.gray[200]}`,
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                flex: 1,
                padding: '14px 0',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === index ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
                color: activeTab === index ? colors.primary[700] : colors.gray[500],
                fontSize: typography.size.sm,
                fontWeight: activeTab === index ? typography.weight.semibold : typography.weight.medium,
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div style={{ padding: layout.margin }}>
          {activeTab === 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              {tourCards.map((card) => (
                <div
                  key={card.id}
                  style={{
                    backgroundColor: colors.surface.card,
                    borderRadius: layout.radiusCard,
                    overflow: 'hidden',
                    boxShadow: shadow.card,
                    cursor: 'pointer',
                  }}
                  onClick={() => navigate(`/place/${card.id}`)}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '80px',
                      backgroundColor: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="8" width="24" height="18" rx="3" fill={colors.primary[700]} opacity="0.3" />
                      <path d="M8 22 L13 16 L18 19 L22 13 L26 22 Z" fill={colors.primary[700]} opacity="0.6" />
                      <circle cx="10" cy="14" r="2" fill={colors.primary[700]} opacity="0.6" />
                    </svg>
                  </div>
                  <div style={{ padding: '10px' }}>
                    <p
                      style={{
                        fontSize: typography.size.sm,
                        fontWeight: typography.weight.semibold,
                        color: colors.gray[900],
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[500],
                        margin: '4px 0 0',
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {travelCourses.map((course) => (
                <div
                  key={course.id}
                  style={{
                    backgroundColor: colors.surface.card,
                    borderRadius: layout.radiusCard,
                    padding: layout.margin,
                    boxShadow: shadow.card,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <p
                      style={{
                        fontSize: typography.size.md,
                        fontWeight: typography.weight.semibold,
                        color: colors.gray[900],
                        margin: 0,
                      }}
                    >
                      {course.title}
                    </p>
                    <span
                      style={{
                        fontSize: typography.size.xs,
                        color: colors.primary[700],
                        backgroundColor: colors.primary[100],
                        padding: '3px 8px',
                        borderRadius: layout.radiusPill,
                        fontWeight: typography.weight.medium,
                      }}
                    >
                      {course.duration}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: typography.size.xs,
                      color: colors.gray[500],
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {course.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 교통카드 안내 프로모 카드 */}
        <PromoHorizontalCard
          bgColor={colors.primary[100]}
          textColor={colors.primary[700]}
          title="교통카드로도 사용하세요"
          description="강릉페이 카드는 교통카드 기능을 지원합니다"
          onClick={() => navigate('/transport-card')}
        />
      </div>

      {/* HIDDEN (Phase 3 feedback): QRFloatingBar */}
      {/* <QRFloatingBar /> */}
      <BottomNavBar />
    </ScreenContainer>
  )
}
