import dayjs from "dayjs";
import type { TableProps } from "antd";

export type UserRow = {
  key: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Suspended";
  lastLogin: string;
};

/** Provide mock data for Table/List/Avatars used by the demo preview. */
export function buildMockData() {
  const users: UserRow[] = [
    {
      key: "u1",
      name: "Nguyễn An",
      email: "an.nguyen@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: dayjs().subtract(2, "hour").format("YYYY-MM-DD HH:mm"),
    },
    {
      key: "u2",
      name: "Trần Bình",
      email: "binh.tran@example.com",
      role: "Editor",
      status: "Invited",
      lastLogin: dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm"),
    },
    {
      key: "u3",
      name: "Lê Chi",
      email: "chi.le@example.com",
      role: "Viewer",
      status: "Suspended",
      lastLogin: dayjs().subtract(14, "day").format("YYYY-MM-DD HH:mm"),
    },
  ];

  const tableColumns: TableProps<UserRow>["columns"] = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Last login", dataIndex: "lastLogin", key: "lastLogin" },
  ];

  const tags = [
    { label: "Design System", color: "blue" as const },
    { label: "Token", color: "purple" as const },
    { label: "Accessibility", color: "green" as const },
    { label: "Responsive", color: "gold" as const },
  ];

  const listItems = [
    {
      key: "l1",
      title: "Review token changes",
      description: "Kiểm tra ảnh hưởng lên Button/Input/Tabs/Table.",
      badge: 3,
    },
    {
      key: "l2",
      title: "Update border radius",
      description: "Đổi borderRadius để xem Card/Tag/Avatar phản ánh.",
      badge: 1,
    },
    {
      key: "l3",
      title: "Dark mode snapshot",
      description: "Chuyển sang darkAlgorithm và quan sát contrast.",
      badge: 0,
    },
  ];

  return { users, tableColumns, tags, listItems };
}

