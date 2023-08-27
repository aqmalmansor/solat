import Modal from "components/Modal";
import Flex from "components/Flex";
import Button from "components/Button";

import {
  ALIGN_ITEMS,
  BUTTON,
  JUSTIFY_CONTENT,
  SPACING,
} from "entities/tailwind";

import Address from "./Address";
import { useSolatStore } from "store/solat";
import { useState } from "react";

interface ChangeLocationProps {
  getPrayerTimesCoords: () => void;
  getPrayerTimesCoordsIsLoading: boolean;
  getPrayerTimesCodenameIsLoading: boolean;
}

const ChangeLocation = ({
  getPrayerTimesCoords,
  getPrayerTimesCoordsIsLoading,
  getPrayerTimesCodenameIsLoading,
}: ChangeLocationProps) => {
  const {
    formModalIsOpen,
    setFormModalOpen,
    cityCode,
    addressState,
    setCodeBasedSolatTimeApiParams,
    codeBasedSolatTimeApiParams,
  } = useSolatStore();

  const [currentState, setCurrentState] = useState<string>(addressState);
  const [currentCityCode, setCurrentCityCode] = useState<string>(cityCode);

  const [formError, setFormError] = useState<string[]>([]);

  const codenameFormSubmit = () => {
    const err: string[] = [];

    if (!currentCityCode) {
      err.push("City code is required");
    }

    setFormError(err);

    if (err.length === 0) {
      setCodeBasedSolatTimeApiParams({
        ...codeBasedSolatTimeApiParams,
        code: currentCityCode,
      });
      setFormModalOpen(false);
    }
  };

  return (
    <Modal onClick={() => setFormModalOpen(!formModalIsOpen)}>
      <Flex yPadding={SPACING.small} salt="bg-black/30 pr-[3.5rem]" fill>
        Address Settings
      </Flex>
      <Flex fill direction="column" salt="overflow-x-hidden">
        <Address
          state={currentState}
          setCurrentState={setCurrentState}
          city={currentCityCode}
          setCity={setCurrentCityCode}
        />
      </Flex>

      {formError.length > 0 && (
        <Flex
          yPadding={SPACING.none}
          salt="relative bottom-[17px]"
          direction="column"
          align={ALIGN_ITEMS.start}
        >
          {formError.map((err, _idx) => {
            return (
              <div
                key={`form-error-${_idx}-${Math.random()}`}
                className="pl-2 text-rose-700"
              >
                {err}
              </div>
            );
          })}
        </Flex>
      )}
      <Flex
        fill
        justify={JUSTIFY_CONTENT.between}
        yPadding={SPACING.none}
        gap={SPACING.small}
        salt="mb-6 flex-wrap"
      >
        <Button
          label="Use Current Location"
          salt="text-center w-full md:w-fit md:text-start py-[.5rem] px-5 border-solid border-primary border-[1px] rounded-full justify-center flex"
          variant={BUTTON.reset}
          onClick={getPrayerTimesCoords}
          isLoading={getPrayerTimesCoordsIsLoading}
        />
        <Button
          label="Confirm"
          yPadding={SPACING.reset}
          salt="md:w-fit py-[.5rem]"
          isLoading={getPrayerTimesCodenameIsLoading}
          fill
          onClick={codenameFormSubmit}
        />
      </Flex>
    </Modal>
  );
};

export default ChangeLocation;
