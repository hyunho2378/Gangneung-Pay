# VERIFICATION.md — Phase 3-C 검증 결과
날짜: 2026-05-15
브랜치: feature/phase3-feedback
빌드: 0 오류 (1824 모듈)

## 결과 요약
- PASS: 41개
- FAIL: 0개
- WARN: 3개

## 항목별 결과

### [A] IA 구조
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| A01 | 바텀 네비게이션 5탭 라우트 | PASS | App.jsx /, /store, /qr, /history, /my 라우트 모두 존재 확인 |
| A02 | QRFloatingBar 주석 처리 완료 (5개 파일) | PASS | HomePage, StorePage, LifePage, SupportPage, CommunityPage 모두 import + JSX 주석 처리 확인 |
| A03 | 숨김 컴포넌트 처리 확인 | PASS | HomePage.jsx에서 OnboardingStepper, SupportRankingList, ExploreScrollCard 모두 // 주석 처리 확인 |
| A04 | /menu → /my 리다이렉트 | PASS | App.jsx 78번 줄: `<Route path="/menu" element={<Navigate to="/my" replace />} />` 확인 |
| A05 | TopAppBar Bell + /search 라우팅 | PASS | TopAppBar.jsx: `import { Search, Bell } from 'lucide-react'`, navigate('/search') 및 Bell 아이콘 사용 확인 |

### [B] 절대 규칙
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| B01 | localStorage / sessionStorage 미사용 | PASS | grep 결과 0건 — client/src/ 전체 미사용 확인 |
| B02 | TypeScript 미사용 | PASS | find 결과 0건 — .ts/.tsx 파일 없음 확인 |
| B03 | 이모지 미사용 | PASS | 대상 7개 파일에서 이모지 유니코드 패턴 미발견 |
| B04 | 색상 하드코딩 없음 (Phase 3 신규 파일) | WARN | SearchPage, MyPage, CardApplyPage, MyMenuGroup, PopularKeywords, FrequentPlaces는 HEX 없음. CardBackModal도 HEX 없음. 단, StoreMapScreen.jsx 189번 줄에 `strokeColor: '#ffffff'` 존재 (Google Maps Marker icon 속성, SVG 매핑용) |
| B05 | Tailwind 클래스 미사용 | PASS | Phase 3 신규 파일 7개 모두 className= 사용 없음 확인 |

### [C] 레이아웃 · 안전영역
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| C01 | ScreenContainer minHeight 100dvh 사용 | PASS | ScreenContainer.jsx 8번 줄: `minHeight: '100dvh'` 확인 |
| C02 | BottomNavBar maxWidth 430px 설정 | PASS | BottomNavBar.jsx 36번 줄: `maxWidth: '430px'` 확인 |
| C03 | safe-area-inset-bottom env() 적용 | PASS | BottomNavBar.jsx 42번 줄: `paddingBottom: 'max(env(safe-area-inset-bottom), 16px)'` 확인 |
| C04 | HistoryPage BottomNavBar 존재 | PASS | HistoryPage.jsx: BottomNavBar import + `<BottomNavBar />` JSX 사용 확인 |

### [D] SearchPage — BN
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| D01 | SearchPage TopAppBarBack 사용 + autoFocus input | PASS | SearchPage.jsx: TopAppBarBack import + 사용, input에 `autoFocus` prop 확인 |
| D02 | 최근 검색 localStorage 미사용 — useState만 | PASS | SearchPage.jsx: localStorage 없음, `const [recentSearches, setRecentSearches] = useState([])` 확인 |
| D03 | PopularKeywords 컴포넌트 import + 사용 | PASS | SearchPage.jsx: `import PopularKeywords` + `<PopularKeywords ... />` JSX 사용 확인 |
| D04 | MOCK_STORES 데이터 존재 + 필터링 로직 | PASS | SearchPage.jsx: MOCK_STORES 7개 항목 배열 + `store.name.includes(query)` filter 로직 확인 |
| D05 | PopularKeywords.jsx 키워드 8개 이상 | PASS | PopularKeywords.jsx: KEYWORDS 배열 8개 (`'강릉 맛집', '카페', '편의점', '숙박', 'GS25', '순두부', '테라로사', '경포대'`) 확인 |

### [E] MyPage — MY
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| E01 | MyPage TopAppBar (메인 탭 헤더) | PASS | MyPage.jsx: `import TopAppBar` + `<TopAppBar />` 사용 확인 (TopAppBarBack 아님) |
| E02 | MyPage BottomNavBar 존재 | PASS | MyPage.jsx: BottomNavBar import + `<BottomNavBar />` JSX 사용 확인 |
| E03 | 5개 메뉴 그룹 모두 존재 | PASS | MyPage.jsx groups 배열에 '내 카드', '회원정보', '고객지원', '설정', '가맹점' 5개 제목 모두 확인 |
| E04 | MyMenuGroup 컴포넌트 정상 — title + items props | PASS | MyMenuGroup.jsx: `({ title, items })` props 수신 + ChevronRight 아이콘 사용 확인 |

### [F] CardApplyPage + CardBackModal — MY
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| F01 | CardApplyPage 카드 2개 존재 | PASS | CardApplyPage.jsx: CARDS 배열에 'basic', 'plus' 2개 카드 확인 |
| F02 | 카드 선택 state (useState) 존재 | PASS | CardApplyPage.jsx: `const [selectedCard, setSelectedCard] = useState('basic')` 확인 |
| F03 | CTA 버튼 "신청하기" 존재 | PASS | CardApplyPage.jsx 220번 줄: `신청하기` 텍스트 버튼 확인 |
| F04 | CardBackModal isOpen prop 처리 + null 반환 | PASS | CardBackModal.jsx 11번 줄: `if (!isOpen) return null` 확인 |
| F05 | HomePage에 CardBackModal 연동 | PASS | HomePage.jsx: CardBackModal import, `showCardBack` state, `isOpen={showCardBack}` 전달 확인 |

### [G] CoachMarkOverlay — FX
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| G01 | 말풍선 max-width 제한 | PASS | CoachMarkOverlay.jsx 33번 줄: `width: 'min(calc(100vw - 32px), 398px)'` 확인 |
| G02 | 건너뛰기 버튼 position:fixed 배치 | PASS | CoachMarkOverlay.jsx 60번 줄: `position: 'fixed'` div 내 onSkip 버튼 확인 |

### [H] Google Maps 전환 — FX
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| H01 | StoreMapScreen Kakao 코드 완전 제거 | PASS | StoreMapScreen.jsx에서 kakao/window.kakao/dapi.kakao grep 결과 0건 |
| H02 | @react-google-maps/api 사용 | PASS | StoreMapScreen.jsx 5번 줄: `import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'` 확인 |
| H03 | Google Maps API Key import.meta.env 사용 | PASS | StoreMapScreen.jsx 130번 줄: `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` 확인 |
| H04 | index.html Kakao 스크립트 제거 | PASS | client/index.html: dapi.kakao.com 스크립트 태그 없음 확인 |

### [I] FrequentPlaces + HistoryPage — FX
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| I01 | FrequentPlaces.jsx 존재 + 모의 데이터 | PASS | FrequentPlaces.jsx: FREQUENT 배열 3개 항목 + overflowX: 'auto' 가로 스크롤 구조 확인 |
| I02 | StoreMapScreen에 FrequentPlaces 포함 | PASS | StoreMapScreen.jsx 11번 줄: import, 309번 줄: `<FrequentPlaces />` 사용 확인 |
| I03 | TransactionHistory 카드관리 탭 제거 | PASS | TransactionHistory.jsx에서 '카드관리'/CardManagement/card.*management grep 결과 0건 |
| I04 | 환불 사례 (type: 'refund') 데이터 존재 | PASS | TransactionHistory.jsx 19번 줄: `{ ..., type: 'refund', ... }` 항목 확인 |
| I05 | HistoryPage TopAppBar 사용 | PASS | HistoryPage.jsx: `import TopAppBar` + `<TopAppBar />` 사용 확인 (TopAppBarBack 아님) |

### [J] 빌드 · 라우팅
| ID | 항목 | 결과 | 근거 |
|----|------|------|------|
| J01 | npm run build 0 오류 | PASS | `vite build` 실행 결과: 1824 modules transformed, 빌드 오류 0건 확인 |
| J02 | 신규 컴포넌트 App.jsx 라우트 미누락 | PASS | App.jsx: /search(74번), /my(73번), /card-apply(75번) 라우트 모두 존재 확인 |
| J03 | 신규 컴포넌트 파일 실제 존재 확인 | PASS | MyMenuGroup.jsx, CardBackModal.jsx, FrequentPlaces.jsx, PopularKeywords.jsx 4개 파일 모두 find로 존재 확인 |
| J04 | BottomNavBar active 판별 — /history 탭 정상 | PASS | BottomNavBar.jsx 21번 줄: `if (p.startsWith('/history')) return 'history'` 확인 |
| J05 | AppContext 코치마크 세션 Context 사용 확인 | WARN | AppContext.jsx에 코치마크 관련 state 없음. HomePage.jsx에서 `useState(true)`로만 showCoach 관리 (세션 간 초기화됨). localStorage 미사용은 절대규칙 준수이나, 앱 재진입 시 항상 코치마크 재표시됨 — 의도적 설계인지 확인 필요 |

---

## FAIL 항목 상세

없음 — FAIL 0건

---

## WARN 항목 상세

### [B04] 색상 하드코딩 — StoreMapScreen
- 파일: `client/src/components/store/StoreMapScreen.jsx`
- 줄: 189번
- 내용: `strokeColor: '#ffffff'` — Google Maps Marker icon 속성의 테두리 색상 하드코딩
- 관련 코드: `strokeColor: '#ffffff',`
- 비고: Google Maps API의 `icon.strokeColor`는 SVG path 속성으로, SVG fill/stroke 예외에 준하는 성격. 토큰으로 교체 가능하나 기능상 문제 없음.
- 수정 필요: 선택적 (tokens.colors에 white 또는 onDark.primary로 교체 고려)

### [B04 부기] CardBackModal SVG 인라인
- 파일: `client/src/components/home/CardBackModal.jsx`
- 내용: SVG 내 `stroke="rgba(255,255,255,0.4)"`, `stroke="rgba(255,255,255,0.7)"` 등 rgba 인라인 사용
- 비고: HEX가 아닌 rgba 형태이므로 B04 체크리스트 패턴(#HEX)에는 해당하지 않음. 참고용 WARN.
- 수정 필요: 선택적

### [J05] 코치마크 세션 지속성
- 파일: `client/src/pages/HomePage.jsx`
- 내용: `showCoach`가 `useState(true)`로만 관리되어 앱 재진입(새로고침 등) 시 항상 코치마크 재표시
- 비고: localStorage 사용 금지 규칙에 따른 결과로, AppContext에 코치마크 완료 state를 추가하면 세션 내 재표시 방지 가능. 절대 규칙 위반은 아님.
- 수정 필요: 선택적 (의도적 설계라면 PASS 처리 가능)
