import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { Section } from "./StorySection";

/** M3 tints the backdrop with the `scrim` role at 32%. */
const meta: Meta<typeof Backdrop> = {
  title: "MUI/Feedback/Backdrop",
  component: Backdrop,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Backdrop>;

const Demo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show backdrop
      </Button>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Section title="Backdrop" description="Click anywhere on the overlay to dismiss it.">
      <Demo />
    </Section>
  ),
};
