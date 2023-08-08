import Button from "components/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      setIsLoading(true);
      alert('not manual install')
      if (prompt) {
        alert('prompting')
        prompt.prompt();
        prompt.userChoice
          .then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
              console.log("The app was added to the home screen");
              setIsLoading(false);
            } else {
              alert("The app was not added to the home screen");
              setIsLoading(false);
            }
            alert('user choice')
          })
          .catch((err) => {
            toast.error(err.message);
            setIsLoading(false);
            alert(`Error ${err.message}`)
          });
      } else {
        setIsLoading(false);
        if(manualInstall){
          toast.success(
            "Trigger modal to display the info on how to install the app across different browsers"
          );
        }
      }
  };

  return (
    <Button
      label={ isLoading ? 'Installing':  "Install App"}
      onClick={handleAddToHomeScreenClick}
      type="absolute top-[.5rem] left-[1.4rem] bg-secondary text-white text-[.6rem] px-3 py-[.5rem]"
    />
  );
};

export default InstallPWA;
