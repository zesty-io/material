import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { ContentCopy, Print, Share } from "@mui/icons-material";
import { Stacked } from "./StorySection";

const meta: Meta<typeof SpeedDial> = {
  title: "MUI/Navigation/SpeedDial",
  component: SpeedDial,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SpeedDial>;

export const Default: Story = {
  render: () => (
    <Stacked title="SpeedDial" description="Hover the button to reveal the SpeedDialActions.">
      <Box sx={{ position: "relative", height: 320, width: 320 }}>
        <SpeedDial
          ariaLabel="Demo SpeedDial"
          icon={<SpeedDialIcon />}
          sx={{ position: "absolute", bottom: 16, right: 16 }}
        >
          <SpeedDialAction icon={<ContentCopy />} tooltipTitle="Copy" />
          <SpeedDialAction icon={<Share />} tooltipTitle="Share" />
          <SpeedDialAction icon={<Print />} tooltipTitle="Print" />
        </SpeedDial>
      </Box>
    </Stacked>
  ),
};

export const Directions: Story = {
  render: () => (
    <Stacked title="direction">
      <Box sx={{ position: "relative", height: 260, width: 320 }}>
        <SpeedDial
          ariaLabel="Rightward SpeedDial"
          icon={<SpeedDialIcon />}
          direction="right"
          sx={{ position: "absolute", top: 16, left: 16 }}
        >
          <SpeedDialAction icon={<ContentCopy />} tooltipTitle="Copy" />
          <SpeedDialAction icon={<Share />} tooltipTitle="Share" />
        </SpeedDial>
      </Box>
    </Stacked>
  ),
};
