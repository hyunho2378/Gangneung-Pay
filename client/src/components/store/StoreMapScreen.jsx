// StoreMapScreen.jsx — M01 (p.24,43,44)
// 지도 + 검색 + 필터 전체 화면

import { useState } from 'react'
import { Search } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import CategoryFilterChip from './CategoryFilterChip'
import StoreListItem from './StoreListItem'
import StoreDetailSheet from './StoreDetailSheet'

const CATEGORIES = ['전체', '음식점', '카페', '편의점', '숙박', '관광', '마트']

const SAMPLE_STORES = [
  {
    id: 1,
    name: '강릉중앙시장 순두부',
    category: '음식점',
    distance: '150m',
    phone: '033-640-1234',
    address: '강원특별자치도 강릉시 금성로 21',
    hours: '09:00 ~ 21:00 (매주 월요일 휴무)',
  },
  {
    id: 2,
    name: '테라로사 강릉 본점',
    category: '카페',
    distance: '380m',
    phone: '033-648-2327',
    address: '강원특별자치도 강릉시 구정면 현천길 25',
    hours: '09:00 ~ 22:00',
  },
  {
    id: 3,
    name: '강릉 GS25 경포점',
    category: '편의점',
    distance: '520m',
    phone: '033-641-0001',
    address: '강원특별자치도 강릉시 경포로 365',
    hours: '24시간 운영',
  },
  {
    id: 4,
    name: '경포해변 쏠비치',
    category: '숙박',
    distance: '1.2km',
    phone: '1588-4888',
    address: '강원특별자치도 강릉시 해안로 307',
    hours: '체크인 15:00 / 체크아웃 11:00',
  },
]

export default function StoreMapScreen() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selectedStore, setSelectedStore] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const filteredStores =
    activeCategory === '전체'
      ? SAMPLE_STORES
      : SAMPLE_STORES.filter((s) => s.category === activeCategory)

  const handleStoreClick = (store) => {
    setSelectedStore(store)
    setSheetOpen(true)
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: typography.fontFamily,
        backgroundColor: colors.surface.background,
        overflow: 'hidden',
      }}
    >
      {/* 지도 영역 */}
      <div
        style={{
          flex: 1,
          backgroundColor: colors.gray[200],
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 지도 격자 패턴 */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.35,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={colors.gray[300]} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 중앙 안내 텍스트 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing[2], zIndex: 1 }}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 3 C12.477 3 8 7.477 8 13 C8 21 18 33 18 33 C18 33 28 21 28 13 C28 7.477 23.523 3 18 3 Z"
              fill={colors.gray[400]}
            />
            <circle cx="18" cy="13" r="4" fill="#FFFFFF" />
          </svg>
          <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>지도 로딩 중</span>
        </div>

        {/* 검색바 (absolute — 지도 위) */}
        <div
          style={{
            position: 'absolute',
            top: `calc(44px + ${spacing[4]})`,
            left: layout.margin,
            right: layout.margin,
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: colors.surface.card,
              borderRadius: layout.radiusPill,
              padding: `${spacing[3]} ${spacing[4]}`,
              display: 'flex',
              alignItems: 'center',
              gap: spacing[2],
              boxShadow: shadow.card,
            }}
          >
            <Search size={18} color={colors.gray[400]} />
            <span
              style={{
                fontSize: typography.size.sm,
                color: colors.gray[400],
              }}
            >
              매장 검색
            </span>
          </div>
        </div>

        {/* 필터칩 행 (검색바 아래) */}
        <div
          style={{
            position: 'absolute',
            top: `calc(44px + ${spacing[4]} + 48px + ${spacing[3]})`,
            left: 0,
            right: 0,
            zIndex: 10,
            display: 'flex',
            gap: spacing[2],
            padding: `0 ${layout.margin}`,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryFilterChip
              key={cat}
              label={cat}
              active={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>
      </div>

      {/* 하단 바텀시트 (기본 노출) */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          borderTopLeftRadius: layout.radiusModal,
          borderTopRightRadius: layout.radiusModal,
          boxShadow: shadow.modal,
          maxHeight: '320px',
          overflowY: 'auto',
        }}
      >
        {/* 핸들 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: `${spacing[3]} 0 ${spacing[2]}`,
          }}
        >
          <div
            style={{
              width: '32px',
              height: '4px',
              borderRadius: layout.radiusPill,
              backgroundColor: colors.gray[300],
            }}
          />
        </div>

        {/* 제목 */}
        <div
          style={{
            padding: `0 ${layout.margin} ${spacing[2]}`,
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            color: colors.gray[900],
          }}
        >
          가까운 매장
        </div>

        {/* 매장 리스트 */}
        {filteredStores.length === 0 ? (
          <div
            style={{
              padding: `${spacing[8]} ${layout.margin}`,
              textAlign: 'center',
              fontSize: typography.size.sm,
              color: colors.gray[400],
            }}
          >
            해당 카테고리 매장이 없습니다
          </div>
        ) : (
          filteredStores.map((store) => (
            <StoreListItem
              key={store.id}
              store={store}
              onClick={() => handleStoreClick(store)}
            />
          ))
        )}
      </div>

      {/* 매장 상세 바텀시트 */}
      <StoreDetailSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        store={selectedStore}
      />
    </div>
  )
}
