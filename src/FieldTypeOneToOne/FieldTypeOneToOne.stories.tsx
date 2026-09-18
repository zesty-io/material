import { useState, type ReactNode, type SyntheticEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FieldTypeOneToOne, { type FieldTypeOneToOneProps } from "./";

type Option = { component: string | ReactNode; value: string; inputLabel: string };

/**
 * Single-relationship picker. Options are fetched lazily on open, so this story
 * simulates a slow API to exercise the loading state and the virtualized list.
 */
const meta: Meta<typeof FieldTypeOneToOne> = {
  title: "Field Types/FieldTypeOneToOne",
  component: FieldTypeOneToOne,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof FieldTypeOneToOne>;

const NONE: Option = { component: "- None -", value: "0", inputLabel: "- None -" };

const Controlled = (args: FieldTypeOneToOneProps) => {
  const [value, setValue] = useState<Option>(NONE);
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

  const handleOnChange = (_e: SyntheticEvent<Element, Event>, option: Option) =>
    setValue(option);

  return (
    <FieldTypeOneToOne
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
    label: "OneToOne label",
    helperText: "OneToOne helperText",
    placeholder: "OneToOne placeholder",
  },
};
