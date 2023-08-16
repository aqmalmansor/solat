import Container from "components/Container";
import Flex from "components/Flex";
import { JUSTIFY_CONTENT } from "entities/tailwind";
import InstallPWA from "./Button/InstallPWA";

interface NavbarProps {
  pwaReady: boolean;
  displayInstallationGuide: boolean;
}

const Navbar = ({
  pwaReady,
  displayInstallationGuide,
}: NavbarProps): JSX.Element => {
  return (
    <Container fill id="navbar" parentSalt="bg-black text-white">
      <Flex justify={JUSTIFY_CONTENT.between}>
        <div>Logo</div>
        <Flex noPadding fill={false}>
          {pwaReady && <InstallPWA manualInstall={displayInstallationGuide} />}
          <div>Etc</div>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
