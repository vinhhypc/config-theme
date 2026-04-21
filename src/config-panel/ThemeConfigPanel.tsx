import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  ColorPicker,
  Form,
  Input,
  InputNumber,
  Row,
  Segmented,
  Space,
  Switch,
  Typography,
  message,
  theme,
} from "antd";
import { Copy, Download, FileArchive, RotateCcw } from "lucide-react";
import {
  AGENT_MD_SECTION_META,
  AGENT_MD_SECTION_ORDER,
  DEFAULT_AGENT_MD_SELECTION,
  type AgentMdExportSelection,
  type AgentMdSectionId,
} from "@/ai-markdown/agentExportTypes";
import {
  buildAgentMarkdownFiles,
  buildAiEntrypointMd,
  buildDesignTokensMdAntd,
} from "@/ai-markdown/buildAgentMarkdownBundle";
import { downloadAgentMarkdownZip } from "@/ai-markdown/downloadAgentMarkdownZip";
import { useThemePlayground } from "@/theme/ThemeContext";

type ThemeFormValues = {
  mode: "light" | "dark";
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorLink: string;
  borderRadius: number;
  lineWidth: number;
  fontSize: number;
  fontFamily: string;
  componentSize: "small" | "middle" | "large";
  wireframe: boolean;
};

/** Left panel: edit theme tokens/algorithm and copy/reset the current config. */
export default function ThemeConfigPanel() {
  const {
    state,
    updateTheme,
    resetTheme,
    applyPreset,
    themeJson,
    themeJsonText,
  } = useThemePlayground();
  const { token } = theme.useToken();
  const [form] = Form.useForm<ThemeFormValues>();
  const [mdSelection, setMdSelection] = useState<AgentMdExportSelection>(
    DEFAULT_AGENT_MD_SELECTION,
  );

  useEffect(() => {
    form.setFieldsValue({
      mode: state.mode,
      colorPrimary: state.colorPrimary,
      colorSuccess: state.colorSuccess,
      colorWarning: state.colorWarning,
      colorError: state.colorError,
      colorInfo: state.colorInfo,
      colorLink: state.colorLink,
      borderRadius: state.borderRadius,
      lineWidth: state.lineWidth,
      fontSize: state.fontSize,
      fontFamily: state.fontFamily,
      componentSize: state.componentSize,
      wireframe: state.wireframe,
    });
  }, [form, state]);

  const onExportMarkdown = useCallback(() => {
    try {
      const designTokensMd = buildDesignTokensMdAntd({ themeJsonText });
      const md = buildAiEntrypointMd({
        library: "antd",
        selection: mdSelection,
        designTokensMd,
      });
      const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ai-entrypoint.md";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      message.success("Đã tải ai-entrypoint.md");
    } catch {
      message.error("Không thể xuất file. Hãy thử lại.");
    }
  }, [mdSelection, themeJsonText]);

  const onExportMarkdownZip = useCallback(() => {
    try {
      const picked = AGENT_MD_SECTION_ORDER.some((id) => mdSelection[id]);
      if (!picked) {
        message.warning("Chọn ít nhất một phần nội dung để xuất.");
        return;
      }
      const files = buildAgentMarkdownFiles({
        library: "antd",
        selection: mdSelection,
        antd: { state, themeJsonText },
      });

      downloadAgentMarkdownZip(files, `ai-agent-markdown`);
      message.success("Đã tải gói ZIP (thư mục AI_AGENT_MARKDOWN/)");
    } catch {
      message.error("Không thể tạo ZIP. Hãy thử lại.");
    }
  }, [mdSelection, state, themeJsonText]);

  const tokenSnippetText = useMemo(
    () => `"token": ${JSON.stringify(themeJson.token, null, 2)}`,
    [themeJson.token],
  );

  const onCopyTokenSnippet = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(tokenSnippetText);
      message.success("Đã copy khối token vào clipboard");
    } catch {
      message.error("Không thể copy. Hãy thử lại hoặc kiểm tra quyền trình duyệt.");
    }
  }, [tokenSnippetText]);

  const jsonBlockStyle = useMemo<React.CSSProperties>(
    () => ({
      margin: 0,
      background: token.colorFillAlter,
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: token.borderRadiusLG,
      padding: token.paddingSM,
      overflow: "auto",
      maxHeight: 220,
      fontSize: 12,
      lineHeight: 1.4,
    }),
    [token],
  );

  return (
    <Card
      title="Theme Config"
      size="small"
      styles={{ body: { padding: token.paddingMD } }}
    >
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space wrap>
          <Button onClick={resetTheme}>Reset Default</Button>
          <Button onClick={() => applyPreset("antd-like-mui")}>
            Antd like MUI
          </Button>
          <Button onClick={() => applyPreset("antd-like-shadcn")}>
            Antd like shadcn
          </Button>
          <Typography.Text type="secondary">
            Preset: {state.preset}
          </Typography.Text>
        </Space>

        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onValuesChange={(changed) => {
            updateTheme(changed as Partial<ThemeFormValues>);
          }}
        >
          <Form.Item label="Mode" name="mode">
            <Segmented
              block
              options={[
                { label: "Light", value: "light" },
                { label: "Dark", value: "dark" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Component Size" name="componentSize">
            <Segmented
              block
              options={[
                { label: "Small", value: "small" },
                { label: "Middle", value: "middle" },
                { label: "Large", value: "large" },
              ]}
            />
          </Form.Item>
          <Row>
            <Col span={6}>
              <Form.Item label="Primary Color" name="colorPrimary">
                <ColorPicker
                  showText
                  value={state.colorPrimary}
                  onChange={(_, hex) => updateTheme({ colorPrimary: hex })}
                  presets={[
                    {
                      label: "Ant Design",
                      colors: [
                        "#1677ff",
                        "#722ed1",
                        "#13c2c2",
                        "#52c41a",
                        "#ff9500",
                        "#f5222d",
                      ],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Link Color" name="colorLink">
                <ColorPicker
                  showText
                  value={state.colorLink}
                  onChange={(_, hex) => updateTheme({ colorLink: hex })}
                  presets={[
                    {
                      label: "Defaults",
                      colors: ["#1677ff", "#2f54eb", "#722ed1", "#13c2c2"],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Success Color" name="colorSuccess">
                <ColorPicker
                  showText
                  value={state.colorSuccess}
                  onChange={(_, hex) => updateTheme({ colorSuccess: hex })}
                  presets={[
                    {
                      label: "Defaults",
                      colors: ["#52c41a", "#389e0d", "#73d13d", "#95de64"],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Warning Color" name="colorWarning">
                <ColorPicker
                  showText
                  value={state.colorWarning}
                  onChange={(_, hex) => updateTheme({ colorWarning: hex })}
                  presets={[
                    {
                      label: "Defaults",
                      colors: ["#faad14", "#d48806", "#ffc53d", "#ffd666"],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Error Color" name="colorError">
                <ColorPicker
                  showText
                  value={state.colorError}
                  onChange={(_, hex) => updateTheme({ colorError: hex })}
                  presets={[
                    {
                      label: "Defaults",
                      colors: ["#ff4d4f", "#f5222d", "#cf1322", "#ffa39e"],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Info Color" name="colorInfo">
                <ColorPicker
                  showText
                  value={state.colorInfo}
                  onChange={(_, hex) => updateTheme({ colorInfo: hex })}
                  presets={[
                    {
                      label: "Defaults",
                      colors: ["#1677ff", "#2f54eb", "#13c2c2", "#722ed1"],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Border Radius" name="borderRadius">
            <InputNumber min={0} max={24} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Border Width" name="lineWidth">
            <InputNumber min={0} max={4} step={0.5} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Font Size" name="fontSize">
            <InputNumber min={12} max={20} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Font Family" name="fontFamily">
            <Input placeholder='system-ui, -apple-system, "Segoe UI", Roboto, ...' />
          </Form.Item>

          <Form.Item label="Wireframe" name="wireframe" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>

        <div>
          <Typography.Text strong>
            Xuất markdown cho AI (AI_AGENT_MARKDOWN)
          </Typography.Text>
          <Typography.Paragraph
            type="secondary"
            style={{ marginBottom: 8, fontSize: 12 }}
          >
            Chọn phần cần gói; token luôn lấy theo theme hiện tại. Brand assets
            có thể rất lớn.
          </Typography.Paragraph>
          <Checkbox.Group
            style={{ width: "100%" }}
            value={AGENT_MD_SECTION_ORDER.filter((id) => mdSelection[id])}
            onChange={(checkedValues) => {
              const set = new Set(checkedValues as AgentMdSectionId[]);
              setMdSelection((prev) => {
                const next = { ...prev };
                for (const id of AGENT_MD_SECTION_ORDER) {
                  next[id] = set.has(id);
                }
                return next;
              });
            }}
          >
            <Space direction="vertical" size={6} style={{ width: "100%" }}>
              {AGENT_MD_SECTION_ORDER.map((id) => (
                <Checkbox key={id} value={id}>
                  <span>{AGENT_MD_SECTION_META[id].label}</span>
                  <Typography.Text
                    type="secondary"
                    style={{ marginLeft: 6, fontSize: 12 }}
                  >
                    — {AGENT_MD_SECTION_META[id].hint}
                  </Typography.Text>
                </Checkbox>
              ))}
            </Space>
          </Checkbox.Group>
        </div>

        <Space wrap style={{ width: "100%", justifyContent: "space-between" }}>
          <Button icon={<RotateCcw size={16} />} onClick={resetTheme}>
            Reset Theme
          </Button>
          <Space wrap>
            <Button icon={<Download size={16} />} onClick={onExportMarkdown}>
              ai-entrypoint.md
            </Button>
            <Button
              type="primary"
              icon={<FileArchive size={16} />}
              onClick={onExportMarkdownZip}
            >
              Tải gói ZIP
            </Button>
          </Space>
        </Space>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              marginBottom: token.paddingXS,
            }}
          >
            <Typography.Text strong>Theme JSON</Typography.Text>
            <Button
              type="default"
              size="small"
              icon={<Copy size={14} />}
              onClick={onCopyTokenSnippet}
            >
              Copy token
            </Button>
          </div>
          <pre style={jsonBlockStyle}>{themeJsonText}</pre>
        </div>
      </Space>
    </Card>
  );
}
