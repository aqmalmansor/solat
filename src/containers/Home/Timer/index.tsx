import Button from "components/Button";
import { useSolatStore } from "store/solat";

const TimerSection = () => {
  const { setFormModalOpen } = useSolatStore();

  return (
    <div>
      index
      <Button onClick={() => setFormModalOpen(true)} label="YOYO" />
    </div>
  );
};

export default TimerSection;
