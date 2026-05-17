// StoreMapScreen.jsx — M01 (p.24,43,44)
// 지도 35% / 목록 시트 65% — 드래그 시트 제거, 탭(가까운곳/QR결제매장)

import { useState, useEffect, useRef, useMemo } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import { Search } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import {
  CATEGORIES,
  searchStores,
  getStoresByCategory,
  GANGNEUNG_STATION,
  getNearbyStores,
} from '../../data/stores'
import CategoryFilterChip from './CategoryFilterChip'
import StoreListItem from './StoreListItem'
import StoreDetailSheet from './StoreDetailSheet'

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
  '의료': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M5 1.5 L8 1.5 L8 5 L11.5 5 L11.5 8 L8 8 L8 11.5 L5 11.5 L5 8 L1.5 8 L1.5 5 L5 5 Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  '미용': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="3" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="10" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M4.5 9 L11.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M8.5 9 L1.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  '교통': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <rect x="2.5" y="2" width="8" height="7.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M2.5 6.5 L10.5 6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="4.5" cy="8.2" r="0.8" fill="currentColor" />
      <circle cx="8.5" cy="8.2" r="0.8" fill="currentColor" />
      <path d="M3 9.5 L3 11 M10 9.5 L10 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  '생활': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 6 L6.5 1.5 L11.5 6 L11.5 11.5 L1.5 11.5 Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M5 11.5 L5 8 L8 8 L8 11.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
    </svg>
  ),
  '교육': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 4.5 L6.5 1.5 L12 4.5 L6.5 7.5 Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
      <path d="M3.5 6 L3.5 9.5 Q6.5 11.5 9.5 9.5 L9.5 6" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M12 4.5 L12 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  '기타': (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <circle cx="3" cy="6.5" r="1.2" fill="currentColor" />
      <circle cx="6.5" cy="6.5" r="1.2" fill="currentColor" />
      <circle cx="10" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  ),
}

function shortAddress(addr) {
  if (!addr) return ''
  return addr.replace(/^강원\s*강릉시\s*/, '')
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: `${spacing[3]} 0`,
        cursor: 'pointer',
        fontSize: typography.size.sm,
        fontWeight: active ? typography.weight.semibold : typography.weight.regular,
        color: active ? colors.gray[900] : colors.gray[500],
        borderBottom: active ? `2px solid ${colors.primary[700]}` : '2px solid transparent',
        fontFamily: typography.fontFamily,
        marginBottom: '-1px',
      }}
    >
      {label}
    </button>
  )
}

export default function StoreMapScreen() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [tab, setTab] = useState('nearby')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mapRef, setMapRef] = useState(null)
  const clustererRef = useRef(null)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const searchContainerRef = useRef(null)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? '',
  })

  // Pre-compute nearby stores once on mount
  const allNearbyStores = useMemo(
    () => getNearbyStores(GANGNEUNG_STATION.lat, GANGNEUNG_STATION.lng, 2000),
    []
  )
  const allQrNearbyStores = useMemo(
    () => getNearbyStores(GANGNEUNG_STATION.lat, GANGNEUNG_STATION.lng, 300, true),
    []
  )

  // 300ms debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(t)
  }, [searchQuery])

  // Map markers: search results or category filter
  const visibleStores = useMemo(() => {
    if (debouncedQuery.trim()) return searchStores(debouncedQuery, { category: activeCategory, limit: 500 })
    if (activeCategory !== '전체') return getStoresByCategory(activeCategory)
    return []
  }, [debouncedQuery, activeCategory])

  // List stores for active tab + category
  const listStores = useMemo(() => {
    if (tab === 'qr') return allQrNearbyStores.slice(0, 100)
    if (activeCategory === '전체') return allNearbyStores.slice(0, 100)
    return allNearbyStores.filter((s) => s.category === activeCategory).slice(0, 100)
  }, [tab, activeCategory, allNearbyStores, allQrNearbyStores])

  const suggestions = searchQuery.trim().length > 0 ? searchStores(searchQuery, { limit: 10 }) : []

  const handleStoreClick = (store) => {
    setSelectedStore(store)
    setSheetOpen(true)
    if (mapRef) {
      mapRef.panTo({ lat: store.lat, lng: store.lng })
      mapRef.setZoom(16)
    }
  }

  // Marker clusterer: rebuild on visibleStores / map change
  useEffect(() => {
    if (!isLoaded || !mapRef || !window.google) return
    if (clustererRef.current) clustererRef.current.clearMarkers()

    const markers = visibleStores.map((store) => {
      const marker = new window.google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: store.isQR ? colors.teal[500] : colors.primary[700],
          fillOpacity: 0.85,
          strokeColor: '#FFFFFF',
          strokeWeight: 1.5,
        },
        title: store.name,
      })
      marker.addListener('click', () => handleStoreClick(store))
      return marker
    })

    clustererRef.current = new MarkerClusterer({ map: mapRef, markers })
    return () => { clustererRef.current?.clearMarkers() }
  }, [isLoaded, mapRef, visibleStores])

  // Click outside → close autocomplete
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const onLoad = (map) => setMapRef(map)
  const onUnmount = () => setMapRef(null)

  const handleSelectSuggestion = (store) => {
    setSearchQuery(store.name)
    setShowSuggestions(false)
    handleStoreClick(store)
  }

  return (
    <div
      style={{
        width: '100%',
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: typography.fontFamily,
        overflow: 'hidden',
      }}
    >
      {/* 지도 영역: 55% — ScreenContainer fullBleedTop으로 statusBar 영역 처리 */}
      <div style={{ height: '55%', position: 'relative', flexShrink: 0, overflow: 'hidden' }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={GANGNEUNG_STATION}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              disableDefaultUI: true,
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: colors.gray[100],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>지도 로딩 중</span>
          </div>
        )}

        {/* 검색바 (absolute — 지도 위) */}
        <div
          ref={searchContainerRef}
          style={{
            position: 'absolute',
            top: layout.topBarHeight,
            left: layout.margin,
            right: layout.margin,
            zIndex: 20,
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
            <input
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
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

          {/* 자동완성 드롭다운 */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: spacing[2],
                backgroundColor: colors.surface.card,
                borderRadius: layout.radiusCard,
                boxShadow: shadow.modal,
                overflow: 'hidden',
              }}
            >
              {suggestions.map((store) => (
                <button
                  key={store.id}
                  onClick={() => handleSelectSuggestion(store)}
                  style={{
                    width: '100%',
                    padding: spacing[3],
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    borderBottom: `1px solid ${colors.gray[100]}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacing[1],
                    fontFamily: typography.fontFamily,
                  }}
                >
                  <span style={{ fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: colors.gray[900] }}>
                    {store.name}
                  </span>
                  <span style={{ fontSize: typography.size.xs, color: colors.gray[500] }}>
                    {store.category} · {shortAddress(store.address)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 카테고리 필터칩 행 */}
        <div
          style={{
            position: 'absolute',
            top: `calc(${layout.topBarHeight} + 48px + ${spacing[2]})`,
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

      {/* 목록 시트: flex: 1 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.surface.card,
          borderTopLeftRadius: layout.radiusModal,
          borderTopRightRadius: layout.radiusModal,
          boxShadow: shadow.modal,
          overflow: 'hidden',
        }}
      >
        {/* 탭 헤더 */}
        <div
          style={{
            display: 'flex',
            borderBottom: `1px solid ${colors.gray[200]}`,
            padding: `0 ${layout.margin}`,
            gap: spacing[4],
            flexShrink: 0,
          }}
        >
          <TabButton label="가까운 곳" active={tab === 'nearby'} onClick={() => setTab('nearby')} />
          <TabButton
            label={`QR결제 매장 ${allQrNearbyStores.length}`}
            active={tab === 'qr'}
            onClick={() => setTab('qr')}
          />
        </div>

        {/* 매장 목록 */}
        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: layout.bottomNavHeight }}>
          {listStores.length === 0 ? (
            <div
              style={{
                padding: `${spacing[8]} ${layout.margin}`,
                textAlign: 'center',
                fontSize: typography.size.sm,
                color: colors.gray[400],
              }}
            >
              해당 카테고리의 가까운 매장이 없습니다
            </div>
          ) : (
            listStores.map((store) => (
              <StoreListItem
                key={store.id}
                store={store}
                onClick={() => handleStoreClick(store)}
              />
            ))
          )}
        </div>
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
