import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeNumber, { type FieldTypeNumberProps } from "./";

/** Numeric input with the shared field label / helper-text treatment. */
const meta: Meta<typeof FieldTypeNumber> = {
  title: "Field Types/FieldTypeNumber",
  component: FieldTypeNumber,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeNumber>;

const Controlled = (args: FieldTypeNumberProps) => {
  const [value, setValue] = useState("0");

  return (
    <FieldTypeNumber
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
    label: "Number label",
    helperText: "Number helper text",
  },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Number label",
    helperText: "Must be a positive number",
    error: true,
  },
};
