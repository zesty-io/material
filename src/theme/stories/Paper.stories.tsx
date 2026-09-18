import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { Section, Stacked } from "./StorySection";

/**
 * Paper is the surface every other container is built on — Card, Dialog, Menu,
 * Accordion and AppBar are all Papers.
 *
 * The legacy theme leaves it alone; **M3 overrides it** with a
 * `surfaceContainerLow` ground and a 12px radius. That inheritance is why
 * `MuiAppBar` needs its own override to stay square-edged.
 */
const meta: Meta<typeof Paper> = {
  title: "MUI/Surfaces/Paper",
  component: Paper,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Paper>;

export const Default: Story = {
  args: { children: "Paper", sx: { p: 3, width: 200 } },
};

export const Variants: Story = {
  render: () => (
    <Section title="variant">
      {(["elevation", "outlined"] as const).map((variant) => (
        <Stack key={variant} spacing={1} alignItems="center">
          <Paper variant={variant} sx={{ width: 160, height: 96, display: "grid", placeItems: "center" }}>
            <Typography variant="body2">{variant}</Typography>
          </Paper>
          <Typography variant="caption">{variant}</Typography>
        </Stack>
      ))}
      <Stack spacing={1} alignItems="center">
        <Paper square sx={{ width: 160, height: 96, display: "grid", placeItems: "center" }}>
          <Typography variant="body2">square</Typography>
        </Paper>
        <Typography variant="caption">square</Typography>
      </Stack>
    </Section>
  ),
};

/**
 * MUI defines 25 elevation levels. M3 defines six, and this theme maps 0–5 to
 * M3's shadows then repeats level 5 — so under M3 anything above 5 looks
 * identical.
 */
export const Elevation: Story = {
  render: () => (
    <Stacked
      title="elevation"
      description="Under M3, levels above 5 are all the same — M3 only defines six."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 2,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 8, 12, 16, 24].map((elevation) => (
          <Paper
            key={elevation}
            elevation={elevation}
            sx={{ height: 72, display: "grid", placeItems: "center" }}
          >
            <Typography variant="caption">{elevation}</Typography>
          </Paper>
        ))}
      </Box>
    </Stacked>
  ),
};

/** Papers on papers — the case where the M3 surface-container ramp earns its keep. */
export const Nested: Story = {
  render: () => (
    <Stacked
      title="Nested surfaces"
      description="M3 distinguishes stacked surfaces by tone rather than by shadow; the legacy theme relies on elevation."
    >
      <Paper sx={{ p: 2, maxWidth: 420 }}>
        <Typography variant="body2" gutterBottom>
          Outer paper
        </Typography>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="body2" gutterBottom>
            Nested, outlined
          </Typography>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body2">Nested, elevation 3</Typography>
          </Paper>
        </Paper>
      </Paper>
    </Stacked>
  ),
};
