import React from "react";
import { Button, Card, Divider, Space, Typography, theme } from "antd";

/** Basic group demo: Button + Typography + Divider. */
export default function BasicDemoCard() {
  const { token } = theme.useToken();

  return (
    <Card title="Basic" size="small" styles={{ body: { padding: token.paddingMD } }}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space wrap>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="link">Link</Button>
          <Button disabled>Disabled</Button>
        </Space>

        <Divider style={{ margin: 0 }} />

        <div>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Typography sample
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: token.marginXS }}>
            Đây là đoạn mô tả ngắn để bạn quan sát <Typography.Text strong>fontSize</Typography.Text>, màu chữ và
            style của link.
          </Typography.Paragraph>
          <Typography.Paragraph style={{ margin: 0 }}>
            <Typography.Text type="secondary">Secondary text</Typography.Text> · <Typography.Link>Example link</Typography.Link>
          </Typography.Paragraph>
        </div>
      </Space>
    </Card>
  );
}

