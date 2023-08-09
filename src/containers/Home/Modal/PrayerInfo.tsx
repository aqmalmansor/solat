import { useUIStore } from "store/ui";

import Flex from "components/Flex";
import Modal from "components/Modal";

const PrayerInfo = () => {
  const { setSolatInfoModalIsOpen, solatInfoModalIsOpen, solat } = useUIStore();

  if (!solat) {
    return null;
  }

  return (
    <Modal onClick={() => setSolatInfoModalIsOpen(!solatInfoModalIsOpen)}>
      <Flex>{solat.name}</Flex>
    </Modal>
  );
};

export default PrayerInfo;
