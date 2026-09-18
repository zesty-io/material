import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fab, Stack, Typography } from "@mui/material";
import { Add, Edit } from "@mui/icons-material";
import { Section } from "./StorySection";

/** M3 gives the FAB a 16px (large) corner radius and a primaryContainer ground. */
const meta: Meta<typeof Fab> = {
  title: "MUI/Inputs/Fab",
  component: Fab,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes">
      {(["small", "medium", "large"] as const).map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <Fab size={size} color="primary">
            <Add />
          </Fab>
          <Typography variant="caption">{size}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <Section title="Variants and colors">
      <Fab color="primary">
        <Add />
      </Fab>
      <Fab color="secondary">
        <Edit />
      </Fab>
      <Fab variant="extended" color="primary">
        <Add sx={{ mr: 1 }} />
        Extended
      </Fab>
      <Fab disabled>
        <Add />
      </Fab>
    </Section>
  ),
};
