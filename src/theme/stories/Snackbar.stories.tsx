import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  Button,
  IconButton,
  Snackbar,
  SnackbarContent,
  Stack,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * M3 themes `MuiSnackbarContent`: an `inverseSurface` container with
 * `inverseOnSurface` text and an `inversePrimary` action label, at a 4px
 * radius. Flip the Theme control to compare.
 *
 * Note the two content paths behave differently — a Snackbar given `message`
 * renders SnackbarContent and picks up that theming; one given an `<Alert>`
 * child renders the Alert instead and does not.
 */
const meta: Meta<typeof Snackbar> = {
  title: "MUI/Feedback/Snackbar",
  component: Snackbar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

const Launcher = ({
  label,
  ...snackbarProps
}: { label: string } & Record<string, unknown>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Snackbar
        {...snackbarProps}
        open={open}
        onClose={(_e, reason) => {
          // Ignoring clickaway is the usual choice — otherwise any stray click
          // dismisses a message the user may not have read.
          if (reason === "clickaway") return;
          setOpen(false);
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Section title="message" description="Renders SnackbarContent, which M3 themes.">
      <Launcher label="Show snackbar" message="Content saved" autoHideDuration={4000} />
      <Launcher
        label="With an action"
        message="Item moved to trash"
        autoHideDuration={6000}
        action={
          <Button color="secondary" size="small">
            Undo
          </Button>
        }
      />
    </Section>
  ),
};

const WithClose = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Action and dismiss
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={(_e, reason) => reason !== "clickaway" && setOpen(false)}
        message="Draft discarded"
        action={
          <>
            <Button color="secondary" size="small" onClick={() => setOpen(false)}>
              Undo
            </Button>
            <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export const Positioning: Story = {
  render: () => (
    <Section title="anchorOrigin" description="Six positions; the default is bottom-left.">
      {(
        [
          { vertical: "top", horizontal: "left" },
          { vertical: "top", horizontal: "center" },
          { vertical: "top", horizontal: "right" },
          { vertical: "bottom", horizontal: "left" },
          { vertical: "bottom", horizontal: "center" },
          { vertical: "bottom", horizontal: "right" },
        ] as const
      ).map((anchorOrigin) => (
        <Launcher
          key={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
          label={`${anchorOrigin.vertical} ${anchorOrigin.horizontal}`}
          message={`${anchorOrigin.vertical} / ${anchorOrigin.horizontal}`}
          autoHideDuration={2500}
          anchorOrigin={anchorOrigin}
        />
      ))}
    </Section>
  ),
};

export const Actions: Story = {
  render: () => (
    <Section title="Actions">
      <WithClose />
    </Section>
  ),
};

const WithAlert = ({ severity }: { severity: "success" | "error" | "warning" | "info" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        {severity}
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={(_e, reason) => reason !== "clickaway" && setOpen(false)}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          A {severity} message inside a Snackbar.
        </Alert>
      </Snackbar>
    </>
  );
};

/** The common pattern for severity — but it opts out of M3's snackbar theming. */
export const WithAlerts: Story = {
  name: "With Alert",
  render: () => (
    <Stacked
      title="Alert as the child"
      description="Snackbar renders the Alert instead of SnackbarContent, so the M3 snackbar roles do not apply — the Alert's own severity colours do."
    >
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", rowGap: 2 }}>
        {(["success", "error", "warning", "info"] as const).map((severity) => (
          <WithAlert key={severity} severity={severity} />
        ))}
      </Stack>
    </Stacked>
  ),
};

/** Rendered inline so the themed container is inspectable without a timer. */
export const ContentInline: Story = {
  name: "SnackbarContent",
  render: () => (
    <Stacked
      title="SnackbarContent, static"
      description="The themed surface on its own — no portal, no auto-hide."
    >
      <Stack spacing={2} sx={{ maxWidth: 480 }}>
        <SnackbarContent message="A plain message" />
        <SnackbarContent
          message="A message with an action"
          action={
            <Button color="secondary" size="small">
              Undo
            </Button>
          }
        />
        <SnackbarContent message="A longer message that wraps onto more than one line, which is where the container padding and line height start to matter." />
        <Typography variant="caption" color="text.secondary">
          Under M3 these use inverseSurface / inverseOnSurface / inversePrimary.
        </Typography>
      </Stack>
    </Stacked>
  ),
};
