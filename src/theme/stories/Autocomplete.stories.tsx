import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete, TextField } from "@mui/material";
import { Section } from "./StorySection";

/**
 * MUI's Autocomplete. For the react-window backed version this library ships,
 * see **Components → VirtualizedAutocomplete**.
 */
const meta: Meta<typeof Autocomplete> = {
  title: "MUI/Inputs/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const OPTIONS = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot"];

export const Default: Story = {
  render: () => (
    <Section title="Single and multiple">
      <Autocomplete
        sx={{ width: 260 }}
        options={OPTIONS}
        renderInput={(params) => <TextField {...params} label="Single" />}
      />
      <Autocomplete
        multiple
        sx={{ width: 320 }}
        defaultValue={["Alpha", "Bravo"]}
        options={OPTIONS}
        renderInput={(params) => <TextField {...params} label="Multiple (chips)" />}
      />
    </Section>
  ),
};

export const States: Story = {
  render: () => (
    <Section title="States">
      <Autocomplete
        sx={{ width: 260 }}
        options={OPTIONS}
        disabled
        renderInput={(params) => <TextField {...params} label="Disabled" />}
      />
      <Autocomplete
        sx={{ width: 260 }}
        options={[]}
        loading
        renderInput={(params) => <TextField {...params} label="Loading" />}
      />
      <Autocomplete
        sx={{ width: 260 }}
        options={OPTIONS}
        readOnly
        defaultValue="Alpha"
        renderInput={(params) => <TextField {...params} label="Read only" />}
      />
    </Section>
  ),
};
