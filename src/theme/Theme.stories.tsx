import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
  type Theme,
} from "@mui/material";

/**
 * A living reference for the exported `theme` and `darkTheme`. Use the Theme
 * control in the toolbar to switch between them — everything on this page
 * reads from whichever theme is active.
 *
 * The type scale now lives at **MUI → Data Display → Typography**, which
 * follows the same control.
 */
const meta = {
  title: "Theme",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const isColor = (value: unknown): value is string =>
  typeof value === "string" &&
  /^(#|rgb|hsl)/.test(value.trim());

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

const PaletteGroup = ({
  name,
  group,
}: {
  name: string;
  group: Record<string, unknown>;
}) => {
  const swatches = Object.entries(group).filter(([, v]) => isColor(v));
  if (swatches.length === 0) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="h6">{name}</Typography>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", rowGap: 1.5 }}>
        {swatches.map(([key, value]) => (
          <Swatch key={key} name={key} value={value as string} />
        ))}
      </Stack>
    </Stack>
  );
};

/** Every colour group on the palette, including the Zesty brand scales. */
const PaletteSpecimen = () => {
    const theme = useTheme<Theme>();
    const groups = Object.entries(theme.palette).filter(
      ([, value]) => value && typeof value === "object"
    ) as Array<[string, Record<string, unknown>]>;

    return (
      <Stack spacing={4} divider={<Divider flexItem />}>
        {groups.map(([name, group]) => (
          <PaletteGroup key={name} name={name} group={group} />
        ))}
      </Stack>
    );
};

export const Palette: Story = {
  render: () => <PaletteSpecimen />,
};

/** Border radii, elevations and spacing as configured in `theme/index.tsx`. */
const ShapeSpecimen = () => {
    const theme = useTheme<Theme>();

    return (
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Typography variant="h6">Border radius</Typography>
          <Typography variant="body2" color="text.secondary">
            theme.shape.borderRadius = {String(theme.shape.borderRadius)}
          </Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6">Elevation</Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", rowGap: 2 }}>
            {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
              <Paper
                key={elevation}
                elevation={elevation}
                sx={{
                  width: 88,
                  height: 64,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Typography variant="caption">{elevation}</Typography>
              </Paper>
            ))}
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="h6">Spacing</Typography>
          <Stack spacing={1}>
            {[1, 2, 3, 4, 6, 8].map((step) => (
              <Stack key={step} direction="row" spacing={2} alignItems="center">
                <Typography variant="caption" sx={{ width: 64 }}>
                  {step} ({theme.spacing(step)})
                </Typography>
                <Box sx={{ height: 12, width: theme.spacing(step), bgcolor: "primary.main", borderRadius: 0.5 }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>
    );
};

export const Shape: Story = {
  render: () => <ShapeSpecimen />,
};

/** The whole theme object, for when you need to look up an exact token. */
const RawTokens = () => {
    const theme = useTheme<Theme>();

    return (
      <Box
        component="pre"
        sx={{
          m: 0,
          p: 2,
          borderRadius: 1,
          border: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          fontSize: 12,
          lineHeight: 1.6,
          overflow: "auto",
          maxHeight: "80vh",
        }}
      >
        {JSON.stringify(
          theme,
          (_key, value) => (typeof value === "function" ? "[Function]" : value),
          2
        )}
      </Box>
    );
};

export const Raw: Story = {
  render: () => <RawTokens />,
};
