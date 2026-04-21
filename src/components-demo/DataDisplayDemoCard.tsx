import React, { useMemo } from "react";
import { Avatar, Badge, Card, List, Space, Table, Tag, Typography, theme } from "antd";
import { buildMockData } from "@/components-demo/mockData";

/** Data display group demo: Table + Tag + Avatar + Badge + List. */
export default function DataDisplayDemoCard() {
  const { token } = theme.useToken();
  const { users, tableColumns, tags, listItems } = useMemo(() => buildMockData(), []);

  return (
    <Card title="Data Display" size="small" styles={{ body: { padding: token.paddingMD } }}>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space wrap>
          {tags.map((t) => (
            <Tag key={t.label} color={t.color}>
              {t.label}
            </Tag>
          ))}
        </Space>

        <Space wrap>
          <Badge count={5}>
            <Avatar shape="square" size={40} style={{ backgroundColor: token.colorPrimary }}>A</Avatar>
          </Badge>
          <Badge dot>
            <Avatar size={40} style={{ backgroundColor: token.colorSuccess }}>B</Avatar>
          </Badge>
          <Avatar.Group>
            <Avatar size={32} style={{ backgroundColor: token.colorPrimary }}>NA</Avatar>
            <Avatar size={32} style={{ backgroundColor: token.colorWarning }}>TB</Avatar>
            <Avatar size={32} style={{ backgroundColor: token.colorError }}>LC</Avatar>
          </Avatar.Group>
        </Space>

        <Table
          size="small"
          columns={tableColumns}
          dataSource={users}
          pagination={false}
          scroll={{ x: 720 }}
        />

        <div>
          <Typography.Text strong>List</Typography.Text>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={listItems}
            renderItem={(item) => (
              <List.Item
                actions={[<Tag key="badge" color={item.badge ? "blue" : "default"}>{item.badge ? `${item.badge} new` : "ok"}</Tag>]}
              >
                <List.Item.Meta
                  avatar={<Avatar style={{ backgroundColor: token.colorPrimary }}>{item.title.slice(0, 1)}</Avatar>}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </Space>
    </Card>
  );
}

