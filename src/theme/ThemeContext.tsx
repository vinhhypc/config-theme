import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { ThemeConfig } from "antd";
import { antdLikeMuiDarkToken, antdLikeMuiLightToken } from "./antd-like-mui";
import {
  antdLikeShadcnDarkToken,
  antdLikeShadcnLightToken,
} from "./antd-like-shadcn";

export type ThemeMode = "light" | "dark";

export type ThemePreset = "custom" | "antd-like-mui" | "antd-like-shadcn";

export type TokenOverrides = NonNullable<ThemeConfig["token"]>;

export type ThemeState = {
  preset: ThemePreset;
  tokenOverrides: TokenOverrides;
  mode: ThemeMode;
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

export type ThemeJson = {
  preset: ThemePreset;
  algorithm: "default" | "dark";
  componentSize: "small" | "middle" | "large";
  token: {
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
    wireframe: boolean;
  };
};

const DEFAULT_THEME_STATE: ThemeState = {
  preset: "custom",
  tokenOverrides: {},
  mode: "light",
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "#1677ff",
  borderRadius: 8,
  lineWidth: 1,
  fontSize: 14,
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  componentSize: "middle",
  wireframe: false,
};

type ThemeContextValue = {
  state: ThemeState;
  updateTheme: (patch: Partial<ThemeState>) => void;
  resetTheme: () => void;
  applyPreset: (preset: Exclude<ThemePreset, "custom">) => void;
  antdThemeConfig: ThemeConfig;
  themeJson: ThemeJson;
  themeJsonText: string;
};

const ThemePlaygroundContext = createContext<ThemeContextValue | null>(null);

function getPresetToken(
  preset: Exclude<ThemePreset, "custom">,
  mode: ThemeMode,
): TokenOverrides {
  if (preset === "antd-like-mui") {
    return mode === "dark" ? antdLikeMuiDarkToken : antdLikeMuiLightToken;
  }
  return mode === "dark" ? antdLikeShadcnDarkToken : antdLikeShadcnLightToken;
}

/** Build Ant Design ConfigProvider theme config from the current playground state. */
function buildAntdThemeConfig(state: ThemeState): ThemeConfig {
  return {
    algorithm:
      state.mode === "dark"
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
    token: {
      ...state.tokenOverrides,
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
      wireframe: state.wireframe,
    },
  };
}

/** Build a JSON-serializable theme config used for displaying/copying. */
function buildThemeJson(state: ThemeState): ThemeJson {
  return {
    preset: state.preset,
    algorithm: state.mode === "dark" ? "dark" : "default",
    componentSize: state.componentSize,
    token: {
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
      wireframe: state.wireframe,
    },
  };
}

/** Provide theme playground state and wrap children with Ant Design ConfigProvider. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ThemeState>(DEFAULT_THEME_STATE);

  const updateTheme = useCallback((patch: Partial<ThemeState>) => {
    setState((prev) => {
      const patchKeys = Object.keys(patch) as Array<keyof ThemeState>;
      const onlyModeOrSize = patchKeys.every(
        (k) => k === "mode" || k === "componentSize",
      );

      const nextMode = patch.mode ?? prev.mode;
      const tokenOverrides =
        patch.mode && prev.preset !== "custom"
          ? getPresetToken(prev.preset, nextMode)
          : prev.tokenOverrides;

      const t = tokenOverrides as Record<string, unknown>;
      const presetCorePatch =
        patch.mode && prev.preset !== "custom"
          ? {
              colorPrimary:
                typeof t.colorPrimary === "string"
                  ? t.colorPrimary
                  : prev.colorPrimary,
              colorSuccess:
                typeof t.colorSuccess === "string"
                  ? t.colorSuccess
                  : prev.colorSuccess,
              colorWarning:
                typeof t.colorWarning === "string"
                  ? t.colorWarning
                  : prev.colorWarning,
              colorError:
                typeof t.colorError === "string"
                  ? t.colorError
                  : prev.colorError,
              colorInfo:
                typeof t.colorInfo === "string" ? t.colorInfo : prev.colorInfo,
              colorLink:
                typeof t.colorLink === "string"
                  ? t.colorLink
                  : typeof t.colorPrimary === "string"
                    ? t.colorPrimary
                    : prev.colorLink,
              borderRadius:
                typeof t.borderRadius === "number"
                  ? t.borderRadius
                  : prev.borderRadius,
            }
          : null;

      return {
        ...prev,
        ...patch,
        tokenOverrides,
        ...(presetCorePatch ?? null),
        preset: onlyModeOrSize ? prev.preset : "custom",
      };
    });
  }, []);

  const resetTheme = useCallback(() => {
    setState(DEFAULT_THEME_STATE);
  }, []);

  const applyPreset = useCallback((preset: Exclude<ThemePreset, "custom">) => {
    setState((prev) => {
      const tokenOverrides = getPresetToken(preset, prev.mode);
      const t = tokenOverrides as Record<string, unknown>;

      const colorPrimary =
        typeof t.colorPrimary === "string" ? t.colorPrimary : prev.colorPrimary;
      const colorSuccess =
        typeof t.colorSuccess === "string" ? t.colorSuccess : prev.colorSuccess;
      const colorWarning =
        typeof t.colorWarning === "string" ? t.colorWarning : prev.colorWarning;
      const colorError =
        typeof t.colorError === "string" ? t.colorError : prev.colorError;
      const colorInfo =
        typeof t.colorInfo === "string" ? t.colorInfo : prev.colorInfo;
      const colorLink =
        typeof t.colorLink === "string" ? t.colorLink : colorPrimary;
      const borderRadius =
        typeof t.borderRadius === "number" ? t.borderRadius : prev.borderRadius;

      return {
        ...prev,
        preset,
        tokenOverrides,
        colorPrimary,
        colorSuccess,
        colorWarning,
        colorError,
        colorInfo,
        colorLink,
        borderRadius,
      };
    });
  }, []);

  const antdThemeConfig = useMemo(() => buildAntdThemeConfig(state), [state]);
  const themeJson = useMemo(() => buildThemeJson(state), [state]);
  const themeJsonText = useMemo(
    () => JSON.stringify(themeJson, null, 2),
    [themeJson],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      state,
      updateTheme,
      resetTheme,
      applyPreset,
      antdThemeConfig,
      themeJson,
      themeJsonText,
    }),
    [
      state,
      updateTheme,
      resetTheme,
      applyPreset,
      antdThemeConfig,
      themeJson,
      themeJsonText,
    ],
  );

  return (
    <ThemePlaygroundContext.Provider value={value}>
      <ConfigProvider
        theme={antdThemeConfig}
        componentSize={state.componentSize}
      >
        {children}
      </ConfigProvider>
    </ThemePlaygroundContext.Provider>
  );
}

/** Read and update theme playground state. Throws if used outside ThemeProvider. */
export function useThemePlayground(): ThemeContextValue {
  const ctx = useContext(ThemePlaygroundContext);
  if (!ctx) {
    throw new Error("useThemePlayground must be used within ThemeProvider");
  }
  return ctx;
}
