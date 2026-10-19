import { useState, type ChangeEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { Close, Search } from "@mui/icons-material";

/**
 * MUI's TextField as restyled by the Zesty theme. Nothing is wrapped here —
 * this story exists so theme changes to inputs are visible in one place.
 */
const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TextField>;

const Controlled = (args: TextFieldProps) => {
  const [value, setValue] = useState("");

  return (
    <TextField
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
    label: "Label",
  },
};

/** Search-style field with leading and trailing adornments. */
export const WithAdornments: Story = {
  render: (args) => (
    <Controlled
      {...args}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <IconButton size="small">
                <Search fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small">
                <Close fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  ),
  args: {
    placeholder: "Search...",
  },
};

/** Sizes and states as the theme renders them. */
export const States: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 360 }}>
      <TextField label="Small" size="small" placeholder="Small" />
      <TextField label="Medium" placeholder="Medium" />
      <TextField label="Error" error helperText="Something is wrong" />
      <TextField label="Disabled" disabled placeholder="Disabled" />
      <TextField label="Multiline" multiline rows={3} placeholder="Multiline" />
    </Stack>
  ),
};
