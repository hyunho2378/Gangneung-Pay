# 강릉페이 IA 다이어그램 모음

생성일: 2026-05-20
용도: 발표 슬라이드/포스터 첨부용 Mermaid 다이어그램

---

## 1. 라우트 트리 (전체 구조)

```mermaid
graph TD
    BottomNav[BottomNavBar 5탭]

    BottomNav --> Home[/ 홈]
    BottomNav --> Store[/store 결제매장]
    BottomNav --> History[/history 이용내역]
    BottomNav --> Support[/support 지원금·혜택]
    BottomNav --> My[/my MY]

    Home --> BalanceCard[잔액 카드 액션 영역]
    BalanceCard --> Charge[/charge 충전]
    BalanceCard --> Refund[/refund 환불]
    BalanceCard --> QR[/qr QR결제]
    Home --> CardApply[/card-apply 카드신청]
    Home --> Cashback[/cashback 캐시백]

    My --> CardMgmt[/card-management 카드관리]
    My --> Settings[/settings 설정]
    My --> CustomerCenter[/customer-center 고객센터]
    My --> Notification[/notification 알림]
    My --> ServiceEdit[/service-edit 가맹점신청]

    Store --> StoreMap[지도 + 매장 검색]
    History --> RefundLink[환불 진입]
    Cashback --> CashbackInfo[/cashback-info 캐시백 안내]

    style BottomNav fill:#1D4ED8,color:#fff
    style BalanceCard fill:#1B4FD8,color:#fff
    style Charge fill:#DBEAFE,stroke:#1D4ED8
    style Refund fill:#FEF3C7,stroke:#F59E0B
    style QR fill:#D1FAE5,stroke:#14B8A6
    style Home fill:#EFF6FF,stroke:#1D4ED8
    style My fill:#EFF6FF,stroke:#1D4ED8
```

---

## 2. BottomNav 5탭 — HIG 준수 네비/액션 분리 구조

```mermaid
graph LR
    subgraph BottomNav["BottomNavBar — 네비게이션 전용 (HIG 준수)"]
        Tab1[홈]
        Tab2[결제매장]
        Tab3[이용내역]
        Tab4[지원금·혜택]
        Tab5[MY]
    end

    subgraph BalanceCard["잔액 카드 — 액션 영역 (HIG: toolbar)"]
        Action1[충전]
        Action2[환불]
        Action3[QR결제]
    end

    BottomNav -->|페이지 이동| Pages[각 페이지]
    BalanceCard -->|액션 실행 + FaceID 인증| Auth[PaymentAuthOverlay]
    Auth -->|완료| Context[UserContext 상태 갱신]
    Context -->|DB 기록| Neon[(NeonDB)]

    style BottomNav fill:#EFF6FF,stroke:#1D4ED8
    style BalanceCard fill:#1B4FD8,color:#fff
    style Auth fill:#111827,color:#fff
    style Neon fill:#14B8A6,color:#fff
```

---

## 3. 충전 플로우 — FaceID 인증 시퀀스

```mermaid
sequenceDiagram
    participant User as 사용자
    participant UI as ChargeScreen
    participant Auth as PaymentAuthOverlay
    participant Ctx as UserContext
    participant DB as NeonDB

    User->>UI: 금액 입력 (STEP 1)
    User->>UI: 다음 버튼
    UI->>UI: STEP 2 충전 확인 화면
    User->>UI: 충전하기 클릭
    UI->>Auth: open=true
    Auth->>Auth: 키패드 화면 표시
    Note over Auth: 100ms 딜레이
    Auth->>Auth: FaceID 모달 등장 (150×148px)
    Auth->>Auth: RAF 244프레임 재생 (2,500ms)
    Note over Auth: iOS easing curve 적용
    Auth->>UI: onComplete()
    UI->>Ctx: chargeBalance(amount)
    Ctx->>Ctx: balance 즉시 갱신
    Ctx->>DB: POST /api/log (type: charge)
    UI->>UI: STEP 3 완료 화면
    UI->>User: 충전 완료 표시
```

---

## 4. 환불 플로우 — 3중 조건 검증 + 오류 방지

```mermaid
flowchart TD
    Start([환불 페이지 진입]) --> List[충전 내역 리스트 표시]
    List --> Loop{각 충전 건 검증}

    Loop --> Check1{잔액 >= 충전금액?}
    Check1 -->|No| Reject1[비활성 버튼\n사유: 잔액 부족]
    Check1 -->|Yes| Check2{사용 비율 충족?}

    Check2 -->|1만원 이하: 80% 미달| Reject2[비활성 버튼\n사유: 80% 이상 사용 필요]
    Check2 -->|1만원 초과: 60% 미달| Reject3[비활성 버튼\n사유: 60% 이상 사용 필요]
    Check2 -->|통과| Check3{현재 월 거래?}

    Check3 -->|No| Reject4[비활성 버튼\n사유: 환불 불가 과거 거래]
    Check3 -->|Yes| Active[환불 버튼 활성]

    Active --> Sheet[바텀시트 확인\n금액 + 취소 불가 경고]
    Sheet -->|다음에 하기| Cancel([취소])
    Sheet -->|신청하기| Auth[FaceID 인증\nPaymentAuthOverlay]
    Auth --> Process[refundTransaction 실행]
    Process --> Ctx[UserContext 잔액 감소\n이용내역 추가]
    Process --> DB[(NeonDB 기록)]
    Ctx --> Done([환불 완료])

    style Reject1 fill:#FEE2E2,stroke:#EF4444
    style Reject2 fill:#FEE2E2,stroke:#EF4444
    style Reject3 fill:#FEE2E2,stroke:#EF4444
    style Reject4 fill:#FEE2E2,stroke:#EF4444
    style Active fill:#D1FAE5,stroke:#10B981
    style Auth fill:#111827,color:#fff
    style DB fill:#14B8A6,color:#fff
```

---

## 5. 데이터 흐름 — 풀스택 연동 구조

```mermaid
graph LR
    subgraph Client["클라이언트 (React/Vite)"]
        UserAction[사용자 액션]
        Context[UserContext]
        API[lib/api.js]
    end

    subgraph Server["서버 (Express :4000)"]
        Routes[POST /api/log\nGET /api/stats]
        Session[세션 관리\ns_1, s_2...]
    end

    subgraph Storage["저장소"]
        Neon[(NeonDB\nPostgreSQL\nactions 테이블)]
    end

    UserAction -->|충전/환불/QR결제| Context
    Context -->|즉시 반영| UI[UI 갱신]
    Context -->|비동기| API
    API -->|fetch POST| Routes
    Routes -->|INSERT| Neon
    Routes -->|session_id 발급| Session
    Session -->|KST 변환 쿼리| Neon
    Neon -->|발표용 통계| Stats[실시간 통계 표시]

    style Neon fill:#1D4ED8,color:#fff
    style Stats fill:#10B981,color:#fff
    style Context fill:#EFF6FF,stroke:#1D4ED8
```
