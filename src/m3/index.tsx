import type { CSSProperties } from "react";
import { createTheme } from "@mui/material/styles";
import { m3DarkScheme, m3LightScheme, m3Palettes, M3_SEED } from "./tokens";
import type { M3Scheme } from "./tokens";
import { m3Shape, m3Shadows, m3State } from "./shape";
import { m3Typography, m3TypeScale } from "./typography";
import { buildM3Components } from "./components";

// ---------------------------------------------------------------------------
// Module augmentation
//
// These are declared as optional because they are only populated by the M3
// themes — `theme` and `legacyTheme` do not carry them. Read them through
// `getM3Scheme()` rather than asserting non-null.
// ---------------------------------------------------------------------------

declare module "@mui/material/styles" {
  interface Palette {
    m3?: M3Scheme;
  }
  interface PaletteOptions {
    m3?: M3Scheme;
  }
  interface Theme {
    m3?: {
      seed: string;
      shape: typeof m3Shape;
      state: typeof m3State;
      palettes: typeof m3Palettes;
    };
  }
  interface ThemeOptions {
    m3?: Theme["m3"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    /** M3 filled-tonal button — secondaryContainer ground, no elevation. */
    tonal: true;
    /** M3 elevated button — surfaceContainerLow ground with level-1 shadow. */
    elevated: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
    labelLarge: true;
    labelMedium: true;
    labelSmall: true;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants extends Record<
    keyof typeof m3TypeScale,
    CSSProperties
  > {}
  interface TypographyVariantsOptions extends Partial<
    Record<keyof typeof m3TypeScale, CSSProperties>
  > {}
}

// ---------------------------------------------------------------------------
// Theme construction
// ---------------------------------------------------------------------------

/**
 * Maps M3 colour roles onto MUI's palette slots so unmodified MUI components
 * land on the right colours without knowing anything about M3.
 *
 * M3 ships no success/warning/info roles. Rather than borrow tertiary for
 * "success" — which yields a mauve carrying no semantic signal — those three are
 * generated as M3 custom colours, harmonised toward the seed. See CUSTOM_COLORS
 * in scripts/generate-m3-tokens.mjs.
 */
const paletteFromScheme = (s: M3Scheme, mode: "light" | "dark") => ({
  mode,
  m3: s,
  primary: { main: s.primary, contrastText: s.onPrimary },
  secondary: { main: s.secondary, contrastText: s.onSecondary },
  error: { main: s.error, contrastText: s.onError },
  warning: { main: s.warning, contrastText: s.onWarning },
  info: { main: s.info, contrastText: s.onInfo },
  success: { main: s.success, contrastText: s.onSuccess },
  background: { default: s.background, paper: s.surfaceContainerLow },
  text: {
    primary: s.onSurface,
    secondary: s.onSurfaceVariant,
    disabled: s.outline,
  },
  divider: s.outlineVariant,
  action: {
    hover: s.onSurface,
    hoverOpacity: m3State.hover,
    focus: s.onSurface,
    focusOpacity: m3State.focus,
    selected: s.onSurface,
    selectedOpacity: m3State.pressed,
    disabled: s.onSurface,
    disabledOpacity: m3State.disabledContent,
    active: s.onSurfaceVariant,
  },
});

const m3Extras = {
  seed: M3_SEED,
  shape: m3Shape,
  state: m3State,
  palettes: m3Palettes,
};

const build = (scheme: M3Scheme, mode: "light" | "dark") =>
  createTheme({
    typography: m3Typography,
    palette: paletteFromScheme(scheme, mode),
    shape: { borderRadius: m3Shape.medium },
    shadows: m3Shadows,
    components: buildM3Components(scheme),
    m3: m3Extras,
  });

/** Material 3 theme, light scheme, generated from the Zesty brand seed. */
export const m3Theme = build(m3LightScheme, "light");

/** Material 3 theme, dark scheme. */
export const m3DarkTheme = build(m3DarkScheme, "dark");

/**
 * Reads the M3 role set off a theme. Returns `undefined` for the legacy themes,
 * which is the honest answer — they have no M3 roles.
 */
export const getM3Scheme = (theme: { palette: { m3?: M3Scheme } }) =>
  theme.palette.m3;

export { m3LightScheme, m3DarkScheme, m3Palettes, M3_SEED };
export { m3Shape, m3State, m3Elevation } from "./shape";
export { m3TypeScale } from "./typography";
export type { M3Scheme, M3ColorRole } from "./tokens";
