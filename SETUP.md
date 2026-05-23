# SETUP.md — 강릉페이 프로젝트 웹사이트 구축 지시서
> **Claude Code (안티그래비티) 세션 시작 시 이 파일을 먼저 읽어라.**
> 목표: 플러스엑스급 웹 네이티브 케이스 스터디 사이트. 한림대 전시회/공모전 수상.

---

## 0. 세션 시작 규칙

### 매 세션 필독 파일 (딱 4개, 이 순서로)
```
1. CLAUDE.md          ← 행동 규칙 (항상)
2. SETUP.md           ← 이 파일. IA·콘텐츠·데이터·빌드순서 전부
3. DESIGN_WEB.md      ← 웹 디자인 시스템·토큰·연출 원칙
4. website/PROGRESS.md ← 현재 진행상황 (재개 시. 없으면 STEP 1부터)
```
> client/src/components/usage-guide/ 는 미니렌더 작업 섹션(16·16B)에서만 view.
> 앱 파일(DESIGN.md·IA.md·ROUTES.md·COMPONENTS.md·PATTERNS.md·AGENTS.md)은 읽지 않는다.
> 웹사이트는 별도 프로젝트다.

### 핵심 철학 (절대 위반 금지)
- **이건 웹사이트다.** 스크롤로 전개되는 단일 페이지. 정적 포폴(1920×1080 캔버스)에 갇히지 말 것.
- **타이포그래피가 디자인이다.** 박스·카드·그리드가 구조를 만드는 게 아니라, 글자의 크기 대비·여백·위계가 구조를 만든다.
- **마진**: `clamp(80px,10vw,160px)` — 플러스엑스식 넓은 여백. 폰 잘림 없음. 여유롭게.
- **올 라이트** #F5F5F5 / #FFFFFF. 다크 0. (OUTRO 블루 풀블리드 1장 예외)
- **워터마크 배경 타이포:** 없음.
- **모션:** parallax + 카운터업. 자연스러운 등장.
- **폰 테두리:** 5px. Android 하단바 없음.
- 색/간격/폰트 하드코딩 금지 → tokens/web.js. JSX only. localStorage 금지. 이모지 금지.

### 이게 보이면 즉시 멈추고 다시 설계 (학생 프로젝트 신호)
```
❌ 아이콘 + 제목 + 설명 카드 그리드   ← SaaS 랜딩 클리셰
❌ 좌텍스트/우폰 레이아웃 반복        ← Framer 템플릿
❌ "핵심 기능" 6칸 카드 그리드        ← 스타트업 홈페이지
❌ 다크 배경 + 흰 카드들             ← 어디서나 보이는 패턴
❌ 숫자·데이터가 문장 안에 묻힘        ← 숫자가 죽는다
❌ 모든 섹션이 같은 레이아웃 구조     ← 지루함
❌ 그라디언트 배경                   ← 아마추어
❌ 인사이트 = 아이콘+카드 3개         ← 틀이 내용보다 앞섬
```

### 시니어급 기준 (구체적으로)
```
62.5%  →  문장 안에 묻히면 죽음. 뷰포트 절반 크기 타이포로 꺼내라.
인사이트 3개  →  카드 3장 ❌. 각각 독립 섹션. 한 화면 = 한 메시지.
전략 S1~S7  →  설명 나열 ❌. 큰 번호 + 한 줄 핵심 + 증거(미니렌더).
섹션마다  →  다른 레이아웃 논리. 반복은 지루함이다.
데이터  →  시각화하거나 주인공으로. 보조 텍스트로 쓰지 않는다.
```

### 작업 패턴 (CLAUDE.md 원칙 적용)
```
1. 진단   해당 섹션 사양 읽기. 모호하면 질문. 추측 금지.
2. 사양   변경 파일·범위 명시. 사용자 확인 후 진행.
3. 구현   명시된 파일만. 인접 코드 손대지 않음.
4. 검증   빌드 0오류 + 자기검증 보고
```

### 자기검증 보고 (작업 완료 시 반드시)
```
✅ 빌드: 0오류
✅ localStorage: 0건
✅ 하드코딩 색상: 0건
✅ TypeScript: 0건
✅ 이모지: 0건
✅ 명시 외 파일 수정: 없음
수정 파일: [목록]
```

---

## 1. 폴더 구조

```
gangneung-pay/
├── client/                      ← 앱 원본 (읽기만, 절대 수정 금지)
│   └── src/components/usage-guide/  ← 미니렌더 출처
├── server/                      ← 불변
├── website/                     ← NEW 포트폴리오 사이트
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── tailwind.config.js
│   ├── PROGRESS.md              ← 세션별 자동 기록
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── tokens/web.js        ← 디자인 토큰 단일 출처
│       ├── lib/
│       │   ├── useReveal.js     ← IntersectionObserver 훅
│       │   ├── useParallax.js   ← 스크롤 parallax 훅
│       │   └── useCountUp.js    ← 카운터업 훅
│       ├── components/          ← Nav, PhoneFrame, SectionLabel 등 공통
│       ├── mini/                ← client/usage-guide에서 복사한 미니렌더
│       │   ├── PhoneFrame.jsx
│       │   ├── ChargeMini.jsx
│       │   ├── RefundMini.jsx
│       │   ├── CardApplyMini.jsx
│       │   └── HomeCoachMini.jsx
│       ├── sections/            ← 섹션별 1파일 (Hero.jsx, Research.jsx ...)
│       └── assets/
│           ├── asis/            ← 사용자 첨부 현행 스크린샷 (AS-IS)
│           └── photo/           ← 강릉 로컬 사진 (CONCEPT·SERVICE용)
├── CLAUDE.md
├── SETUP.md
└── DESIGN_WEB.md
```
- **Vercel:** 새 프로젝트 → root directory `website/`. 레포 1개로 앱2+웹1.
- **React Router 불필요.** 단일 페이지 세로 스크롤. 섹션은 각 컴포넌트로 분리.

---

## 2. 디자인 토큰 (website/src/tokens/web.js)

```js
export const color = {
  bg:           '#F5F5F5',
  white:        '#FFFFFF',
  brand:        '#1D4ED8',
  brandStrong:  '#1B4FD8',
  brandPale:    '#EEF2FF',
  brandSky:     '#F1F7FF',   // 팀 메인 팔레트 #1
  brandAlt:     '#4B82DF',   // 팀 메인 팔레트 #2
  ink:          '#111111',
  inkMuted:     '#5F6168',
  inkFaint:     '#9AA0A6',
  line:         '#E6E8EC',
  warn:         '#E5484D',
  ok:           '#10B981',
};

export const font = {
  family: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', system-ui, sans-serif",
};

export const type = {
  // font-size / line-height / font-weight / letter-spacing
  display: { size: 'clamp(44px,6.5vw,96px)', lh: 1.22, weight: 800, ls: '-0.04em' },
  h1:      { size: 'clamp(32px,4.5vw,64px)', lh: 1.22, weight: 800, ls: '-0.03em' },
  h2:      { size: 'clamp(26px,3.2vw,48px)', lh: 1.25, weight: 700, ls: '-0.02em' },
  h3:      { size: 'clamp(20px,1.9vw,28px)', lh: 1.35, weight: 700, ls: '-0.01em' },
  lead:    { size: 'clamp(16px,1.4vw,20px)', lh: 1.75, weight: 400 },
  body:    { size: '16px',                   lh: 1.78, weight: 400 },
  caption: { size: '13px',                   lh: 1.55, weight: 500 },

  // ★ eyebrow (섹션 라벨) — 선(::before) 없음. 800 볼드. 텍스트만 당당하게.
  eyebrow: { size: '12px', weight: 800, ls: '0.16em', transform: 'uppercase' },
};

/*
★ 행간 원칙: 헤드라인은 무조건 1.22 이상. 빡빡한 행간(1.0~1.1) = 금지.
★ eyebrow: font-weight 800, letter-spacing 0.16em, uppercase, color brand.
           앞에 선(ㅡ, ::before) 절대 없음. UX 포폴처럼 텍스트만.
*/

export const layout = {
  container: '1440px',
  gut:       'clamp(80px, 10vw, 160px)',  // 플러스엑스식 넓은 여백 (핵심)
  sectionY:  'clamp(100px, 14vh, 200px)',
  rLg: '24px', rMd: '16px', rSm: '8px',
};
```

---

## 3. 프로젝트 메타

```
프로젝트   강릉페이 UX/UI 개선 프로젝트
서비스     강릉페이 — 강릉시 지역화폐 모바일 앱 (충전식 선불카드)
운영주체   강릉시 (지역경제 활성화)
발표일     2026.05.31
조사기간   2026.03.29 ~ 04.06
툴         Figma · React 18+Vite · Tailwind · Claude Code (바이브코딩)
iOS        https://gangneung-pay.vercel.app
Android    https://gangneung-pay-android.vercel.app
규모       30개 페이지 · 70+ 컴포넌트 · 13,021개 실가맹점 · 8개 사양문서
```

### 팀 마카모예 (CREDITS용)
```
김민경   팀장   광고홍보학과       20222606
주현호          디지털인문예술전공  20222583  ← UX/UI · FE
윤현아          디지털인문예술전공  20237121
김성경          영어영문학과        20241203
조영은          미디어커뮤니케이션  20242577
김호진          디지털인문예술전공  20256610
```

### 핵심 무기 3가지 (사이트가 증명할 것)
```
① UX 논리      리서치(설문68·IDI6·관찰4) → 5클러스터 → 3대 인사이트 → 컨셉 → 7대 전략 → UR
② 기능 구현    전략 S1~S7 실제 작동 · 13,021개 실데이터 · 30페이지
③ AI 하네스    병렬 에이전트(BN/MY/FX/VR) · 8개 사양문서 · 자기검증
               = 디지털인문예술 "기술(How) × 인문(Why) 결합"
```

---

## 4. TO-BE 목업 규칙 (중요)

**모든 TO-BE 화면 = client/src/components/usage-guide/ 미니렌더 재활용.**
별도 스크린샷/이미지 없음. 실제 앱 컴포넌트를 website/src/mini/로 복사해 사용.

```
미니렌더 컴포넌트 (Context·Navigate 의존 0 설계 — 독립 렌더 가능)
PhoneFrame     scale 분기 + 노치 제거 → 포폴용 프레임
HomeCoachMini  variant: cardApply / charge / refund
ChargeMini     충전 3단계 압축 화면
RefundMini     환불 동등위계 화면
CardApplyMini  카드신청 화면
CardManageMini 카드관리 화면
```

### 미니렌더 복사 절차
```
1. client/src/components/usage-guide/ 폴더 view
2. 필요한 컴포넌트 확인 후 website/src/mini/로 복사
3. import 경로만 수정 (tokens → ../../tokens/web.js)
4. tokens 참조값이 다르면 매핑 (앱 토큰 ↔ 웹 토큰 색상 동일)
```

**AS-IS = 사용자가 직접 첨부하는 현행 강릉페이 스크린샷.**
준비물: 메인·충전·환불경로·가맹점지도·큰글씨모드 화면 스크린샷.

---

## 5. 섹션 IA + 콘텐츠 데이터

### 전체 순서 (세로 스크롤 1페이지, 25섹션)
```
[UX 코어]
00  NAV
    sticky. 앵커 링크 + iOS/Android CTA 2개

01  HERO
    좌텍스트 / 우폰2대(겹침·기울기) / 하단 PROJECT DETAIL 메타블록
    카피: "내 돈이 / 내 편인 앱"

02  PROJECT OVERVIEW
    영문 대헤드라인 + 국문 한 줄 + 팀 마카모예 소개

03  SERVICE ANALYSIS
    "강릉페이, 써보셨나요?" + 강릉 로컬 사진 3장 풀블리드 분할

04  THE TWIST
    텍스트 중앙 정렬. 한 문장이 주인공.
    "리서치 도중, 강릉페이 앱이 전면 리뉴얼됐습니다."

05  DESK RESEARCH
    시장 데이터 + 경쟁비교표(강릉페이/삼성페이/토스)
    카카오(3/23)→네이버(4/13)→삼성(7~8월) 타임라인

06  USER RESEARCH
    리서치 방법론 3종
    숫자 카운터업: 68(설문) · 6(IDI) · 4(서비스사파리)
    → 아래 각 방법 설명

07  SERVICE SAFARI
    관찰 5미션 결과
    미션별 성공/실패 + 핵심 발화 인용 (큰 따옴표)
    환불찾기 4인 전원 실패 · 강릉머니 4인 전원 미인지

08  AFFINITY DIAGRAM
    5클러스터 시각화
    A 잔액불안·계산대수치심
    B 환불/충전 자금통제불능
    C 용어·IA 위계붕괴
    D B2C/B2B 인터페이스충돌
    E 캐시백 단일생존의존

09  KEY INSIGHTS
    ★각 인사이트 = 독립 섹션. 번호 초대형(clamp 120px+)
    INSIGHT 01: "결제 앱이 아니라 잔액 확인 앱으로 축소"
    INSIGHT 02: "시니어에게 앱 실행 자체가 결제 장벽"
    INSIGHT 03: "충전은 복잡하고 환불은 더 어렵다"

10  AS-IS AUDIT
    왼쪽: 현행 앱 스크린샷(흑백·사용자 첨부)
    오른쪽: POINT 1·2·3 진단 텍스트 (휴리스틱 위반)

11  PERSONA
    Primary:   시니어 5060 헤비유저 (상세 카드 — 특성/동기/페인포인트)
    Secondary: 2030 청년 이탈자/잠재 (상세 카드)
    Reference: 소상공인 / 여행객 (작게)

12  USER JOURNEY MAP
    5단계 가로 플로우
    진입 → 상태파악 → 충전 → 결제 → 확인
    각 단계 아래: 마찰포인트 + 감정곡선

13  DESIGN DIRECTION
    UX 방향성 2축
    ① 투명한 정보 노출
    ② 막힘없는 직진형 프로세스

14  UX CONCEPT
    ★풀블리드 사진 + 텍스트 오버레이
    "내 돈이 내 편인 앱"
    "묻지 않아도 보이는, 헤매지 않는 금융 경험"

15  UX STRATEGY
    S1~S7 세로 아코디언형
    번호(대형) + 전략명 + 한 줄 핵심
    열리면: 미니렌더 + 근거 발화

16  USER REQUIREMENTS
    UR 코드 표 (Usability·Functional·Non-functional / P0·P1)
    MoSCoW 우선순위

[기능·기술 — 전부 뒤에 크게크게]
17  DESIGN SYSTEM
    타이포 스케일 + 컬러 토큰 시각화

18  KEY SCREENS
    핵심 5기능 AS-IS(흑백 작게) ↔ TO-BE 미니렌더(컬러 크게)

19  THE BUILD
    S1~S7 기능 쇼케이스
    13,021개 DataViz 카운터업 (★S6 별도 크게)

20  DUAL DESIGN SYSTEM
    iOS HIG × Android MD3 가로 컴포넌트 비교표

21  AI HARNESS
    병렬 에이전트 다이어그램 + 8문서 + 자기검증 수치

22  PROCESS
    Phase 1→2→3 타임라인 · 휴리스틱 위반 6건 개선

[마무리]
23  USER TEST       자리만 (추후 평가 후 채움)
24  PROTOTYPE       iOS / Android CTA 크게
25  CREDITS·OUTRO   브랜드 블루 풀블리드 · 마카모예 6인
```

### 발표 축약 모드 (UX만)
```
04→05→06→07→08→09→13→14→15→16 on
17~22 off (플래그로 toggle)
```

### 발표 축약 모드
```
04·05·07·08·11·12·13·14 → UX 코어만
16B·17·18·19 → off (플래그로 toggle)
각 섹션 컴포넌트 독립으로 만들어야 함
```

---

## 6. 섹션별 실제 콘텐츠 (검증된 실데이터. 추측·창작 금지)

### 03 SERVICE
- 충전식 선불카드. 강릉시 가맹점 한정.
- 캐시백 10% (월 30만 한도, 최대 3만). 소득공제 30% (전통시장 40%).
- 3카드: ① 10% 캐시백 ② 지역 한정 ③ 충전식 구조

### 04 THE TWIST (스토리텔링 핵심)
> "Raw 데이터를 수집하던 시점, 강릉페이 앱이 전면 리뉴얼되었습니다.
> 저희는 이 변수를 오히려 본질 인사이트를 찾는 방법으로 활용했습니다.
> 디자인으로 해결된 이슈는 덜어내고, 끝까지 살아남은 진짜 문제만 선별했습니다."

### 05 RESEARCH
```
설문 (정량)      68명 · 19~26세 85.3% · 강릉거주 25%
IDI 심층인터뷰   6명 (4050 헤비유저2 / 2030 이탈자2 / 소상공인2)
서비스사파리     4명 (강릉 20대女2 · 50대男1 · 50대女1)
미션5개          ①환불찾기 ②공지+가맹점 ③토스vs강릉 ④강릉머니 ⑤자유탐색
핵심수치         환불찾기 4인 전원 실패 · 강릉머니 4인 전원 미인지 · 계산대 당황 62.5%
```

### 06 MARKET
| 항목 | 강릉페이 | 삼성페이 | 토스/카카오 |
|---|---|---|---|
| 결제 | 실물카드(+바코드) | MST/NFC 탭 | 앱 바코드 |
| 캐시백 | **10%(강력)** | 카드사별 | 일부 |
| 범위 | 강릉시 한정 | 전국 | 전국 |
| UI | 공공앱 수준 | 네이티브 최적화 | 핀테크 최고 |

타임라인: 카카오페이(3/23 도입) → 네이버페이(4/13) → 비대면/삼성페이(7~8월 예정)

### 07 AFFINITY (5클러스터)
```
A 잔액 불안과 계산대 수치심     ← 발화 가장 많이 집중
B 환불/충전 자금 통제 불능
C 용어·IA 정보 위계 붕괴
D B2C/B2B 인터페이스 충돌
E 캐시백 단일 생존 의존 구조
```

### 08 INSIGHTS (★대형 강조)
```
INSIGHT 1  결제 앱이 아니라 '잔액 확인 앱'으로 축소
  사용자는 결제하러가 아니라 캐시백·잔액 확인하러 앱을 켠다.
  실제 결제는 실물카드. 혜택 감소 시 전 그룹 즉시 이탈 신호.
  → 혜택에만 의존하는 위태로운 구조

INSIGHT 2  시니어에게 앱 실행 자체가 결제 장벽
  4060 주사용층은 실물카드 선호. 결제 전 잔액 확인이 앱 실행을 강제.
  계산대 앞 당황·민망 심리부담 큼. (62.5% 경험)
  → 진입 전에도 잔액 즉시 보이는 환경(위젯) 필요

INSIGHT 3  충전은 복잡하고 환불은 더 어렵다
  선불 충전 = 4단계 인지 부하.
  관찰 4인 전원 환불 메뉴 탐색 실패.
  큰글씨모드에서만 환불 노출 = 다크 패턴.
  → "돈 넣기는 까다롭고 빼기는 더 어렵다" = 서비스 불신
```

### 10 PERSONA
```
[Primary] 시니어 5060 헤비유저
  경제적 혜택 민감. 실물카드 익숙, 스마트폰 결제 과도기.
  10% 캐시백 핵심 동기. 글자 작음·충전 복잡·계산대 잔액 당황 페인.

[Secondary] 2030 청년 이탈자/잠재
  편의성 최우선. 삼성페이 의존. UI 심미성 민감.
  "혜택 때문에 억지로 쓰는 낡은 앱". 삼성페이 미지원이 핵심 이탈 트리거.
```

### 12 CONCEPT
```
컨셉          "내 돈이 내 편인 앱"
스테이트먼트   "묻지 않아도 보이는, 헤매지 않는 금융 경험"
출발           '내 돈인데 내가 통제하지 못한다'는 금융 불안 → 확신으로
2축            ① 투명한 정보 노출   ② 막힘없는 직진형 프로세스
```

### 13 STRATEGY (7대, S번호 = 구현 1:1 매핑)
```
S1 위젯 잔액 노출     홈 최상단 잔액 카드 + PWA 위젯 안내. "지금 얼마있지?" 안 묻게.
S2 환불 동등 위계     잔액 카드 3슬롯 [충전/환불/QR결제] 동일 크기. 환불=권리.
S3 캐시백 체감        getCashbackIntuition() 5단계. "1,345원" → "커피 한 잔 값 아꼈어요"
S4 충전 3단계 압축    6단계→3단계(금액→확인→완료). 빠른금액 칩(+1만/+5만/+10만).
S5 잔액 부족 사전차단  입력 시점 한도 검증. isOverLimit→버튼 disabled+빨간 안내.
S6 가맹점 실시간 신뢰  ★13,021개 konacard 실데이터 + Google Maps 클러스터링.
                      12카테고리 필터+검색. 마지막 업데이트 날짜. 216개 QR매장.
S7 코치마크 단계 안내  카드등록 직후 충전→환불 자동 진행. ScreenContainer 기준 절대좌표.
```
각 전략 끝에 미니프리뷰 1컷 (작은 폰 + 한 줄). 깊이는 16B에서.

### 14 REQUIREMENTS (UR 코드)
```
UR-U01 P0  앱 미실행 → 위젯/잠금화면 잔액 즉시 확인
UR-U02 P0  충전 화면 진입 즉시 현재 잔액 상단 표시
UR-U03 P0  메인에서 2탭 이내 환불 접근
UR-U04 P1  충전 완료 3탭 이내 (단축버튼)
UR-U05 P1  잔액 부족 예상 시 사전 알림
UR-U06 P1  가맹점 지도 영업시간·사진·결제가능 단일 화면
UR-F01 P0  충전잔액(내 돈) vs 캐시백(보상) 색상·레이블 명확 구분
UR-F02 P0  B2C 화면에 B2B 기능 미노출
UR-F03 P1  월별 캐시백 이력·잔여한도 조회
UR-F04 P1  가맹점주 앱 내 직접 정보 수정
UR-F05 P1  카카오/네이버 연동 10% 캐시백 동일 적용 안내
UR-N01 P0  메인 화면 3초 이내 표시
UR-N02 P0  사용자 언어 기준 메뉴명 ('강릉머니'·'가맹점 포탈' 제거)
UR-N03 P1  섹션 이동 시에도 색상·폰트 일관
```

### 16B THE BUILD (S1~S7 기능 쇼케이스)
```
각 기능 = [문제 AS-IS] → [해결 TO-BE] → [실제 구현 컴포넌트/함수] 3단.
미니렌더로 실제 화면 보여줌.

S1  WidgetAddBanner. HomeCoachMini variant=cardApply 재활용 가능.
S2  BalanceCardExpanded — 3슬롯 [충전/환불/QR]. 글래스 디자인.
S3  getCashbackIntuition() 5단계 (Bus/Coffee/Utensils/ShoppingBag/Smartphone + lucide 아이콘)
S4  ChargeScreen 3스텝. StepIndicator 상단 고정. 빠른금액칩.
S5  isOverLimit 검증. 한도초과 disabled + 빨간 인라인 안내.
S6  13,021개 카운터업 ★. Google Maps 클러스터 시각화. 12카테고리 필터.
S7  CoachMarkOverlay — ScreenContainer getBoundingClientRect. Step1→2 자동.
```
S6는 별도로 크게: "13,021개" 카운터업 + 클러스터 캡처 이미지 = 신뢰성 증거.

### 17 DUAL SYSTEM
```
컴포넌트별 iOS(HIG) ↔ Android(MD3) 나란히:
StatusBar: 41px iOS SVG / 42px 삼성 One UI SVG
헤더: 제목 중앙 / 제목 좌측
버튼: 12px radius 52px 그림자 / full pill 48px 그림자없음 (4종 위계)
폰트: Pretendard / Noto Sans KR
생체인증: Face ID 중앙 로티 / 지문 하단 + 텍스트
바텀시트: radius 20 / radius 28 scrim
스낵바: 없음 / Android 슬라이드업 2.8초

포지셔닝: "지역화폐 앱은 SI 외주라 디자인시스템 부재.
           iOS HIG + Android MD3 양 플랫폼 네이티브 동시 구현."
코드 스니펫: getPlatform() — URL ?platform=android / VITE_PLATFORM
```

### 18 AI HARNESS
```
[문서 기반 컨텍스트 주입]
  8개 사양문서: CLAUDE.md / AGENTS.md / DESIGN.md / IA.md /
               Components.md(70+) / Patterns.md / Routes.md(30) / PROGRESS.md
  AI가 '추측' 아닌 '사양 참조'로 작업 → 할루시네이션·컨텍스트 단절 방지

[병렬 에이전트 패턴] Phase 3-B
  Agent BN (검색) · Agent MY (MY·카드) · Agent FX (버그·지도·내역)
  → Agent VR (검증, 44항목 체크리스트) 마지막 통합
  "1일치 작업을 반나절에"

[모델 선택 기준]
  단순매핑·교체 → Sonnet
  아키텍처·디버깅·검증 → Opus

[자기검증 의무]
  빌드0·localStorage0·하드코딩색상0·TS0·이모지0·명시외수정0

[4단계 프롬프트 워크플로우]
  진단(view, 수정X) → 사양(파일/라인/before·after) → 수정(범위만) → 검증

[기술 사례]
  Face ID Lottie 무한루프: State Machine 19단계 → Python unzip → 우회 (30분)
  13,000개 마커: markerclusterer 클러스터링
  디자인시스템 199건 spacing: grep + AI 자동매핑

[데이터 수집]
  konacard API: 455페이지 콘솔 크롤링 → 13,643개 → 좌표필터 → 13,021개
  QR 216개: NotebookLM 이미지 텍스트 추출

마무리 메시지:
"AI는 How를 잘한다. 사람은 Why를 결정한다.
 핵심 결정(시니어 우선·환불 동등위계·캐시백 직관메시지·13,000개 전부 등록)은
 사람이 했다. AI는 그 의도를 정확히 구현하는 파트너였다."
```

---

## 7. 빌드 순서

```
[UX 코어]
STEP 1   부트스트랩 + tokens/web.js + 훅3종 + Nav + Hero
         → 사용자 확인 후 진행

STEP 2   02 PROJECT OVERVIEW + 03 SERVICE ANALYSIS + 04 THE TWIST

STEP 3   05 DESK RESEARCH + 06 USER RESEARCH

STEP 4   07 SERVICE SAFARI + 08 AFFINITY DIAGRAM

STEP 5   09 KEY INSIGHTS          ← 혼자. 타이포 주인공. 신중하게.

STEP 6   10 AS-IS AUDIT + 11 PERSONA + 12 USER JOURNEY MAP

STEP 7   13 DESIGN DIRECTION + 14 UX CONCEPT

STEP 8   15 UX STRATEGY           ← 혼자. 아코디언+미니렌더. 신중하게.

STEP 9   16 USER REQUIREMENTS

[기능·기술]
STEP 10  17 DESIGN SYSTEM + 18 KEY SCREENS (미니렌더 복사)

STEP 11  19 THE BUILD (S1~S7 + 13,021 DataViz)

STEP 12  20 DUAL DESIGN SYSTEM + 21 AI HARNESS + 22 PROCESS

[마무리]
STEP 13  23 USER TEST(자리) + 24 PROTOTYPE + 25 CREDITS·OUTRO

STEP 14  반응형 320~2560 전수 + WCAG AA + 빌드0 + Vercel 배포
```
- 발표 축약: STEP 10~12 플래그 off.
- 각 STEP 완료 후 PROGRESS.md 기록. 사용자 확인 후 다음.

---

## 8. 불변 규칙 요약

```
웹 네이티브    풀블리드·레이어·뷰포트 호흡. 정적 규격 금지.
여백           gut: clamp(80px,10vw,160px). 폰 잘림 없음. 넓고 여유롭게.
배경           올 라이트. 워터마크 없음. OUTRO만 블루 풀블리드.
폰 목업        테두리 5px. Android 하단바 없음.
TO-BE          전부 미니렌더 (client/usage-guide 복사).
AS-IS          사용자 첨부 스크린샷만.
데이터         검증된 실값만. 추측·창작 금지. 모르면 질문.
토큰           tokens/web.js 단일 출처. JSX only. localStorage 금지. lucide.
코드           client/·server/ 절대 수정 금지. 읽기만.
작업           단계별 확인. 섹션 1개씩. 한 번에 다 만들지 않음.
페르소나       시니어5060(Primary) · 2030(Secondary).
```