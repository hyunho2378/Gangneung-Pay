// ChatBotScreen.jsx — I07 (p.75~79)
// 챗봇 푸루 화면

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send } from 'lucide-react'
import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'

const QUICK_REPLIES = [
  '카드 신청 방법',
  '충전 방법',
  '환불 방법',
  '가맹점 찾기',
]

const BOT_AUTO_REPLIES = {
  '카드 신청 방법':
    '강릉페이 카드는 강릉시청 민원실 또는 농협은행 강릉 지점에서 신청하실 수 있습니다. 신분증을 지참해 주세요.',
  '충전 방법':
    '강릉페이 앱 홈 화면에서 [충전] 버튼을 누르고 원하는 금액을 입력하면 됩니다. 1회 최대 50만원까지 충전 가능합니다.',
  '환불 방법':
    '환불은 고객센터(1588-0000)에 전화하시거나, 강릉시청 지역화폐 담당 부서를 방문해 신청하실 수 있습니다.',
  '가맹점 찾기':
    '하단 메뉴의 [매장] 탭에서 주변 가맹점을 검색하고 지도로 확인하실 수 있습니다.',
}

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'bot',
    text: '안녕하세요! 강릉페이 챗봇 푸루입니다. 무엇을 도와드릴까요?',
    time: new Date(),
  },
]

function BotAvatar() {
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: colors.primary[700],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 6px rgba(29,78,216,0.3)',
      }}
    >
      {/* 간단한 캐릭터 얼굴 SVG */}
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="8" fill="rgba(255,255,255,0.15)" />
        <circle cx="6.5" cy="7.5" r="1.2" fill="#FFFFFF" />
        <circle cx="11.5" cy="7.5" r="1.2" fill="#FFFFFF" />
        <path
          d="M6 11 Q9 13.5 12 11"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

function formatTime(date) {
  const h = date.getHours()
  const m = String(date.getMinutes()).padStart(2, '0')
  const period = h < 12 ? '오전' : '오후'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${period} ${hour}:${m}`
}

export default function ChatBotScreen({ onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text: trimmed,
      time: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // 자동 응답
    const replyText =
      BOT_AUTO_REPLIES[trimmed] ||
      '죄송해요, 해당 내용은 고객센터(1588-0000)에 문의해 주세요. 운영 시간은 평일 09:00~18:00입니다.'

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          text: replyText,
          time: new Date(),
        },
      ])
    }, 600)
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: colors.surface.card,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: typography.fontFamily,
        zIndex: 100,
      }}
    >
      {/* 헤더 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[3],
          padding: `${spacing[3]} ${layout.margin}`,
          paddingTop: '52px',
          backgroundColor: colors.surface.card,
          borderBottom: `1px solid ${colors.gray[100]}`,
          boxShadow: shadow.nav,
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: spacing[1],
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft size={24} color={colors.gray[900]} />
        </button>
        <BotAvatar />
        <span
          style={{
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            color: colors.gray[900],
          }}
        >
          챗봇 푸루
        </span>
      </div>

      {/* 메시지 영역 */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: `${spacing[4]} ${layout.margin}`,
          backgroundColor: colors.surface.background,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing[3],
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: spacing[2],
            }}
          >
            {/* 봇 아바타 */}
            {msg.role === 'bot' && <BotAvatar />}

            {/* 말풍선 + 시간 */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: '4px',
                maxWidth: '72%',
              }}
            >
              <div
                style={{
                  backgroundColor:
                    msg.role === 'user' ? colors.primary[700] : colors.chatBg,
                  color: msg.role === 'user' ? colors.onDark.primary : colors.gray[900],
                  borderRadius:
                    msg.role === 'user'
                      ? `${layout.radiusCard} ${layout.radiusCard} 4px ${layout.radiusCard}`
                      : `4px ${layout.radiusCard} ${layout.radiusCard} ${layout.radiusCard}`,
                  padding: `${spacing[2]} ${spacing[3]}`,
                  fontSize: typography.size.sm,
                  lineHeight: 1.55,
                }}
              >
                {msg.text}
              </div>
              <span
                style={{
                  fontSize: typography.size.xxs,
                  color: colors.gray[400],
                }}
              >
                {formatTime(msg.time)}
              </span>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 빠른 답변 버튼 행 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          borderTop: `1px solid ${colors.gray[100]}`,
          padding: `${spacing[2]} ${layout.margin}`,
          display: 'flex',
          gap: spacing[2],
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {QUICK_REPLIES.map((reply) => (
          <button
            key={reply}
            onClick={() => sendMessage(reply)}
            style={{
              flexShrink: 0,
              backgroundColor: colors.primary[50],
              color: colors.primary[700],
              border: `1px solid ${colors.primary[100]}`,
              borderRadius: layout.radiusPill,
              padding: '6px 14px',
              fontSize: typography.size.xs,
              fontWeight: typography.weight.medium,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {reply}
          </button>
        ))}
      </div>

      {/* 입력창 */}
      <div
        style={{
          backgroundColor: colors.surface.card,
          padding: `${spacing[3]} ${layout.margin}`,
          paddingBottom: `calc(${layout.bottomNavHeight} + ${spacing[2]})`,
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          borderTop: `1px solid ${colors.gray[100]}`,
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendMessage()
            }
          }}
          placeholder="궁금한 점을 입력해주세요"
          style={{
            flex: 1,
            height: '44px',
            backgroundColor: colors.gray[100],
            border: 'none',
            borderRadius: layout.radiusPill,
            padding: `0 ${spacing[4]}`,
            fontSize: typography.size.sm,
            color: colors.gray[900],
            outline: 'none',
            fontFamily: typography.fontFamily,
          }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: input.trim() ? colors.primary[700] : colors.gray[200],
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background-color 0.2s ease',
            boxShadow: input.trim() ? shadow.button : 'none',
          }}
        >
          <Send size={18} color={input.trim() ? colors.onDark.primary : colors.gray[400]} />
        </button>
      </div>
    </div>
  )
}
