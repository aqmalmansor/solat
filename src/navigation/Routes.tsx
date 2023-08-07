import { FunctionComponent } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../containers/Home";
import OfflinePage from "containers/Offline";

const NavRoutes: FunctionComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/offline" element={<OfflinePage />} />

      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default NavRoutes;
