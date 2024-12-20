import React, { ReactNode } from "react";
import "./index.less";

interface LoginLayoutProps {
  children: ReactNode;
}

function LoginLayout(props: LoginLayoutProps) {
  const { children } = props;
  return <div className="LoginLayout">{children}</div>;
}

export default LoginLayout;
