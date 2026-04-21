import type { ThemeState } from "@/theme/ThemeContext";
import type { ShadcnThemeState } from "@/theme/ShadcnThemeContext";
import type {
  AgentMdExportSelection,
  AiMarkdownLibrary,
} from "./agentExportTypes";
import designGuidelinesRaw from "../../AI_AGENT_MARKDOWN/design-guidelines.md?raw";
import componentPatternsRaw from "../../AI_AGENT_MARKDOWN/component-patterns.md?raw";
import brandAssetsRaw from "../../AI_AGENT_MARKDOWN/brand-assets.md?raw";
import aiRulesRaw from "../../AI_AGENT_MARKDOWN/ai-rules.md?raw";

/** Một file tóm tắt theme Antd cho agent (tương đương nút Export .md cũ). */
export function buildAntdPlaygroundDocMd(input: {
  state: ThemeState;
  themeJsonText: string;
}): string {
  const { state, themeJsonText } = input;
  const generatedAt = new Date().toISOString();
  return [
    "---",
    "schema: ui-theme-doc-v1",
    "library: antd",
    `generatedAt: ${generatedAt}`,
    `preset: ${state.preset}`,
    `mode: ${state.mode}`,
    "---",
    "",
    "# Design Tokens (Ant Design)",
    "",
    "## Purpose",
    "- This file is an input document for an AI agent to generate UI based on the current design token configuration.",
    "- Preferred stack: Ant Design v6 + the algorithm/tokens below. Avoid hardcoding colors/spacing outside tokens.",
    "",
    "## Instructions for the AI (required)",
    "- Output: React + TypeScript using Ant Design v6.",
    "- Wrap the app with ConfigProvider using the Theme Config (JSON) below.",
    "- Use tokens for semantic colors, borders/radius, and typography.",
    "- Do not modify the palette or radius unless explicitly requested.",
    "",
    "## Suggested layout & components",
    "- Minimum structure: Header (title + actions), Content (form + table/list), Feedback (alert/message).",
    "- Representative Antd components: Button, Input, Select, Form, Table, Card, Tabs, Modal, Alert.",
    "",
    "## Token semantics",
    "- colorPrimary: primary CTA and active states when needed.",
    "- colorSuccess / colorWarning / colorError / colorInfo: statuses, labels, feedback.",
    "- borderRadius: global corner radius (Card, Input, Button).",
    "- lineWidth: border width (Input, Card border, Divider).",
    "- fontSize / fontFamily: base typography.",
    "- wireframe: enable wireframe styling via Antd token (if used).",
    "",
    "## Theme Config (JSON)",
    "```json",
    themeJsonText.trim(),
    "```",
    "",
    "## Acceptance checklist (AI)",
    "- The UI uses Ant Design v6 components only (no shadcn mixing on this screen).",
    "- Status colors are consistent: success/warning/error/info use the provided tokens.",
    "- Spacing/borders/radius look consistent with borderRadius/lineWidth.",
    "",
  ].join("\n");
}

/**
 * design-tokens.md (Ant Design): chỉ chứa object theme JSON (preset, algorithm,
 * componentSize, token) — đồng bộ với `themeJson` / ConfigProvider.
 */
export function buildDesignTokensMdAntd(input: { themeJsonText: string }): string {
  return `${input.themeJsonText.trim()}\n`;
}

/** design-tokens.md động (shadcn): JSON + CSS variables. */
export function buildDesignTokensMdShadcn(input: {
  state: ShadcnThemeState;
  shadcnThemeJsonText: string;
  cssVarsBlock: string;
}): string {
  const { state, shadcnThemeJsonText, cssVarsBlock } = input;
  const generatedAt = new Date().toISOString();
  return [
    "# design-tokens",
    "",
    "> Generated from Shadcn Theme Playground. Dùng `var(--...)` trong UI, không hardcode hex.",
    "",
    "- `generatedAt`: `" + generatedAt + "`",
    "- `library`: `shadcn`",
    "- `mode`: `" + state.mode + "`",
    "",
    "## Semantic colors (playground)",
    "",
    `- \`primary\`: \`${state.colorPrimary}\``,
    `- \`link\`: \`${state.colorLink}\``,
    `- \`success\`: \`${state.colorSuccess}\``,
    `- \`warning\`: \`${state.colorWarning}\``,
    `- \`error\`: \`${state.colorError}\``,
    `- \`info\`: \`${state.colorInfo}\``,
    "",
    "## Layout",
    "",
    `- \`radius\`: \`${state.radius}\` (px)`,
    `- \`fontFamily\`: ${state.fontFamily}`,
    "",
    "## Theme Config (JSON)",
    "",
    "```json",
    shadcnThemeJsonText.trim(),
    "```",
    "",
    "## CSS Variables (`.shadcn-scope`)",
    "",
    "```css",
    cssVarsBlock.trim(),
    "```",
    "",
  ].join("\n");
}

function stackNote(library: AiMarkdownLibrary): string {
  if (library === "antd") {
    return [
      "## Web stack (playground — dashboard / internal app)",
      "",
      "- **Bundler / app shell:** **Vite** + **React** + TypeScript.",
      "- **UI:** Ant Design v6.",
      "- **Theme:** `ConfigProvider` + token JSON trong `design-tokens.md`.",
      "",
    ].join("\n");
  }
  return [
    "## Web stack (playground — dashboard / internal app)",
    "",
    "- **Bundler / app shell:** **Vite** + **React** + TypeScript.",
    "- **UI:** shadcn-style components trong `src/components/ui`.",
    "- **Styling:** Tailwind CSS.",
    "- **Theme:** CSS variables trên `.shadcn-scope` (xem `design-tokens.md`).",
    "",
  ].join("\n");
}

/**
 * Phân nhánh: landing → Next.js + SEO + Tailwind; dashboard → Vite + React + stack playground.
 */
function landingPageStrategyNote(): string {
  return [
    "## Landing page vs app / dashboard",
    "",
    "Infer from **TASK** (below) which applies.",
    "",
    "### If the screen is a **public landing / marketing page** (hero, sections, pricing, footer, SEO content)",
    "",
    "- **Framework:** **Next.js** (App Router) + TypeScript — ưu tiên cho trang công khai, index và SEO.",
    "- **SEO (mandatory for indexable routes):** `metadata` / `generateMetadata`, `alternates.canonical`, Open Graph + Twitter cards; `robots` / `sitemap` khi dự án có trang marketing; một `h1` mỗi route; nội dung indexable nên ưu tiên **Server Components**.",
    "- **Styling:** **Tailwind CSS** utility classes first (`flex`, `grid`, `gap-*`, `text-*`, responsive `sm:`/`md:`/`lg:`). Dùng `next/image` + `alt` hợp lệ khi có ảnh.",
    "- Use **semantic HTML:** `header`, `main`, `section`, `article`, `footer`, `nav`; không bỏ cấp heading.",
    "- **Do not** dùng Ant Design, shadcn/ui hay kit nặng **trừ khi** thật cần (form/datepicker phức tạp). Ưu tiên phần tử gốc + Tailwind.",
    "- Align màu, radius, spacing với **design tokens** (map vào `tailwind.config` / token, không tự ý hex ngoài hệ).",
    "",
    "### If the screen is a **dashboard, admin, CMS shell, or data-heavy app** (tables, dense forms, wizards)",
    "",
    "- **Framework:** **Vite** + **React** + TypeScript (SPA / admin tooling).",
    "- **UI:** làm theo **Web stack (playground)** phía trên — Ant Design hoặc shadcn đúng bản export.",
    "",
  ].join("\n");
}

/** Nội dung file `ai-entrypoint.md` (gộp stack + các phần đã chọn). */
export function buildAiEntrypointMd(input: {
  library: AiMarkdownLibrary;
  selection: AgentMdExportSelection;
  designTokensMd: string;
}): string {
  const { library, selection, designTokensMd } = input;
  const generatedAt = new Date().toISOString();
  const parts: string[] = [
    "# ai-entrypoint",
    "",
    "You are a senior frontend engineer.",
    "",
    "You MUST follow the design system provided below.",
    "",
    stackNote(library),
    landingPageStrategyNote(),
    "- `generatedAt`: `" + generatedAt + "`",
    "",
    "### Các file đã gói (theo lựa chọn)",
    "",
    `- design-tokens: ${selection.designTokens ? "có" : "không"}`,
    `- design-guidelines: ${selection.designGuidelines ? "có" : "không"}`,
    `- component-patterns: ${selection.componentPatterns ? "có" : "không"}`,
    `- brand-assets: ${selection.brandAssets ? "có" : "không"}`,
    `- ai-rules: ${selection.aiRules ? "có" : "không"}`,
    "",
    "---",
    "",
  ];

  if (selection.designTokens) {
    parts.push("# DESIGN TOKENS", "");
    if (library === "antd") {
      parts.push(
        "```json",
        designTokensMd.trim(),
        "```",
        "",
        "---",
        "",
      );
    } else {
      parts.push(designTokensMd.trim(), "", "---", "");
    }
  }
  if (selection.designGuidelines) {
    parts.push(
      "# DESIGN GUIDELINES",
      "",
      designGuidelinesRaw.trim(),
      "",
      "---",
      "",
    );
  }
  if (selection.componentPatterns) {
    parts.push(
      "# COMPONENT PATTERNS",
      "",
      componentPatternsRaw.trim(),
      "",
      "---",
      "",
    );
  }
  if (selection.brandAssets) {
    parts.push("# BRAND ASSETS", "", brandAssetsRaw.trim(), "", "---", "");
  }
  if (selection.aiRules) {
    parts.push("# AI RULES (STRICT)", "", aiRulesRaw.trim(), "", "---", "");
  }

  parts.push(
    "# TASK",
    "",
    "Generate UI for:",
    "[USER DESCRIBES SCREEN HERE]",
    "",
    "# VALIDATION CHECKLIST (YOU MUST SELF-CHECK)",
    "",
    "- Tokens và ràng buộc trong các phần trên được tuân thủ.",
    "- Nếu là **landing / marketing**: **Next.js** + SEO (metadata, canonical, OG) + Tailwind; không dùng Vite làm mặc định cho trang public.",
    "- Nếu là **dashboard / admin**: **Vite + React** + đúng stack playground (Antd/shadcn); không trộn thư viện UI ngoài phần đã nêu.",
    "",
  );

  return parts.join("\n");
}

/** Tạo map tên file → nội dung theo phần đã chọn. */
export function buildAgentMarkdownFiles(input: {
  library: AiMarkdownLibrary;
  selection: AgentMdExportSelection;
  antd?: { state: ThemeState; themeJsonText: string };
  shadcn?: {
    state: ShadcnThemeState;
    shadcnThemeJsonText: string;
    cssVarsBlock: string;
  };
}): Record<string, string> {
  const { library, selection } = input;
  const out: Record<string, string> = {};

  let designTokensMd = "";
  if (library === "antd") {
    if (!input.antd) throw new Error("buildAgentMarkdownFiles: thiếu antd payload");
    designTokensMd = buildDesignTokensMdAntd(input.antd);
  } else {
    if (!input.shadcn) throw new Error("buildAgentMarkdownFiles: thiếu shadcn payload");
    designTokensMd = buildDesignTokensMdShadcn(input.shadcn);
  }

  if (selection.designTokens) {
    out["design-tokens.md"] = designTokensMd;
  }
  if (selection.designGuidelines) {
    out["design-guidelines.md"] = designGuidelinesRaw;
  }
  if (selection.componentPatterns) {
    out["component-patterns.md"] = componentPatternsRaw;
  }
  if (selection.brandAssets) {
    out["brand-assets.md"] = brandAssetsRaw;
  }
  if (selection.aiRules) {
    out["ai-rules.md"] = aiRulesRaw;
  }
  if (selection.aiEntrypoint) {
    out["ai-entrypoint.md"] = buildAiEntrypointMd({
      library,
      selection,
      designTokensMd,
    });
  }

  return out;
}

/** File shadcn đơn (tương đương Export .md cũ trên màn Shadcn). */
export function buildShadcnPlaygroundDocMd(input: {
  state: ShadcnThemeState;
  shadcnThemeJsonText: string;
  cssVarsBlock: string;
}): string {
  const generatedAt = new Date().toISOString();
  const { state, shadcnThemeJsonText, cssVarsBlock } = input;
  return [
    "---",
    "schema: ui-theme-doc-v1",
    "library: shadcn",
    `generatedAt: ${generatedAt}`,
    `mode: ${state.mode}`,
    "---",
    "",
    "# Design Tokens (shadcn)",
    "",
    "## Purpose",
    "- This file is an input document for an AI agent to generate UI based on the current design token configuration.",
    "- Expected output: React + TypeScript + Tailwind + shadcn-style components (located in src/components/ui).",
    "",
    "## Instructions for the AI (required)",
    "- Use ONLY components from src/components/ui (UIButton, UIInput, ...). Do NOT use Ant Design on this screen.",
    "- Do NOT hardcode any hex colors in the UI. Use CSS variables via var(--...) for backgrounds, text, borders, and rings.",
    "- Theme scope: .shadcn-scope (may also include .dark).",
    "- Prefer responsive layout: single column on mobile, 2–3 columns on desktop depending on the page.",
    "",
    "## Token → UI semantics mapping",
    "- --primary: primary CTA / active state",
    "- --destructive: destructive/danger actions & error emphasis",
    "- --accent: highlight/success/info depending on context",
    "- --muted + --muted-foreground: secondary background + secondary text",
    "- --border/--input: borders for cards/inputs/dividers",
    "- --radius: global corner radius",
    "",
    "## Theme Config (JSON)",
    "```json",
    shadcnThemeJsonText.trim(),
    "```",
    "",
    "## CSS Variables (apply to .shadcn-scope)",
    "",
    "```css",
    cssVarsBlock.trim(),
    "```",
    "",
    "## Acceptance checklist (AI)",
    "- No Ant Design components are used.",
    "- No hardcoded colors; var(--...) is used for all background/text/border colors.",
    "- Hover/focus states include a ring based on --ring with reasonable contrast.",
    "",
  ].join("\n");
}
