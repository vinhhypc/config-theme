import React, { useMemo, useState } from "react";
import {
  Bell,
  HelpCircle,
  Mail,
  Menu,
  MessageCircle,
  SlidersHorizontal,
  Undo2,
  Users,
} from "lucide-react";
import { UIButton } from "@/components/ui/button";
import { UIBadge } from "@/components/ui/badge";
import { UICard, UICardContent, UICardHeader } from "@/components/ui/card";
import { UIInput } from "@/components/ui/input";
import { UISeparator } from "@/components/ui/separator";

type CustomerRow = {
  id: string;
  name: string;
  accountNo: string;
  customerCode: string;
  custodyCode: string;
  accountType: string;
  openedAt: string;
  ihcStatus: string;
};

/** Render business-style customer list layout using shadcn UI components and theme variables. */
export default function ShadcnBusinessCustomerListDemo() {
  const [activeTopNav, setActiveTopNav] = useState("customers");
  const [activeSubTab, setActiveSubTab] = useState<"leads" | "mine">("mine");
  const [activeSla, setActiveSla] = useState<"T0" | "T-1">("T-1");

  const rows = useMemo<CustomerRow[]>(
    () => [
      {
        id: "1",
        name: "Vũ Thị Minh",
        accountNo: "1168150345",
        customerCode: "1168001736",
        custodyCode: "021C700659",
        accountType: "Cơ sở",
        openedAt: "07/06/2022",
        ihcStatus: "",
      },
      {
        id: "2",
        name: "Chu Thị Thanh Huyền",
        accountNo: "0001281287",
        customerCode: "1010000418",
        custodyCode: "021C368713",
        accountType: "Cơ sở",
        openedAt: "25/02/2021",
        ihcStatus: "",
      },
      {
        id: "3",
        name: "Lê Văn Cẩn",
        accountNo: "0403074720P",
        customerCode: "0403832102",
        custodyCode: "021C832102",
        accountType: "Phái sinh",
        openedAt: "25/01/2018",
        ihcStatus: "",
      },
      {
        id: "4",
        name: "Nguyễn Thị Diệu Thùy",
        accountNo: "0307005883",
        customerCode: "0307006629",
        custodyCode: "021C525326",
        accountType: "Cơ sở",
        openedAt: "12/10/2021",
        ihcStatus: "",
      },
      {
        id: "5",
        name: "Đặng Thị Thanh Lam",
        accountNo: "0307005306",
        customerCode: "0307004990",
        custodyCode: "021C412592",
        accountType: "Cơ sở",
        openedAt: "05/05/2021",
        ihcStatus: "",
      },
    ],
    [],
  );

  return (
    <UICard className="w-full border-[var(--border)]">
      <UICardHeader className="space-y-3 border-b border-[var(--border)] pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex ">
              <img
                src="src/assets/logoDSB.svg"
                alt="VNDIRECT - Wisdom to success"
                className="h-full w-auto"
              />
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <UIButton
                type="button"
                size="sm"
                variant={activeTopNav === "customers" ? "default" : "outline"}
                onClick={() => setActiveTopNav("customers")}
              >
                Quản lý khách hàng
              </UIButton>
              <UIButton
                type="button"
                size="sm"
                variant={activeTopNav === "work" ? "default" : "outline"}
                onClick={() => setActiveTopNav("work")}
              >
                Quản lý công việc
              </UIButton>
              <UIButton
                type="button"
                size="sm"
                variant={activeTopNav === "kpi" ? "default" : "outline"}
                onClick={() => setActiveTopNav("kpi")}
              >
                Hiệu suất hoạt động
              </UIButton>
            </div>
            <UIButton type="button" size="sm">
              Service Desk
            </UIButton>
          </div>

          <div className="flex items-center gap-1">
            <UIButton
              type="button"
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <Mail size={16} />
            </UIButton>
            <UIButton
              type="button"
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <MessageCircle size={16} />
            </UIButton>
            <div className="relative">
              <UIButton
                type="button"
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <Bell size={16} />
              </UIButton>
              <UIBadge className="absolute -right-1 -top-1 px-1 py-0 text-[10px] leading-4">
                9
              </UIBadge>
            </div>
            <UIButton
              type="button"
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <HelpCircle size={16} />
            </UIButton>
            <div className="ml-2 flex items-center gap-2 text-sm text-[var(--foreground)]">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--secondary-foreground)]">
                <Users size={14} />
              </div>
              <span>Môi giới test</span>
            </div>
          </div>
        </div>
      </UICardHeader>

      <UICardContent className="space-y-4 pt-4">
        <div>
          <h3 className="text-xl font-semibold text-[var(--foreground)]">
            Danh sách khách hàng
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <UIButton
              type="button"
              variant={activeSubTab === "leads" ? "default" : "outline"}
              onClick={() => setActiveSubTab("leads")}
            >
              Khách hàng tiềm năng
            </UIButton>
            <UIButton
              type="button"
              variant={activeSubTab === "mine" ? "default" : "outline"}
              onClick={() => setActiveSubTab("mine")}
            >
              Khách hàng của tôi
            </UIButton>
          </div>
          <div className="flex items-center gap-2">
            <UIButton
              type="button"
              size="sm"
              variant={activeSla === "T0" ? "outline" : "secondary"}
              onClick={() => setActiveSla("T0")}
            >
              T0
            </UIButton>
            <UIButton
              type="button"
              size="sm"
              variant={activeSla === "T-1" ? "outline" : "secondary"}
              onClick={() => setActiveSla("T-1")}
            >
              T-1
            </UIButton>
          </div>
        </div>

        <UISeparator />

        <div className="grid gap-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr_auto]">
          <UIInput placeholder="Nhập tên khách hàng" />
          <UIInput placeholder="Số lưu ký" />
          <UIInput placeholder="Mã số khách hàng" />
          <UIInput placeholder="Số tài khoản" />
          <UIInput placeholder="Từ ngày  ->  Đến ngày" />
          <div className="flex flex-wrap items-center gap-2">
            <UIButton type="button">Áp dụng</UIButton>
            <UIButton type="button" variant="outline">
              <Undo2 size={14} />
              Bỏ sắp xếp
            </UIButton>
            <UIButton type="button" variant="outline">
              <SlidersHorizontal size={14} />
              Bộ lọc
            </UIButton>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <UIButton
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <Menu size={16} />
          </UIButton>
          <UIButton
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <Mail size={16} />
          </UIButton>
          <UIButton
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <MessageCircle size={16} />
          </UIButton>
          <UIButton
            type="button"
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
          >
            <Users size={16} />
          </UIButton>
        </div>

        <div className="overflow-auto rounded-md border border-[var(--border)]">
          <table className="w-full min-w-[1024px] text-sm">
            <thead className="bg-[var(--muted)] text-left text-[var(--foreground)]">
              <tr>
                <th className="w-10 px-3 py-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[var(--primary)]"
                  />
                </th>
                <th className="px-3 py-2 font-medium">Họ tên</th>
                <th className="px-3 py-2 font-medium">Số tài khoản</th>
                <th className="px-3 py-2 font-medium">Mã số khách hàng</th>
                <th className="px-3 py-2 font-medium">Số lưu ký</th>
                <th className="px-3 py-2 font-medium">Loại tài khoản</th>
                <th className="px-3 py-2 font-medium">Ngày mở tài khoản</th>
                <th className="px-3 py-2 font-medium">
                  Trạng thái hoàn thiện IHC
                </th>
              </tr>
            </thead>
            <tbody className="text-[var(--foreground)]">
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      className="text-[var(--primary)] hover:underline"
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="px-3 py-2">{row.accountNo}</td>
                  <td className="px-3 py-2">{row.customerCode}</td>
                  <td className="px-3 py-2">{row.custodyCode}</td>
                  <td className="px-3 py-2">{row.accountType}</td>
                  <td className="px-3 py-2">{row.openedAt}</td>
                  <td className="px-3 py-2">{row.ihcStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </UICardContent>
    </UICard>
  );
}
