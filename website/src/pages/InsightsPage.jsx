import AffinityDiagram from '../sections/AffinityDiagram.jsx';
import KeyInsights from '../sections/KeyInsights.jsx';
import AsIsAudit from '../sections/AsIsAudit.jsx';
import Persona from '../sections/Persona.jsx';
import UserJourneyMap from '../sections/UserJourneyMap.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function InsightsPage() {
  return (
    <>
      <AffinityDiagram />
      <KeyInsights />
      <AsIsAudit />
      <Persona />
      <UserJourneyMap />
      <NextStepCTA label="솔루션 보기" to="/solution" />
    </>
  );
}
