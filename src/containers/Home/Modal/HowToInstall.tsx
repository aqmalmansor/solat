import Flex from "components/Flex";
import Modal from "components/Modal";
import Button from "components/Button";

import { ALIGN_ITEMS, JUSTIFY_CONTENT, SPACING } from "entities/tailwind";

import { useUIStore } from "store/ui";

import helper, { platforms } from "utils/helper";

import icons from "assets/icons";

const HowToInstall = (): JSX.Element => {
  const { setInstallationGuideModalOpen } = useUIStore();
  const platform = helper.getPlatform();

  const renderHeader = () => {
    if (
      platform === platforms.FIREFOX ||
      platform === platforms.OPERA ||
      platform === platforms.IDEVICE
    ) {
      return <div className="h2 mb-3 w-full font-semibold">How To Install</div>;
    }

    return null;
  };

  const renderInstallationGuide = () => {
    // Firefox mobile
    if (platform === platforms.FIREFOX) {
      return (
        <Flex yPadding={SPACING.none}>
          <ol className="list-decimal space-y-6">
            <li>
              Tap this icon on the address bar&nbsp;
              <img
                src={icons.A2HS.firefoxMenu}
                className="inline h-[20px] w-[20px]"
              />
            </li>
            <li>Then tap on 'Install'</li>
          </ol>
        </Flex>
      );
    }

    // Opera mobile
    if (platform === platforms.OPERA) {
      return (
        <Flex yPadding={SPACING.none}>
          <ol className="list-decimal space-y-6">
            <li>
              Tap this icon on the address bar
              <img
                src={icons.A2HS.operaMenu}
                className="inline h-[20px] w-[20px]"
              />
            </li>
            <li>
              Then tap on the 'Add to Home Screen'&nbsp;
              <img
                src={icons.A2HS.operaA2HS}
                className="inline h-[20px] w-[20px]"
              />
            </li>
          </ol>
        </Flex>
      );
    }

    // IOS devices
    if (platform === platforms.IDEVICE) {
      return (
        <Flex yPadding={SPACING.none}>
          <ol className="list-decimal space-y-6">
            <li>
              Tap this icon on the address bar &nbsp;
              <img
                src={icons.A2HS.iosShare}
                className="inline h-[20px] w-[20px]"
              />
            </li>
            <li>
              Then tap on the 'Add to Home Screen' &nbsp;
              <img
                src={icons.A2HS.iosA2HS}
                className="inline h-[20px] w-[20px]"
              />
            </li>
          </ol>
        </Flex>
      );
    }

    // If browser doesnt support PWA installation
    return (
      <Flex
        xPadding={SPACING.none}
        yPadding={SPACING.extraSmall}
        direction="column"
        justify={JUSTIFY_CONTENT.center}
        align={ALIGN_ITEMS.center}
      >
        <div>
          PWA is not supported on this browser. You can try using Google or Edge
          browser
        </div>
      </Flex>
    );
  };

  return (
    <Modal
      onClick={() => setInstallationGuideModalOpen(false)}
      height="min-h-none"
    >
      <Flex yPadding={SPACING.small} salt="bg-black/30 pr-[3.5rem]" fill>
        Installation Guide
      </Flex>
      <Flex
        direction="column"
        gap={SPACING.extraSmall}
        yPadding={SPACING.reset}
        salt="pt-2 pb-5"
        justify={JUSTIFY_CONTENT.start}
        align={ALIGN_ITEMS.start}
      >
        {renderHeader()}
        {renderInstallationGuide()}
        <Flex justify={JUSTIFY_CONTENT.center} noPadding>
          <Button
            label="Close"
            fill
            yPadding={SPACING.extraSmall}
            xPadding={SPACING.extraSmall}
            onClick={() => setInstallationGuideModalOpen(false)}
          />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default HowToInstall;
