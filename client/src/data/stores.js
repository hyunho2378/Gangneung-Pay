import storesData from './stores.json'
import qrStoresData from './qr-stores.json'

export const STORES = storesData
export const QR_STORES = qrStoresData

export const CATEGORIES = [
  '전체', '음식점', '카페', '편의점', '마트', '의료',
  '미용', '교통', '숙박', '관광', '생활', '교육', '기타',
]

export function searchStores(query, options = {}) {
  if (!query || query.trim().length < 1) return []
  const q = query.trim().toLowerCase()
  const { category, qrOnly, limit = 50 } = options

  const results = STORES.filter((s) => {
    if (qrOnly && !s.isQR) return false
    if (category && category !== '전체' && s.category !== category) return false
    return s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
  })

  return results.slice(0, limit)
}

export function getStoresByCategory(category, qrOnly = false) {
  let list = qrOnly ? QR_STORES : STORES
  if (category && category !== '전체') {
    list = list.filter((s) => s.category === category)
  }
  return list
}
