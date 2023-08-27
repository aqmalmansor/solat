import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSolatStore } from "store/solat";

import duration from "dayjs/plugin/duration";

import Countdown from "./Countdown";

dayjs.extend(duration);

const Timer = () => {
  const { todayPrayerTimes, monthlyPrayerTimes } = useSolatStore();

  const [nextSolatTime, setNextSolatTime] = useState<{
    name: string;
    unix: number;
  }>({
    name: "",
    unix: 0,
  });

  useEffect(() => {
    if (todayPrayerTimes) {
      const todayPrayerTimesList = Object.entries(todayPrayerTimes);

      // Compare current time with prayer times list
      todayPrayerTimesList.forEach((item, idx) => {
        // Isyak compare with the next day Subuh

        if (idx + 1 === todayPrayerTimesList.length) {
          const getTomorrowSchedule = monthlyPrayerTimes.find(
            (_ptItem, ptIndex) => ptIndex + 1 === dayjs().date() + 1
          );
          if (
            getTomorrowSchedule &&
            dayjs().unix() > todayPrayerTimesList[idx - 1][1]
          ) {
            setNextSolatTime({
              name: "Subuh",
              unix: getTomorrowSchedule.subuh,
            });
          }
        } else {
          // Compare with the next solat and exlude syuruk
          if (
            dayjs().unix() < item[1] &&
            dayjs().unix() > todayPrayerTimesList[idx - 1][1]
          ) {
            if (item[0] !== "syuruk") {
              setNextSolatTime({
                name: todayPrayerTimesList[idx][0],
                unix: todayPrayerTimesList[idx][1],
              });
            }
          }
        }
      });
    }
  }, [todayPrayerTimes]);

  return (
    <div>
      {/* {Utils.checkDurationBetweenSolat(solatTimer).format("HH:mm:ss")} */}
      <Countdown
        solatTime={nextSolatTime.unix}
        solatTitle={nextSolatTime.name}
      />
    </div>
  );
};

export default Timer;
