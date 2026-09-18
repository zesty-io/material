import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Section } from "./StorySection";

/** Covers `MuiSelect` and the `MuiMenuItem` rendering of its options. */
const meta: Meta<typeof Select> = {
  title: "MUI/Inputs/Select",
  component: Select,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Select>;

const Controlled = ({ size }: { size?: "small" | "medium" }) => {
  const [value, setValue] = useState("one");
  return (
    <FormControl sx={{ minWidth: 220 }} size={size}>
      <InputLabel id={`select-${size ?? "medium"}`}>Label</InputLabel>
      <Select
        labelId={`select-${size ?? "medium"}`}
        label="Label"
        value={value}
        onChange={(e) => setValue(String(e.target.value))}
      >
        <MenuItem value="one">Option one</MenuItem>
        <MenuItem value="two">Option two</MenuItem>
        <MenuItem value="three">Option three</MenuItem>
        <MenuItem value="four" disabled>
          Disabled option
        </MenuItem>
      </Select>
      <FormHelperText>MuiSelect + MuiMenuItem</FormHelperText>
    </FormControl>
  );
};

export const Default: Story = {
  render: () => (
    <Section title="Sizes">
      <Controlled />
      <Controlled size="small" />
    </Section>
  ),
};

export const Error: Story = {
  render: () => (
    <Section title="Error and disabled">
      <FormControl sx={{ minWidth: 220 }} error>
        <InputLabel id="select-error">Error</InputLabel>
        <Select labelId="select-error" label="Error" value="one">
          <MenuItem value="one">Option one</MenuItem>
        </Select>
        <FormHelperText>Pick something else</FormHelperText>
      </FormControl>
      <FormControl sx={{ minWidth: 220 }} disabled>
        <InputLabel id="select-disabled">Disabled</InputLabel>
        <Select labelId="select-disabled" label="Disabled" value="one">
          <MenuItem value="one">Option one</MenuItem>
        </Select>
      </FormControl>
    </Section>
  ),
};
