import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors, layout, typography, shadow } from '../tokens/tokens'

import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'
import Button from '../components/common/Button'

const ageOptions = ['10대', '20대', '30대', '40대', '50대', '60대이상']
const interestOptions = ['청년', '노인', '복지', '교육', '문화', '취업']

export default function CustomInfoPage() {
  const navigate = useNavigate()
  const [selectedAge, setSelectedAge] = useState(null)
  const [selectedInterests, setSelectedInterests] = useState([])

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSave = () => {
    navigate(-1)
  }

  return (
    <ScreenContainer>
      <TopAppBarBack title="맞춤 정보 설정" onBack={() => navigate(-1)} />

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '100px',
          backgroundColor: colors.surface.background,
        }}
      >
        <div style={{ padding: `20px ${layout.margin}` }}>
          {/* 나이대 선택 */}
          <div style={{ marginBottom: '28px' }}>
            <p
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                margin: '0 0 12px',
              }}
            >
              나이대
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {ageOptions.map((age) => (
                <button
                  key={age}
                  onClick={() => setSelectedAge(age)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: layout.radiusPill,
                    border: `1.5px solid ${selectedAge === age ? colors.primary[700] : colors.gray[200]}`,
                    backgroundColor: selectedAge === age ? colors.primary[100] : colors.surface.card,
                    color: selectedAge === age ? colors.primary[700] : colors.gray[700],
                    fontSize: typography.size.sm,
                    fontWeight: selectedAge === age ? typography.weight.semibold : typography.weight.medium,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          {/* 관심 분야 */}
          <div style={{ marginBottom: '28px' }}>
            <p
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                margin: '0 0 4px',
              }}
            >
              관심 분야
            </p>
            <p
              style={{
                fontSize: typography.size.xs,
                color: colors.gray[500],
                margin: '0 0 12px',
              }}
            >
              중복 선택 가능
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {interestOptions.map((interest) => {
                const isSelected = selectedInterests.includes(interest)
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: layout.radiusPill,
                      border: `1.5px solid ${isSelected ? colors.primary[700] : colors.gray[200]}`,
                      backgroundColor: isSelected ? colors.primary[700] : colors.surface.card,
                      color: isSelected ? colors.surface.card : colors.gray[700],
                      fontSize: typography.size.sm,
                      fontWeight: isSelected ? typography.weight.semibold : typography.weight.medium,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {interest}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 거주 지역 */}
          <div>
            <p
              style={{
                fontSize: typography.size.sm,
                fontWeight: typography.weight.semibold,
                color: colors.gray[900],
                margin: '0 0 12px',
              }}
            >
              거주 지역
            </p>
            <div
              style={{
                backgroundColor: colors.surface.card,
                borderRadius: layout.radiusButton,
                padding: '14px 16px',
                border: `1.5px solid ${colors.gray[200]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: typography.size.sm,
                  color: colors.gray[900],
                  fontWeight: typography.weight.medium,
                }}
              >
                강릉시
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span
                  style={{
                    fontSize: typography.size.xs,
                    color: colors.gray[400],
                  }}
                >
                  고정
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2a3 3 0 010 6 3 3 0 010-6z" fill={colors.gray[300]} />
                  <path d="M3 12c0-2.209 1.791-4 4-4s4 1.791 4 4" stroke={colors.gray[300]} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저장 버튼 */}
      <div
        style={{
          padding: `12px ${layout.margin} 24px`,
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[200]}`,
          flexShrink: 0,
        }}
      >
        <Button variant="filled" size="lg" onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </ScreenContainer>
  )
}
