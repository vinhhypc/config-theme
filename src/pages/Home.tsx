import React from "react";
import { Button, Card, Col, Layout, Row, Space, Typography, theme } from "antd";
import { Link } from "react-router-dom";
import ThemeConfigPanel from "@/config-panel/ThemeConfigPanel";
import ComponentPreview from "@/components-demo/ComponentPreview";

/** Main playground page: left theme panel, right live preview. */
export default function Home() {
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", background: token.colorBgLayout }}>
      <Layout.Header
        style={{
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          paddingInline: token.paddingLG,
          height: 56,
          lineHeight: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <Space size={12}>
            <Typography.Text strong style={{ fontSize: 16 }}>
              Theme Playground
            </Typography.Text>
            <Typography.Text type="secondary">
              Panel trái chỉnh theme → preview cập nhật realtime
            </Typography.Text>
          </Space>
          <Space size={12}>
            <Link to="/shadcn">
              <Button type="link">Shadcn Playground</Button>
            </Link>
            <Typography.Text type="secondary">
              Ant Design v6 · React + TS
            </Typography.Text>
          </Space>
        </div>
      </Layout.Header>

      <Layout.Content style={{ padding: token.paddingLG }}>
        <Row gutter={[16, 16]} align="top">
          <Col xs={24} lg={8}>
            <ThemeConfigPanel />
          </Col>
          <Col xs={24} lg={16}>
            <Card
              title="Preview"
              size="small"
              styles={{ body: { padding: token.paddingMD } }}
            >
              <ComponentPreview />
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}
