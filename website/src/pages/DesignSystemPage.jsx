import DesignSystem from '../sections/DesignSystem.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function DesignSystemPage() {
  return (
    <>
      <DesignSystem />
      <NextStepCTA label="AI 활용 과정 보기" to="/build" />
    </>
  );
}
