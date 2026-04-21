import React, { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  DatePicker,
  Input,
  Layout,
  Menu,
  Space,
  Table,
  Tabs,
  Typography,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  Bell,
  HelpCircle,
  Mail,
  MessageCircle,
  Menu as MenuIcon,
  SlidersHorizontal,
  Undo2,
  Users,
} from "lucide-react";
import type { MenuProps } from "antd";
import type { TabsProps } from "antd";
import dayjs from "dayjs";

type CustomerRow = {
  key: string;
  name: string;
  accountNo: string;
  customerCode: string;
  custodyCode: string;
  accountType: string;
  openedAt: string;
  ihcStatus: string;
};

export default function BusinessCustomerListDemo() {
  const { token } = theme.useToken();
  const [tabKey, setTabKey] = useState<"leads" | "mine">("mine");
  const [sla, setSla] = useState<"T0" | "T-1">("T-1");

  const menuItems = useMemo<MenuProps["items"]>(
    () => [
      { key: "customers", label: "Quản lý khách hàng" },
      { key: "work", label: "Quản lý công việc" },
      { key: "kpi", label: "Hiệu suất hoạt động" },
    ],
    [],
  );

  const tabs = useMemo<TabsProps["items"]>(
    () => [
      { key: "leads", label: "Khách hàng tiềm năng" },
      { key: "mine", label: "Khách hàng của tôi" },
    ],
    [],
  );

  const data = useMemo<CustomerRow[]>(
    () => [
      {
        key: "1",
        name: "Vũ Thị Minh",
        accountNo: "1168150345",
        customerCode: "1168001736",
        custodyCode: "021C700659",
        accountType: "Cơ sở",
        openedAt: "07/06/2022",
        ihcStatus: "",
      },
      {
        key: "2",
        name: "Chu Thị Thanh Huyền",
        accountNo: "0001281287",
        customerCode: "1010000418",
        custodyCode: "021C368713",
        accountType: "Cơ sở",
        openedAt: "25/02/2021",
        ihcStatus: "",
      },
      {
        key: "3",
        name: "Lê Văn Cẩn",
        accountNo: "0403074720P",
        customerCode: "0403832102",
        custodyCode: "021C832102",
        accountType: "Phái sinh",
        openedAt: "25/01/2018",
        ihcStatus: "",
      },
      {
        key: "4",
        name: "Lê Văn Cẩn",
        accountNo: "0403074720",
        customerCode: "0403832102",
        custodyCode: "021C832102",
        accountType: "Cơ sở",
        openedAt: "23/01/2018",
        ihcStatus: "",
      },
      {
        key: "5",
        name: "Nguyễn Thị Diệu Thùy",
        accountNo: "0307005883",
        customerCode: "0307006629",
        custodyCode: "021C525326",
        accountType: "Cơ sở",
        openedAt: "12/10/2021",
        ihcStatus: "",
      },
      {
        key: "6",
        name: "Đặng Thị Thanh Lam",
        accountNo: "0307005306",
        customerCode: "0307004990",
        custodyCode: "021C412592",
        accountType: "Cơ sở",
        openedAt: "05/05/2021",
        ihcStatus: "",
      },
      {
        key: "7",
        name: "NGUYỄN HOÀNG THẮNG",
        accountNo: "0304017141",
        customerCode: "0304015054",
        custodyCode: "021C394611",
        accountType: "Cơ sở",
        openedAt: "16/03/2021",
        ihcStatus: "",
      },
    ],
    [],
  );

  const columns = useMemo<ColumnsType<CustomerRow>>(
    () => [
      {
        title: "Họ tên",
        dataIndex: "name",
        render: (value: string) => (
          <Button type="link" style={{ paddingInline: 0 }}>
            {value}
          </Button>
        ),
      },
      { title: "Số tài khoản", dataIndex: "accountNo" },
      { title: "Mã số khách hàng", dataIndex: "customerCode" },
      { title: "Số lưu ký", dataIndex: "custodyCode" },
      { title: "Loại tài khoản", dataIndex: "accountType" },
      { title: "Ngày mở tài khoản", dataIndex: "openedAt" },
      { title: "Trạng thái hoàn thiện IHC", dataIndex: "ihcStatus" },
    ],
    [],
  );

  return (
    <div
      style={{
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        overflow: "hidden",
        background: token.colorBgContainer,
      }}
    >
      <Layout style={{ background: token.colorBgContainer }}>
        <Layout.Header
          style={{
            height: 56,
            lineHeight: "56px",
            paddingInline: token.paddingLG,
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
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
            <Space size={16} style={{ minWidth: 0 }}>
              <div className="flex ">
                <img
                  src="src/assets/logoDSB.svg"
                  alt="VNDIRECT - Wisdom to success"
                  className="h-full w-auto"
                />
              </div>
              <Menu
                mode="horizontal"
                selectedKeys={["customers"]}
                items={menuItems}
                style={{
                  minWidth: 520,
                  borderBottom: "none",
                  background: "transparent",
                }}
              />
              <Button type="primary">Service Desk</Button>
            </Space>

            <Space size={12}>
              <Button type="text" icon={<Mail size={18} />} />
              <Button type="text" icon={<MessageCircle size={18} />} />
              <Badge count={9} size="small">
                <Button type="text" icon={<Bell size={18} />} />
              </Badge>
              <Button type="text" icon={<HelpCircle size={18} />} />
              <Space size={8}>
                <Avatar size={28} icon={<Users size={16} />} />
                <Typography.Text>Môi giới test</Typography.Text>
              </Space>
            </Space>
          </div>
        </Layout.Header>

        <Layout.Content style={{ padding: token.paddingLG }}>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Danh sách khách hàng
            </Typography.Title>

            <Tabs
              activeKey={tabKey}
              items={tabs}
              onChange={(k) => setTabKey(k as "leads" | "mine")}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Typography.Text strong>
                {tabKey === "mine"
                  ? "Khách hàng của tôi"
                  : "Khách hàng tiềm năng"}
              </Typography.Text>
              <Space size={8}>
                <Button
                  type={sla === "T0" ? "primary" : "default"}
                  onClick={() => setSla("T0")}
                >
                  T0
                </Button>
                <Button
                  type={sla === "T-1" ? "primary" : "default"}
                  onClick={() => setSla("T-1")}
                >
                  T-1
                </Button>
              </Space>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1.2fr auto",
                gap: 8,
              }}
            >
              <Input placeholder="Nhập tên khách hàng" allowClear />
              <Input placeholder="Số lưu ký" allowClear />
              <Input placeholder="Mã số khách hàng" allowClear />
              <Input placeholder="Số tài khoản" allowClear />
              <DatePicker.RangePicker
                allowClear
                placeholder={["Từ ngày", "Đến ngày"]}
                defaultValue={[dayjs().subtract(30, "day"), dayjs()]}
                style={{ width: "100%" }}
              />
              <Space size={8}>
                <Button type="primary">Áp dụng</Button>
                <Button icon={<Undo2 size={16} />}>Bỏ sắp xếp</Button>
                <Button icon={<SlidersHorizontal size={16} />}>Bộ lọc</Button>
              </Space>
            </div>

            <Space size={8}>
              <Button type="text" icon={<MenuIcon size={18} />} />
              <Button type="text" icon={<Mail size={18} />} />
              <Button type="text" icon={<MessageCircle size={18} />} />
              <Button type="text" icon={<Users size={18} />} />
            </Space>

            <Table<CustomerRow>
              rowSelection={{}}
              columns={columns}
              dataSource={data}
              size="middle"
              pagination={{ pageSize: 6 }}
              scroll={{ x: "max-content" }}
              style={{
                border: `1px solid ${token.colorBorderSecondary}`,
                borderRadius: token.borderRadiusLG,
              }}
            />
          </Space>
        </Layout.Content>
      </Layout>
    </div>
  );
}
