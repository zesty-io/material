import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Exercises `MuiInputBase`, `MuiOutlinedInput`, `MuiInputLabel`,
 * `MuiFormHelperText` and `MuiInputAdornment` together. M3 uses a 4px
 * (extraSmall) radius and a 2px focus ring.
 */
const meta: Meta<typeof TextField> = {
  title: "MUI/Inputs/TextField",
  component: TextField,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = { args: { label: "Label", placeholder: "Placeholder" } };

export const States: Story = {
  render: () => (
    <Stacked title="States">
      <TextField label="Default" placeholder="Placeholder" />
      <TextField label="Small" size="small" placeholder="Placeholder" />
      <TextField label="With helper text" helperText="Helper text" />
      <TextField label="Error" error helperText="Something went wrong" />
      <TextField label="Disabled" disabled placeholder="Disabled" />
      <TextField label="Required" required />
      <TextField label="Multiline" multiline rows={3} />
    </Stacked>
  ),
};

export const Adornments: Story = {
  render: () => (
    <Stacked title="InputAdornment">
      <TextField
        label="Search"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Amount"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          },
        }}
      />
    </Stacked>
  ),
};

export const Standalone: Story = {
  render: () => (
    <Stacked
      title="OutlinedInput"
      description="Composed by hand rather than through TextField's shorthand."
    >
      <FormControl>
        <InputLabel htmlFor="outlined-standalone">Label</InputLabel>
        <OutlinedInput id="outlined-standalone" label="Label" placeholder="Placeholder" />
        <FormHelperText>Helper text from FormHelperText</FormHelperText>
      </FormControl>
    </Stacked>
  ),
};
