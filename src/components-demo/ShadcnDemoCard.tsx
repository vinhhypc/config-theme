import React, { useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  Link as LinkIcon,
  ShieldAlert,
} from "lucide-react";
import {
  UICard,
  UICardContent,
  UICardHeader,
  UICardTitle,
} from "@/components/ui/card";
import { UIButton } from "@/components/ui/button";
import { UIBadge } from "@/components/ui/badge";
import {
  UIAlert,
  UIAlertDescription,
  UIAlertTitle,
} from "@/components/ui/alert";
import { UICheckbox } from "@/components/ui/checkbox";
import { UIInput } from "@/components/ui/input";
import { UILabel } from "@/components/ui/label";
import { UIProgress } from "@/components/ui/progress";
import { UISelect } from "@/components/ui/select";
import { UISeparator } from "@/components/ui/separator";
import { UISkeleton } from "@/components/ui/skeleton";
import { UITextarea } from "@/components/ui/textarea";
import { useShadcnThemePlayground } from "@/theme/ShadcnThemeContext";

/** Render representative shadcn-like components that follow the same theme inputs. */
export default function ShadcnDemoCard() {
  const { state } = useShadcnThemePlayground();
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState<"a" | "b">("a");
  const [select, setSelect] = useState("weekly");
  const [progress, setProgress] = useState(62);
  const [tab, setTab] = useState<"overview" | "billing" | "team">("overview");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const themeHint = useMemo(
    () => (
      <div className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--muted)] p-3">
        <CheckCircle2 size={16} className="text-[var(--accent)]" />
        <span className="text-sm text-[var(--foreground)]">
          Theme <strong>{state.mode}</strong>, primary{" "}
          <strong>{state.colorPrimary}</strong>, radius{" "}
          <strong>{state.radius}px</strong>
        </span>
      </div>
    ),
    [state.colorPrimary, state.mode, state.radius],
  );

  return (
    <UICard className="w-full">
      <UICardHeader>
        <UICardTitle>Shadcn Components</UICardTitle>
        <p className="text-sm text-[var(--muted-foreground)]">
          Demo các component tiêu biểu (đủ nhóm: form, data display, feedback,
          navigation).
        </p>
      </UICardHeader>
      <UICardContent>
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <UIBadge variant="default">Primary</UIBadge>
            <UIBadge variant="secondary">Secondary</UIBadge>
            <UIBadge variant="outline">Outline</UIBadge>
          </div>

          <div className="flex flex-wrap gap-2">
            <UIButton>Primary</UIButton>
            <UIButton variant="secondary">Secondary</UIButton>
            <UIButton variant="outline">
              <LinkIcon size={14} />
              Link Action
            </UIButton>
            <UIButton variant="destructive">
              <AlertCircle size={14} />
              Delete
            </UIButton>
            <UIButton variant="outline" title="Tooltip: Quick action">
              Hover tooltip
            </UIButton>
          </div>

          <UISeparator />

          <div className="grid gap-2">
            <UILabel htmlFor="shadcn-sample-input">Input</UILabel>
            <UIInput
              id="shadcn-sample-input"
              placeholder="Ví dụ: Tên chiến dịch / keyword..."
            />
          </div>

          <div className="grid gap-2">
            <UILabel htmlFor="shadcn-sample-textarea">Textarea</UILabel>
            <UITextarea
              id="shadcn-sample-textarea"
              placeholder="Ghi chú / mô tả..."
            />
          </div>

          <div className="grid gap-2">
            <UILabel>Checkbox</UILabel>
            <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <UICheckbox
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              Enable advanced options
            </label>
          </div>

          <div className="grid gap-2">
            <UILabel>Radio</UILabel>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--foreground)]">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shadcn-radio"
                  checked={radio === "a"}
                  onChange={() => setRadio("a")}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Option A
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shadcn-radio"
                  checked={radio === "b"}
                  onChange={() => setRadio("b")}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Option B
              </label>
            </div>
          </div>

          <div className="grid gap-2">
            <UILabel>Select</UILabel>
            <UISelect
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </UISelect>
          </div>

          <div className="grid gap-2">
            <UILabel>Slider + Progress</UILabel>
            <input
              type="range"
              min={0}
              max={100}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="w-full accent-[var(--primary)]"
            />
            <UIProgress value={progress} />
          </div>

          <UISeparator />

          <div className="grid gap-3">
            <UILabel>Alerts</UILabel>
            <div className="grid gap-2">
              <UIAlert variant="info">
                <UIAlertTitle className="flex items-center gap-2">
                  <Info size={16} />
                  Info
                </UIAlertTitle>
                <UIAlertDescription>
                  Đây là message trạng thái thông thường.
                </UIAlertDescription>
              </UIAlert>
              <UIAlert variant="success">
                <UIAlertTitle className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Success
                </UIAlertTitle>
                <UIAlertDescription>
                  Lưu cấu hình thành công.
                </UIAlertDescription>
              </UIAlert>
              <UIAlert variant="destructive">
                <UIAlertTitle className="flex items-center gap-2">
                  <ShieldAlert size={16} />
                  Destructive
                </UIAlertTitle>
                <UIAlertDescription>
                  Có lỗi xảy ra khi submit.
                </UIAlertDescription>
              </UIAlert>
            </div>
          </div>

          <div className="grid gap-2">
            <UILabel>Dialog</UILabel>
            <div className="flex flex-wrap items-center gap-2">
              <UIButton
                type="button"
                onClick={() => dialogRef.current?.showModal()}
              >
                Open dialog
              </UIButton>
              <dialog
                ref={dialogRef}
                className="w-[min(520px,calc(100vw-32px))] rounded-lg border border-[var(--border)] bg-[var(--background)] p-0 text-[var(--foreground)] shadow-xl"
              >
                <div className="p-4">
                  <div className="text-base font-semibold">Confirm action</div>
                  <div className="mt-1 text-sm text-[var(--muted-foreground)]">
                    Đây là dialog native được style theo theme shadcn.
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <UIButton
                      type="button"
                      variant="outline"
                      onClick={() => dialogRef.current?.close()}
                    >
                      Cancel
                    </UIButton>
                    <UIButton
                      type="button"
                      onClick={() => dialogRef.current?.close()}
                    >
                      Confirm
                    </UIButton>
                  </div>
                </div>
              </dialog>
            </div>
          </div>

          <UISeparator />

          <div className="grid gap-2">
            <UILabel>Tabs</UILabel>
            <div className="flex flex-wrap gap-2">
              <UIButton
                type="button"
                variant={tab === "overview" ? "default" : "outline"}
                onClick={() => setTab("overview")}
              >
                Overview
              </UIButton>
              <UIButton
                type="button"
                variant={tab === "billing" ? "default" : "outline"}
                onClick={() => setTab("billing")}
              >
                Billing
              </UIButton>
              <UIButton
                type="button"
                variant={tab === "team" ? "default" : "outline"}
                onClick={() => setTab("team")}
              >
                Team
              </UIButton>
            </div>
            <div className="rounded-md border border-[var(--border)] p-3 text-sm text-[var(--foreground)]">
              {tab === "overview"
                ? "Overview content"
                : tab === "billing"
                  ? "Billing content"
                  : "Team content"}
            </div>
          </div>

          <div className="grid gap-2">
            <UILabel>Accordion</UILabel>
            <div className="grid gap-2">
              <details className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
                <summary className="cursor-pointer select-none text-sm font-medium">
                  What is shadcn/ui?
                </summary>
                <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Bộ component dựa trên Radix + Tailwind, tự quản lý source.
                </div>
              </details>
              <details className="rounded-md border border-[var(--border)] bg-[var(--background)] p-3">
                <summary className="cursor-pointer select-none text-sm font-medium">
                  Can I theme it?
                </summary>
                <div className="mt-2 text-sm text-[var(--muted-foreground)]">
                  Có thể, thông qua CSS variables trong scope.
                </div>
              </details>
            </div>
          </div>

          <UISeparator />

          <div className="grid gap-2">
            <UILabel>Table</UILabel>
            <div className="overflow-auto rounded-md border border-[var(--border)]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[var(--muted)] text-[var(--foreground)]">
                  <tr>
                    <th className="px-3 py-2 font-medium">Name</th>
                    <th className="px-3 py-2 font-medium">Status</th>
                    <th className="px-3 py-2 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--foreground)]">
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-3 py-2">Invoice #1021</td>
                    <td className="px-3 py-2">
                      <UIBadge variant="secondary">Paid</UIBadge>
                    </td>
                    <td className="px-3 py-2">$120.00</td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-3 py-2">Invoice #1022</td>
                    <td className="px-3 py-2">
                      <UIBadge variant="outline">Pending</UIBadge>
                    </td>
                    <td className="px-3 py-2">$89.00</td>
                  </tr>
                  <tr className="border-t border-[var(--border)]">
                    <td className="px-3 py-2">Invoice #1023</td>
                    <td className="px-3 py-2">
                      <UIBadge variant="default">Open</UIBadge>
                    </td>
                    <td className="px-3 py-2">$42.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-2">
            <UILabel>Avatar + Skeleton</UILabel>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--secondary)] text-sm font-medium text-[var(--secondary-foreground)]">
                  QA
                </div>
                <div className="grid">
                  <div className="text-sm font-medium text-[var(--foreground)]">
                    Quang Anh
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {checked ? "Advanced on" : "Advanced off"} · {select} ·{" "}
                    {radio.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <UISkeleton className="h-3 w-40" />
                <UISkeleton className="h-3 w-28" />
              </div>
            </div>
          </div>

          {themeHint}
        </div>
      </UICardContent>
    </UICard>
  );
}
