import helper from "../utils/helper";

export interface IPrayerTimeCard {
  index: number;
  time: string;
}

const PrayerTimeCard = ({ index, time }: IPrayerTimeCard) => {
  return (
    <div className="bg-primary shadow-md rounded-lg md:m-6 hover:shadow-xl hover: grow-1 m-1 transition duration-300 cursor-pointer">
      <div className="bg-white rounded-lg p-8 shadow-inner">
        <div className="text-xl font-semibold mb-2 text-center">{helper.convertIndexToPrayerTitle(index)}</div>
        <div className="text-gray-600 text-center">{time.split("@")[1]}</div>
      </div>
    </div>
  );
};

export default PrayerTimeCard;
