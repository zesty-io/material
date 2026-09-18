import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Section } from "./StorySection";

/**
 * Radios are always used as a group — mui.com files this under "Radio Group"
 * for that reason. Also covers `MuiFormLabel` and `MuiFormHelperText` in their
 * group context.
 */
const meta: Meta<typeof Radio> = {
  title: "MUI/Inputs/Radio Group",
  component: Radio,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <Section title="RadioGroup">
      <FormControl>
        <FormLabel id="radio-demo">FormLabel</FormLabel>
        <RadioGroup row aria-labelledby="radio-demo" defaultValue="a">
          <FormControlLabel value="a" control={<Radio />} label="A" />
          <FormControlLabel value="b" control={<Radio />} label="B" />
          <FormControlLabel value="c" control={<Radio />} label="C" disabled />
        </RadioGroup>
        <FormHelperText>MuiFormLabel + MuiFormHelperText</FormHelperText>
      </FormControl>
    </Section>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Section title="Vertical, with error state">
      <FormControl error>
        <FormLabel id="radio-error">Pick one</FormLabel>
        <RadioGroup aria-labelledby="radio-error" defaultValue="a">
          <FormControlLabel value="a" control={<Radio size="small" />} label="Small" />
          <FormControlLabel value="b" control={<Radio />} label="Medium" />
        </RadioGroup>
        <FormHelperText>This selection is not allowed</FormHelperText>
      </FormControl>
    </Section>
  ),
};
