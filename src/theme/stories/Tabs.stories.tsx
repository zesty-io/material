import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/** M3 gives the indicator a 3px rounded cap and colours the active tab primary. */
const meta: Meta<typeof Tabs> = {
  title: "MUI/Navigation/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const Demo = ({
  variant = "standard",
  orientation = "horizontal",
}: {
  variant?: "standard" | "fullWidth" | "scrollable";
  orientation?: "horizontal" | "vertical";
}) => {
  const [value, setValue] = useState(0);
  const count = variant === "scrollable" ? 9 : 3;

  return (
    <Box sx={{ width: "100%", maxWidth: 640 }}>
      <Tabs
        value={value}
        onChange={(_e, next: number) => setValue(next)}
        variant={variant}
        orientation={orientation}
        scrollButtons={variant === "scrollable" ? "auto" : false}
      >
        {Array.from({ length: count }, (_, i) => (
          <Tab key={i} label={`Tab ${i + 1}`} disabled={i === count - 1 && count === 3} />
        ))}
      </Tabs>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Panel for tab {value + 1}
        </Typography>
      </Box>
    </Box>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <Stacked title="Standard" description="Third tab is disabled.">
        <Demo />
      </Stacked>
      <Stacked title="Full width">
        <Demo variant="fullWidth" />
      </Stacked>
      <Stacked title="Scrollable">
        <Demo variant="scrollable" />
      </Stacked>
    </>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Stacked title="Vertical orientation">
      <Demo orientation="vertical" />
    </Stacked>
  ),
};
