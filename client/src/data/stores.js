// stores.js — 강릉 매장 마스터 데이터
// 좌표는 강릉 시내 실제 위치 기반 근사값

export const STORES = [
  // 음식점
  { id: 1, name: '초당순두부', category: '음식점', lat: 37.7715, lng: 128.8769, address: '강릉시 초당동' },
  { id: 2, name: '강릉짬뽕순두부', category: '음식점', lat: 37.7725, lng: 128.8779, address: '강릉시 초당동' },
  { id: 3, name: '교동반점', category: '음식점', lat: 37.7565, lng: 128.8945, address: '강릉시 교동' },
  { id: 4, name: '동인동 분식', category: '음식점', lat: 37.7510, lng: 128.8810, address: '강릉시 동인동' },
  { id: 5, name: '초당두부마을', category: '음식점', lat: 37.7720, lng: 128.8765, address: '강릉시 초당동' },
  { id: 6, name: '송정해변 횟집', category: '음식점', lat: 37.7820, lng: 128.9210, address: '강릉시 송정동' },
  { id: 7, name: '강문해변 회센터', category: '음식점', lat: 37.7900, lng: 128.9230, address: '강릉시 강문동' },
  { id: 8, name: '경포대 횟집', category: '음식점', lat: 37.8000, lng: 128.9050, address: '강릉시 경포동' },
  { id: 9, name: '주문진수산시장', category: '음식점', lat: 37.8910, lng: 128.8290, address: '강릉시 주문진읍' },
  { id: 10, name: '강릉항 활어센터', category: '음식점', lat: 37.7745, lng: 128.9450, address: '강릉시 견소동' },

  // 카페
  { id: 11, name: '테라로사 본점', category: '카페', lat: 37.7060, lng: 128.8350, address: '강릉시 구정면' },
  { id: 12, name: '보헤미안커피', category: '카페', lat: 37.7710, lng: 128.9460, address: '강릉시 견소동' },
  { id: 13, name: '안목해변카페', category: '카페', lat: 37.7740, lng: 128.9480, address: '강릉시 견소동' },
  { id: 14, name: '정동진역 카페', category: '카페', lat: 37.6905, lng: 129.0335, address: '강릉시 강동면' },
  { id: 15, name: '영진해변 카페', category: '카페', lat: 37.8295, lng: 128.8900, address: '강릉시 연곡면' },
  { id: 16, name: '강릉커피거리 베이커리', category: '카페', lat: 37.7700, lng: 128.9470, address: '강릉시 견소동' },

  // 편의점
  { id: 17, name: 'GS25 강릉경포점', category: '편의점', lat: 37.7900, lng: 128.9050, address: '강릉시 경포동' },
  { id: 18, name: '강릉터미널 편의점', category: '편의점', lat: 37.7570, lng: 128.8780, address: '강릉시 홍제동' },
  { id: 19, name: 'CU 강릉역점', category: '편의점', lat: 37.7647, lng: 128.8990, address: '강릉시 교동' },
  { id: 20, name: '한솥도시락 강릉점', category: '편의점', lat: 37.7560, lng: 128.8960, address: '강릉시 교동' },

  // 마트
  { id: 21, name: '강릉중앙시장', category: '마트', lat: 37.7540, lng: 128.8975, address: '강릉시 성남동' },
  { id: 22, name: '옥천오일장', category: '마트', lat: 37.7585, lng: 128.8990, address: '강릉시 옥천동' },

  // 관광
  { id: 23, name: '오죽한옥마을', category: '관광', lat: 37.7790, lng: 128.8780, address: '강릉시 죽헌동' },
  { id: 24, name: '강릉통일공원', category: '관광', lat: 37.7000, lng: 129.0500, address: '강릉시 강동면' },

  // 숙박
  { id: 25, name: '강릉시청 구내식당', category: '숙박', lat: 37.7520, lng: 128.8760, address: '강릉시 홍제동' },
]

export const CATEGORIES = ['전체', '음식점', '카페', '편의점', '숙박', '관광', '마트']
