import Flex from "components/Flex";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "entities/tailwind";

const OfflinePage = () => {
  return (
    <Flex
      fill
      salt="min-h-screen"
      align={ALIGN_ITEMS.center}
      justify={JUSTIFY_CONTENT.center}
    >
      Offline Mode
    </Flex>
  );
};

export default OfflinePage;
