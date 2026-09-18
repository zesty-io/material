import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Section } from "./StorySection";

const meta: Meta<typeof Checkbox> = {
  title: "MUI/Inputs/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => (
    <Section title="States">
      <FormControlLabel control={<Checkbox defaultChecked />} label="Checked" />
      <FormControlLabel control={<Checkbox />} label="Unchecked" />
      <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
      <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
      <FormControlLabel control={<Checkbox disabled defaultChecked />} label="Disabled checked" />
    </Section>
  ),
};

export const SizesAndColors: Story = {
  render: () => (
    <Section title="Sizes and colors">
      <FormControlLabel control={<Checkbox size="small" defaultChecked />} label="Small" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Medium" />
      {(["primary", "secondary", "success", "error"] as const).map((color) => (
        <FormControlLabel
          key={color}
          control={<Checkbox defaultChecked color={color} />}
          label={color}
        />
      ))}
    </Section>
  ),
};
