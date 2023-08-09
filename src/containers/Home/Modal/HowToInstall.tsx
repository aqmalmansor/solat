import Modal from "components/Modal"
import { useUIStore } from "store/ui";
import helper from "utils/helper"

const HowToInstall = ():JSX.Element => {

    const platform = helper.getPlatform();

    const { setInstallationGuideModalOpen} = useUIStore()

  return (
    <Modal onClick={() => setInstallationGuideModalOpen(false)}>
        <div> Render Modal Content Later - {platform}</div>
    </Modal>
  )
}

export default HowToInstall