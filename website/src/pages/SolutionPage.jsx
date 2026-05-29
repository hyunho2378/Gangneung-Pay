import DesignDirection from '../sections/DesignDirection.jsx';
import UxConcept from '../sections/UxConcept.jsx';
import UxStrategy from '../sections/UxStrategy.jsx';
import UserRequirements from '../sections/UserRequirements.jsx';
import TheBuild from '../sections/TheBuild.jsx';
import UserFlow from '../sections/UserFlow.jsx';
import InformationArchitecture from '../sections/InformationArchitecture.jsx';

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
    </>
  );
}
