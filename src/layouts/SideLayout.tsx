import type { MenuProps } from "antd";
import { useState } from "react";

import { Layout, Menu } from "antd";
import {
  RiDashboard3Line,
  RiFileCopy2Line,
  RiHospitalLine,
} from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];
type AppLayoutProps = {
  children: React.ReactNode;
};

const { Sider } = Layout;

const SideLayout = (props: AppLayoutProps) => {
  // Props Destructuring
  const { children } = props;

  // Local States
  const [collapsed, setCollapsed] = useState(false);

  // Function to get menu item
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ) => {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem("Dashboard", "1", <RiDashboard3Line />),
    getItem("Pemeriksaan", "2", <RiFileCopy2Line />),
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="flex flex-row w-full items-center justify-center space-x-3 py-5 text-white text-4xl">
          <RiHospitalLine />
          {!collapsed && (
            <span className="text-xl font-medium tracking-wider">RSCam</span>
          )}
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      {children}
    </Layout>
  );
};

export default SideLayout;
