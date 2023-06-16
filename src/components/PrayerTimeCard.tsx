import helper from "../utils/helper";

export interface IPrayerTimeCard {
  index: number;
  time: string;
}

const PrayerTimeCard = ({ index, time }: IPrayerTimeCard) => {
  return (
    <div className="card w-fit h-fit bg-neutral text-neutral-content">
      <div className="card-body items-center text-center p-4">
        <p className="card-title text-sm">{helper.convertIndexToPrayerTitle(index)}</p>
        <p className="text-3xl flex-grow-0">{time.split("@")[1]}</p>
      </div>
    </div>

  );
};

export default PrayerTimeCard;
