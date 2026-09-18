import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Chip } from "@mui/material";
import { Delete, Settings } from "@mui/icons-material";
import { Section } from "./StorySection";

/** Themed by both families. M3 renders the outlined "assist chip" as default. */
const meta: Meta<typeof Chip> = {
  title: "MUI/Data Display/Chip",
  component: Chip,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Chip>;

const COLORS = ["default", "primary", "secondary", "success", "error", "warning", "info"] as const;

export const Default: Story = { args: { label: "Chip" } };

export const Filled: Story = {
  render: () => (
    <Section title="Filled">
      {COLORS.map((color) => (
        <Chip key={color} label={color} color={color} />
      ))}
    </Section>
  ),
};

export const Outlined: Story = {
  render: () => (
    <Section title="Outlined">
      {COLORS.map((color) => (
        <Chip key={color} label={color} color={color} variant="outlined" />
      ))}
    </Section>
  ),
};

export const Content: Story = {
  render: () => (
    <Section title="Sizes and content">
      <Chip label="Small" size="small" color="primary" />
      <Chip label="Medium" color="primary" />
      <Chip label="With avatar" avatar={<Avatar>Z</Avatar>} />
      <Chip label="With icon" icon={<Settings />} color="primary" />
      <Chip label="Deletable" onDelete={() => {}} color="primary" />
      <Chip label="Custom delete" onDelete={() => {}} deleteIcon={<Delete />} />
      <Chip label="Clickable" onClick={() => {}} />
      <Chip label="Disabled" disabled />
    </Section>
  ),
};
