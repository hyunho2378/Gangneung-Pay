import { Home, Store, QrCode, Receipt, User } from 'lucide-react';
import { color, font } from '../tokens/web.js';

const TABS = [
  { label: '홈',     Icon: Home,    center: false },
  { label: '결제매장', Icon: Store,  center: false },
  { label: 'QR결제', Icon: QrCode,  center: true  },
  { label: '이용내역', Icon: Receipt, center: false },
  { label: 'MY',     Icon: User,    center: false  },
];

export function IOSBottomNav({ activeIndex = 0, onSelect }) {
  return (
    <div style={{
      background: color.white, borderRadius: 12, height: 56,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0 8px', border: `1px solid ${color.line}`,
    }}>
      {TABS.map(({ label, Icon, center }, i) => {
        const active = i === activeIndex;
        const col = (active || center) ? color.brand : color.inkFaint;
        return (
          <div key={label} onClick={() => onSelect?.(i)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            {center ? (
              <div style={{ width: 44, height: 44, borderRadius: 999, background: color.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -2 }}>
                <Icon size={22} strokeWidth={2} color="#fff" />
              </div>
            ) : (
              <Icon size={22} strokeWidth={1.8} color={col} />
            )}
            {!center && <span style={{ fontSize: 10, color: col, fontWeight: active ? 700 : 400, fontFamily: font.family }}>{label}</span>}
          </div>
        );
      })}
    </div>
  );
}

export function AndroidBottomNav({ activeIndex = 0, onSelect }) {
  return (
    <div style={{
      background: color.white, borderRadius: 12, height: 56,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0 8px', border: `1px solid ${color.line}`,
    }}>
      {TABS.map(({ label, Icon, center }, i) => {
        const active = i === activeIndex;
        const col = (active || center) ? color.brand : color.inkFaint;
        return (
          <div key={label} onClick={() => onSelect?.(i)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer' }}>
            {center ? (
              <div style={{ width: 48, height: 44, borderRadius: '16px 16px 0 0', background: color.brand, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: -2 }}>
                <Icon size={20} strokeWidth={2} color="#fff" />
              </div>
            ) : (
              <div style={{ background: active ? color.brandPale : 'transparent', borderRadius: 999, width: 56, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} strokeWidth={1.8} color={col} />
              </div>
            )}
            {!center && <span style={{ fontSize: 10, color: col, fontWeight: active ? 700 : 400, fontFamily: "'Noto Sans KR', sans-serif" }}>{label}</span>}
          </div>
        );
      })}
    </div>
  );
}
