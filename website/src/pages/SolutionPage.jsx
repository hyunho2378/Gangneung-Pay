import DesignDirection from '../sections/DesignDirection.jsx';
import UxConcept from '../sections/UxConcept.jsx';
import UxStrategy from '../sections/UxStrategy.jsx';
import UserRequirements from '../sections/UserRequirements.jsx';
import TheBuild from '../sections/TheBuild.jsx';
import UserFlow from '../sections/UserFlow.jsx';
import InformationArchitecture from '../sections/InformationArchitecture.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function SolutionPage() {
  return (
    <>
      <DesignDirection />
      <UxConcept />
      <UxStrategy />
      <UserRequirements />
      <TheBuild />
      <UserFlow />
      <InformationArchitecture />
      <NextStepCTA label="디자인 시스템 보기" to="/design" />
    </>
  );
}
