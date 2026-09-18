import type { TypographyVariantsOptions } from "@mui/material/styles";

/**
 * The Material 3 type scale — five roles (display, headline, title, body,
 * label) at three sizes each.
 *
 * These are exposed as custom Typography variants (`displayLarge`, `titleMedium`,
 * …) *and* mapped onto MUI's built-in variants below, so unmodified MUI
 * components pick up M3 type without every call site changing.
 *
 * @see https://m3.material.io/styles/typography/type-scale-tokens
 */
export const m3TypeScale = {
  displayLarge: { fontSize: "3.5625rem", lineHeight: "4rem", letterSpacing: "-0.015625rem", fontWeight: 400 },
  displayMedium: { fontSize: "2.8125rem", lineHeight: "3.25rem", letterSpacing: 0, fontWeight: 400 },
  displaySmall: { fontSize: "2.25rem", lineHeight: "2.75rem", letterSpacing: 0, fontWeight: 400 },

  headlineLarge: { fontSize: "2rem", lineHeight: "2.5rem", letterSpacing: 0, fontWeight: 400 },
  headlineMedium: { fontSize: "1.75rem", lineHeight: "2.25rem", letterSpacing: 0, fontWeight: 400 },
  headlineSmall: { fontSize: "1.5rem", lineHeight: "2rem", letterSpacing: 0, fontWeight: 400 },

  titleLarge: { fontSize: "1.375rem", lineHeight: "1.75rem", letterSpacing: 0, fontWeight: 400 },
  titleMedium: { fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: "0.009375rem", fontWeight: 500 },
  titleSmall: { fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0.00625rem", fontWeight: 500 },

  bodyLarge: { fontSize: "1rem", lineHeight: "1.5rem", letterSpacing: "0.03125rem", fontWeight: 400 },
  bodyMedium: { fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0.015625rem", fontWeight: 400 },
  bodySmall: { fontSize: "0.75rem", lineHeight: "1rem", letterSpacing: "0.025rem", fontWeight: 400 },

  labelLarge: { fontSize: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0.00625rem", fontWeight: 500 },
  labelMedium: { fontSize: "0.75rem", lineHeight: "1rem", letterSpacing: "0.03125rem", fontWeight: 500 },
  labelSmall: { fontSize: "0.6875rem", lineHeight: "1rem", letterSpacing: "0.03125rem", fontWeight: 500 },
} as const;

export type M3TypeScaleKey = keyof typeof m3TypeScale;

/**
 * Mulish is kept as the family so M3 stories stay visually comparable to the
 * legacy theme — only the scale changes, not the typeface.
 */
const FONT_FAMILY = "'Mulish'";

export const m3Typography: TypographyVariantsOptions = {
  fontFamily: FONT_FAMILY,
  ...m3TypeScale,

  // Map M3 roles onto MUI's built-ins. Headline covers h1–h3 rather than
  // display, because display sizes are for hero moments, not page headings.
  h1: m3TypeScale.headlineLarge,
  h2: m3TypeScale.headlineMedium,
  h3: m3TypeScale.headlineSmall,
  h4: m3TypeScale.titleLarge,
  h5: m3TypeScale.titleMedium,
  h6: m3TypeScale.titleSmall,
  subtitle1: m3TypeScale.titleMedium,
  subtitle2: m3TypeScale.titleSmall,
  body1: m3TypeScale.bodyLarge,
  body2: m3TypeScale.bodyMedium,
  body3: m3TypeScale.bodySmall,
  button: { ...m3TypeScale.labelLarge, textTransform: "none" },
  caption: m3TypeScale.bodySmall,
  overline: { ...m3TypeScale.labelSmall, textTransform: "uppercase" },
};
