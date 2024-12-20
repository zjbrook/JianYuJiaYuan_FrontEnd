import React, { ReactNode } from "react";
import "./index.less";
import { Layout } from "antd";
import PageMenu from "./pageMenu";
import PageHeader from "./pageHeader";
import { ConfigProvider } from "antd";
const { Header, Sider, Content } = Layout;

interface HomeLayoutProps {
  children: ReactNode;
}

function HomeLayout(props: HomeLayoutProps) {
  const { children } = props;

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { headerPadding: "0 24px" },
        },
      }}
    >
      <Layout className="HomeLayout">
        <Header className="HomeLayoutHeader">
          <PageHeader />
        </Header>
        <Layout className="HomeLayoutBody">
          <Sider className="HomeLayoutSider">
            <PageMenu />
          </Sider>
          <Content className="HomeLayoutContent">{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default HomeLayout;
