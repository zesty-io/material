import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { FormatBold, FormatItalic, FormatUnderlined } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/** M3 rounds the group into a pill and uses secondaryContainer for selection. */
const meta: Meta<typeof ToggleButtonGroup> = {
  title: "MUI/Inputs/ToggleButton",
  component: ToggleButtonGroup,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ToggleButtonGroup>;

const MultiSelect = () => {
  const [formats, setFormats] = useState<string[]>(["bold"]);
  return (
    <ToggleButtonGroup value={formats} onChange={(_e, next: string[]) => setFormats(next)}>
      <ToggleButton value="bold">
        <FormatBold />
      </ToggleButton>
      <ToggleButton value="italic">
        <FormatItalic />
      </ToggleButton>
      <ToggleButton value="underlined">
        <FormatUnderlined />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

const Exclusive = ({ size }: { size?: "small" | "medium" | "large" }) => {
  const [alignment, setAlignment] = useState("left");
  return (
    <ToggleButtonGroup
      exclusive
      size={size}
      value={alignment}
      onChange={(_e, next: string | null) => next && setAlignment(next)}
    >
      <ToggleButton value="left">Left</ToggleButton>
      <ToggleButton value="center">Center</ToggleButton>
      <ToggleButton value="right">Right</ToggleButton>
    </ToggleButtonGroup>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <Stacked title="Multi-select" description="`value` is an array; no `exclusive` prop.">
        <MultiSelect />
      </Stacked>
      <Stacked title="Exclusive" description="One selection at a time.">
        <Exclusive />
      </Stacked>
      <Stacked title="Sizes">
        <Exclusive size="small" />
        <Exclusive size="large" />
      </Stacked>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stacked title="Vertical orientation">
      <ToggleButtonGroup exclusive orientation="vertical" value="left">
        <ToggleButton value="left">Left</ToggleButton>
        <ToggleButton value="center">Center</ToggleButton>
        <ToggleButton value="right" disabled>
          Disabled
        </ToggleButton>
      </ToggleButtonGroup>
    </Stacked>
  ),
};
