import AiHarness from '../sections/AiHarness.jsx';
import Process from '../sections/Process.jsx';
import Prototype from '../sections/Prototype.jsx';
import UserTest from '../sections/UserTest.jsx';
import Outro from '../sections/Outro.jsx';
import NextStepCTA from '../components/NextStepCTA.jsx';

export default function BuildPage() {
  return (
    <>
      <AiHarness />
      <Process />
      <Prototype />
      <UserTest />
      <NextStepCTA label="처음으로" to="/" />
      <Outro />
    </>
  );
}
