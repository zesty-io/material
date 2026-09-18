import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Section, Stacked } from "./StorySection";

/** Both themes override the divider colour — M3 uses `outlineVariant`. */
const meta: Meta<typeof Divider> = {
  title: "MUI/Data Display/Divider",
  component: Divider,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <Stacked title="Horizontal">
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">Above</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2">Below</Typography>
        <Divider sx={{ my: 2 }}>With text</Divider>
        <Typography variant="body2">After a labelled divider</Typography>
        <Divider sx={{ my: 2 }} textAlign="left">
          Left aligned
        </Divider>
        <Typography variant="body2">After a left-aligned label</Typography>
      </Paper>
    </Stacked>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Section title="Vertical">
      <Stack
        direction="row"
        spacing={2}
        sx={{ height: 48 }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography variant="body2">One</Typography>
        <Typography variant="body2">Two</Typography>
        <Typography variant="body2">Three</Typography>
      </Stack>
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stacked title="variant" description="`inset` and `middle` indent the rule.">
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="body2">fullWidth (default)</Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="body2">inset</Typography>
        <Divider variant="inset" sx={{ my: 1 }} />
        <Typography variant="body2">middle</Typography>
        <Divider variant="middle" sx={{ my: 1 }} />
      </Paper>
    </Stacked>
  ),
};
