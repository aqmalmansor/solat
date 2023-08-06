import { motion } from "framer-motion";
import { useSolatStore } from "store/solat";
import uuid from "react-uuid";

import helper from "utils/helper";
import Motion from "utils/motion";
import { zon } from "utils/placeholder";

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
    <div className="mt-5 flex w-full flex-row flex-wrap justify-center">
      <motion.div
        className="basis-full md:basis-1/2"
        variants={Motion.slideIn("left", "smooth", 0.5, 1)}
      >
        <div className="mb-3 w-full px-3 md:mb-0">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative">
            <select
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
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-state"
            >
              {Object.keys(zon).map((z) => {
                let newZ: string = z;
                if (z === "wilayah") {
                  newZ = "Wilayah Persekutuan";
                } else if (z === "pulauPinang") {
                  newZ = "Pulau Pinang";
                } else if (z === "negeriSembilan") {
                  newZ = "Negeri Sembilan";
                }

                return (
                  <option key={uuid()} value={z}>
                    {helper.capitalizeWords(newZ)}
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="basis-full md:basis-1/2"
        variants={Motion.slideIn("right", "smooth", 0.5, 1)}
      >
        <div className="mb-3 w-full px-3 md:mb-0">
          <label
            className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
            htmlFor="grid-city"
          >
            City
          </label>
          <div className="relative">
            <select
              value={cityCode}
              onChange={(e) => {
                if (e.target.value.length) {
                  setCityCode(e.target.value);
                  setCodeBasedSolatTimeApiParams({
                    ...codeBasedSolatTimeApiParams,
                    code: e.target.value,
                  });
                }
              }}
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 capitalize leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-city"
            >
              <option value="">Please select one of the option</option>
              {arrAddressState.length > 0 &&
                arrAddressState.map((arr) => {
                  return (
                    <option key={uuid()} value={arr[1]}>
                      {arr[0]}
                    </option>
                  );
                })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectBlocks;
