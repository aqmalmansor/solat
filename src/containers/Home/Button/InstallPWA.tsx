import Button from "components/Button";
import { BUTTON } from "entities/tailwind";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUIStore } from "store/ui";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

interface InstallPWAProps {
  manualInstall: boolean;
}

const InstallPWA = ({ manualInstall }: InstallPWAProps): JSX.Element => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setInstallationGuideModalOpen } = useUIStore();

  useEffect(() => {
    const handler = (event: BeforeInstallPromptEvent) => {
      setPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleAddToHomeScreenClick = () => {
    // display loader
    setIsLoading(true);
    // if prompt is true, beforeInstallPrompEvent is supported on the browser
    if (prompt) {
      prompt.prompt();
      prompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            // User successfully installed the app
            toast.success("The app was added to the home screen");
          } else {
            // User failed to install the app
            toast.error("The app was not added to the home screen");
          }
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
        });
    } else {
      // browser does not support beforeInstallPrompEvent
      setIsLoading(false);
      // if manual install is true, then display the modal which displays PWA installation depends on their browser
      if (manualInstall) {
        setInstallationGuideModalOpen(true);
      }
    }
  };

  return (
    <Button
      label={isLoading ? "Installing" : "Install App"}
      onClick={handleAddToHomeScreenClick}
      variant={BUTTON.reset}
      // salt="absolute top-[.5rem] left-[1.4rem] bg-secondary text-white text-[.6rem] px-3 py-[.5rem] rounded-full"
    />
  );
};

export default InstallPWA;
