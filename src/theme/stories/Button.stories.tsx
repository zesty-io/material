import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Section } from "./StorySection";

/**
 * M3 makes buttons pill-shaped and adds two variants MUI does not ship,
 * `tonal` and `elevated` — see **M3 → Buttons** for those.
 */
const meta: Meta<typeof Button> = {
  title: "MUI/Inputs/Button",
  component: Button,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Button>;

const COLORS = ["primary", "secondary", "success", "error", "warning", "info"] as const;

export const Default: Story = { args: { variant: "contained", children: "Button" } };

export const Variants: Story = {
  render: () => (
    <Section title="Variants">
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Section>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Section title="Sizes" description="Includes xsmall, added to MUI's set by module augmentation.">
      {(["xsmall", "small", "medium", "large"] as const).map((size) => (
        <Button key={size} variant="contained" size={size}>
          {size}
        </Button>
      ))}
    </Section>
  ),
};

export const Colors: Story = {
  render: () => (
    <Section title="Colors">
      {COLORS.map((color) => (
        <Button key={color} variant="contained" color={color}>
          {color}
        </Button>
      ))}
    </Section>
  ),
};

export const States: Story = {
  render: () => (
    <Section title="States">
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="outlined" disabled>
        Disabled
      </Button>
      <Button variant="contained" startIcon={<Add />}>
        startIcon
      </Button>
      <Button variant="contained" endIcon={<Add />}>
        endIcon
      </Button>
      <Button variant="contained" fullWidth sx={{ maxWidth: 240 }}>
        fullWidth
      </Button>
    </Section>
  ),
};
