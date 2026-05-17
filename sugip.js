(async function collectAllMerchants() {
  const PAGE_SIZE = 30
  const TOTAL = 13643
  const TOTAL_PAGES = Math.ceil(TOTAL / PAGE_SIZE)  // 455페이지
  const allMerchants = []
  
  console.log(`총 ${TOTAL_PAGES}페이지 수집 시작...`)
  
  for (let page = 1; page <= TOTAL_PAGES; page++) {
    try {
      const res = await fetch('https://search.konacard.co.kr/api/v1/payable-merchants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          id: "38",
          bizType: "",
          merchantType: "HN",
          pageNum: String(page),
          pageSize: "30",
          affiliateName: "강릉시청",
          searchKey: "",
        }),
      })
      
      const json = await res.json()
      const merchants = json.data?.merchants || []
      
      // 필요한 필드만 추출
      merchants.forEach(m => {
        allMerchants.push({
          seq: m.seq,
          name: m.simpleNm,
          category: m.bizTypeNm,
          categoryCode: m.bizType,
          addr: m.addr,
          tel: m.telNo,
          zipCd: m.zipCd,
          lat: m.latitude,
          lng: m.longitude,
        })
      })
      
      // 10페이지마다 진행 로그
      if (page % 10 === 0 || page === TOTAL_PAGES) {
        console.log(`진행: ${page}/${TOTAL_PAGES} 페이지 (${allMerchants.length}개 수집)`)
      }
      
      // 서버 부담 줄이기 위해 약간 대기
      await new Promise(r => setTimeout(r, 100))
    } catch (e) {
      console.error(`페이지 ${page} 실패:`, e)
    }
  }
  
  console.log(`✓ 수집 완료: 총 ${allMerchants.length}개`)
  
  // JSON 파일로 다운로드
  const blob = new Blob([JSON.stringify(allMerchants, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'gangneung-merchants.json'
  a.click()
  URL.revokeObjectURL(url)
  
  // 전역에도 저장 (개발자 도구에서 확인 가능)
  window.__allMerchants = allMerchants
  console.log('window.__allMerchants 에 저장됨. 콘솔에서 접근 가능.')
})()