import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, Paper, ScopedCssBaseline, Stack, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Applies the same reset to a subtree only — used when this library is embedded
 * in a host app that owns the global styles.
 */
const meta: Meta<typeof ScopedCssBaseline> = {
  title: "MUI/Baseline/ScopedCssBaseline",
  component: ScopedCssBaseline,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ScopedCssBaseline>;

export const Default: Story = {
  render: () => (
    <Stacked title="Scoped vs global" description="Same markup, one wrapped and one not.">
      <Stack
        direction="row"
        spacing={3}
        sx={{ alignItems: "flex-start", flexWrap: "wrap", rowGap: 3 }}
      >
        <Paper variant="outlined" sx={{ flex: "1 1 260px", minWidth: 260 }}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Inside ScopedCssBaseline
            </Typography>
          </Box>
          <Divider />
          <ScopedCssBaseline sx={{ p: 2 }}>
            <h3>A heading</h3>
            <p>Paragraph text, reset by the scoped baseline.</p>
          </ScopedCssBaseline>
        </Paper>

        <Paper variant="outlined" sx={{ flex: "1 1 260px", minWidth: 260 }}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Reference (global baseline only)
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <h3>A heading</h3>
            <p>Paragraph text.</p>
          </Box>
        </Paper>
      </Stack>
    </Stacked>
  ),
};
