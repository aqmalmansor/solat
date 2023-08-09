import Flex from "components/Flex";
import Modal from "components/Modal";
import { useUIStore } from "store/ui";
import { compulsaryPrayerPlaceholder } from "utils/placeholder";

const PrayerInfo = () => {
  const { setSolatInfoModalIsOpen, solatInfoModalIsOpen, solat } = useUIStore();

  const modalSolat = compulsaryPrayerPlaceholder.find(
    (item) => item.id === solat
  );

  if (!modalSolat) {
    return null;
  }

  return (
    <Modal onClick={() => setSolatInfoModalIsOpen(!solatInfoModalIsOpen)}>
      <Flex>{modalSolat.name}</Flex>
    </Modal>
  );
};

export default PrayerInfo;
