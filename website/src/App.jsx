import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import IntroPage from './pages/IntroPage.jsx';
import ResearchPage from './pages/ResearchPage.jsx';
import InsightsPage from './pages/InsightsPage.jsx';
import SolutionPage from './pages/SolutionPage.jsx';
import DesignSystemPage from './pages/DesignSystemPage.jsx';
import BuildPage from './pages/BuildPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<IntroPage />} />
        <Route path="research" element={<ResearchPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="solution" element={<SolutionPage />} />
        <Route path="design" element={<DesignSystemPage />} />
        <Route path="build" element={<BuildPage />} />
        <Route path="system" element={<Navigate to="/build" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
