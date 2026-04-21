import type { CSSProperties } from "react";

/** Chuyển object CSS variables (--*) thành khối CSS `.shadcn-scope { ... }`. */
export function buildCssVarsBlock(style: CSSProperties): string {
  const entries = Object.entries(style as Record<string, unknown>)
    .filter(([key, value]) => key.startsWith("--") && value != null)
    .sort(([a], [b]) => a.localeCompare(b));

  const lines = entries.map(([key, value]) => `  ${key}: ${String(value)};`);
  return [".shadcn-scope {", ...lines, "}"].join("\n");
}
