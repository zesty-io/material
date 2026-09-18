import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip, Tooltip } from "@mui/material";
import { Section } from "./StorySection";

/**
 * M3 renders the "plain" tooltip: `inverseSurface` ground with
 * `inverseOnSurface` text, 4px radius.
 */
const meta: Meta<typeof Tooltip> = {
  title: "MUI/Data Display/Tooltip",
  component: Tooltip,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Placement: Story = {
  render: () => (
    <Section title="placement">
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Tooltip key={placement} title={`Tooltip on ${placement}`} placement={placement} arrow>
          <Chip label={placement} onClick={() => {}} />
        </Tooltip>
      ))}
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <Section title="Arrow and open state">
      <Tooltip title="No arrow">
        <Chip label="no arrow" onClick={() => {}} />
      </Tooltip>
      <Tooltip title="With arrow" arrow>
        <Chip label="arrow" onClick={() => {}} />
      </Tooltip>
      <Tooltip title="Always open" open placement="bottom">
        <Chip label="open" />
      </Tooltip>
      <Tooltip
        title="Tooltips can hold a longer explanation that wraps onto several lines when the content warrants it."
        arrow
      >
        <Chip label="long content" onClick={() => {}} />
      </Tooltip>
    </Section>
  ),
};
