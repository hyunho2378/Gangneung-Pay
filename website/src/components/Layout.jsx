import { Outlet } from 'react-router-dom';
import { color, font } from '../tokens/web.js';
import Nav from './Nav.jsx';
import ScrollToTop from './ScrollToTop.jsx';

export default function Layout() {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        fontWeight: 500,
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
      <ScrollToTop />
      <Nav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
