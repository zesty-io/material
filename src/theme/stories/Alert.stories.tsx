import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertTitle, Button } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * M3 backs each severity with its matching *container* role. Success, warning
 * and info are generated as M3 custom colours — see **M3 → Colour roles**.
 */
const meta: Meta<typeof Alert> = {
  title: "MUI/Feedback/Alert",
  component: Alert,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const SEVERITIES = ["error", "warning", "info", "success"] as const;

export const Default: Story = { args: { severity: "info", children: "An info alert." } };

export const Variants: Story = {
  render: () => (
    <>
      {(["standard", "filled", "outlined"] as const).map((variant) => (
        <Stacked key={variant} title={variant}>
          {SEVERITIES.map((severity) => (
            <Alert key={severity} severity={severity} variant={variant}>
              This is a {variant} {severity} alert.
            </Alert>
          ))}
        </Stacked>
      ))}
    </>
  ),
};

export const WithTitleAndAction: Story = {
  render: () => (
    <Stacked title="Title and actions">
      <Alert severity="warning" onClose={() => {}}>
        <AlertTitle>Heads up</AlertTitle>
        An alert with an AlertTitle and a close affordance.
      </Alert>
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small">
            Undo
          </Button>
        }
      >
        An alert with a custom action.
      </Alert>
    </Stacked>
  ),
};
