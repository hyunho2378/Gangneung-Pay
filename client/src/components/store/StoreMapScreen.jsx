// StoreMapScreen.jsx — M01 (p.24,43,44)
// 지도 + 검색 + 필터 전체 화면

import { useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { Search } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import CategoryFilterChip from './CategoryFilterChip'
import StoreListItem from './StoreListItem'
import StoreDetailSheet from './StoreDetailSheet'
import FrequentPlaces from './FrequentPlaces'

const CATEGORIES = ['전체', '음식점', '카페', '편의점', '숙박', '관광', '마트']

// St-03: 카테고리 아이콘 (S6, Nielsen #6)
const CATEGORY_ICONS = {
  '전체': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" />
      <rect x="7.5" y="1" width="4.5" height="4.5" rx="1" fill="currentColor" />
      <rect x="1" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
      <rect x="7.5" y="7.5" width="4.5" height="4.5" rx="1" fill="currentColor" />
    </svg>
  ),
  '음식점': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4 1.5 L4 5 Q4 6.5 6.5 6.5 Q9 6.5 9 5 L9 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6.5 6.5 L6.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  '카페': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 5 L2 9.5 Q2 11.5 4 11.5 L7.5 11.5 Q9.5 11.5 9.5 9.5 L9.5 5 Z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M9.5 6 L10.5 6 Q12 6 12 7.5 Q12 9 10.5 9 L9.5 9" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M5 3 Q5 4.5 6.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  '편의점': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1.5" y="5" width="10" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M1.5 5 L3.5 1.5 L9.5 1.5 L11.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <rect x="4.5" y="8" width="4" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  '숙박': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="6" width="11" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M1 8.5 L1 4.5 Q1 2.5 3 2.5 L10 2.5 Q12 2.5 12 4.5 L12 8.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <ellipse cx="4.5" cy="6" rx="1.5" ry="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  ),
  '관광': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="1" y="4" width="11" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <circle cx="6.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M4.5 4 L5 2 L8 2 L8.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  '마트': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 1.5 L2.5 1.5 L4.5 8.5 L10 8.5 L12 4 L3.5 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="5.5" cy="10.5" r="1.5" fill="currentColor" />
      <circle cx="9.5" cy="10.5" r="1.5" fill="currentColor" />
    </svg>
  ),
}

const GANGNEUNG_CENTER = { lat: 37.7519, lng: 128.8761 }

const SAMPLE_STORES = [
  {
    id: 1,
    name: '강릉중앙시장 순두부',
    category: '음식점',
    distance: '150m',
    phone: '033-640-1234',
    address: '강원특별자치도 강릉시 금성로 21',
    hours: '09:00 ~ 21:00 (매주 월요일 휴무)',
    lastUpdated: '2026.04.15',
    lat: 37.7527,
    lng: 128.8759,
  },
  {
    id: 2,
    name: '테라로사 강릉 본점',
    category: '카페',
    distance: '380m',
    phone: '033-648-2327',
    address: '강원특별자치도 강릉시 구정면 현천길 25',
    hours: '09:00 ~ 22:00',
    lastUpdated: '2026.03.22',
    lat: 37.7096,
    lng: 128.8572,
  },
  {
    id: 3,
    name: '강릉 GS25 경포점',
    category: '편의점',
    distance: '520m',
    phone: '033-641-0001',
    address: '강원특별자치도 강릉시 경포로 365',
    hours: '24시간 운영',
    lastUpdated: '2026.05.01',
    lat: 37.7923,
    lng: 128.8992,
  },
  {
    id: 4,
    name: '경포해변 쏠비치',
    category: '숙박',
    distance: '1.2km',
    phone: '1588-4888',
    address: '강원특별자치도 강릉시 해안로 307',
    hours: '체크인 15:00 / 체크아웃 11:00',
    lastUpdated: '2026.02.10',
    lat: 37.7944,
    lng: 128.9078,
  },
]

export default function StoreMapScreen() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStore, setSelectedStore] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mapRef, setMapRef] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  })

  const onLoad = (map) => setMapRef(map)
  const onUnmount = () => setMapRef(null)

  const filteredStores =
    activeCategory === '전체'
      ? SAMPLE_STORES
      : SAMPLE_STORES.filter((s) => s.category === activeCategory)

  const handleStoreClick = (store) => {
    setSelectedStore(store)
    setSheetOpen(true)
    if (mapRef) {
      mapRef.panTo({ lat: store.lat, lng: store.lng })
      mapRef.setZoom(16)
    }
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
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={GANGNEUNG_CENTER}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          >
            {filteredStores.map((store) => (
              <Marker
                key={store.id}
                position={{ lat: store.lat, lng: store.lng }}
                title={store.name}
                onClick={() => handleStoreClick(store)}
                icon={{
                  path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                  fillColor: colors.primary[700],
                  fillOpacity: 1,
                  strokeColor: colors.onDark.primary,
                  strokeWeight: 2,
                  scale: 1,
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.gray[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[2],
            }}
          >
            <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>지도 로딩 중</span>
          </div>
        )}

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
            {/* St-04: 검색 input 활성화 (Nielsen #7 flexibility) */}
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="매장 검색"
              style={{
                border: 'none',
                outline: 'none',
                background: 'none',
                flex: 1,
                fontSize: typography.size.sm,
                color: colors.gray[900],
                fontFamily: typography.fontFamily,
              }}
            />
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
              icon={CATEGORY_ICONS[cat]}
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

        {/* 자주 가는 곳 */}
        <FrequentPlaces />

        {/* 제목 */}
        <div
          style={{
            padding: `${spacing[2]} ${layout.margin} ${spacing[2]}`,
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
