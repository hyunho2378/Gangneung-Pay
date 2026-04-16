// StoreMapScreen.jsx — M01 (p.24,43,44)
// 지도 + 검색 + 필터 전체 화면

import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import CategoryFilterChip from './CategoryFilterChip'
import StoreListItem from './StoreListItem'
import StoreDetailSheet from './StoreDetailSheet'

const CATEGORIES = ['전체', '음식점', '카페', '편의점', '숙박', '관광', '마트']

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
    lat: 37.7944,
    lng: 128.9078,
  },
]

export default function StoreMapScreen() {
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selectedStore, setSelectedStore] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [mapReady, setMapReady] = useState(false)

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])

  const filteredStores =
    activeCategory === '전체'
      ? SAMPLE_STORES
      : SAMPLE_STORES.filter((s) => s.category === activeCategory)

  const handleStoreClick = (store) => {
    setSelectedStore(store)
    setSheetOpen(true)
    if (mapRef.current && window.naver) {
      mapRef.current.setCenter(new window.naver.maps.LatLng(store.lat, store.lng))
      mapRef.current.setZoom(15)
    }
  }

  // 네이버 지도 초기화
  useEffect(() => {
    console.log('[Naver Maps] VITE_NAVER_MAP_CLIENT_ID =', import.meta.env.VITE_NAVER_MAP_CLIENT_ID)
    console.log('[Naver Maps] window.naver =', window.naver)

    const initMap = () => {
      if (!window.naver || !window.naver.maps || !mapContainerRef.current) return
      if (mapRef.current) return

      mapRef.current = new window.naver.maps.Map(mapContainerRef.current, {
        center: new window.naver.maps.LatLng(GANGNEUNG_CENTER.lat, GANGNEUNG_CENTER.lng),
        zoom: 13,
        minZoom: 10,
        zoomControl: false,
        scaleControl: false,
        logoControl: true,
        mapDataControl: false,
      })
      setMapReady(true)
    }

    if (window.naver && window.naver.maps) {
      initMap()
    } else {
      const interval = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(interval)
          initMap()
        }
      }, 100)
      return () => clearInterval(interval)
    }
  }, [])

  // 필터 변경 시 마커 업데이트
  useEffect(() => {
    if (!mapReady || !window.naver || !mapRef.current) return

    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    filteredStores.forEach((store) => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(store.lat, store.lng),
        map: mapRef.current,
        title: store.name,
        icon: {
          content: `<div style="width:28px;height:28px;background:${colors.primary[700]};border:2px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:#fff;border-radius:50%;"></div></div>`,
          anchor: new window.naver.maps.Point(14, 14),
        },
      })

      window.naver.maps.Event.addListener(marker, 'click', () => {
        handleStoreClick(store)
      })

      markersRef.current.push(marker)
    })
  }, [mapReady, activeCategory])

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
        }}
      >
        {/* 네이버 지도 컨테이너 */}
        <div
          ref={mapContainerRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
        />

        {/* 로딩 인디케이터 */}
        {!mapReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacing[2],
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 3 C12.477 3 8 7.477 8 13 C8 21 18 33 18 33 C18 33 28 21 28 13 C28 7.477 23.523 3 18 3 Z"
                fill={colors.gray[400]}
              />
              <circle cx="18" cy="13" r="4" fill="#FFFFFF" />
            </svg>
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
