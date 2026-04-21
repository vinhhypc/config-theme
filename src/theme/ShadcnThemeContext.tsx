import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type ShadcnThemeMode = "light" | "dark";

export type ShadcnThemeState = {
  mode: ShadcnThemeMode;
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  colorInfo: string;
  colorLink: string;
  radius: number;
  fontFamily: string;
};

export type ShadcnThemeJson = {
  mode: ShadcnThemeMode;
  radius: number;
  fontFamily: string;
  colors: {
    primary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
    link: string;
    background: string;
    foreground: string;
    border: string;
    ring: string;
  };
};

const DEFAULT_SHADCN_THEME_STATE: ShadcnThemeState = {
  mode: "light",
  colorPrimary: "#1677ff",
  colorSuccess: "#52c41a",
  colorWarning: "#faad14",
  colorError: "#ff4d4f",
  colorInfo: "#1677ff",
  colorLink: "#1677ff",
  radius: 8,
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

type ShadcnThemeContextValue = {
  state: ShadcnThemeState;
  updateTheme: (patch: Partial<ShadcnThemeState>) => void;
  resetTheme: () => void;
  shadcnThemeJson: ShadcnThemeJson;
  shadcnThemeJsonText: string;
  shadcnThemeStyle: React.CSSProperties;
};

const ShadcnThemeContext = createContext<ShadcnThemeContextValue | null>(null);

/** Build a JSON-serializable shadcn theme config for displaying/copying. */
function buildShadcnThemeJson(state: ShadcnThemeState): ShadcnThemeJson {
  return {
    mode: state.mode,
    radius: state.radius,
    fontFamily: state.fontFamily,
    colors: {
      primary: state.colorPrimary,
      success: state.colorSuccess,
      warning: state.colorWarning,
      error: state.colorError,
      info: state.colorInfo,
      link: state.colorLink,
      background: state.mode === "dark" ? "#09090b" : "#ffffff",
      foreground: state.mode === "dark" ? "#fafafa" : "#09090b",
      border: state.mode === "dark" ? "#27272a" : "#e4e4e7",
      ring: state.colorPrimary,
    },
  };
}

/** Build CSS variables used by local shadcn-like components. */
function buildShadcnCssVars(state: ShadcnThemeState): React.CSSProperties {
  const shadcnTheme = buildShadcnThemeJson(state);
  return {
    "--background": shadcnTheme.colors.background,
    "--foreground": shadcnTheme.colors.foreground,
    "--card": shadcnTheme.colors.background,
    "--card-foreground": shadcnTheme.colors.foreground,
    "--popover": shadcnTheme.colors.background,
    "--popover-foreground": shadcnTheme.colors.foreground,
    "--primary": shadcnTheme.colors.primary,
    "--primary-foreground": "#ffffff",
    "--secondary": state.mode === "dark" ? "#27272a" : "#f4f4f5",
    "--secondary-foreground": shadcnTheme.colors.foreground,
    "--muted": state.mode === "dark" ? "#27272a" : "#f4f4f5",
    "--muted-foreground": state.mode === "dark" ? "#a1a1aa" : "#71717a",
    "--accent": shadcnTheme.colors.info,
    "--accent-foreground": "#ffffff",
    "--destructive": shadcnTheme.colors.error,
    "--destructive-foreground": "#ffffff",
    "--border": shadcnTheme.colors.border,
    "--input": shadcnTheme.colors.border,
    "--ring": shadcnTheme.colors.ring,
    "--radius": `${state.radius}px`,
    "--font-family": state.fontFamily,
  } as React.CSSProperties;
}

/** Provide shadcn theme playground state and CSS variable scope for UI components. */
export function ShadcnThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ShadcnThemeState>(
    DEFAULT_SHADCN_THEME_STATE,
  );

  const updateTheme = useCallback((patch: Partial<ShadcnThemeState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetTheme = useCallback(() => {
    setState(DEFAULT_SHADCN_THEME_STATE);
  }, []);

  const shadcnThemeJson = useMemo(() => buildShadcnThemeJson(state), [state]);
  const shadcnThemeJsonText = useMemo(
    () => JSON.stringify(shadcnThemeJson, null, 2),
    [shadcnThemeJson],
  );
  const shadcnThemeStyle = useMemo(() => buildShadcnCssVars(state), [state]);

  const value = useMemo<ShadcnThemeContextValue>(
    () => ({
      state,
      updateTheme,
      resetTheme,
      shadcnThemeJson,
      shadcnThemeJsonText,
      shadcnThemeStyle,
    }),
    [
      state,
      updateTheme,
      resetTheme,
      shadcnThemeJson,
      shadcnThemeJsonText,
      shadcnThemeStyle,
    ],
  );

  return (
    <ShadcnThemeContext.Provider value={value}>
      <div
        className={`shadcn-scope ${state.mode === "dark" ? "dark" : ""}`}
        style={shadcnThemeStyle}
      >
        {children}
      </div>
    </ShadcnThemeContext.Provider>
  );
}

/** Read and update shadcn theme playground state. Throws if used outside ShadcnThemeProvider. */
export function useShadcnThemePlayground(): ShadcnThemeContextValue {
  const ctx = useContext(ShadcnThemeContext);
  if (!ctx) {
    throw new Error(
      "useShadcnThemePlayground must be used within ShadcnThemeProvider",
    );
  }
  return ctx;
}
