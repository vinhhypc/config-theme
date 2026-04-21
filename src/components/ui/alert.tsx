import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border border-[var(--border)] p-4 text-[var(--foreground)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--background)]",
        info: "bg-[var(--muted)]",
        destructive:
          "border-[var(--destructive)]/40 bg-[var(--destructive)]/10",
        success: "border-[var(--accent)]/40 bg-[var(--accent)]/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type UIAlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

export function UIAlert({ className, variant, ...props }: UIAlertProps) {
  return (
    <div className={cn(alertVariants({ variant }), className)} {...props} />
  );
}

export function UIAlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  );
}

export function UIAlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-[var(--muted-foreground)]", className)}
      {...props}
    />
  );
}
