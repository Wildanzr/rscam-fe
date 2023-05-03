import React from "react";
import { Breadcrumb, Layout } from "antd";

import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";

type AppLayoutProps = {
  title: string;
  breadcrumb: ItemType[];
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = (props: AppLayoutProps) => {
  // Props Destructuring
  const { title, breadcrumb, children } = props;

  return (
    <Layout className="site-layout">
      <div className="flex flex-col w-full h-full bg-slate-100">
        <div className="flex w-full items-center justify-start py-4 bg-white px-3">
          <p className="w-full text-2xl font-medium mb-0">{title}</p>
        </div>
        <div className="flex flex-col w-full h-full space-y-2 px-3 py-3">
          <Breadcrumb items={breadcrumb} />
          <div className="flex flex-col w-full h-full bg-white p-5 rounded-lg">
            {children}
          </div>
        </div>
        <div className="flex w-full items-center justify-center py-4 bg-white">
          <p>©2023 RSCam</p>
        </div>
      </div>
    </Layout>
  );
};

export default AppLayout;
