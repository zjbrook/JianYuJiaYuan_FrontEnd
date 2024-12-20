import React from "react";
import "./index.less";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import { loginPath, personalInformationPath } from "@/consts/pathname";

function PageHeader() {
  const navigate = useNavigate();
  const toPersonalInformation = () => {
    console.log("[debug] 个人信息");
    navigate(personalInformationPath, { replace: true });
  };

  const toLogOutOfLogin = () => {
    console.log("[debug] 注销登录");
    navigate(loginPath, { replace: true });
  };

  const items: MenuProps["items"] = [
    {
      key: "PersonalInformation",
      label: <a>个人信息</a>,
      onClick: toPersonalInformation,
    },
    {
      key: "LogOutOfLogin",
      label: <a>注销登录</a>,
      onClick: toLogOutOfLogin,
    },
  ];

  return (
    <div className="PageHeader">
      <span className="PageHeaderTitle">剑与家园</span>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Avatar size="large" icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
}

export default PageHeader;
