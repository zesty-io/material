import { useState, type ReactNode, type SyntheticEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeOneToMany, { type FieldTypeOneToManyProps } from "./";

type Option = { component: string | ReactNode; value: string; inputLabel: string };

/**
 * Multi-relationship picker. Selections render as chips; options load lazily
 * on open, the same way they do in the content editor.
 */
const meta: Meta<typeof FieldTypeOneToMany> = {
  title: "Field Types/FieldTypeOneToMany",
  component: FieldTypeOneToMany,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeOneToMany>;

const Controlled = (args: FieldTypeOneToManyProps) => {
  const [value, setValue] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const handleOnOpen = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setOptions(
      Array.from({ length: 1000 }, (_, idx) => ({
        component: <div>{`Test ${idx}`}</div>,
        value: String(idx),
        inputLabel: `Test ${idx}`,
      }))
    );
  };

  const handleOnChange = (
    _e: SyntheticEvent<Element, Event>,
    values: Option[]
  ) => setValue(values);

  return (
    <FieldTypeOneToMany
      {...args}
      value={value}
      onChange={handleOnChange}
      options={options}
      onOpen={handleOnOpen}
    />
  );
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    placeholder: "Placeholder Text...",
    label: "OneToMany label",
    helperText: "OneToMany helperText",
  },
};
