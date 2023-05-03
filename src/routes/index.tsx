import React from "react";

import { SideLayout } from "../layouts";
import { GenerateReport, NotFound } from "../pages";
import { Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <SideLayout>
      <Routes>
        <Route path="/" element={<GenerateReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SideLayout>
  );
};

export default AppRoutes;
