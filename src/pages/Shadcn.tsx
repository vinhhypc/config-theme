import React from "react";
import { Link } from "react-router-dom";
import ShadcnThemeConfigPanel from "@/config-panel/ShadcnThemeConfigPanel";
import ShadcnDemoCard from "@/components-demo/ShadcnDemoCard";
import ShadcnBusinessCustomerListDemo from "@/components-demo/ShadcnBusinessCustomerListDemo";
import { UIButton } from "@/components/ui/button";

/** Standalone Shadcn playground screen (no Antd dependency). */
export default function Shadcn() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="flex w-full items-center justify-between gap-3 px-6 py-3">
          <div className="grid gap-0.5">
            <div className="text-base font-semibold">Shadcn Playground</div>
            <div className="text-sm text-[var(--muted-foreground)]">
              Theme config + component preview
            </div>
          </div>
          <Link to="/">
            <UIButton variant="outline" type="button">
              Về Antd
            </UIButton>
          </Link>
        </div>
      </div>

      <div className="grid w-full gap-4 px-6 py-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ShadcnThemeConfigPanel />
        </div>
        <div className="lg:col-span-2">
          <div className="grid gap-4">
            <ShadcnBusinessCustomerListDemo />
            <ShadcnDemoCard />
          </div>
        </div>
      </div>
    </div>
  );
}
