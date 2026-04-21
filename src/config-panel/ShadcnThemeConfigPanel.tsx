import React, { useCallback, useMemo, useState } from "react";
import { message } from "antd";
import { Download, FileArchive, RotateCcw } from "lucide-react";
import { UIButton } from "@/components/ui/button";
import { UICheckbox } from "@/components/ui/checkbox";
import { UIInput } from "@/components/ui/input";
import { UILabel } from "@/components/ui/label";
import { UISwitch } from "@/components/ui/switch";
import {
  UICard,
  UICardContent,
  UICardHeader,
  UICardTitle,
} from "@/components/ui/card";
import {
  AGENT_MD_SECTION_META,
  AGENT_MD_SECTION_ORDER,
  DEFAULT_AGENT_MD_SELECTION,
  type AgentMdExportSelection,
} from "@/ai-markdown/agentExportTypes";
import {
  buildAgentMarkdownFiles,
  buildAiEntrypointMd,
  buildDesignTokensMdShadcn,
} from "@/ai-markdown/buildAgentMarkdownBundle";
import { downloadAgentMarkdownZip } from "@/ai-markdown/downloadAgentMarkdownZip";
import { buildCssVarsBlock } from "@/ai-markdown/shadcnCssVars";
import { useShadcnThemePlayground } from "@/theme/ShadcnThemeContext";

type ColorFieldKey =
  | "colorPrimary"
  | "colorSuccess"
  | "colorWarning"
  | "colorError"
  | "colorInfo"
  | "colorLink";

/** Render a small hex color field with a color input and a text input. */
function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <UILabel>{label}</UILabel>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded-md border border-[var(--border)] bg-[var(--background)] p-1"
        />
        <UIInput value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}

/** Trigger a browser download for a text file. */
function downloadTextFile({
  filename,
  text,
  mimeType,
}: {
  filename: string;
  text: string;
  mimeType: string;
}) {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
}

/** Left panel for the Shadcn screen: edit shadcn theme tokens and export markdown. */
export default function ShadcnThemeConfigPanel() {
  const {
    state,
    updateTheme,
    resetTheme,
    shadcnThemeJsonText,
    shadcnThemeStyle,
  } = useShadcnThemePlayground();
  const [mdSelection, setMdSelection] = useState<AgentMdExportSelection>(
    DEFAULT_AGENT_MD_SELECTION,
  );

  const onExportMarkdown = useCallback(() => {
    const cssVarsBlock = buildCssVarsBlock(shadcnThemeStyle);
    const designTokensMd = buildDesignTokensMdShadcn({
      state,
      shadcnThemeJsonText,
      cssVarsBlock,
    });
    const md = buildAiEntrypointMd({
      library: "shadcn",
      selection: mdSelection,
      designTokensMd,
    });

    downloadTextFile({
      filename: "ai-entrypoint.md",
      text: md,
      mimeType: "text/markdown;charset=utf-8",
    });
    message.success("Đã tải ai-entrypoint.md");
  }, [mdSelection, shadcnThemeJsonText, shadcnThemeStyle, state]);

  const onExportMarkdownZip = useCallback(() => {
    try {
      const picked = AGENT_MD_SECTION_ORDER.some((id) => mdSelection[id]);
      if (!picked) {
        message.warning("Chọn ít nhất một phần nội dung để xuất.");
        return;
      }
      const cssVarsBlock = buildCssVarsBlock(shadcnThemeStyle);
      const files = buildAgentMarkdownFiles({
        library: "shadcn",
        selection: mdSelection,
        shadcn: {
          state,
          shadcnThemeJsonText,
          cssVarsBlock,
        },
      });

      downloadAgentMarkdownZip(files, `ai-agent-markdown`);
      message.success("Đã tải gói ZIP (thư mục AI_AGENT_MARKDOWN/)");
    } catch {
      message.error("Không thể tạo ZIP. Hãy thử lại.");
    }
  }, [mdSelection, shadcnThemeJsonText, shadcnThemeStyle, state]);

  const colorFields = useMemo<Array<{ key: ColorFieldKey; label: string }>>(
    () => [
      { key: "colorPrimary", label: "Primary" },
      { key: "colorLink", label: "Link" },
      { key: "colorSuccess", label: "Success" },
      { key: "colorWarning", label: "Warning" },
      { key: "colorError", label: "Error" },
      { key: "colorInfo", label: "Info" },
    ],
    [],
  );

  return (
    <UICard className="w-full">
      <UICardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="grid gap-1">
            <UICardTitle>Shadcn Theme Config</UICardTitle>
            <p className="text-sm text-[var(--muted-foreground)]">
              Màn riêng cho shadcn: chỉnh token → preview cập nhật realtime.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <UIButton
              variant="outline"
              type="button"
              onClick={resetTheme}
              aria-label="Reset"
            >
              <RotateCcw size={16} />
              Reset
            </UIButton>
          </div>
        </div>
      </UICardHeader>
      <UICardContent>
        <div className="grid gap-5">
          <div className="flex items-center justify-between rounded-md border border-[var(--border)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Dark Mode
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                Toggle class <code>dark</code> trong scope shadcn.
              </p>
            </div>
            <UISwitch
              checked={state.mode === "dark"}
              onCheckedChange={(checked) =>
                updateTheme({ mode: checked ? "dark" : "light" })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {colorFields.map((f) => (
              <ColorField
                key={f.key}
                label={f.label}
                value={state[f.key]}
                onChange={(hex) => updateTheme({ [f.key]: hex })}
              />
            ))}
          </div>

          <div className="grid gap-2">
            <UILabel>Radius</UILabel>
            <UIInput
              type="number"
              min={0}
              max={24}
              step={1}
              value={state.radius}
              onChange={(e) =>
                updateTheme({ radius: Number(e.target.value || 0) })
              }
            />
          </div>

          <div className="grid gap-2">
            <UILabel>Font Family</UILabel>
            <UIInput
              value={state.fontFamily}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
              placeholder='system-ui, -apple-system, "Segoe UI", Roboto, ...'
            />
          </div>

          <div className="grid gap-3 rounded-md border border-[var(--border)] p-3">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Xuất markdown (AI_AGENT_MARKDOWN)
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                Chọn phần cần gói; design-tokens luôn lấy theo theme hiện tại.
                Brand assets có thể rất lớn.
              </p>
            </div>
            <div className="grid gap-2">
              {AGENT_MD_SECTION_ORDER.map((id) => (
                <label
                  key={id}
                  className="flex cursor-pointer items-start gap-2 text-sm text-[var(--foreground)]"
                >
                  <UICheckbox
                    checked={mdSelection[id]}
                    onChange={(e) =>
                      setMdSelection((s) => ({ ...s, [id]: e.target.checked }))
                    }
                  />
                  <span>
                    <span className="font-medium">
                      {AGENT_MD_SECTION_META[id].label}
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--muted-foreground)]">
                      {AGENT_MD_SECTION_META[id].hint}
                    </span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <UIButton
                type="button"
                variant="outline"
                onClick={onExportMarkdown}
                aria-label="Tải ai-entrypoint.md"
              >
                <Download size={16} />
                ai-entrypoint.md
              </UIButton>
              <UIButton
                type="button"
                onClick={onExportMarkdownZip}
                aria-label="Export ZIP bundle"
              >
                <FileArchive size={16} />
                Tải gói ZIP
              </UIButton>
            </div>
          </div>

          <div className="grid gap-2">
            <UILabel>Shadcn Theme JSON</UILabel>
            <pre className="max-h-56 overflow-auto rounded-md border border-[var(--border)] bg-[var(--muted)] p-3 text-xs text-[var(--foreground)]">
              {shadcnThemeJsonText}
            </pre>
          </div>
        </div>
      </UICardContent>
    </UICard>
  );
}
