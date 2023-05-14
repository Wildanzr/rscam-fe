import type { ItemType } from "antd/es/breadcrumb/Breadcrumb";

import React from "react";
import { useGlobalContext } from "../contexts/Global";

import { Indicator } from "../components/other";
import { Breadcrumb, Layout } from "antd";


interface IAppLayout {
  title: string;
  breadcrumb: ItemType[];
  children: React.ReactNode;
}

interface IGlobalContext {
  isOnline: boolean;
}

const AppLayout: React.FC<IAppLayout> = (props: IAppLayout) => {
  // Props Destructuring
  const { title, breadcrumb, children } = props;

  // Global States
  const { globalStates } = useGlobalContext() as { globalStates: IGlobalContext };
  const { isOnline } = globalStates;
  
  return (
    <Layout className="site-layout">
      <div className="flex flex-col w-full h-full bg-slate-100">
        <div className="flex w-full items-center justify-between py-4 bg-white px-3">
          <p className="text-2xl font-medium mb-0">{title}</p>
          <Indicator status={isOnline} />
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
