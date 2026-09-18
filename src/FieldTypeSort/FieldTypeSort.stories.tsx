import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeSort, { type FieldTypeSortProps } from "./";

/** Sort-order field used to position an item within a list. */
const meta: Meta<typeof FieldTypeSort> = {
  title: "Field Types/FieldTypeSort",
  component: FieldTypeSort,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeSort>;

const Controlled = (args: FieldTypeSortProps) => {
  const [value, setValue] = useState("3");

  return (
    <FieldTypeSort
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
    label: "Sort label",
    helperText: "Sort helper text",
    error: false,
  },
};
