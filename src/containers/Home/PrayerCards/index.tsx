import { useEffect } from "react";
import dayjs from "dayjs";
import uuid from "react-uuid";

import { useSolatStore } from "store/solat";
import { useUIStore } from "store/ui";

import Card from "./Card";
import Flex from "components/Flex";

import { JUSTIFY_CONTENT, SPACING } from "entities/tailwind";
import { SolatEnum } from "entities/solat";

import { compulsaryPrayerPlaceholder } from "utils/placeholder";

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
          subuh: day[0],
          syuruk: day[1],
          zohor: day[2],
          asar: day[3],
          maghrib: day[4],
          isyak: day[5],
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

        const solatData = compulsaryPrayerPlaceholder.find(
          (item) => item.id === solatType
        );

        if (!solatData) {
          // If no solat is selected, return null
          return null;
        }

        return (
          <Card
            key={uuid()}
            data={solatData}
            time={formatPrayerToString(item[1])}
            onClick={() => {
              setSolat(solatData);
              setSolatInfoModalIsOpen(true);
            }}
          />
        );
      })}
    </Flex>
  );
};

export default PrayerCards;
