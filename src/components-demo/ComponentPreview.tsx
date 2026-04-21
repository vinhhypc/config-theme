import React from "react";
import { Space } from "antd";
import BusinessCustomerListDemo from "@/components-demo/BusinessCustomerListDemo";
import BasicDemoCard from "@/components-demo/BasicDemoCard";
import DataDisplayDemoCard from "@/components-demo/DataDisplayDemoCard";
import FeedbackDemoCard from "@/components-demo/FeedbackDemoCard";
import FormDemoCard from "@/components-demo/FormDemoCard";
import NavigationDemoCard from "@/components-demo/NavigationDemoCard";

/** Right panel: render grouped Ant Design component demos. */
export default function ComponentPreview() {
  return (
    <Space direction="vertical" size={16} style={{ width: "100%" }}>
      <BusinessCustomerListDemo />
      <BasicDemoCard />
      <FormDemoCard />
      <DataDisplayDemoCard />
      <FeedbackDemoCard />
      <NavigationDemoCard />
    </Space>
  );
}
