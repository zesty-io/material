import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Material UI ships no NumberField component. mui.com's "Number Field" page is
 * a composition recipe that pulls in Base UI's NumberField and is written
 * against MUI v9 — this repo is on v7, and Base UI is not a dependency.
 *
 * In v7 the numeric input is `TextField` with `type="number"`. This library's
 * own **Field Types → FieldTypeNumber** wraps exactly this.
 */
const meta: Meta<typeof TextField> = {
  title: "MUI/Inputs/Number Field",
  component: TextField,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TextField>;

const Controlled = ({
  label,
  helperText,
  min,
  max,
  step,
  initial = "",
  ...rest
}: {
  label: string;
  helperText?: string;
  min?: number;
  max?: number;
  step?: number;
  initial?: string;
} & Record<string, unknown>) => {
  const [value, setValue] = useState(initial);

  return (
    <TextField
      {...rest}
      type="number"
      label={label}
      helperText={helperText}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{ htmlInput: { min, max, step } }}
    />
  );
};

export const Default: Story = {
  render: () => (
    <Stacked title="type=&quot;number&quot;">
      <Controlled label="Quantity" initial="1" />
      <Controlled label="With helper text" helperText="Any whole number" initial="0" />
      <Controlled label="Small" size="small" initial="0" />
    </Stacked>
  ),
};

/** `min`, `max` and `step` go through `slotProps.htmlInput` in MUI v7. */
export const Constraints: Story = {
  render: () => (
    <Stacked
      title="min / max / step"
      description="Passed via slotProps.htmlInput — the old inputProps shorthand is deprecated in v7."
    >
      <Controlled label="0–10" min={0} max={10} initial="5" helperText="min=0 max=10" />
      <Controlled label="Steps of 5" min={0} max={100} step={5} initial="25" helperText="step=5" />
      <Controlled
        label="Decimals"
        min={0}
        max={1}
        step={0.1}
        initial="0.5"
        helperText="step=0.1"
      />
    </Stacked>
  ),
};

export const WithAdornments: Story = {
  render: () => (
    <Stacked title="Adornments">
      <Controlled
        label="Price"
        min={0}
        step={0.01}
        initial="19.99"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
          htmlInput: { min: 0, step: 0.01 },
        }}
      />
      <Controlled
        label="Width"
        min={0}
        initial="320"
        slotProps={{
          input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
          htmlInput: { min: 0 },
        }}
      />
    </Stacked>
  ),
};

export const States: Story = {
  render: () => (
    <Stacked title="States">
      <Controlled label="Error" error helperText="Must be greater than zero" initial="0" />
      <Controlled label="Disabled" disabled initial="42" />
      <Controlled label="Required" required initial="" />
    </Stacked>
  ),
};

/** Worth knowing before reaching for `type="number"`. */
export const Caveats: Story = {
  render: () => (
    <Stacked title="Caveats">
      <Alert severity="warning">
        <Typography variant="body2" gutterBottom>
          <strong>The value is a string, not a number.</strong> `e.target.value` is always a
          string, and it is <em>empty</em> — not <code>NaN</code> — while the field holds invalid
          input like <code>&ldquo;12e&rdquo;</code>. Parse and validate on submit.
        </Typography>
        <Typography variant="body2" gutterBottom>
          <strong>`min` and `max` do not block typing.</strong> They constrain the spinner and
          native form validation only; a user can still type outside the range.
        </Typography>
        <Typography variant="body2">
          <strong>Scroll wheel can change the value</strong> when the input has focus. Blur on
          wheel if that matters.
        </Typography>
      </Alert>
      <Typography variant="body2" color="text.secondary">
        For a pre-wrapped version with the library's label and helper-text conventions, see{" "}
        <Link href="?path=/docs/field-types-fieldtypenumber--docs">FieldTypeNumber</Link>.
      </Typography>
    </Stacked>
  ),
};
