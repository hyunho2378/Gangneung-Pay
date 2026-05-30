import { useState } from 'react';
import { color, font, type as t, layout } from '../tokens/web.js';
import { useReveal } from '../lib/useReveal.js';
import { useBreakpoint } from '../lib/useBreakpoint.js';
import figmaIcon from '../assets/figma.svg';
import claudeCodeIcon from '../assets/claudecode.svg';
import antigravityIcon from '../assets/antigravity.svg';
import viteIcon from '../assets/vite.svg';
import reactIcon from '../assets/react.svg';
import tailwindIcon from '../assets/tailwind.svg';
import vercelIcon from '../assets/versel.svg';

const DOCS = [
  {
    name: 'CLAUDE.md', desc: '행동지침, 금지규칙',
    preview: `# CLAUDE.md\nBehavioral guidelines to reduce common LLM coding mistakes.\n\n## 1. Think Before Coding\n- State your assumptions explicitly. If uncertain, ask.\n- If multiple interpretations exist, present them. Don't pick silently.\n- If a simpler approach exists, say so. Push back when warranted.\n- If something is unclear, stop. Name what's confusing. Ask.\n\n## 2. Simplicity First\n- Minimum code that solves the problem. Nothing speculative.\n- No features beyond what was asked.\n- No abstractions for single-use code.\n- No error handling for impossible scenarios.\n- If you write 200 lines and it could be 50, rewrite it.\n\n## 3. Surgical Changes\n- Touch only what you must. Clean up only your own mess.\n- Don't "improve" adjacent code, comments, or formatting.\n- Don't refactor things that aren't broken.\n\n## 4. Goal-Driven Execution\n- Define success criteria. Loop until verified.\n- Every changed line should trace directly to the user's request.`,
  },
  {
    name: 'AGENTS.md', desc: '에이전트 역할, 경계',
    preview: `# AGENTS.md :  에이전트 실행 구조\n\n## 실행 원칙\n에이전트는 명세를 벗어나는 결정을 스스로 내리지 않는다.\n명세에 없는 상황은 반드시 사용자에게 물어보고 대기한다.\n\nPHASE 0  초기 세팅     (1개 에이전트 단독)\nPHASE 1  병렬 구현     (3개 에이전트 동시 실행)\nPHASE 2  검증 및 연동  (1개 에이전트, PHASE 1 완료 후)\n\n커밋 규칙:\n[A0] chore: 초기 세팅\n[A1] feat: 기반 데이터 + 라우팅\n[A2] feat: 페이지 흐름\n[A3] feat: 재사용 컴포넌트\n[AR] fix: REVIEW 수정사항 반영`,
  },
  {
    name: 'DESIGN.md', desc: '토큰, 컴포넌트 계약',
    preview: `# DESIGN.md :  강릉페이 Phase 2 리디자인\n팀: 마카모예 | UX Concept: 내 돈이 내 편인 앱\n\n두 축:\n1. 투명한 정보 노출\n2. 막힘없는 직진형 프로세스\n\n## 4대 전략\nS1  금융앱은 금융에 집중합니다         :  덜어내기\nS2  숨겨진 권리를 동등하게 드러냅니다  :  다크패턴 해소\nS3  내 돈의 흐름을 투명하게 보여줍니다 :  투명성\nS4  헤매지 않는 직진 동선을 만듭니다   :  길찾기\n\n절대 금지: 이모지, 색상 하드코딩,\nB2B 콘텐츠 B2C 화면 노출, localStorage`,
  },
  {
    name: 'IA.md', desc: '라우트, 화면 계층',
    preview: `# IA.md :  강릉페이 Phase 2 IA\n업데이트: 2026-05-15 피드백 반영\n\n바텀 네비게이션 (5개):\n[홈] [결제매장] [QR결제 중앙] [이용내역] [MY]\n\n핵심 변경:\n- 햄버거 메뉴 완전 삭제 → MY 탭으로 흡수\n- QR결제를 중앙 강조 위치로\n- 이용내역을 기존 QR결제 자리로\n\n상단 헤더:\n[로고 강릉페이] [큰글씨] [검색] [알림종]\n\n라우트:\n/ (홈)         /store (결제매장)\n/qr (QR)       /history (이용내역)\n/my (MY :  신규)`,
  },
  {
    name: 'COMPONENTS.md', desc: '33개 컴포넌트 스펙',
    preview: `# COMPONENTS.md :  강릉페이 컴포넌트 스펙\n총 33개 | Phase 1 AS-IS 복제 기준\n\n레이아웃 (6개):\nL01 TopAppBar.jsx\nL04 BottomNavBar.jsx\nL06 ScreenContainer.jsx\n\n홈 (13개):\nH03 BalanceCard.jsx          다크 블루 잔액 카드\nH04 BalanceCardExpanded.jsx  카드 확장 (카드관리|충전)\nH05 CashbackProgressCard.jsx 캐시백 10% 진행바\n\n결제/충전 (6개):\nP01 QRScannerScreen.jsx  QR 스캔 전체화면\nP02 ChargeScreen.jsx     충전 금액 입력\n\n결제매장 (4개):\nM01 StoreMapScreen.jsx  지도 + 검색바 + 필터칩\nM04 CategoryFilterChip.jsx`,
  },
  {
    name: 'ROUTES.md', desc: '30개 화면 목록',
    preview: `# ROUTES.md :  강릉페이 라우팅 구조\nPhase 3 반영 | React Router v6\n\n바텀 네비게이션 5탭:\n  /         → HomePage\n  /store    → StorePage\n  /qr       → QRPage (중앙 강조)\n  /history  → HistoryPage\n  /my       → MyPage (Phase 3 신규)\n\n추가 라우트:\n  /search        → SearchPage\n  /card-apply    → CardApplyPage\n  /charge        → ChargePage\n  /settings      → SettingsPage\n  /menu          → Navigate to="/my"\n\n숨김 처리 (라우트 유지):\n  /life  /support  /community`,
  },
  {
    name: 'PROGRESS.md', desc: '진행 상태, 완료 목록',
    preview: `# PROGRESS.md\n\nPhase 1  앱 컴포넌트 33개 구현   완료\nPhase 2  UX 개선 반영          완료\nPhase 3  MY 탭, QR, 검색 신규    완료\n포트폴리오 웹사이트             완료`,
  },
];

const AGENTS = [
  { id: 'BN', label: '검색, 발견', desc: '상점 검색, 지도, 카테고리 필터', color: color.brand },
  { id: 'MY', label: 'MY, 카드', desc: 'MY 탭, 카드 관리, 설정 플로우', color: color.brand },
  { id: 'FX', label: '버그, 지도, 내역', desc: '버그 수정, 지도 통합, 거래 내역', color: color.brand },
  { id: 'VR', label: '검증 에이전트', desc: '토큰, 접근성, 로직 점검', color: color.brand },
];

const MODELS = [
  {
    name: 'Sonnet',
    uses: ['단순 매핑', '컴포넌트 교체', '스타일 수정', '반복 작업'],
    note: '속도 우선, 결과 예측 가능',
  },
  {
    name: 'Opus',
    uses: ['아키텍처 설계', '디버깅', '검증 에이전트', '트레이드오프 판단'],
    note: '정확도 우선, 복잡한 의존성',
  },
];

const TOOLS = [
  { name: 'Figma', icon: figmaIcon },
  { name: 'Claude Code', icon: claudeCodeIcon },
  { name: 'Antigravity', icon: antigravityIcon },
  { name: 'Vite', icon: viteIcon },
  { name: 'React', icon: reactIcon },
  { name: 'Tailwind', icon: tailwindIcon },
  { name: 'Vercel', icon: vercelIcon },
];


export default function AiHarness() {
  const [openDoc, setOpenDoc] = useState(null);
  const [headRef, headVisible] = useReveal({ threshold: 0.05 });
  const [blocksRef, blocksVisible] = useReveal({ threshold: 0.03 });
  const [toolsRef, toolsVisible] = useReveal({ threshold: 0.05 });
  const { isMobile } = useBreakpoint();

  return (
    <section
      id="ai-harness"
      style={{
        background: color.white,
        fontFamily: font.family,
        padding: `${layout.sectionY} clamp(20px,5vw,80px)`,
      }}
    >
      <div style={{ maxWidth: layout.container, margin: '0 auto' }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
            marginBottom: 'clamp(48px,6vw,80px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 24px', fontFamily: font.family,
          }}>
            AI HARNESS
          </p>
          <h2 style={{
            fontSize: t.h1.size, fontWeight: t.h1.weight,
            lineHeight: t.h1.lh, letterSpacing: t.h1.ls,
            color: color.ink, margin: '0 0 16px', fontFamily: font.family,
            wordBreak: 'keep-all',
          }}>
            AI와 협업한 과정
          </h2>
        </div>

        {/* 4 blocks 2x2 */}
        <div
          ref={blocksRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: 'clamp(20px,2.5vw,40px)',
          }}
        >

          {/* Block 1: 문서 기반 컨텍스트 주입 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0s, transform 0.65s ease-out 0s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              01
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              문서 기반 컨텍스트 주입
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {DOCS.map((doc) => {
                const isOpen = openDoc === doc.name;
                return (
                  <div key={doc.name}>
                    <button
                      onClick={() => setOpenDoc(isOpen ? null : doc.name)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', gap: 12, padding: '8px 12px',
                        background: color.white, borderRadius: isOpen ? `${layout.rSm} ${layout.rSm} 0 0` : layout.rSm,
                        border: 'none', cursor: 'pointer', textAlign: 'left',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                          color: color.brand, fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                          flexShrink: 0,
                        }}>
                          {doc.name}
                        </span>
                        <span style={{
                          fontSize: t.caption.size, lineHeight: t.caption.lh,
                          color: color.inkMuted, fontFamily: font.family,
                        }}>
                          {doc.desc}
                        </span>
                      </span>
                      <span style={{
                        fontSize: 16, fontWeight: 500, color: color.brand, flexShrink: 0,
                        transition: 'transform 0.25s ease-out',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        display: 'inline-block',
                      }}>
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <pre style={{
                        margin: 0, padding: '12px 14px',
                        background: '#1E1E1E',
                        borderRadius: `0 0 ${layout.rSm} ${layout.rSm}`,
                        fontSize: 11, lineHeight: 1.75,
                        color: '#D4D4D4',
                        fontFamily: "'SFMono-Regular','Consolas','Monaco',monospace",
                        overflowX: 'auto', whiteSpace: 'pre',
                      }}>
                        {doc.preview}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Block 2: 병렬 에이전트 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.1s, transform 0.65s ease-out 0.1s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              02
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 24px', fontFamily: font.family,
            }}>
              병렬 에이전트
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* BN / MY / FX row */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 8 }}>
                {AGENTS.slice(0, 3).map((ag) => (
                  <div
                    key={ag.id}
                    style={{
                      padding: '12px',
                      background: color.white,
                      borderRadius: layout.rSm,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{
                      fontSize: 16, fontWeight: 800,
                      color: ag.color, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.id}
                    </div>
                    <div style={{
                      fontSize: 13, fontWeight: 700,
                      color: color.ink, fontFamily: font.family, marginBottom: 4,
                    }}>
                      {ag.label}
                    </div>
                    <div style={{
                      fontSize: 13, lineHeight: 1.5,
                      color: color.inkMuted, fontFamily: font.family,
                    }}>
                      {ag.desc}
                    </div>
                  </div>
                ))}
              </div>
              {/* Arrow */}
              <div style={{
                textAlign: 'center',
                fontSize: 18, color: color.inkMuted,
              }}>
                ↓
              </div>
              {/* VR row */}
              <div
                style={{
                  padding: '14px 16px',
                  background: color.white,
                  borderRadius: layout.rSm,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  textAlign: 'center',
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 800,
                  color: AGENTS[3].color, fontFamily: font.family,
                }}>
                  VR
                </span>
                <div>
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: color.ink, fontFamily: font.family, marginBottom: 2,
                  }}>
                    {AGENTS[3].label}
                  </div>
                  <div style={{
                    fontSize: 13, color: color.inkMuted, fontFamily: font.family,
                  }}>
                    {AGENTS[3].desc}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Block 3: 모델 선택 기준 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.2s, transform 0.65s ease-out 0.2s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              03
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 20px', fontFamily: font.family,
            }}>
              모델 선택 기준
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
              {MODELS.map((m) => (
                <div
                  key={m.name}
                  style={{
                    padding: '14px',
                    background: color.white,
                    borderRadius: layout.rSm,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    fontSize: 15, fontWeight: 800,
                    color: color.brand, fontFamily: font.family, marginBottom: 10,
                  }}>
                    {m.name}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 10 }}>
                    {m.uses.map((u) => (
                      <div
                        key={u}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}
                      >
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: color.brand, flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: 12, fontWeight: 500, color: color.ink,
                          fontFamily: font.family, lineHeight: 1.5,
                        }}>
                          {u}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    fontSize: 13, fontWeight: 500, color: color.inkMuted,
                    fontFamily: font.family, margin: 0,
                    paddingTop: 6,
                  }}>
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Block 4: Figma MCP 양방향 연결 */}
          <div
            style={{
              opacity: blocksVisible ? 1 : 0,
              transform: blocksVisible ? 'none' : 'translateY(24px)',
              transition: 'opacity 0.65s ease-out 0.3s, transform 0.65s ease-out 0.3s',
              background: color.bg,
              borderRadius: layout.rMd,
              padding: 'clamp(24px,3vw,40px)',
            }}
          >
            <p style={{
              fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
              letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
              color: color.brand, margin: '0 0 12px', fontFamily: font.family,
            }}>
              04
            </p>
            <h3 style={{
              fontSize: t.h3.size, fontWeight: t.h3.weight,
              lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
              color: color.ink, margin: '0 0 20px', fontFamily: font.family,
            }}>
              Figma MCP 양방향 연결
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { dir: 'Claude Code → Figma', desc: 'Claude Code로 빠른 프로토타입 완성 후 피그마로 변환' },
                { dir: 'Figma → Claude Code', desc: '디자인 수정 후 코드로 변환' },
              ].map((item) => (
                <div
                  key={item.dir}
                  style={{
                    padding: '14px',
                    background: color.white,
                    borderRadius: layout.rSm,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    fontSize: 13, fontWeight: 700,
                    color: color.brand, fontFamily: font.family, marginBottom: 6,
                  }}>
                    {item.dir}
                  </div>
                  <div style={{
                    fontSize: 13, lineHeight: 1.5,
                    color: color.inkMuted, fontFamily: font.family,
                  }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Block 5: 사용 툴 */}
        <div
          ref={toolsRef}
          style={{
            opacity: toolsVisible ? 1 : 0,
            transform: toolsVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.65s ease-out 0.4s, transform 0.65s ease-out 0.4s',
            background: color.bg,
            borderRadius: layout.rMd,
            padding: 'clamp(24px,3vw,40px)',
            marginTop: 'clamp(20px,2.5vw,40px)',
          }}
        >
          <p style={{
            fontSize: t.eyebrow.size, fontWeight: t.eyebrow.weight,
            letterSpacing: t.eyebrow.ls, textTransform: t.eyebrow.transform,
            color: color.brand, margin: '0 0 12px', fontFamily: font.family,
          }}>
            05
          </p>
          <h3 style={{
            fontSize: t.h3.size, fontWeight: t.h3.weight,
            lineHeight: t.h3.lh, letterSpacing: t.h3.ls,
            color: color.ink, margin: '0 0 24px', fontFamily: font.family,
          }}>
            사용 툴
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3,1fr)' : 'repeat(7,1fr)',
            gap: 'clamp(12px,2vw,24px)',
          }}>
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  ...(isMobile && i === TOOLS.length - 1 ? { gridColumn: '1 / -1', justifySelf: 'center' } : {}),
                }}
              >
                <img
                  src={tool.icon}
                  alt={tool.name}
                  style={{
                    width: 'clamp(40px,5vw,56px)',
                    height: 'clamp(40px,5vw,56px)',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  color: color.ink, fontFamily: font.family,
                  textAlign: 'center', lineHeight: 1.3,
                  wordBreak: 'keep-all',
                }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
