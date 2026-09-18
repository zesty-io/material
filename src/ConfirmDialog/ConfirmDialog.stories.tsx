import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@mui/material";
import ConfirmDialog, { type ConfirmDialogProps } from ".";

/**
 * Confirmation modal. `callback` receives `true` when the user confirms and
 * `false` when they dismiss; pass `children` to replace the default actions.
 */
const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

const Launcher = (args: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Click me to open
      </Button>
      <ConfirmDialog {...args} open={open} callback={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <Launcher {...args} />,
  args: {
    title: "Confirm modal title",
    content: "Confirm modal content",
  },
};

export const CustomChildren: Story = {
  render: (args) => <Launcher {...args} />,
  args: {
    title: "Confirm modal title",
    content: "Confirm modal content",
    children: (
      <>
        <Button color="error" variant="contained">
          Custom 1
        </Button>
        <Button color="success" variant="contained">
          Custom 2
        </Button>
      </>
    ),
  },
};
