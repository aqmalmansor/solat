import { useState } from "react";
import SVG from "react-inlinesvg";

import Flex from "components/Flex";
import Modal from "components/Modal";
import { ALIGN_ITEMS, JUSTIFY_CONTENT, SPACING } from "entities/tailwind";
import { useUIStore } from "store/ui";
import helper, { platforms } from "utils/helper";
import icons from "assets/icons";
import Button from "components/Button";

const GuideIcon = ({ src }: { src: string }) => {
  return <SVG src={src} height={20} width={20} fill="#111" />;
};

const HowToInstall = (): JSX.Element => {
  const { setInstallationGuideModalOpen } = useUIStore();

  const [platform, setPlatform] = useState<string>(helper.getPlatform());

  const renderInstallationGuide = () => {
    // Firefox mobile
    if (platform === platforms.FIREFOX) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>1. Tap this icon on the address bar</div>
            <GuideIcon src={icons.A2HS.firefoxMenu} />
          </Flex>
          <div>2. Then tap on 'Install'</div>
        </>
      );
    }

    // Opera mobile
    if (platform === platforms.OPERA) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>1. Tap on the menu button</div>
            <GuideIcon src={icons.A2HS.operaMenu} />
          </Flex>
          <Flex noPadding gap={SPACING.extraSmall} salt="flex-wrap">
            <div>2. Then tap the 'Add to home screen' button</div>
            <GuideIcon src={icons.A2HS.operaA2HS} />
          </Flex>
        </>
      );
    }

    // IOS devices
    if (platform === platforms.IDEVICE) {
      return (
        <>
          <Flex noPadding gap={SPACING.extraSmall}>
            <div>1. Tap this icon on the address bar</div>
            <GuideIcon src={icons.A2HS.iosShare} />
          </Flex>
          <Flex noPadding gap={SPACING.extraSmall} salt="flex-wrap">
            <div>2. Then tap on the 'Add to Home Screen'</div>
            <GuideIcon src={icons.A2HS.iosA2HS} />
          </Flex>
        </>
      );
    }

    // If browser doesnt support PWA installation
    return (
      <Flex
        justify={JUSTIFY_CONTENT.center}
        align={ALIGN_ITEMS.center}
        direction="column"
        salt="min-h-[150px]"
      >
        <div>
          PWA is not supported on this browser. You can try using Google or Edge
          browser
        </div>
        <Button
          label="Close"
          onClick={() => setInstallationGuideModalOpen(false)}
        />
      </Flex>
    );
  };

  return (
    <Modal onClick={() => setInstallationGuideModalOpen(false)}>
      <Flex direction="column" salt="bg-rose-900" gap={SPACING.small}>
        <div className="h2 mb-2 w-full text-start">How To Install</div>
        {renderInstallationGuide()}
      </Flex>

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
