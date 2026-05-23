import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import ScreenContainer from '../components/layout/ScreenContainer'
import BottomNavBar from '../components/layout/BottomNavBar'
import { colors, typography, layout, spacing, shadow } from '../tokens/tokens'
import { TERMS_TABS, TERMS_CONTENT } from '../data/termsData'

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 뱃지
// ─────────────────────────────────────────────────
function Badge({ label }) {
    const isRequired = label === '필수'
    return (
        <span style={{
            display: 'inline-block',
            fontSize: typography.size.xxs,
            fontWeight: typography.weight.semibold,
            color: isRequired ? colors.primary[700] : colors.gray[500],
            backgroundColor: isRequired ? colors.primary[50] : colors.gray[100],
            borderRadius: layout.radiusPill,
            padding: `2px ${spacing[2]}`,
            marginRight: spacing[2],
            verticalAlign: 'middle',
            fontFamily: typography.fontFamily,
        }}>
            {label}
        </span>
    )
}

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 표
// ─────────────────────────────────────────────────
function TermsTable({ headers, rows, caption }) {
    return (
        <div style={{ margin: `${spacing[4]} 0`, overflowX: 'auto' }}>
            {caption && (
                <div style={{
                    fontSize: typography.size.xs,
                    fontWeight: typography.weight.semibold,
                    color: colors.gray[600],
                    marginBottom: spacing[2],
                    fontFamily: typography.fontFamily,
                }}>
                    {caption}
                </div>
            )}
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: typography.size.xs,
                fontFamily: typography.fontFamily,
            }}>
                {headers && (
                    <thead>
                        <tr>
                            {headers.map((h, i) => (
                                <th key={i} style={{
                                    padding: `${spacing[2]} ${spacing[3]}`,
                                    backgroundColor: colors.gray[50],
                                    border: `1px solid ${colors.gray[200]}`,
                                    textAlign: 'left',
                                    fontWeight: typography.weight.semibold,
                                    color: colors.gray[700],
                                    whiteSpace: 'nowrap',
                                    fontSize: typography.size.xs,
                                }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#fff' : colors.gray[50] }}>
                            {row.map((cell, j) => (
                                <td key={j} style={{
                                    padding: `${spacing[2]} ${spacing[3]}`,
                                    border: `1px solid ${colors.gray[200]}`,
                                    color: colors.gray[800],
                                    fontSize: typography.size.xs,
                                    lineHeight: 1.6,
                                    verticalAlign: 'top',
                                    whiteSpace: j === 0 ? 'nowrap' : 'pre-wrap',
                                }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 조항 본문 렌더러
// ─────────────────────────────────────────────────
function ArticleBody({ body }) {
    const lines = body.split('\n')
    return (
        <div>
            {lines.map((line, i) => {
                if (!line.trim()) return <div key={i} style={{ height: spacing[2] }} />

                // 번호 목록 (1. 2. 3. 등)
                const isNumbered = /^\d+\.\s/.test(line.trim())
                // 가나다 목록 (가. 나. 다. 등)
                const isAlpha = /^[가나다라마바사아자차]\.\s/.test(line.trim())
                // 원문자 ①②③ 등
                const isCircled = /^[①-⑳]/.test(line.trim())
                // 들여쓰기 항목
                const isIndented = line.startsWith('  ')

                const style = {
                    fontSize: typography.size.xs,
                    color: colors.gray[700],
                    lineHeight: 1.8,
                    fontFamily: typography.fontFamily,
                    marginBottom: '2px',
                    paddingLeft: isNumbered || isAlpha ? '1.2em' : isIndented ? '1.5em' : 0,
                    textIndent: isNumbered || isAlpha ? '-1.2em' : 0,
                }

                if (isCircled) {
                    return (
                        <div key={i} style={{
                            ...style,
                            fontWeight: typography.weight.medium,
                            color: colors.gray[800],
                            marginTop: spacing[2],
                        }}>
                            {line.trim()}
                        </div>
                    )
                }

                return (
                    <div key={i} style={style}>
                        {line.trim()}
                    </div>
                )
            })}
        </div>
    )
}

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 조항 (제N조)
// ─────────────────────────────────────────────────
function Article({ no, title, body, tables, extra }) {
    return (
        <div style={{ marginBottom: spacing[6] }}>
            {/* 조항 헤딩 */}
            <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: spacing[2],
                marginBottom: spacing[3],
                paddingBottom: spacing[2],
                borderBottom: `1px solid ${colors.gray[100]}`,
            }}>
                <span style={{
                    fontSize: typography.size.xxs,
                    fontWeight: typography.weight.bold,
                    color: colors.primary[700],
                    backgroundColor: colors.primary[50],
                    borderRadius: layout.radiusPill,
                    padding: `2px ${spacing[2]}`,
                    whiteSpace: 'nowrap',
                    fontFamily: typography.fontFamily,
                }}>
                    제{no}조
                </span>
                <span style={{
                    fontSize: typography.size.sm,
                    fontWeight: typography.weight.semibold,
                    color: colors.gray[900],
                    fontFamily: typography.fontFamily,
                }}>
                    {title}
                </span>
            </div>

            {/* 본문 */}
            {body && <ArticleBody body={body} />}

            {/* 표 */}
            {tables && tables.map((t, i) => (
                <TermsTable key={i} headers={t.headers} rows={t.rows} caption={t.caption} />
            ))}

            {/* 추가 텍스트 */}
            {extra && (
                <div style={{
                    fontSize: typography.size.xs,
                    color: colors.gray[600],
                    lineHeight: 1.7,
                    marginTop: spacing[3],
                    fontFamily: typography.fontFamily,
                    whiteSpace: 'pre-line',
                }}>
                    {extra}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────
// 서브 컴포넌트: 동의서 카드
// ─────────────────────────────────────────────────
function ConsentCard({ item }) {
    return (
        <div style={{
            backgroundColor: colors.surface.card,
            borderRadius: layout.radiusCard,
            border: `1px solid ${colors.gray[100]}`,
            padding: spacing[5],
            marginBottom: spacing[4],
            boxShadow: shadow.card,
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing[2],
                marginBottom: spacing[4],
            }}>
                {item.badge && <Badge label={item.badge} />}
                <span style={{
                    fontSize: typography.size.sm,
                    fontWeight: typography.weight.semibold,
                    color: colors.gray[900],
                    fontFamily: typography.fontFamily,
                    lineHeight: 1.4,
                }}>
                    {item.title}
                </span>
            </div>

            {item.tables && item.tables.map((t, i) => (
                <TermsTable key={i} headers={t.headers} rows={t.rows} caption={t.caption} />
            ))}

            {item.note && (
                <div style={{
                    fontSize: typography.size.xs,
                    color: colors.gray[500],
                    lineHeight: 1.7,
                    marginTop: spacing[3],
                    fontFamily: typography.fontFamily,
                    paddingTop: spacing[3],
                    borderTop: `1px dashed ${colors.gray[200]}`,
                }}>
                    {item.note}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────
// 탭별 컨텐츠 렌더러
// ─────────────────────────────────────────────────
function TabContent({ tabId }) {
    const data = TERMS_CONTENT[tabId]
    if (!data) return null

    // 탭 6: 동의서 모음
    if (tabId === 'consent') {
        return (
            <div>
                {data.items.map((item, i) => (
                    <ConsentCard key={i} item={item} />
                ))}
            </div>
        )
    }

    // 탭 5: 오픈뱅킹 (약관 + 동의서)
    if (tabId === 'openbank') {
        return (
            <div>
                {/* 상단 약관 */}
                <div style={{
                    fontSize: typography.size.xxs,
                    color: colors.gray[400],
                    marginBottom: spacing[5],
                    fontFamily: typography.fontFamily,
                }}>
                    {data.effective}
                </div>
                {data.articles.map((a) => (
                    <Article key={a.no} {...a} />
                ))}

                {/* 구분선 */}
                <div style={{
                    height: '8px',
                    backgroundColor: colors.surface.background,
                    margin: `${spacing[6]} -${layout.margin}`,
                }} />

                {/* 동의서들 */}
                <div style={{ paddingTop: spacing[5] }}>
                    <div style={{
                        fontSize: typography.size.sm,
                        fontWeight: typography.weight.semibold,
                        color: colors.gray[700],
                        marginBottom: spacing[4],
                        fontFamily: typography.fontFamily,
                    }}>
                        관련 동의서
                    </div>
                    {data.consents.map((item, i) => (
                        <ConsentCard key={i} item={item} />
                    ))}
                </div>
            </div>
        )
    }

    // 탭 4: 위치정보 (약관 + 추가 동의서)
    if (tabId === 'location') {
        return (
            <div>
                {data.intro && (
                    <div style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[600],
                        lineHeight: 1.8,
                        marginBottom: spacing[5],
                        padding: spacing[4],
                        backgroundColor: colors.primary[50],
                        borderRadius: layout.radiusCard,
                        fontFamily: typography.fontFamily,
                    }}>
                        {data.intro}
                    </div>
                )}
                <div style={{
                    fontSize: typography.size.xxs,
                    color: colors.gray[400],
                    marginBottom: spacing[5],
                    fontFamily: typography.fontFamily,
                }}>
                    {data.effective}
                </div>
                {data.articles.map((a) => (
                    <Article key={a.no} {...a} />
                ))}

                {/* 위치정보 수집 동의서 */}
                {data.extra && (
                    <>
                        <div style={{
                            height: '8px',
                            backgroundColor: colors.surface.background,
                            margin: `${spacing[6]} -${layout.margin}`,
                        }} />
                        <div style={{ paddingTop: spacing[5] }}>
                            <ConsentCard item={data.extra} />
                        </div>
                    </>
                )}
            </div>
        )
    }

    // 탭 2: 개인정보 처리방침 (목차 + 조항)
    if (tabId === 'privacy') {
        return (
            <div>
                <div style={{
                    fontSize: typography.size.xxs,
                    color: colors.gray[400],
                    marginBottom: spacing[4],
                    fontFamily: typography.fontFamily,
                }}>
                    {data.effective}
                </div>

                {data.intro && (
                    <div style={{
                        fontSize: typography.size.xs,
                        color: colors.gray[600],
                        lineHeight: 1.8,
                        marginBottom: spacing[5],
                        fontFamily: typography.fontFamily,
                    }}>
                        {data.intro}
                    </div>
                )}

                {/* 목차 */}
                {data.toc && (
                    <div style={{
                        backgroundColor: colors.gray[50],
                        borderRadius: layout.radiusCard,
                        padding: spacing[4],
                        marginBottom: spacing[6],
                    }}>
                        <div style={{
                            fontSize: typography.size.xs,
                            fontWeight: typography.weight.semibold,
                            color: colors.gray[700],
                            marginBottom: spacing[3],
                            fontFamily: typography.fontFamily,
                        }}>
                            목차
                        </div>
                        {data.toc.map((item, i) => (
                            <div key={i} style={{
                                fontSize: typography.size.xs,
                                color: colors.gray[600],
                                lineHeight: 1.8,
                                fontFamily: typography.fontFamily,
                            }}>
                                {item}
                            </div>
                        ))}
                    </div>
                )}

                {data.articles.map((a) => (
                    <Article key={a.no} {...a} />
                ))}
            </div>
        )
    }

    // 기본: 서비스 이용약관, 전자금융거래 이용약관
    return (
        <div>
            {data.intro && (
                <div style={{
                    fontSize: typography.size.xs,
                    color: colors.gray[600],
                    lineHeight: 1.8,
                    marginBottom: spacing[5],
                    fontFamily: typography.fontFamily,
                }}>
                    {data.intro}
                </div>
            )}
            <div style={{
                fontSize: typography.size.xxs,
                color: colors.gray[400],
                marginBottom: spacing[5],
                fontFamily: typography.fontFamily,
            }}>
                {data.effective}
            </div>

            {data.articles.map((a) => (
                <Article key={a.no} {...a} />
            ))}

            {data.appendix && (
                <div style={{
                    marginTop: spacing[6],
                    paddingTop: spacing[4],
                    borderTop: `1px solid ${colors.gray[200]}`,
                    fontSize: typography.size.xs,
                    color: colors.gray[500],
                    fontFamily: typography.fontFamily,
                }}>
                    <span style={{ fontWeight: typography.weight.semibold }}>부칙 · </span>
                    {data.appendix}
                </div>
            )}
        </div>
    )
}

// ─────────────────────────────────────────────────
// 메인 컴포넌트: TermsPage
// ─────────────────────────────────────────────────
export default function TermsPage() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('service')
    const tabScrollRef = useRef(null)

    const activeData = TERMS_CONTENT[activeTab]

    return (
        <ScreenContainer statusBarBg={colors.surface.card}>
            {/* 헤더 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                padding: `${spacing[4]} ${layout.margin}`,
                backgroundColor: colors.surface.card,
                borderBottom: `1px solid ${colors.gray[100]}`,
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: spacing[1],
                        display: 'flex',
                        alignItems: 'center',
                        color: colors.gray[700],
                    }}
                >
                    <ChevronLeft size={22} strokeWidth={2} />
                </button>
                <span style={{
                    fontSize: typography.size.md,
                    fontWeight: typography.weight.bold,
                    color: colors.gray[900],
                    fontFamily: typography.fontFamily,
                }}>
                    이용약관
                </span>
            </div>

            {/* 탭 바 */}
            <div
                ref={tabScrollRef}
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    backgroundColor: colors.surface.card,
                    borderBottom: `2px solid ${colors.gray[100]}`,
                    position: 'sticky',
                    top: '56px',
                    zIndex: 9,
                    paddingLeft: layout.margin,
                }}
            >
                {TERMS_TABS.map((tab) => {
                    const isActive = tab.id === activeTab
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: `${spacing[3]} ${spacing[4]}`,
                                fontSize: typography.size.sm,
                                fontWeight: isActive ? typography.weight.bold : typography.weight.regular,
                                color: isActive ? colors.primary[700] : colors.gray[500],
                                whiteSpace: 'nowrap',
                                position: 'relative',
                                fontFamily: typography.fontFamily,
                                flexShrink: 0,
                                transition: 'color 0.15s',
                            }}
                        >
                            {tab.label}
                            {/* 활성 탭 언더라인 */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-2px',
                                    left: spacing[4],
                                    right: spacing[4],
                                    height: '2px',
                                    backgroundColor: colors.primary[700],
                                    borderRadius: '2px 2px 0 0',
                                }} />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* 컨텐츠 영역 */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: `${spacing[5]} ${layout.margin}`,
                paddingBottom: `calc(${layout.bottomNavHeight} + ${spacing[6]})`,
            }}>
                {/* 탭 제목 */}
                {activeData && (
                    <div style={{
                        marginBottom: spacing[5],
                        paddingBottom: spacing[4],
                        borderBottom: `1px solid ${colors.gray[100]}`,
                    }}>
                        <h2 style={{
                            fontSize: typography.size.lg,
                            fontWeight: typography.weight.bold,
                            color: colors.gray[900],
                            margin: 0,
                            fontFamily: typography.fontFamily,
                            lineHeight: 1.3,
                        }}>
                            {activeData.title}
                        </h2>
                    </div>
                )}

                <TabContent tabId={activeTab} />
            </div>

            <BottomNavBar />
        </ScreenContainer>
    )
}