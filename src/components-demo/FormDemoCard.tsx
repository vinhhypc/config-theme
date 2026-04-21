import React, { useMemo } from "react";
import { Card, Checkbox, DatePicker, Form, Input, Radio, Select, Space, Switch, Button, theme } from "antd";
import dayjs from "dayjs";

type SimpleFormValues = {
  email: string;
  plan: "starter" | "pro";
  notify: boolean;
};

/** Form group demo: inputs and a small validated form. */
export default function FormDemoCard() {
  const { token } = theme.useToken();
  const selectOptions = useMemo(
    () => [
      { label: "Starter", value: "starter" },
      { label: "Pro", value: "pro" },
    ],
    [],
  );

  return (
    <Card title="Form" size="small" styles={{ body: { padding: token.paddingMD } }}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space wrap style={{ width: "100%" }}>
          <Input style={{ width: 220 }} placeholder="Input" />
          <Input.Password style={{ width: 220 }} placeholder="Input.Password" />
          <Select style={{ width: 220 }} options={selectOptions} placeholder="Select" />
          <DatePicker defaultValue={dayjs()} />
        </Space>

        <Space wrap>
          <Checkbox defaultChecked>Checkbox</Checkbox>
          <Radio.Group defaultValue="a" options={[{ label: "Radio A", value: "a" }, { label: "Radio B", value: "b" }]} />
          <Space>
            <span>Switch</span>
            <Switch defaultChecked />
          </Space>
        </Space>

        <Form<SimpleFormValues>
          layout="vertical"
          requiredMark={false}
          initialValues={{ plan: "starter", notify: true }}
          onFinish={() => undefined}
        >
          <Space wrap style={{ alignItems: "flex-end" }}>
            <Form.Item
              label="Email"
              name="email"
              style={{ width: 260, marginBottom: 0 }}
              rules={[{ required: true, message: "Vui lòng nhập email" }, { type: "email", message: "Email không hợp lệ" }]}
            >
              <Input placeholder="you@company.com" />
            </Form.Item>
            <Form.Item label="Plan" name="plan" style={{ width: 180, marginBottom: 0 }}>
              <Select options={selectOptions} />
            </Form.Item>
            <Form.Item label="Notify" name="notify" valuePropName="checked" style={{ marginBottom: 0 }}>
              <Switch />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Space>
    </Card>
  );
}

