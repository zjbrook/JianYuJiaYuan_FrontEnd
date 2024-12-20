import React, { ReactNode } from "react";
import "./index.less";

interface PageProps {
  pageTitle: string;
  children: ReactNode;
}

function Page(props: PageProps) {
  const { children, pageTitle } = props;
  return (
    <div className="PageContainer">
      {/* <div className="PageHeader">{pageTitle}</div> */}
      <div className="PageBody">
        <div className="PageHeader">
          <span className="PageTitle">{pageTitle}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Page;
