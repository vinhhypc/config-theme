import React, { useCallback, useState } from "react";
import { Alert, Button, Card, Modal, Progress, Space, Spin, theme } from "antd";

/** Feedback group demo: Alert + Progress + Spin + Modal trigger. */
export default function FeedbackDemoCard() {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <Card title="Feedback" size="small" styles={{ body: { padding: token.paddingMD } }}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Alert message="Info" description="Token colorPrimary sẽ ảnh hưởng màu nhấn." type="info" showIcon />
          <Alert message="Success" description="Kiểm tra contrast ở light/dark." type="success" showIcon />
        </Space>

        <Space wrap style={{ width: "100%" }}>
          <Progress percent={35} style={{ width: 220 }} />
          <Progress type="circle" percent={72} size={64} />
          <Spin tip="Loading" />
        </Space>

        <div>
          <Button type="primary" onClick={openModal}>
            Open Modal
          </Button>
          <Modal
            title="Example Modal"
            open={open}
            onOk={closeModal}
            onCancel={closeModal}
            okText="OK"
            cancelText="Cancel"
          >
            Nội dung modal để bạn kiểm tra borderRadius, padding và style tổng thể.
          </Modal>
        </div>
      </Space>
    </Card>
  );
}
