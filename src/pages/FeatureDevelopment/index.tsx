import React from "react";
import Page from "@/components/Page";
import PageTable from "@/components/Table";

function FeatureDevelopment() {
  const columns = []
  const data = []
  return (
    <Page pageTitle="特性开发">
      <PageTable columns={columns} data={data} />
    </Page>
  );
}

export default FeatureDevelopment;
