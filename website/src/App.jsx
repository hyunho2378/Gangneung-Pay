import { color, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import Hero from './sections/Hero.jsx';
import ProjectOverview from './sections/ProjectOverview.jsx';
import ServiceAnalysis from './sections/ServiceAnalysis.jsx';
import TheTwist from './sections/TheTwist.jsx';
import DeskResearch from './sections/DeskResearch.jsx';
import UserResearch from './sections/UserResearch.jsx';
import ServiceSafari from './sections/ServiceSafari.jsx';
import AffinityDiagram from './sections/AffinityDiagram.jsx';
import KeyInsights from './sections/KeyInsights.jsx';
import AsIsAudit from './sections/AsIsAudit.jsx';
import Persona from './sections/Persona.jsx';
import UserJourneyMap from './sections/UserJourneyMap.jsx';
import DesignDirection from './sections/DesignDirection.jsx';
import UxConcept from './sections/UxConcept.jsx';
import UxStrategy from './sections/UxStrategy.jsx';
import UserRequirements from './sections/UserRequirements.jsx';
import DesignSystem from './sections/DesignSystem.jsx';
import KeyScreens from './sections/KeyScreens.jsx';
import TheBuild from './sections/TheBuild.jsx';
import DualDesignSystem from './sections/DualDesignSystem.jsx';
import AiHarness from './sections/AiHarness.jsx';
import Process from './sections/Process.jsx';
import UserTest from './sections/UserTest.jsx';
import Prototype from './sections/Prototype.jsx';
import Outro from './sections/Outro.jsx';

export default function App() {
  return (
    <div
      style={{
        background: color.bg,
        fontFamily: font.family,
        minHeight: '100vh',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      <Nav />
      <main>
        <Hero />
        <ProjectOverview />
        <ServiceAnalysis />
        <TheTwist />
        <DeskResearch />
        <UserResearch />
        <ServiceSafari />
        <AffinityDiagram />
        <KeyInsights />
        <AsIsAudit />
        <Persona />
        <UserJourneyMap />
        <DesignDirection />
        <UxConcept />
        <UxStrategy />
        <UserRequirements />
        <DesignSystem />
        <KeyScreens />
        <TheBuild />
        <DualDesignSystem />
        <AiHarness />
        <Process />
        <UserTest />
        <Prototype />
        <Outro />
      </main>
    </div>
  );
}
