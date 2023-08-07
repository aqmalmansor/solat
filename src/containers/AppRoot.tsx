import { AnimatePresence } from "framer-motion";
import Routes from "../navigation/Routes";

const AppRoot = () => {
  return (
    <AnimatePresence>
      <Routes />
    </AnimatePresence>
  );
};

export default AppRoot;
