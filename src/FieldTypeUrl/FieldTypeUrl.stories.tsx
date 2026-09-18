import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeUrl, { type FieldTypeUrlProps } from "./";

/** URL input, typically rendered full width inside content forms. */
const meta: Meta<typeof FieldTypeUrl> = {
  title: "Field Types/FieldTypeUrl",
  component: FieldTypeUrl,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeUrl>;

const Controlled = (args: FieldTypeUrlProps) => {
  const [value, setValue] = useState("");

  return (
    <FieldTypeUrl
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
    label: "Some label",
    fullWidth: true,
  },
};
