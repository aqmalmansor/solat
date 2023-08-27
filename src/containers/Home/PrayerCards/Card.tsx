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
        <div className="max-h-15 flex h-full min-w-[110px] flex-grow flex-col items-center justify-center overflow-hidden rounded-lg shadow-md">
          <div className="flex w-full items-center justify-center border-b-[1px] border-solid border-primary bg-secondary py-3 font-semibold text-primary">
            {data.name}
          </div>
          <div className="flex w-full items-center justify-center bg-white py-6 text-primary">
            {time}
          </div>
        </div>
      }
    ></Button>
  );
};

export default Card;
