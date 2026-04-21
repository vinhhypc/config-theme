import * as React from "react";
import { cn } from "@/lib/utils";

export function UIProgress({
  value,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: number }) {
  const normalized = Number.isFinite(value)
    ? Math.max(0, Math.min(100, value))
    : 0;

  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-[var(--muted)]",
        className,
      )}
      {...props}
    >
      <div
        className="h-full bg-[var(--primary)] transition-[width]"
        style={{ width: `${normalized}%` }}
      />
    </div>
  );
}
