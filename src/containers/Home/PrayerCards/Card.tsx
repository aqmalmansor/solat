import Button from "components/Button";
import { SolatEnum } from "entities/solat";
import { BUTTON } from "entities/tailwind";
import { compulsaryPrayerPlaceholder } from "utils/placeholder";

export interface CardProps {
  type: SolatEnum;
  time: string;
  onClick: () => void;
}

const Card = ({ type, time, onClick }: CardProps): JSX.Element | null => {
  const cardSolat = compulsaryPrayerPlaceholder.find(
    (item) => item.id === type
  );

  if (!cardSolat) {
    // If no solat is selected, return null
    return null;
  }

  return (
    cardSolat && (
      <Button
        noPadding
        type={BUTTON.clear}
        salt="flex-grow"
        onClick={() => onClick()}
        label={
          <div className="max-h-15 flex h-full flex-grow flex-col items-center justify-center rounded-md py-5 shadow-md">
            <div>{cardSolat.name}</div>
            <div>{time}</div>
          </div>
        }
      ></Button>
    )
  );
};

export default Card;
