// RefundGuideModal.jsx — S05 (p.18)
// 환불 안내 모달 (충전 전)

import { colors, typography, layout, spacing, shadow } from '../../tokens/tokens'
import BottomSheet from './BottomSheet'

const REFUND_ITEMS = [
  {
    id: 1,
    title: '충전 후 미사용',
    description: '충전 후 한 번도 사용하지 않은 경우 전액 환불이 가능합니다.',
  },
  {
    id: 2,
    title: '일부 사용 후 환불',
    description: '일부 사용 후에는 잔액 기준으로 환불 처리됩니다.',
  },
  {
    id: 3,
    title: '환불 신청 방법',
    description: '환불은 고객센터(1588-0000)를 통해 신청하실 수 있습니다.',
  },
  {
    id: 4,
    title: '환불 처리 기간',
    description: '환불 신청 후 영업일 기준 3~5일 이내 처리됩니다.',
  },
]

export default function RefundGuideModal({ isOpen, onClose }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="환불 안내">
      <div
        style={{
          padding: `${spacing[4]} ${layout.margin}`,
          fontFamily: typography.fontFamily,
        }}
      >
        {REFUND_ITEMS.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              gap: spacing[3],
              marginBottom: spacing[4],
              alignItems: 'flex-start',
            }}
          >
            {/* 불렛 포인트 */}
            <div
              style={{
                flexShrink: 0,
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: colors.primary[700],
                marginTop: '6px',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: typography.size.sm,
                  fontWeight: typography.weight.semibold,
                  color: colors.gray[900],
                  marginBottom: '4px',
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: typography.size.xs,
                  color: colors.gray[500],
                  lineHeight: 1.6,
                }}
              >
                {item.description}
              </div>
            </div>
          </div>
        ))}

        {/* 안내 박스 */}
        <div
          style={{
            backgroundColor: colors.primary[50],
            borderRadius: layout.radiusSmall,
            padding: spacing[3],
            marginBottom: spacing[5],
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: typography.size.xs,
              color: colors.primary[700],
              lineHeight: 1.6,
            }}
          >
            환불 정책은 강릉시 지역화폐 운영 규정에 따르며, 사전 공지 없이 변경될 수 있습니다.
          </p>
        </div>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: colors.primary[700],
            color: colors.onDark.primary,
            border: 'none',
            borderRadius: layout.radiusButton,
            fontSize: typography.size.md,
            fontWeight: typography.weight.semibold,
            cursor: 'pointer',
            marginBottom: spacing[4],
            boxShadow: shadow.button,
          }}
        >
          확인했습니다
        </button>
      </div>
    </BottomSheet>
  )
}
