import Flex from "components/Flex";
import { SPACING } from "entities/tailwind";

import Utils from "utils/helper";

interface NumberComponentProps {
  time: string;
  label: string;
}

const Number = ({ time, label }: NumberComponentProps) => {
  const addZero = (str: string) => {
    if (str.length < 2) {
      return `0${str}`;
    }

    return str;
  };

  return (
    <Flex direction={"column"} noPadding gap={SPACING.extraSmall}>
      <div>{addZero(time)}</div>
      <div>{label}</div>
    </Flex>
  );
};

export default Number;
