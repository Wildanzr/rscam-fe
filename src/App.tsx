import { useEffect, useState } from "react";

import { Breadcrumb, Layout, Menu } from "antd";
import {
  RiDashboard3Line,
  RiUser3Line,
  RiTeamLine,
  RiFileCopy2Line,
  RiHospitalLine,
} from "react-icons/ri";

import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const { Sider } = Layout;

const App = () => {
  // Local States
  const [collapsed, setCollapsed] = useState(false);
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
    getItem("User", "sub1", <RiUser3Line />, [
      getItem("Tom", "2"),
      getItem("Bill", "3"),
      getItem("Alex", "4"),
    ]),
    getItem("Team", "sub2", <RiTeamLine />, [
      getItem("Team 1", "5"),
      getItem("Team 2", "6"),
    ]),
    getItem("Files", "7", <RiFileCopy2Line />),
  ];

  // Priority tailwindcss over antd
  useEffect(() => {
    const head = document.querySelector("head");
    const styleTag = head?.querySelectorAll<HTMLStyleElement>("style");
    const tailwindStyleTag = [...(styleTag ?? [])].find((style) =>
      style.innerHTML.includes("tailwind")
    );
    head?.insertAdjacentElement(
      "afterbegin",
      tailwindStyleTag ?? document.createElement("style")
    );
  }, []);

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
      <Layout className="site-layout">
        <div className="flex flex-col w-full h-full bg-slate-100">
          <div className="flex w-full items-center justify-start py-4 bg-white px-3">
            <p className="w-full text-2xl font-medium mb-0">Dashboard</p>
          </div>
          <div className="flex flex-col w-full h-full space-y-2 px-3 py-3">
            <Breadcrumb>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="flex flex-col w-full h-full bg-white p-2">
              Hello there
            </div>
          </div>
          <div className="flex w-full items-center justify-center py-4 bg-white">
            <p>©2023 RSCam</p>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
