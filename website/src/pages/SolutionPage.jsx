import DesignDirection from '../sections/DesignDirection.jsx';
import UxConcept from '../sections/UxConcept.jsx';
import UxStrategy from '../sections/UxStrategy.jsx';
import UserRequirements from '../sections/UserRequirements.jsx';
import DesignSystem from '../sections/DesignSystem.jsx';
import UserFlow from '../sections/UserFlow.jsx';
import InformationArchitecture from '../sections/InformationArchitecture.jsx';
import TheBuild from '../sections/TheBuild.jsx';

export default function SolutionPage() {
  return (
    <>
      <DesignDirection />
      <UxConcept />
      <UxStrategy />
      <UserRequirements />
      <DesignSystem />
      <UserFlow />
      <InformationArchitecture />
      <TheBuild />
    </>
  );
}
