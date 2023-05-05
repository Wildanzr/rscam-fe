import React from "react";

import { SideLayout } from "../layouts";
import { GenerateReport, NotFound, ViewReport } from "../pages";
import { Routes, Route } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <SideLayout>
      <Routes>
        <Route path="/">
          <Route path="/checkup/:checkUpId" element={<ViewReport />} />
          <Route index element={<GenerateReport />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SideLayout>
  );
};

export default AppRoutes;
