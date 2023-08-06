export interface CardProps {
  type: string;
  time: string;
}

const Card = ({ type, time }: CardProps) => {
  return (
    <div className="max-h-15 rouned sm flex h-full flex-grow flex-col items-center justify-center px-3 py-5 shadow-sm">
      <div>{type}</div>
      <div>{time}</div>
    </div>
  );
};

export default Card;
