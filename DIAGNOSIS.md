# DIAGNOSIS.md — 강릉페이 Phase 2 진단 보고서
작성일: 2026-05-13 | 대상: 6개 핵심 페이지 | 기준: DESIGN.md 7대 전략 + Nielsen 10 + Shneiderman 8

---

## 진단 범위

| 페이지 | 파일 경로 | 관련 컴포넌트 |
|--------|-----------|---------------|
| HomePage | `pages/HomePage.jsx` | BalanceCardExpanded, CashbackProgressCard, BannerCarousel, AnnouncementModal, B2BPromoCard |
| ChargePage | `pages/ChargePage.jsx` | ChargeScreen, RefundGuideModal |
| QRPage | `pages/QRPage.jsx` | QRScannerScreen |
| StorePage | `pages/StorePage.jsx` | StoreMapScreen, StoreListItem, StoreDetailSheet |
| CashbackPage | `pages/CashbackPage.jsx` | CashbackDetail |
| HistoryPage | `pages/HistoryPage.jsx` | TransactionHistory |

---

## 1. HomePage (`/`)

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| H-01 | **WidgetAddBanner 없음** — 앱 진입 전 잔액 선제 노출 경로가 없음. 홈 최상단에 위젯 안내 배너가 없음 | S1 | #1 (visibility), #7 (efficiency) | #2 (shortcuts) | 홈 최상단에 `WidgetAddBanner` 신규 추가. 탭 → glassmorphism 위젯 프리뷰 슬라이드다운 (400ms, 1.5s hold, 슬라이드업) |
| H-02 | **환불 버튼 부재** — BalanceCardExpanded 하단 버튼이 [카드관리] [충전]만 있고 [환불]이 없음. 사용자 4인 전원 환불 기능 발견 못함 | S2 | #1 (visibility), #3 (user control) | #7 (locus of control) | 버튼 행을 [충전] [환불] [QR결제] 3개로 재구성. 환불은 primary 버튼과 동등한 위계 |
| H-03 | **정보 위계 역전** — BannerCarousel이 최상단을 차지하고 잔액 카드가 그 아래. 가장 중요한 정보(잔액)가 스크롤 없이 보이지 않을 수 있음 | S3 | #1 (visibility), #8 (aesthetic) | #3 (feedback) | 배너 캐러셀을 잔액 카드 아래로 이동. WidgetBanner → 잔액 카드 → [충전/환불/QR] → 캐시백 → 배너 순 |
| H-04 | **캐시백 분리 배치** — CashbackProgressCard가 잔액 카드와 별도 컴포넌트로 분리. DESIGN.md는 "잔액 카드 (Large Title 잔액, 캐시백 진행바 통합)" 명시 | S3 | #1 (visibility) | #3 (feedback), #8 (memory load) | CashbackProgressCard를 BalanceCardExpanded 내부 하단에 통합. 카드 안에서 진행바 렌더 |
| H-05 | **AnnouncementModal 팝업 사용** — DESIGN.md 절대금지: "팝업 모달로 정보 전달". 현재 공지가 전체 팝업으로 표시됨 | — | #8 (aesthetic), #3 (user control) | #3 (feedback) | AnnouncementModal 제거, 홈 상단에 인라인 배너(`AnnouncementBanner`) 대체. 닫기(X) 버튼 포함 |
| H-06 | **B2B 콘텐츠 B2C 화면 노출** — B2BPromoCard (가맹점 등록/포탈) 2개가 홈에 노출. DESIGN.md 절대금지 | — | #8 (aesthetic, minimalistic) | — | B2BPromoCard 2개 홈에서 제거 |
| H-07 | **시스템 용어 "강릉페이(1)"** — BalanceCardExpanded에서 카드명으로 "강릉페이(1)" 사용. DESIGN.md: "강릉머니 등 시스템 용어 → 잔액으로 통일" | — | #2 (real world match) | #1 (consistency) | "강릉페이(1)" → "내 잔액" 또는 "강릉페이 카드"로 변경 |
| H-08 | **잔액 타이포그래피 스케일 미달** — 현재 balance 폰트 `typography.size.balance = 28px`. DESIGN.md Large Title 기준은 34px | S1, S3 | #1 (visibility) | #3 (feedback) | 잔액 금액 폰트 34px Large Title로 상향 |

---

## 2. ChargePage (`/charge`) → ChargeScreen

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| C-01 | **3단계 플로우 미구현** — 단일 화면(금액 입력)만 있고 "확인 → 완료" 단계 없음. 충전 버튼을 누르면 어떻게 되는지 알 수 없음 | S4 | #1 (visibility), #4 (closure) | #4 (closure), #8 (memory load) | `step` 상태(1:입력, 2:확인, 3:완료)로 3단계 구현. 단계 표시기(Stepper) 항상 노출 |
| C-02 | **현재 잔액 미표시** — 충전 화면에 현재 잔액이 전혀 보이지 않음. 얼마나 더 충전해야 하는지 컨텍스트 없음 | S5 | #1 (visibility), #5 (error prevention) | #3 (feedback), #8 (memory load) | 헤더 또는 금액 입력 영역 상단에 "현재 잔액 120,000원" 항상 표시 |
| C-03 | **충전 한도 미표시** — UI에 한도 표시 없음. 코드상 MAX_AMOUNT = 999,999,999이지만 실제 서비스 한도는 다름. DESIGN.md: "충전 중 한도 항상 노출" | — | #1 (visibility) | #8 (memory load) | 금액 입력 영역 하단에 "월 충전 한도 300,000원 / 사용 0원" 항상 표시 |
| C-04 | **Disabled 버튼 사유 미명시** — 금액 0원일 때 [바로 충전하기] 비활성화되지만 왜 비활성인지 표시 없음. DESIGN.md: "Disabled: 사유 항상 명시" | — | #5 (error prevention) | #5 (simple error handling) | 버튼 아래 보조 문구 "금액을 입력하면 충전할 수 있습니다" 표시 (disabled 상태 한정) |
| C-05 | **환불 안내가 숨겨진 텍스트 링크** — "환불안내보기"가 밑줄 텍스트로만 존재. 충전 전 환불 조건을 모르면 손해 볼 수 있는 중요 정보 | S2 | #6 (recognition) | #3 (feedback) | 환불 조건 요약(1~2줄)을 인라인으로 항상 노출. 전체 안내는 링크 유지 |
| C-06 | **충전 완료 후 피드백 없음** — `onCharge` 콜백이 있으나 완료 단계(step 3)가 없어 사용자가 충전 성공 여부를 알 수 없음 | S4 | #1 (visibility), #4 (closure) | #4 (closure) | step 3: 완료 화면 구현. 충전 금액, 잔액, [홈으로] 버튼 포함 |

---

## 3. QRPage (`/qr`) → QRScannerScreen

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| Q-01 | **잔액 부족 사전 차단 없음** — 잔액이 0원이어도 QR 스캔을 시도할 수 있음. 계산대 앞에서 결제 실패 시 민망한 상황 발생 가능 | S5 | #5 (error prevention) | #5 (simple error handling) | 진입 시 잔액 0원이면 경고 배너 + [충전하러 가기] CTA 표시. 스캔은 가능하게 유지하되 경고 명시 |
| Q-02 | **잔액 표시 위계 낮음** — 잔액이 xs 크기(13px) 보조 텍스트로 표시. QR 결제 전 가장 중요한 정보인데 시각적으로 약함 | S1, S5 | #1 (visibility) | #3 (feedback) | 잔액을 Callout(16px) 이상으로 상향, primary-700 색상으로 강조 |
| Q-03 | **스캔 상태 피드백 없음** — "카메라 준비 중" 텍스트만 있고 진행 상태(로딩, 스캔 감지, 성공/실패) 표시 없음 | — | #1 (visibility) | #3 (informative feedback) | 스캔 대기 → 감지 중 → 완료 상태를 하단 패널 텍스트로 명시 |

---

## 4. StorePage (`/store`) → StoreMapScreen

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| St-01 | **마지막 업데이트 날짜 없음** — 가맹점 정보가 언제 업데이트됐는지 알 수 없음. DESIGN.md: "'마지막 업데이트' 날짜 표시" | S6 | #1 (visibility) | #3 (feedback) | StoreDetailSheet 상단에 "최근 업데이트: 2025.04.10" 표시 |
| St-02 | **가맹점주 정보 수정 진입점 없음** — DESIGN.md: "가맹점주 정보 수정 진입점 (B2B 분리된 영역)". 현재 매장 상세에서 정보 수정 경로가 없음 | S6 | #6 (recognition) | #7 (locus of control) | StoreDetailSheet 하단에 "이 정보가 맞지 않나요? 가맹점주 수정 요청" 텍스트 링크 추가 (B2B는 별도 링크로 분리) |
| St-03 | **카테고리 필터칩 아이콘 없음** — CategoryFilterChip은 텍스트만 있음. StoreListItem은 아이콘+텍스트를 이미 구현했으나 필터칩과 불일치 | S6 | #4 (consistency) | #1 (consistency) | CategoryFilterChip에 업종 미니 아이콘 추가 (16px). StoreListItem과 동일한 아이콘 계열 사용 |
| St-04 | **검색 입력 비활성** — 검색바가 시각적으로 있지만 실제 입력이 작동하지 않음 (placeholder span으로 구현). 사용자가 탭하면 아무 반응 없음 | — | #1 (visibility), #5 (error prevention) | #3 (feedback) | div → input 요소로 변경. 키보드 활성화, 입력 시 결과 필터링 (샘플 데이터 기준) |

---

## 5. CashbackPage (`/cashback`) → CashbackDetail

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| Cb-01 | **캐시백 요약 정보 없음** — 화면 진입 즉시 보이는 곳에 "이번달 누적 캐시백 / 잔여 한도 / 사용액" 요약이 없음. 내역 리스트만 있음 | S3 | #1 (visibility), #6 (recognition) | #3 (feedback), #8 (memory load) | 내역 리스트 상단에 요약 카드 추가: 이번달 적립 3,200원 / 한도 30,000원 / teal 진행바 |
| Cb-02 | **캐시백 금액과 결제 금액 혼동** — CashbackItem에서 `item.amount`(결제금액 12,000원)를 teal 색상으로 강조 표시. 실제 캐시백 `item.cashback`(120원)가 아님. 사용자가 결제금액을 캐시백으로 오해 | S3 | #2 (real world match), #6 (recognition) | #3 (feedback) | teal 강조 금액을 `item.cashback`으로 수정. 결제금액은 보조 텍스트로 표시. "+120원 적립" 형식 |
| Cb-03 | **탭 용어 불명확** — "자동/수동" 탭이 무엇을 의미하는지 불명확. 처음 보는 사용자는 차이를 알 수 없음 | — | #2 (real world match), #10 (help) | #1 (consistency) | 탭 레이블 변경: "자동 적립" / "수동 확인". 탭 우측에 물음표 아이콘으로 간단 설명 툴팁 |
| Cb-04 | **캐시백 사용 방법 미안내** — 적립된 캐시백을 어디서 어떻게 쓸 수 있는지 설명이 없음 | — | #10 (help and documentation) | #8 (memory load) | 요약 카드 하단에 "캐시백은 결제 시 자동 차감됩니다" 1줄 안내 |

---

## 6. HistoryPage (`/history`) → TransactionHistory

| # | 이슈 | 전략 위반 | Nielsen # | Shneiderman # | 수정 계획 |
|---|------|-----------|-----------|---------------|-----------|
| Hi-01 | **환불 진입점 없음** — 이용내역에서 개별 거래에 대한 환불/취소 액션이 없음. DESIGN.md S2는 환불의 동등 위계 노출을 요구 | S2 | #3 (user control), #4 (closure) | #6 (easy reversal), #7 (locus of control) | 이용내역 각 항목에 "환불" 버튼 또는 탭 진입 시 상단에 환불 안내 배너 추가. 취소 가능 기간 명시 |
| Hi-02 | **현재 잔액 미표시** — 이용내역 화면에 잔액이 보이지 않음. 결제 후 잔액이 얼마인지 확인하려고 왔을 때 즉시 알 수 없음 | S3 | #1 (visibility) | #3 (feedback) | TopAppBarBack 아래 잔액 요약 인라인 표시 "현재 잔액 120,000원" |
| Hi-03 | **이용내역 거래 UI 없음** — EmptyHistoryState만 구현됨. 실제 거래 항목 렌더링 UI(아이콘+매장명+금액+날짜 행)가 없음 | — | #6 (recognition) | #3 (feedback) | 거래 리스트 아이템 컴포넌트 구현. StoreListItem과 동일 아이콘 계열, 우측에 결제금액 + 날짜 |
| Hi-04 | **환불 가능 기간 미표시** — 어떤 거래가 환불 가능한지 알 수 없음. Shneiderman #6: "충전 직후 취소 가능 시간 명시" | S2 | #4 (closure) | #6 (easy reversal) | 거래 항목에 환불 가능 상태 배지 (예: "환불 가능 D-5") 또는 거래 상세에서 명시 |

---

## 이슈 요약 통계

| 페이지 | 이슈 수 | 전략 위반 건수 | Nielsen 위반 | Shneiderman 위반 |
|--------|---------|--------------|--------------|-----------------|
| HomePage | 8 | S1×1, S2×1, S3×2 | #1×4, #2×1, #3×1, #8×2 | #2×1, #3×2, #7×1 |
| ChargePage | 6 | S4×2, S5×1, S2×1 | #1×3, #4×2, #5×2, #6×1 | #3×1, #4×2, #5×1, #8×2 |
| QRPage | 3 | S5×1 | #1×1, #5×1 | #3×2, #5×1 |
| StorePage | 4 | S6×3 | #1×1, #4×1, #5×1, #6×1 | #1×1, #3×1, #7×1 |
| CashbackPage | 4 | S3×2 | #1×1, #2×2, #6×1, #10×1 | #1×1, #3×2, #8×2 |
| HistoryPage | 4 | S2×2 | #1×1, #3×1, #4×1, #6×1 | #3×1, #6×2, #7×1 |
| **합계** | **29** | S1×1, S2×4, S3×4, S4×2, S5×2, S6×3 | | |

---

## 전략별 위반 총괄

| 전략 ID | 전략명 | 위반 페이지 | 위반 이슈 ID |
|---------|--------|------------|-------------|
| S1 | 앱 진입 전 잔액 선제 노출 (위젯) | Home | H-01, H-03, H-08 |
| S2 | 환불의 동등한 위계 노출 | Home, Charge, History | H-02, C-05, Hi-01, Hi-04 |
| S3 | 혜택 현황 즉각 체감 | Home, Cashback | H-03, H-04, Cb-01, Cb-02 |
| S4 | 충전 플로우 3단계 압축 | Charge | C-01, C-06 |
| S5 | 잔액 부족 사전 차단 | Charge, QR | C-02, Q-01, Q-02 |
| S6 | 가맹점 정보 실시간 신뢰 | Store | St-01, St-02, St-03 |
| S7 | 첫 사용자 코치마크 | — | (별도 신규 컴포넌트) |

---

## 보존 확인 (Phase 1 시각 품질 유지)

다음 요소는 Phase 2에서 변경 금지:
- BalanceCardExpanded의 다크 블루 카드 배경, 워터마크 SVG, 칩 SVG
- QRScannerScreen의 L자형 코너 브래킷 SVG, 흑/백 스캔 영역
- CashbackProgressCard의 teal 진행바 디자인 (통합 시 그대로 사용)
- TransactionHistory의 카드 관리 뷰 미니 카드 SVG 장식
- StoreListItem의 카테고리별 색상 원형 아이콘 (유지)
- BannerCarousel 슬라이드 콘텐츠 및 디자인 (위치만 이동)
