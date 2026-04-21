import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const UICheckbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function UICheckbox({ className, ...props }, ref) {
  return (
    <span className="relative inline-flex h-4 w-4 items-center justify-center">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-[var(--input)] bg-[var(--background)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 checked:border-transparent checked:bg-[var(--primary)]",
          className,
        )}
        {...props}
      />
      <Check
        size={12}
        className="pointer-events-none absolute text-[var(--primary-foreground)] opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  );
});
