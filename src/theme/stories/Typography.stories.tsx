import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * The Typography component and the active theme's type scale. Flip the
 * **Theme** toolbar control to compare: Legacy is a bespoke scale, M3 maps
 * MUI's variants onto the Material 3 roles (h1 = headlineLarge, and so on).
 *
 * The M3 role names (`displayLarge`…`labelSmall`) are registered as variants
 * too — see **M3 → Type scale** for those.
 */
const meta: Meta<typeof Typography> = {
  title: "MUI/Data Display/Typography",
  component: Typography,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Typography>;

const VARIANTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "body3",
  "button",
  "caption",
  "overline",
] as const;

export const Default: Story = {
  args: {
    variant: "body1",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

/**
 * Hooks live in a component, not in `render` — Storybook wraps `render` so it
 * happens to work there, but it breaks anywhere the story is rendered directly.
 */
const ScaleSpecimen = () => {
  const theme = useTheme();

  return (
    <Stack spacing={3} divider={<Divider flexItem />}>
      {VARIANTS.map((variant) => {
        const style =
          (
            theme.typography as unknown as Record<
              string,
              {
                fontSize?: string | number;
                lineHeight?: string | number;
                fontWeight?: string | number;
              }
            >
          )[variant] ?? {};
        return (
          <Stack key={variant} spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              {variant} — {style.fontSize ?? "inherit"} /{" "}
              {style.lineHeight ?? "inherit"} / {style.fontWeight ?? "inherit"}
            </Typography>
            <Typography variant={variant}>
              The quick brown fox jumps over the lazy dog
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

/** Every variant, annotated with the size and leading the active theme gives it. */
export const Scale: Story = {
  render: () => <ScaleSpecimen />,
};

/** `body3` is added by this library; it is not part of stock MUI. */
export const CustomVariant: Story = {
  render: () => (
    <Stacked
      title="body3"
      description="Registered through module augmentation in src/declarations.d.ts. Referencing it without that augmentation fails to compile."
    >
      <Typography variant="body1">
        body1 — the default paragraph size
      </Typography>
      <Typography variant="body2">body2 — one step down</Typography>
      <Typography variant="body3">
        body3 — the extra step this library adds
      </Typography>
    </Stacked>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stacked title="align">
      {(["left", "center", "right", "justify"] as const).map((align) => (
        <Paper key={align} variant="outlined" sx={{ p: 2 }}>
          <Typography align={align} variant="body2">
            {align} — Material Design uses a typographic scale with a limited
            number of type sizes that work well together along with the layout
            grid.
          </Typography>
        </Paper>
      ))}
    </Stacked>
  ),
};

export const Truncation: Story = {
  render: () => (
    <Stacked
      title="noWrap"
      description="Truncates with an ellipsis instead of wrapping."
    >
      <Box sx={{ width: 280 }}>
        <Typography noWrap>
          A single line that is far too long for its container and will be
          clipped
        </Typography>
      </Box>
      <Box sx={{ width: 280 }}>
        <Typography>
          The same string without noWrap, which wraps onto as many lines as it
          needs
        </Typography>
      </Box>
    </Stacked>
  ),
};

/** Semantics and appearance are separable — `variant` styles, `component` marks up. */
export const SemanticElement: Story = {
  render: () => (
    <Stacked
      title="component vs variant"
      description="Render an h1 that looks like an h4, so the heading outline stays correct."
    >
      <Typography variant="h4" component="h1">
        variant=&ldquo;h4&rdquo; component=&ldquo;h1&rdquo;
      </Typography>
      <Typography variant="body2" component="span">
        variant=&ldquo;body2&rdquo; component=&ldquo;span&rdquo;
      </Typography>
      <Typography variant="body1" gutterBottom>
        gutterBottom adds bottom margin
      </Typography>
      <Typography variant="body1">…so the next block clears it.</Typography>
    </Stacked>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stacked title="color">
      {(
        [
          "text.primary",
          "text.secondary",
          "text.disabled",
          "primary.main",
          "error.main",
          "success.main",
        ] as const
      ).map((color) => (
        <Typography key={color} color={color}>
          {color}
        </Typography>
      ))}
    </Stacked>
  ),
};
