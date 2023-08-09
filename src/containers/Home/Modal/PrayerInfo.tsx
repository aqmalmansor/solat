import { useUIStore } from "store/ui";

import Flex from "components/Flex";
import Modal from "components/Modal";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "entities/tailwind";

const PrayerInfo = () => {
  const { setSolatInfoModalIsOpen, solatInfoModalIsOpen, solat } = useUIStore();

  if (!solat) {
    return null;
  }

  return (
    <Modal onClick={() => setSolatInfoModalIsOpen(!solatInfoModalIsOpen)}>
      <Flex
        direction="column"
        justify={JUSTIFY_CONTENT.start}
        align={ALIGN_ITEMS.start}
      >
        {Object.values(solat).map((item, idx) => {
          if (idx === 0) {
            return null;
          }

          return <div>{item}</div>;
        })}
      </Flex>
    </Modal>
  );
};

export default PrayerInfo;
