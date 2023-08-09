import { useEffect } from "react";
import dayjs from "dayjs";
import uuid from "react-uuid";

import { useSolatStore } from "store/solat";

import helper from "utils/helper";

import Card from "./Card";
import Flex from "components/Flex";

import { JUSTIFY_CONTENT, SPACING } from "entities/tailwind";
import { useUIStore } from "store/ui";
import { SolatEnum } from "entities/solat";

const PrayerCards = () => {
  const {
    jakimResponse,
    setMonthlyPrayerTimes,
    monthlyPrayerTimes,
    todayPrayerTimes,
    setTodayPrayerTimes,
  } = useSolatStore();

  const { setSolatInfoModalIsOpen, setSolat } = useUIStore();

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
    <Flex
      fill
      noPadding
      salt="flex-wrap"
      gap={SPACING.small}
      justify={JUSTIFY_CONTENT.between}
    >
      {Object.entries(todayPrayerTimes).map((item) => {
        let solatType: SolatEnum | undefined = undefined;
        switch (item[0]) {
          case "subuh":
            solatType = SolatEnum.subuh;
            break;
          case "syuruk":
            solatType = SolatEnum.syuruk;
            break;
          case "zohor":
            solatType = SolatEnum.zohor;
            break;
          case "asar":
            solatType = SolatEnum.asar;
            break;
          case "maghrib":
            solatType = SolatEnum.maghrib;
            break;
          case "isyak":
            solatType = SolatEnum.isyak;
            break;
          default:
            break;
        }
        return (
          <Card
            key={uuid()}
            type={solatType ?? SolatEnum.none}
            time={item[1]}
            onClick={() => {
              if (solatType) {
                setSolat(solatType);
                setSolatInfoModalIsOpen(true);
              }
            }}
          />
        );
      })}
      <div className="flex w-full justify-center  gap-3 capitalize md:justify-end md:pr-10">
        <div>Reference:</div>
        <a href={updatedJakimLink}>{jakimResponse?.provider}</a>
      </div>
    </Flex>
  );
};

export default PrayerCards;
