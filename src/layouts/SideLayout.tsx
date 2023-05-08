import type { MenuProps } from "antd";
import { useState } from "react";

import { Layout, Menu } from "antd";
import {
  RiDashboard3Line,
  RiHospitalLine,
} from "react-icons/ri";
import { useNavigate, Outlet } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

const SideLayout = () => {
  // Navigator
  const navigate = useNavigate();

  // Local States
  const [collapsed, setCollapsed] = useState(false);

  // Function to get menu item
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLElement>,
    children?: MenuItem[]
  ) => {
    return {
      key,
      icon,
      children,
      onClick,
      label,
    } as MenuItem;
  };

  const navigateTo = (path: string) => {
    navigate(path);
  }

  const items: MenuItem[] = [
    getItem("Dashboard", "1", <RiDashboard3Line />, () => navigateTo("/")),
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
      <Outlet />
    </Layout>
  );
};

export default SideLayout;
