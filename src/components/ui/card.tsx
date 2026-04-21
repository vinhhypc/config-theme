import * as React from "react";
import { cn } from "@/lib/utils";

/** Render the shadcn-style card root container. */
export function UICard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

/** Render the header section of a shadcn-style card. */
export function UICardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-4", className)}
      {...props}
    />
  );
}

/** Render the title text in a shadcn-style card. */
export function UICardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={cn("text-base font-semibold", className)} {...props} />;
}

/** Render the content section of a shadcn-style card. */
export function UICardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0", className)} {...props} />;
}
