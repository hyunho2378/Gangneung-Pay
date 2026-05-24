import { Home, Store, Receipt, Gift, User } from 'lucide-react';
import { color, font } from '../tokens/web.js';

const TABS = [
  { label: '홈',       Icon: Home },
  { label: '결제매장', Icon: Store },
  { label: '이용내역', Icon: Receipt },
  { label: '지원금·혜택', Icon: Gift },
  { label: 'MY',       Icon: User },
];

export function IOSBottomNav({ activeIndex = 0 }) {
  return (
    <div style={{
      background: color.white, borderRadius: 12, height: 56,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0 8px', border: `1px solid ${color.line}`,
    }}>
      {TABS.map(({ label, Icon }, i) => {
        const active = i === activeIndex;
        const col = active ? color.brand : color.inkFaint;
        return (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Icon size={22} strokeWidth={1.8} color={col} />
            <span style={{ fontSize: 10, color: col, fontWeight: active ? 700 : 400, fontFamily: font.family }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}

export function AndroidBottomNav({ activeIndex = 0 }) {
  return (
    <div style={{
      background: color.white, borderRadius: 12, height: 56,
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0 8px', border: `1px solid ${color.line}`,
    }}>
      {TABS.map(({ label, Icon }, i) => {
        const active = i === activeIndex;
        const col = active ? color.brand : color.inkFaint;
        return (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {active ? (
              <div style={{ background: color.brandPale, borderRadius: 999, width: 56, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} strokeWidth={1.8} color={col} />
              </div>
            ) : (
              <Icon size={22} strokeWidth={1.8} color={col} />
            )}
            <span style={{ fontSize: 10, color: col, fontWeight: active ? 700 : 400, fontFamily: "'Noto Sans KR', sans-serif" }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
