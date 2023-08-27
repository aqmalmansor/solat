import { motion } from "framer-motion";
import uuid from "react-uuid";

import { useSolatStore } from "store/solat";

import helper from "utils/helper";
import Motion from "utils/motion";
import { zon } from "utils/placeholder";
import Select from "components/Select";
import Flex from "components/Flex";

import { JUSTIFY_CONTENT, SPACING } from "entities/tailwind";

interface AddressProps {
  state: string;
  city: string;
  setCurrentState: (param: string) => void;
  setCity: (param: string) => void;
}

const MotionFlex = motion(Flex);

const Address = ({
  state,
  setCurrentState,
  city,
  setCity,
}: AddressProps): JSX.Element => {
  const { setArrAddressState, jakimResponse, arrAddressState } =
    useSolatStore();

  return (
    <MotionFlex
      noPadding
      fill
      direction="column"
      justify={JUSTIFY_CONTENT.center}
      gap={SPACING.extraSmall}
      initial="hidden"
      whileInView="show"
      variants={Motion.staggerContainer(0.3, 1)}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full">
        <motion.div variants={Motion.slideIn("left", "smooth", 0.3, 0.5)}>
          <Select
            label="State"
            onChange={(e) => {
              if (e.target.value) {
                setCurrentState(e.target.value);
                const selectedCityList =
                  Object.values(zon)[
                    Object.keys(zon).findIndex((i) => i === e.target.value)
                  ];

                if (selectedCityList.length === 1) {
                  setCity(selectedCityList[0][1]);
                }
                setArrAddressState(selectedCityList);
              }
            }}
            value={
              state || helper.cityStateChecker(jakimResponse?.code ?? "wlp-01")
            }
            options={Object.keys(zon).map((z) => {
              let newZ: string = z;
              if (z === "wilayah") {
                newZ = "Wilayah Persekutuan";
              } else if (z === "pulauPinang") {
                newZ = "Pulau Pinang";
              } else if (z === "negeriSembilan") {
                newZ = "Negeri Sembilan";
              }

              return (
                <option key={`select__component-${uuid()}`} value={z}>
                  {helper.capitalizeWords(newZ)}
                </option>
              );
            })}
          />
        </motion.div>
      </div>
      <div className="w-full">
        <motion.div variants={Motion.slideIn("right", "smooth", 0.3, 0.5)}>
          <Select
            label="City"
            onChange={(e) => {
              if (e.target.value.length) {
                setCity(e.target.value);
              }
            }}
            value={city}
            options={
              arrAddressState.length > 0 &&
              arrAddressState.map((arr) => {
                return (
                  <option key={uuid()} value={arr[1]}>
                    {arr[0]}
                  </option>
                );
              })
            }
          />
        </motion.div>
      </div>
    </MotionFlex>
  );
};

export default Address;
