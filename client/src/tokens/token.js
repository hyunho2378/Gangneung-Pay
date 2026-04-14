// tokens.js — 강릉페이 AS-IS 디자인 토큰
// 스크린샷 79장 분석 기반 추출값
// 모든 컴포넌트는 이 파일에서만 값을 가져온다

export const colors = {
    // 브랜드 블루
    primary: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        500: '#3B82F6',
        600: '#2563EB',
        700: '#1D4ED8',  // 버튼, 링크, 활성 탭, 텍스트 강조
        800: '#1E3A8A',  // 잔액 카드 다크 네이비 배경
        900: '#1E2D6B',
    },

    // 캐시백 틸
    teal: {
        400: '#2DD4BF',
        500: '#14B8A6',  // 캐시백 진행바, "받은 금액" 텍스트
    },

    // 상태
    error: '#EF4444',  // 교통카드 주의문구 빨간글씨
    warning: '#F59E0B',
    success: '#10B981',

    // 그레이
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',  // 구분선, 비활성 입력창
        300: '#D1D5DB',
        400: '#9CA3AF',  // 비활성 탭 아이콘, placeholder
        500: '#6B7280',  // 보조 텍스트 (날짜, 거리 등)
        700: '#374151',
        800: '#1F2937',
        900: '#111827',  // 주요 본문 텍스트
    },

    // 서피스
    surface: {
        background: '#F2F4F8',        // 앱 전체 배경 (연한 블루그레이)
        card: '#FFFFFF',        // 카드, 모달 배경
        darkCard: '#1B4FD8',        // 홈 잔액 카드 배경
        overlay: 'rgba(0,0,0,0.5)',// 모달 딤 처리
    },

    // 특수 배너 배경
    kakaoBg: '#FEF3C7',  // 카카오페이 배너 (연노랑)
    donationBg: '#FFF0F3',  // 기부 배너 (연핑크)
    tourBg: '#FFF3E0',  // 관광 배너 (연주황)
    chatBg: '#EFF6FF',  // 챗봇 푸루 메시지 배경

    // 다크 카드 위 텍스트
    onDark: {
        primary: '#FFFFFF',
        secondary: 'rgba(255,255,255,0.7)',
    },
};

export const typography = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Pretendard', 'Noto Sans KR', sans-serif",

    size: {
        // 특수 용도
        balance: '28px',  // 홈 잔액 숫자
        balanceLarge: '36px',  // 큰글씨 모드 잔액
        appTitle: '24px',  // 상단 "강릉페이" 로고

        // 일반 스케일
        xl: '20px',
        lg: '18px',
        md: '17px',  // 기본 본문
        sm: '15px',
        xs: '13px',
        xxs: '12px',
        nav: '11px',  // 바텀탭 레이블
    },

    weight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 800,
    },

    lineHeight: {
        tight: 1.2,
        normal: 1.4,
        loose: 1.6,
    },
};

export const spacing = {
    // 8pt 그리드 (4px 배수)
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',  // 기본 좌우 마진
    5: '20px',
    6: '24px',  // 섹션 간 간격
    8: '32px',
    10: '40px',
    12: '48px',
};

export const layout = {
    // 그리드
    columns: 4,
    gutter: '8px',
    margin: '16px',
    viewport: '390px',  // iPhone 14 기준

    // 고정 높이
    topBarHeight: '44px',
    bottomNavHeight: '83px',  // 49px + safe area 34px
    qrBarHeight: '56px',  // 플로팅 QR바

    // 최소 터치 타깃
    touchMin: '44px',

    // 모서리 둥글기
    radiusCard: '16px',
    radiusPill: '999px',
    radiusChip: '20px',
    radiusButton: '12px',
    radiusModal: '20px',
    radiusSmall: '8px',
};

export const shadow = {
    card: '0 2px 8px rgba(0,0,0,0.08)',
    modal: '0 -4px 20px rgba(0,0,0,0.12)',
    button: '0 2px 6px rgba(29,78,216,0.25)',
    nav: '0 -1px 0 rgba(0,0,0,0.08)',
};