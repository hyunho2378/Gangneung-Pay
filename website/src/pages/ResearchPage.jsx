import DeskResearch from '../sections/DeskResearch.jsx';
import UserResearch from '../sections/UserResearch.jsx';
import InDepthInterview from '../sections/InDepthInterview.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function ResearchPage() {
  return (
    <>
      <DeskResearch />
      <UserResearch />
      <InDepthInterview />
      <NextStepCTA label="인사이트 보기" to="/insights" />
    </>
  );
}
