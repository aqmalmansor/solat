import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Routes from "../navigation/Routes";

const AppRoot = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const navigate = useNavigate();

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      navigate("/offline");
    } else {
      navigate("/");
    }
  }, [navigator.onLine]);

  return (
    <AnimatePresence>
      <Routes />
    </AnimatePresence>
  );
};

export default AppRoot;
