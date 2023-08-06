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

  const jakimLink =
    jakimResponse?.attributes.jakim_source ?? "javascript:void(0)";
  const updatedJakimLink = jakimLink.replace("period=duration", "period=today");

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
      <div className="flex w-full justify-center  gap-3 capitalize md:justify-end md:pr-10">
        <div>Reference:</div>
        <a href={updatedJakimLink}>{jakimResponse?.provider}</a>
      </div>
    </div>
  );
};

export default PrayerCards;
