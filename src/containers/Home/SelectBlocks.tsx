import { motion } from "framer-motion";
import uuid from "react-uuid";

import { useSolatStore } from "store/solat";

import helper from "utils/helper";
import Motion from "utils/motion";
import { zon } from "utils/placeholder";
import Select from "components/Select";
import Flex from "components/Flex";

import { JUSTIFY_CONTENT } from "entities/tailwind";

const SelectBlocks = () => {
  const {
    setAddressState,
    setArrAddressState,
    addressState,
    jakimResponse,
    setCityCode,
    arrAddressState,
    cityCode,
    setCodeBasedSolatTimeApiParams,
    codeBasedSolatTimeApiParams,
  } = useSolatStore();

  return (
    <Flex
      noPadding
      fill
      justify={JUSTIFY_CONTENT.center}
      salt="flex-wrap md:flex-nowrap"
    >
      <div className="basis-full md:basis-1/2">
        <motion.div variants={Motion.slideIn("left", "smooth", 0.5, 1)}>
          <Select
            label="State"
            onChange={(e) => {
              setAddressState(e.target.value);
              const selectedCityList =
                Object.values(zon)[
                  Object.keys(zon).findIndex((i) => i === e.target.value)
                ];
              setArrAddressState(selectedCityList);
            }}
            value={
              addressState ||
              helper.cityStateChecker(jakimResponse?.code ?? "wlp-01")
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
      <div className="basis-full md:basis-1/2">
        <motion.div variants={Motion.slideIn("right", "smooth", 0.5, 1)}>
          <Select
            label="City"
            onChange={(e) => {
              if (e.target.value.length) {
                setCityCode(e.target.value);
                setCodeBasedSolatTimeApiParams({
                  ...codeBasedSolatTimeApiParams,
                  code: e.target.value,
                });
              }
            }}
            value={cityCode}
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
    </Flex>
  );
};

export default SelectBlocks;
