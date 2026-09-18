/**
 * The Material 3 corner-radius scale.
 *
 * M3 sizes corners by role rather than by a single global radius: a Button is
 * `full`, a Card is `medium`, a Dialog is `extraLarge`. `theme.shape.borderRadius`
 * is set to `medium` as the neutral default, and the component overrides reach
 * for the named steps.
 *
 * @see https://m3.material.io/styles/shape/shape-scale-tokens
 */
export const m3Shape = {
  none: 0,
  extraSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  extraLarge: 28,
  full: 9999,
} as const;

export type M3Shape = typeof m3Shape;

/**
 * M3 elevation levels 0–5. Unlike MD2, M3 pairs these with a surface tint —
 * the component overrides apply the tint via `surfaceContainer*` roles.
 *
 * @see https://m3.material.io/styles/elevation/tokens
 */
export const m3Elevation = [
  "none",
  "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)",
  "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)",
  "0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)",
  "0px 2px 3px 0px rgba(0,0,0,0.30), 0px 6px 10px 4px rgba(0,0,0,0.15)",
  "0px 4px 4px 0px rgba(0,0,0,0.30), 0px 8px 12px 6px rgba(0,0,0,0.15)",
] as const;

/** MUI wants exactly 25 shadow slots; M3 only defines 6. */
export const m3Shadows = Array.from({ length: 25 }, (_, i) =>
  i < m3Elevation.length ? m3Elevation[i] : m3Elevation[5]
) as unknown as import("@mui/material/styles").Theme["shadows"];

/**
 * M3 state-layer opacities. A state layer is the "on" colour laid over a
 * component at low alpha — it is how M3 expresses hover/focus/pressed rather
 * than by darkening the container.
 *
 * @see https://m3.material.io/foundations/interaction/states/state-layers
 */
export const m3State = {
  hover: 0.08,
  focus: 0.1,
  pressed: 0.1,
  dragged: 0.16,
  disabledContainer: 0.12,
  disabledContent: 0.38,
} as const;
