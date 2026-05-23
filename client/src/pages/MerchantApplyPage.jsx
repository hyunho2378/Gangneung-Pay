// MerchantApplyPage.jsx
// 가맹점 신청/관리 — 강릉페이 디자인 시스템 준수
// 기존 외부링크(https://with.konacard.co.kr/11-1) → 내부 페이지로 전환
// To-be UX: 단계별 안내 + 혜택 + 문의 CTA

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Phone, MessageCircle } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import ScreenContainer from '../components/layout/ScreenContainer'
import TopAppBarBack from '../components/layout/TopAppBarBack'

// ── 혜택 데이터 ──
const BENEFITS = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill={colors.primary[50]} />
                <path d="M9 14l3 3 7-7" stroke={colors.primary[700]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: '수수료 0원',
        desc: '가맹점 등록비, 월 이용료 없음',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill={colors.primary[50]} />
                <rect x="8" y="10" width="12" height="9" rx="2" stroke={colors.primary[700]} strokeWidth="1.8" />
                <path d="M11 10V8.5a3 3 0 016 0V10" stroke={colors.primary[700]} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        title: '다음날 정산',
        desc: '결제 다음 영업일 자동 정산',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill={colors.primary[50]} />
                <path d="M10 14a4 4 0 108 0 4 4 0 00-8 0z" stroke={colors.primary[700]} strokeWidth="1.8" />
                <path d="M14 10v4l2 2" stroke={colors.primary[700]} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        title: '간편한 정산 조회',
        desc: '앱에서 실시간 매출 확인',
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="14" fill={colors.teal[500] + '20'} />
                <path d="M9 14l2-2 4 4 4-5" stroke={colors.teal[500]} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: '지역 고객 유입',
        desc: '강릉페이 앱 매장 지도에 노출',
    },
]

// ── 신청 단계 ──
const STEPS = [
    { no: '01', title: '신청서 작성', desc: '아래 [가맹점 신청하기] 버튼을 눌러 신청서를 작성해주세요. 사업자등록번호, 대표자명, 연락처, 정산 계좌가 필요합니다.' },
    { no: '02', title: '서류 검토', desc: '제출된 서류를 영업일 기준 2~3일 내 검토합니다. 추가 서류가 필요한 경우 연락드립니다.' },
    { no: '03', title: '단말기 설치', desc: '심사 완료 후 QR 결제 단말기 또는 앱 설치 안내를 드립니다. 설치는 무료입니다.' },
    { no: '04', title: '가맹점 등록 완료', desc: '등록 완료 후 강릉페이 앱 매장 지도에 노출되며, 즉시 결제 수신이 가능합니다.' },
]

// ── FAQ ──
const FAQS = [
    { q: '가맹점 신청 자격이 있나요?', a: '강릉시 내 사업장을 보유한 사업자라면 누구나 신청 가능합니다. 개인사업자, 법인 모두 가능합니다.' },
    { q: '수수료는 얼마인가요?', a: '강릉페이 가맹점 수수료는 0%입니다. 등록비, 월 이용료, 거래 수수료 모두 없습니다.' },
    { q: '정산은 어떻게 되나요?', a: '결제일 다음 영업일에 등록된 계좌로 자동 정산됩니다. 정산 내역은 가맹점 앱에서 확인할 수 있습니다.' },
    { q: 'QR 단말기가 없어도 되나요?', a: '스마트폰에 앱만 설치해도 QR 결제 수신이 가능합니다. 별도 단말기 구매는 선택사항입니다.' },
]

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ borderBottom: `1px solid ${colors.gray[100]}` }}>
            <button
                onClick={() => setOpen(v => !v)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: `${spacing[4]} ${spacing[4]}`, background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: spacing[3],
                }}
            >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2], flex: 1 }}>
                    <span style={{ fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: colors.primary[700], flexShrink: 0, marginTop: '1px' }}>Q</span>
                    <span style={{ fontSize: typography.size.sm, fontWeight: typography.weight.medium, color: colors.gray[900], fontFamily: typography.fontFamily }}>{q}</span>
                </div>
                {open ? <ChevronUp size={16} color={colors.gray[400]} style={{ flexShrink: 0 }} /> : <ChevronDown size={16} color={colors.gray[400]} style={{ flexShrink: 0 }} />}
            </button>
            {open && (
                <div style={{ padding: `0 ${spacing[4]} ${spacing[4]}`, paddingLeft: `calc(${spacing[4]} + ${spacing[2]} + 20px)` }}>
                    <p style={{ margin: 0, fontSize: typography.size.sm, color: colors.gray[600], lineHeight: 1.7, fontFamily: typography.fontFamily }}>{a}</p>
                </div>
            )}
        </div>
    )
}

export default function MerchantApplyPage() {
    const navigate = useNavigate()

    const handleApply = () => {
        window.open('https://with.konacard.co.kr/11-1', '_blank')
    }

    return (
        <ScreenContainer statusBarBg={colors.surface.card}>
            <TopAppBarBack title="가맹점 신청" onBack={() => navigate(-1)} />

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', backgroundColor: colors.surface.background, paddingBottom: `calc(${spacing[10]} + 80px)` }}>

                {/* 히어로 */}
                <div style={{
                    background: `linear-gradient(135deg, ${colors.primary[700]} 0%, ${colors.primary[800]} 100%)`,
                    padding: `${spacing[8]} ${layout.margin} ${spacing[6]}`,
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* 배경 장식 */}
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '140px', height: '140px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
                    <div style={{ position: 'absolute', bottom: '-30px', right: '40px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.04)' }} />

                    <div style={{ position: 'relative' }}>
                        <span style={{
                            display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: layout.radiusPill,
                            padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.size.xxs,
                            fontWeight: typography.weight.semibold, color: colors.onDark.primary,
                            marginBottom: spacing[3], fontFamily: typography.fontFamily,
                        }}>강릉페이 가맹점</span>
                        <h1 style={{
                            margin: `0 0 ${spacing[3]} 0`, fontSize: typography.size.xl,
                            fontWeight: typography.weight.bold, color: colors.onDark.primary,
                            lineHeight: 1.3, fontFamily: typography.fontFamily,
                        }}>
                            강릉페이 가맹점으로<br />더 많은 고객을 만나세요
                        </h1>
                        <p style={{
                            margin: 0, fontSize: typography.size.sm,
                            color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, fontFamily: typography.fontFamily,
                        }}>
                            수수료 0원 · 다음날 정산 · 간편한 QR 결제
                        </p>
                    </div>
                </div>

                {/* 혜택 */}
                <div style={{ padding: `${spacing[5]} ${layout.margin} 0` }}>
                    <p style={{ margin: `0 0 ${spacing[4]} 0`, fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily }}>가맹점 혜택</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3] }}>
                        {BENEFITS.map((b, i) => (
                            <div key={i} style={{
                                backgroundColor: colors.surface.card, borderRadius: layout.radiusCard,
                                padding: spacing[4], boxShadow: shadow.card,
                                display: 'flex', flexDirection: 'column', gap: spacing[2],
                            }}>
                                {b.icon}
                                <p style={{ margin: 0, fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily }}>{b.title}</p>
                                <p style={{ margin: 0, fontSize: typography.size.xxs, color: colors.gray[500], lineHeight: 1.5, fontFamily: typography.fontFamily }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 신청 절차 */}
                <div style={{ padding: `${spacing[5]} ${layout.margin} 0` }}>
                    <p style={{ margin: `0 0 ${spacing[4]} 0`, fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily }}>신청 절차</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[3] }}>
                        {STEPS.map((s, i) => (
                            <div key={i} style={{ display: 'flex', gap: spacing[4], alignItems: 'flex-start' }}>
                                {/* 번호 + 연결선 */}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                    <div style={{
                                        width: '36px', height: '36px', borderRadius: '50%',
                                        backgroundColor: colors.primary[700], display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <span style={{ fontSize: typography.size.xs, fontWeight: typography.weight.bold, color: '#fff', fontFamily: typography.fontFamily }}>{s.no}</span>
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div style={{ width: '2px', height: '24px', backgroundColor: colors.gray[200], marginTop: '4px' }} />
                                    )}
                                </div>
                                {/* 내용 */}
                                <div style={{ flex: 1, paddingTop: spacing[1] }}>
                                    <p style={{ margin: `0 0 ${spacing[1]} 0`, fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily }}>{s.title}</p>
                                    <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.gray[500], lineHeight: 1.6, fontFamily: typography.fontFamily }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ padding: `${spacing[5]} ${layout.margin} 0` }}>
                    <p style={{ margin: `0 0 ${spacing[3]} 0`, fontSize: typography.size.md, fontWeight: typography.weight.bold, color: colors.gray[900], fontFamily: typography.fontFamily }}>자주 묻는 질문</p>
                    <div style={{ backgroundColor: colors.surface.card, borderRadius: layout.radiusCard, overflow: 'hidden', boxShadow: shadow.card }}>
                        {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                    </div>
                </div>

                {/* 문의 */}
                <div style={{ padding: `${spacing[5]} ${layout.margin} 0` }}>
                    <div style={{
                        backgroundColor: colors.primary[50], borderRadius: layout.radiusCard, padding: spacing[4],
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing[3],
                    }}>
                        <div>
                            <p style={{ margin: `0 0 ${spacing[1]} 0`, fontSize: typography.size.sm, fontWeight: typography.weight.bold, color: colors.primary[700], fontFamily: typography.fontFamily }}>가맹점 문의</p>
                            <p style={{ margin: 0, fontSize: typography.size.xs, color: colors.primary[600], fontFamily: typography.fontFamily }}>1811-8682 (평일 09:00~18:00)</p>
                        </div>
                        <div style={{ display: 'flex', gap: spacing[2] }}>
                            <a href="tel:18118682" style={{
                                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: colors.primary[100],
                                display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
                            }}>
                                <Phone size={18} color={colors.primary[700]} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 신청 버튼 */}
            <div style={{
                padding: `${spacing[3]} ${layout.margin}`,
                paddingBottom: `calc(env(safe-area-inset-bottom) + ${spacing[3]})`,
                backgroundColor: colors.surface.card,
                borderTop: `1px solid ${colors.gray[100]}`,
                flexShrink: 0,
            }}>
                <button
                    onClick={handleApply}
                    style={{
                        width: '100%', height: '52px', backgroundColor: colors.primary[700],
                        border: 'none', borderRadius: layout.radiusButton,
                        color: colors.onDark.primary, fontSize: typography.size.md,
                        fontWeight: typography.weight.bold, cursor: 'pointer',
                        fontFamily: typography.fontFamily, boxShadow: shadow.button,
                    }}
                >
                    가맹점 신청하기
                </button>
            </div>
        </ScreenContainer>
    )
}