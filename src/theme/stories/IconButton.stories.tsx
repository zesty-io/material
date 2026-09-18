import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton, Stack, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Section } from "./StorySection";

/**
 * MUI's IconButton. For this library's wrapper — which adds a `contained`
 * variant and the `xsmall`/`xxsmall` sizes — see **Components → IconButton**.
 */
const meta: Meta<typeof IconButton> = {
  title: "MUI/Inputs/IconButton",
  component: IconButton,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      {(["small", "medium", "large"] as const).map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <IconButton size={size} color="primary">
            <Edit fontSize="inherit" />
          </IconButton>
          <Typography variant="caption">{size}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

export const Colors: Story = {
  render: () => (
    <Section title="Colors">
      {(["inherit", "primary", "secondary", "success", "error", "warning", "info"] as const).map(
        (color) => (
          <Stack key={color} spacing={1} alignItems="center" sx={{ minWidth: 72 }}>
            <IconButton color={color}>
              <Edit />
            </IconButton>
            <Typography variant="caption">{color}</Typography>
          </Stack>
        )
      )}
      <Stack spacing={1} alignItems="center">
        <IconButton disabled>
          <Edit />
        </IconButton>
        <Typography variant="caption">disabled</Typography>
      </Stack>
    </Section>
  ),
};
