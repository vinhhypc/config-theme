import * as React from "react";
import { cn } from "@/lib/utils";

export function UISeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="separator"
      className={cn("h-px w-full bg-[var(--border)]", className)}
      {...props}
    />
  );
}
