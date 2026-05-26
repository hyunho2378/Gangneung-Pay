import { color, font } from './tokens/web.js';
import Nav from './components/Nav.jsx';
import Hero from './sections/Hero.jsx';
import ServiceAnalysis from './sections/ServiceAnalysis.jsx';
import AppOverview from './sections/AppOverview.jsx';
import DoubleDiamondSection from './sections/DoubleDiamondSection.jsx';
import TheTwist from './sections/TheTwist.jsx';
import DeskResearch from './sections/DeskResearch.jsx';
import UserResearch from './sections/UserResearch.jsx';
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
import UserFlow from './sections/UserFlow.jsx';
import InformationArchitecture from './sections/InformationArchitecture.jsx';
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
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
      }}
    >
      <Nav />
      <main>
        <Hero />
        <ServiceAnalysis />
        <AppOverview />
        <DoubleDiamondSection />
        <TheTwist />
        <DeskResearch />
        <UserResearch />
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
        <UserFlow />
        <InformationArchitecture />
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
