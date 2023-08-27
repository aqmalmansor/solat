import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Number from "./Number";

import Utils from "utils/helper";
import Flex from "components/Flex";
import { SPACING } from "entities/tailwind";

interface CountDownProps {
  solatTime: number;
  solatTitle: string;
}

const Countdown = ({ solatTime, solatTitle }: CountDownProps) => {
  const [displayTimer, setDisplayTimer] = useState<string>("");

  useEffect(() => {
    const intervalID = setInterval(() => {
      const duration = dayjs().unix() - solatTime;
      const diffDuration = Utils.checkDurationBetweenSolat(duration);
      if (duration > 0) {
        window.location.reload();
      } else {
        const formatTimer = diffDuration.format(":HH:mm:ss");
        setDisplayTimer(formatTimer);
      }
    }, 1000);

    return () => clearInterval(intervalID);
  }, [solatTime]);

  const renderCountdown = () => {
    if (!displayTimer) {
      return <div>Loading</div>;
    }

    const solatTimerBreakdown = displayTimer
      .replaceAll(":", " ")
      .split(" ")
      .slice(1);

    return (
      <Flex noPadding gap={SPACING.small}>
        <Number
          time={solatTimerBreakdown[0].replace("-", "")}
          label={"Hours"}
        />
        <div>:</div>
        <Number
          time={solatTimerBreakdown[1].replace("-", "")}
          label={"Minutes"}
        />
        <div>:</div>
        <Number
          time={solatTimerBreakdown[2].replace("-", "")}
          label={"Seconds"}
        />
      </Flex>
    );
  };

  return (
    <div>
      {solatTitle}
      {renderCountdown()}
    </div>
  );
};

export default Countdown;
