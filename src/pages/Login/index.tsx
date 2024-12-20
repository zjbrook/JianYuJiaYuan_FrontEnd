import React from "react";
import "./index.less";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { homeOverviewPath } from "../../consts/pathname";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function LoginPage() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    navigate(homeOverviewPath, { replace: true });
  };

  // const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div className="LoginPage">
      <div className="LoginDlg">
        <p className="LoginDlgHeader">欢迎使用存储之家！</p>
        {/* <Form
          className="LoginPageForm"
          name="basic"
          labelCol={{ offset: 12 }}
          wrapperCol={{ offset: 4, span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="用户名称"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="登录密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="LoginButton">
              登录
            </Button>
          </Form.Item>
        </Form> */}
        <Form
          name="normal_login"
          className="LoginPageForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              className="LoginInput"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名称"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              className="LoginInput"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="登录密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="LoginButton">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
