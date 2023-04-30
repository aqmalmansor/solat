import helper from "../utils/helper";

export interface IPrayerTimeCard {
  index: number;
  time: string;
}

const PrayerTimeCard = ({ index, time }: IPrayerTimeCard) => {
  return (
    <div className="max-h-15 rouned sm flex h-full flex-col items-center justify-center px-3 py-5 shadow-sm">
      <div>{helper.convertIndexToPrayerTitle(index)}</div>
      <div>{time.split("@")[1]}</div>
    </div>
  );
};

export default PrayerTimeCard;
