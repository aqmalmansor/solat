import Button from "components/Button";
import { useEffect, useState } from "react";

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

const InstallPWA = (): JSX.Element => {
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(null);

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
    if (prompt) {
      prompt.prompt();

      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("The app was added to the home screen");
        } else {
          alert("The app was not added to the home screen");
        }
      });
    }
  };

  return (
    <Button
      label="Install App"
      onClick={handleAddToHomeScreenClick}
      type={
        "absolute top-[.5rem] left-[1.4rem] bg-secondary text-white text-[.6rem] px-3 py-[.5rem] "
      }
    />
  );
};

export default InstallPWA;
