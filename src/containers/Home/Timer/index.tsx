import Button from "components/Button";
import { useSolatStore } from "store/solat";
import Timer from "./Timer";

const TimerSection = () => {
  const { setFormModalOpen, jakimResponse } = useSolatStore();

  return (
    <div className="relative h-full">
      {jakimResponse?.place ?? "Loading"}
      <Timer />
      <Button onClick={() => setFormModalOpen(true)} label="YOYO" />
    </div>
  );
};

export default TimerSection;
