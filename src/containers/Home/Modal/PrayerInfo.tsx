import { useUIStore } from "store/ui";

import Flex from "components/Flex";
import Modal from "components/Modal";
import { ALIGN_ITEMS, JUSTIFY_CONTENT, SPACING } from "entities/tailwind";
import uuid from "react-uuid";

const PrayerInfo = () => {
  const { setSolatInfoModalIsOpen, solatInfoModalIsOpen, solat } = useUIStore();

  if (!solat) {
    return null;
  }

  return (
    <Modal onClick={() => setSolatInfoModalIsOpen(!solatInfoModalIsOpen)}>
      <Flex
        yPadding={SPACING.small}
        salt="bg-primary text-white pr-[3.5rem]"
        fill
      >
        {solat.name}
      </Flex>
      <Flex
        direction="column"
        justify={JUSTIFY_CONTENT.start}
        align={ALIGN_ITEMS.start}
      >
        {Object.values(solat).map((item, idx) => {
          if (idx === 0 || idx === 1) {
            return null;
          }

          return <div key={uuid()}>{item}</div>;
        })}
      </Flex>
    </Modal>
  );
};

export default PrayerInfo;
