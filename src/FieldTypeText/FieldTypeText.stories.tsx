import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "@mui/material";
import FieldTypeText, { type FieldTypeTextProps } from "./";
import { Brain } from "../icons/Brain";

/**
 * A single-line (or multiline) text input built on MUI's TextField, with the
 * label, helper text and end-adornment conventions used across Zesty apps.
 */
const meta: Meta<typeof FieldTypeText> = {
  title: "Field Types/FieldTypeText",
  component: FieldTypeText,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeText>;

/** Keeps the input controlled so typing works inside the story canvas. */
const Controlled = (args: FieldTypeTextProps) => {
  const [value, setValue] = useState("");

  return (
    <FieldTypeText
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Placeholder Text...",
    label: "Text label",
    helperText: "Text helper text",
    endLabel: (
      <IconButton size="small">
        <Brain fontSize="small" />
      </IconButton>
    ),
  },
};

export const TextArea: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    multiline: true,
    rows: 4,
    placeholder: "Placeholder Text...",
    label: "Text Label",
    helperText: "Text helper text",
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Text label",
    placeholder: "Placeholder Text...",
    helperText: "This field is required",
    error: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Text label",
    placeholder: "Placeholder Text...",
    disabled: true,
  },
};
