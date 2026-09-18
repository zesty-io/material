import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Section } from "./StorySection";

/**
 * Covers `MuiDialog`, `MuiDialogTitle`, `MuiDialogContent`,
 * `MuiDialogContentText` and `MuiDialogActions` — all themed separately. M3
 * uses a 28px (extraLarge) radius on a `surfaceContainerHigh` ground.
 *
 * For this library's wrapper see **Components → ConfirmDialog**.
 */
const meta: Meta<typeof Dialog> = {
  title: "MUI/Feedback/Dialog",
  component: Dialog,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const Launcher = ({
  label,
  maxWidth,
  withForm = false,
}: {
  label: string;
  maxWidth?: "xs" | "sm" | "md";
  withForm?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth={maxWidth} fullWidth={!!maxWidth}>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DialogContentText carries the body copy. The theme sets spacing and type treatment
            for each of these four sub-components independently.
          </DialogContentText>
          {withForm && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField label="Name" fullWidth />
              <TextField label="Email" fullWidth />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Section title="Dialog" description="Open one to inspect the title / content / actions spacing.">
      <Launcher label="Default" />
      <Launcher label="Small (xs)" maxWidth="xs" />
      <Launcher label="Medium (md)" maxWidth="md" />
      <Launcher label="With a form" maxWidth="sm" withForm />
    </Section>
  ),
};
