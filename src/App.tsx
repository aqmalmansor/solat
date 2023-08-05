import AppRoot from "./containers/AppRoot";

import packageJson from "../package.json";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log(`${packageJson.version}`);
  }, []);

  return <AppRoot />;
};

export default App;
