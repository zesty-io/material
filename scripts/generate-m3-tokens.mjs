// @ts-check
/**
 * Generates the Material 3 colour tokens for `src/m3/` from a single seed
 * colour, using Google's own algorithm.
 *
 * The output (`src/m3/tokens.ts`) is COMMITTED, so day-to-day work never runs
 * this script and does not need the generator dependency. Run it only when the
 * brand seed changes: edit SEED below, run `npm run gen:m3`, commit the diff.
 *
 * Why generate instead of hand-writing: M3 colour roles are derived by mapping
 * a seed into HCT space and sampling tonal palettes at fixed tones. Writing
 * those hex values by hand means guessing at CAM16 output.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { register } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// See scripts/m3-loader.mjs — the generator dependency ships extensionless
// internal imports that bare Node ESM cannot resolve.
register("./m3-loader.mjs", import.meta.url);

let argbFromHex, hexFromArgb, themeFromSourceColor;
try {
  ({ argbFromHex, hexFromArgb, themeFromSourceColor } = await import(
    "@material/material-color-utilities"
  ));
} catch (error) {
  const missing =
    error?.code === "ERR_MODULE_NOT_FOUND" &&
    /Cannot find package '@material\/material-color-utilities'/.test(error.message);
  console.error(
    missing
      ? [
          "",
          "  @material/material-color-utilities is not installed. Run:",
          "",
          "    npm install",
          "",
          "  It is only needed to REGENERATE tokens — src/m3/tokens.ts is committed,",
          "  so building and running Storybook does not require it.",
          "",
        ].join("\n")
      : `\n  Failed to load the M3 generator:\n\n  ${error?.message ?? error}\n`
  );
  process.exit(1);
}

/**
 * The M3 brand seed. Deliberately independent of the legacy theme's
 * `palette.ts` primary (#FF5D0A) — M3 derives its whole harmony from this one
 * colour, so the two families are not expected to match.
 */
const SEED = "#4254BD";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/m3/tokens.ts"
);

/**
 * M3 has no success / warning / info roles — it only ships primary, secondary,
 * tertiary and error. Borrowing tertiary for "success" produces a mauve that
 * carries no semantic signal, so these are declared as M3 *custom colours*
 * instead. `blend: true` harmonises each one toward the seed, so they read as
 * part of the same palette rather than bolted on.
 *
 * The source values are the legacy theme's semantic colours, which keeps the
 * meaning ("green = success") consistent across both theme families.
 */
const CUSTOM_COLORS = [
  { name: "success", value: argbFromHex("#12B76A"), blend: true },
  { name: "warning", value: argbFromHex("#F79009"), blend: true },
  { name: "info", value: argbFromHex("#0BA5EC"), blend: true },
];

const m3 = themeFromSourceColor(argbFromHex(SEED), CUSTOM_COLORS);
const hex = (argb) => hexFromArgb(argb);
const tone = (palette, t) => hex(palette.tone(t));

/**
 * The scheme in material-color-utilities predates the surface-container roles,
 * so those are sampled straight off the neutral tonal palette at the tones the
 * M3 spec specifies.
 */
const SURFACE_TONES = {
  light: {
    surfaceDim: 87,
    surfaceBright: 98,
    surfaceContainerLowest: 100,
    surfaceContainerLow: 96,
    surfaceContainer: 94,
    surfaceContainerHigh: 92,
    surfaceContainerHighest: 90,
  },
  dark: {
    surfaceDim: 6,
    surfaceBright: 24,
    surfaceContainerLowest: 4,
    surfaceContainerLow: 10,
    surfaceContainer: 12,
    surfaceContainerHigh: 17,
    surfaceContainerHighest: 22,
  },
};

const ROLES = [
  "primary", "onPrimary", "primaryContainer", "onPrimaryContainer",
  "secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer",
  "tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer",
  "error", "onError", "errorContainer", "onErrorContainer",
  "background", "onBackground",
  "surface", "onSurface", "surfaceVariant", "onSurfaceVariant",
  "outline", "outlineVariant",
  "shadow", "scrim",
  "inverseSurface", "inverseOnSurface", "inversePrimary",
];

const buildScheme = (mode) => {
  const scheme = m3.schemes[mode].toJSON();
  const out = {};
  for (const role of ROLES) out[role] = hex(scheme[role]);
  for (const [role, t] of Object.entries(SURFACE_TONES[mode])) {
    out[role] = tone(m3.palettes.neutral, t);
  }
  for (const group of m3.customColors) {
    const name = group.color.name;
    const Name = name[0].toUpperCase() + name.slice(1);
    out[name] = hex(group[mode].color);
    out[`on${Name}`] = hex(group[mode].onColor);
    out[`${name}Container`] = hex(group[mode].colorContainer);
    out[`on${Name}Container`] = hex(group[mode].onColorContainer);
  }
  return out;
};

const TONE_STOPS = [0, 4, 6, 10, 12, 17, 20, 22, 24, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94, 95, 96, 98, 99, 100];

const buildPalettes = () => {
  const out = {};
  for (const [name, palette] of Object.entries(m3.palettes)) {
    out[name] = Object.fromEntries(TONE_STOPS.map((t) => [t, tone(palette, t)]));
  }
  return out;
};

const json = (value) => JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");

const contents = `// GENERATED FILE — DO NOT EDIT.
// Produced by scripts/generate-m3-tokens.mjs from seed ${SEED}.
// Regenerate with \`npm run gen:m3\`.

/** The brand colour every token below is derived from. */
export const M3_SEED = "${SEED}" as const;

/** Full tonal palettes, keyed by tone (0 = black, 100 = white). */
export const m3Palettes = ${json(buildPalettes())} as const;

/** Resolved M3 colour roles for the light scheme. */
export const m3LightScheme = ${json(buildScheme("light"))} as const;

/** Resolved M3 colour roles for the dark scheme. */
export const m3DarkScheme = ${json(buildScheme("dark"))} as const;

// Values are widened to \`string\`: with \`as const\` the hex values become literal
// types, and the dark scheme's literals would not satisfy the light scheme's.
export type M3ColorRole = keyof typeof m3LightScheme;
export type M3Scheme = Record<M3ColorRole, string>;
export type M3ToneStop = keyof (typeof m3Palettes)["primary"];
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, contents);
console.log(`m3: wrote ${OUT} from seed ${SEED}`);
