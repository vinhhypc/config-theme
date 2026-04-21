import React, { useState } from "react";
import { Card, Pagination, Space, Tabs, Typography, theme } from "antd";
import type { TabsProps } from "antd";

/** Navigation group demo: Tabs + Pagination. */
export default function NavigationDemoCard() {
  const { token } = theme.useToken();
  const [page, setPage] = useState(1);

  const items: TabsProps["items"] = [
    {
      key: "tokens",
      label: "Tokens",
      children: <Typography.Paragraph style={{ margin: 0 }}>Đổi token để quan sát sự thay đổi realtime.</Typography.Paragraph>,
    },
    {
      key: "components",
      label: "Components",
      children: <Typography.Paragraph style={{ margin: 0 }}>Tabs và Pagination phản ánh màu/typography.</Typography.Paragraph>,
    },
    {
      key: "layout",
      label: "Layout",
      children: <Typography.Paragraph style={{ margin: 0 }}>Kiểm tra spacing và borderRadius tổng thể.</Typography.Paragraph>,
    },
  ];

  return (
    <Card title="Navigation" size="small" styles={{ body: { padding: token.paddingMD } }}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Tabs items={items} />
        <Pagination current={page} total={88} showSizeChanger={false} onChange={setPage} />
      </Space>
    </Card>
  );
}

