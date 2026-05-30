import Hero from '../sections/Hero.jsx';
import ServiceAnalysis from '../sections/ServiceAnalysis.jsx';
import AppOverview from '../sections/AppOverview.jsx';
import DoubleDiamondSection from '../sections/DoubleDiamondSection.jsx';
import TheTwist from '../sections/TheTwist.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function IntroPage() {
  return (
    <>
      <Hero />
      <ServiceAnalysis />
      <AppOverview />
      <DoubleDiamondSection />
      <TheTwist />
      <NextStepCTA label="리서치 보기" to="/research" />
    </>
  );
}
