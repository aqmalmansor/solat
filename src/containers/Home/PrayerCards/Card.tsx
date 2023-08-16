import Button from "components/Button";

import { ICompulsaryPrayerPlaceholder } from "entities/solat";
import { BUTTON } from "entities/tailwind";

export interface CardProps {
  data: ICompulsaryPrayerPlaceholder;
  time: string;
  onClick: () => void;
}

const Card = ({ data, time, onClick }: CardProps): JSX.Element | null => {
  return (
    <Button
      noPadding
      variant={BUTTON.reset}
      salt="flex-grow"
      onClick={() => {
        onClick();
      }}
      label={
        <div className="max-h-15 flex h-full flex-grow flex-col items-center justify-center rounded-md py-5 shadow-md">
          <div>{data.name}</div>
          <div>{time}</div>
        </div>
      }
    ></Button>
  );
};

export default Card;
