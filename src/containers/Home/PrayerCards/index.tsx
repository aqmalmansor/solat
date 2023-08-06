import { useEffect } from "react";
import dayjs from "dayjs";
import uuid from "react-uuid";

import { useSolatStore } from "store/solat";

import helper from "utils/helper";

import Card from "./Card";

const PrayerCards = () => {
  const {
    jakimResponse,
    setMonthlyPrayerTimes,
    monthlyPrayerTimes,
    todayPrayerTimes,
    setTodayPrayerTimes,
  } = useSolatStore();

  const formatPrayerToString = (param: number): string => {
    return dayjs(new Date(param * 1000)).format("HH:mm A");
  };

  useEffect(() => {
    if (jakimResponse) {
      const monthly = jakimResponse.times.map((day) => {
        return {
          subuh: formatPrayerToString(day[0]),
          syuruk: formatPrayerToString(day[1]),
          zohor: formatPrayerToString(day[2]),
          asar: formatPrayerToString(day[3]),
          maghrib: formatPrayerToString(day[4]),
          isyak: formatPrayerToString(day[5]),
        };
      });

      setMonthlyPrayerTimes(monthly);
    }
  }, [jakimResponse]);

  useEffect(() => {
    if (monthlyPrayerTimes.length > 0) {
      const todayDate = dayjs().date();
      const prayerTimes = monthlyPrayerTimes.find(
        (_item, idx) => idx + 1 === todayDate
      );
      if (prayerTimes) setTodayPrayerTimes(prayerTimes);
    }
  }, [monthlyPrayerTimes]);

  if (!todayPrayerTimes) {
    return <div>No Data</div>;
  }

  return (
    <div className="flex w-full flex-row flex-wrap content-center justify-between gap-5 md:justify-around">
      {Object.entries(todayPrayerTimes).map((item) => {
        return (
          <Card
            key={uuid()}
            type={helper.capitalizeWords(item[0])}
            time={item[1]}
          />
        );
      })}
    </div>
  );
};

export default PrayerCards;
