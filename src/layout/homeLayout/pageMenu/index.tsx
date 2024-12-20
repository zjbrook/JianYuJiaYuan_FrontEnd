import React from "react";
import "./index.less";
import {
  BankOutlined,
  TrophyOutlined,
  AppstoreAddOutlined,
  BugOutlined,
  TeamOutlined,
  CoffeeOutlined,
  UserOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function PageMenu() {
  const navigate = useNavigate();
  const items: MenuItem[] = [
    {
      key: "HomeOverview",
      label: "家园总览",
      icon: <BankOutlined />,
    },
    {
      key: "ProductProject",
      label: "产品项目",
      icon: <TrophyOutlined />,
    },
    {
      key: "FeatureDevelopment",
      label: "特性开发",
      icon: <AppstoreAddOutlined />,
    },
    {
      key: "ProblemTracking",
      label: "问题跟踪",
      icon: <BugOutlined />,
    },
    {
      key: "TeamMembers",
      label: "团队成员",
      icon: <TeamOutlined />,
    },
    {
      key: "LifeForum",
      label: "生活论坛",
      icon: <CoffeeOutlined />,
    },
    {
      key: "PersonalInformation",
      label: "个人信息",
      icon: <UserOutlined />,
    },
    {
      key: "DailyTodoList",
      label: "日常待办",
      icon: <BarsOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (item) => {
    const { keyPath } = item;
    const newPath = "/" + keyPath.reverse().join("/");
    console.log("[debug] to newPath:", newPath);
    navigate(newPath, { replace: true });
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
}

export default PageMenu;
