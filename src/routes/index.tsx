import React from "react";

import { SideLayout } from "../layouts";
import { GenerateReport, NotFound, ViewReport, ReportCheckup } from "../pages";
import { Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SideLayout />}>
        <Route path="/checkup/:checkUpId" element={<ViewReport />} />
        <Route index element={<GenerateReport />} />
      </Route>
      <Route path="/report/checkup/:checkupId" element={<ReportCheckup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
