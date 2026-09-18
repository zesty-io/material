import { useState, type ReactNode, type SyntheticEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import VirtualizedAutocomplete, {
  type VirtualizedAutocompleteProps,
} from "./";

type Option = { component: string | ReactNode; value: string; inputLabel: string };

/**
 * The react-window backed Autocomplete that the relationship fields are built
 * on. Handles very large option lists without dropping frames — this story
 * loads 1,000 options.
 */
const meta: Meta<typeof VirtualizedAutocomplete> = {
  title: "Components/VirtualizedAutocomplete",
  component: VirtualizedAutocomplete,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof VirtualizedAutocomplete>;

const NONE: Option = { component: "- None -", value: "0", inputLabel: "- None -" };

const Controlled = (args: VirtualizedAutocompleteProps) => {
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
    <VirtualizedAutocomplete
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
    helperText: "Loads 1,000 options on open",
    placeholder: "Search options",
  },
};
