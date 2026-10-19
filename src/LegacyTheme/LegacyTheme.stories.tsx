import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import legacyTheme from ".";

/**
 * `legacyTheme` is still exported from the package for apps that have not moved
 * to the current `theme`. It is frozen — document it, don't extend it.
 *
 * Not to be confused with the **Legacy** option in the toolbar, which is the
 * current `theme`. This one is older still. These stories mount their own
 * `ThemeProvider`, so neither toolbar control affects this page.
 */
const meta: Meta = {
  title: "Theme/Legacy v1",
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof meta>;

const isColor = (value: unknown): value is string =>
  typeof value === "string" && /^(#|rgb|hsl)/.test(value.trim());

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <Stack spacing={0.5} sx={{ minWidth: 92 }}>
    <Box
      sx={{
        height: 48,
        borderRadius: 1,
        bgcolor: value,
        border: 1,
        borderColor: "divider",
      }}
    />
    <Typography variant="caption" sx={{ fontWeight: 600 }}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {value}
    </Typography>
  </Stack>
);

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
  "button",
  "caption",
  "overline",
] as const;

export const Palette: Story = {
  render: () => {
    const groups = Object.entries(legacyTheme.palette).filter(
      ([, value]) => value && typeof value === "object",
    ) as Array<[string, Record<string, unknown>]>;

    return (
      <ThemeProvider theme={legacyTheme}>
        <Box
          sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}
        >
          <Stack spacing={4} divider={<Divider flexItem />}>
            {groups.map(([name, group]) => {
              const swatches = Object.entries(group).filter(([, v]) =>
                isColor(v),
              );
              if (swatches.length === 0) return null;
              return (
                <Stack key={name} spacing={1}>
                  <Typography variant="h6">{name}</Typography>
                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ flexWrap: "wrap", rowGap: 1.5 }}
                  >
                    {swatches.map(([key, value]) => (
                      <Swatch key={key} name={key} value={value as string} />
                    ))}
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Box>
      </ThemeProvider>
    );
  },
};

export const Typographies: Story = {
  name: "Typography",
  render: () => (
    <ThemeProvider theme={legacyTheme}>
      <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}>
        <Stack spacing={3} divider={<Divider flexItem />}>
          {VARIANTS.map((variant) => {
            const style =
              (
                legacyTheme.typography as unknown as Record<
                  string,
                  { fontSize?: string | number; lineHeight?: string | number }
                >
              )[variant] ?? {};
            return (
              <Stack key={variant} spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  {variant} — {style.fontSize ?? "inherit"} /{" "}
                  {style.lineHeight ?? "inherit"}
                </Typography>
                <Typography variant={variant}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </ThemeProvider>
  ),
};

/** The handful of components legacyTheme overrides, next to each other. */
export const Components: Story = {
  render: () => (
    <ThemeProvider theme={legacyTheme}>
      <Box sx={{ bgcolor: "background.default", color: "text.primary", p: 3 }}>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography variant="h6">Button &amp; ButtonGroup</Typography>
            <Stack
              direction="row"
              spacing={2}
              sx={{ flexWrap: "wrap", rowGap: 2 }}
            >
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h6">Tooltip</Typography>
            <Box>
              <Tooltip title="Legacy tooltip styling" open placement="right">
                <Chip label="hover target" />
              </Tooltip>
            </Box>
          </Stack>

          <Alert severity="info">
            legacyTheme overrides far fewer components than the current theme —
            most MUI defaults come through untouched.
          </Alert>
        </Stack>
      </Box>
    </ThemeProvider>
  ),
};
