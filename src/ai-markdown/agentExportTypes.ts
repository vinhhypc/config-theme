/** Phần nội dung có thể gói vào thư mục AI_AGENT_MARKDOWN. */
export type AgentMdSectionId =
  | "designTokens"
  | "designGuidelines"
  | "componentPatterns"
  | "brandAssets"
  | "aiRules"
  | "aiEntrypoint";

export type AgentMdExportSelection = Record<AgentMdSectionId, boolean>;

export type AiMarkdownLibrary = "antd" | "shadcn";

export const DEFAULT_AGENT_MD_SELECTION: AgentMdExportSelection = {
  designTokens: true,
  designGuidelines: false,
  componentPatterns: false,
  brandAssets: false,
  aiRules: false,
  aiEntrypoint: false,
};

/** Thứ tự hiển thị / ghép ai-entrypoint. */
export const AGENT_MD_SECTION_ORDER: AgentMdSectionId[] = [
  "designTokens",
  "designGuidelines",
  "componentPatterns",
  "brandAssets",
  "aiRules",
  "aiEntrypoint",
];

export const AGENT_MD_SECTION_META: Record<
  AgentMdSectionId,
  { label: string; filename: string; hint: string }
> = {
  designTokens: {
    label: "Design tokens (động)",
    filename: "design-tokens.md",
    hint: "Màu, radius, font… theo cấu hình theme hiện tại",
  },
  designGuidelines: {
    label: "Design guidelines",
    filename: "design-guidelines.md",
    hint: "Quy tắc dùng màu, typography, spacing",
  },
  componentPatterns: {
    label: "Component patterns",
    filename: "component-patterns.md",
    hint: "Mẫu button, input, card…",
  },
  brandAssets: {
    label: "Brand assets",
    filename: "brand-assets.md",
    hint: "Logo/base64 — file lớn, mặc định tắt",
  },
  aiRules: {
    label: "AI rules",
    filename: "ai-rules.md",
    hint: "Ràng buộc bắt buộc cho agent",
  },
  aiEntrypoint: {
    label: "ai-entrypoint (gộp)",
    filename: "ai-entrypoint.md",
    hint: "Một file nhập gồm các phần đã chọn + hướng dẫn stack",
  },
};
