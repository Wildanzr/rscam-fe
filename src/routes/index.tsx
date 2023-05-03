import React from "react";

import { SideLayout } from "../layouts";
import { GenerateReport } from "../pages";
import { Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <SideLayout>
      <Routes>
        <Route path="/" element={<GenerateReport />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </SideLayout>
  );
};

export default AppRoutes;
