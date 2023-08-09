import { useState } from "react";
import SVG from "react-inlinesvg";

import Flex from "components/Flex";
import Modal from "components/Modal";
import { SPACING } from "entities/tailwind";
import { useUIStore } from "store/ui";
import helper, { platforms } from "utils/helper";
import icons from "assets/icons";

const HowToInstall = (): JSX.Element => {
  const { setInstallationGuideModalOpen } = useUIStore();

  const [platform, setPlatform] = useState<string>(helper.getPlatform());

  const renderInstallationGuide = () => {
    // Firefox mobile
    if (platform === platforms.FIREFOX) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>Tap this icon on the address bar</div>
            <SVG src={icons.A2HS.firefoxMenu} /> {/* firefoxMenu */}
          </Flex>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>then tap on the 'Install'</div>
            <SVG src={icons.A2HS.firefoxA2HS} /> {/* firefoxA2HS */}
          </Flex>
        </>
      );
    }

    // Opera mobile
    if (platform === platforms.OPERA) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>tap on the menu button</div>
            <SVG src={icons.A2HS.operaMenu} /> {/* operaMenu */}
          </Flex>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>then tap the 'Add to home screen'</div>
            <SVG src={icons.A2HS.operaA2HS} /> {/* operaA2HS */}
          </Flex>
        </>
      );
    }

    // IOS devices
    if (platform === platforms.IDEVICE) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>Tap this icon on the address bar</div>
            <SVG src={icons.A2HS.iosShare} /> {/* iosShare */}
          </Flex>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>then tap on the 'Add to Home Screen'</div>
            <SVG src={icons.A2HS.iosA2HS} /> {/* iosA2HS */}
          </Flex>
        </>
      );
    }

    // If browser doesnt support PWA installation
    return (
      <div>
        PWA is not supported on this browser. You can try using Google or Edge
        browser
      </div>
    );
  };

  return (
    <Modal onClick={() => setInstallationGuideModalOpen(false)}>
      {platform}
      <Flex>{renderInstallationGuide()}</Flex>

      <button type="button" onClick={() => setPlatform("idevice")}>
        IDEVICE
      </button>
      <button type="button" onClick={() => setPlatform("opera")}>
        OPERA
      </button>
      <button type="button" onClick={() => setPlatform("firefox")}>
        Firefox
      </button>
      <button type="button" onClick={() => setPlatform("firefox_new")}>
        FF New
      </button>
      <button type="button" onClick={() => setPlatform("native")}>
        Native
      </button>
      <button type="button" onClick={() => setPlatform("other")}>
        Other
      </button>
    </Modal>
  );
};

export default HowToInstall;
