import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Button,
  Paper,
  Step,
  StepButton,
  StepContent,
  StepLabel,
  Stepper,
  Stack,
  Typography,
} from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Unthemed by both families. The completed and active step icons take
 * `primary.main`, so under M3 they carry the indigo.
 */
const meta: Meta<typeof Stepper> = {
  title: "MUI/Navigation/Stepper",
  component: Stepper,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const STEPS = ["Select a model", "Add content", "Publish"];

export const Horizontal: Story = {
  render: () => (
    <Stacked title="Horizontal">
      <Stack spacing={4} sx={{ maxWidth: 640 }}>
        {[0, 1, 3].map((activeStep) => (
          <Stack key={activeStep} spacing={1}>
            <Typography variant="caption" color="text.secondary">
              activeStep={activeStep}
              {activeStep === 3 && " (all complete)"}
            </Typography>
            <Stepper activeStep={activeStep}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Stack>
        ))}
      </Stack>
    </Stacked>
  ),
};

export const AlternativeLabel: Story = {
  render: () => (
    <Stacked title="alternativeLabel" description="Labels sit beneath the icons rather than beside.">
      <Box sx={{ maxWidth: 640 }}>
        <Stepper activeStep={1} alternativeLabel>
          {STEPS.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stacked>
  ),
};

const VerticalDemo = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ maxWidth: 420 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {STEPS.map((label, index) => (
          <Step key={label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : undefined
              }
            >
              {label}
            </StepLabel>
            <StepContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Body copy for {label.toLowerCase()}.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setActiveStep((s) => s + 1)}
                >
                  {index === STEPS.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  size="small"
                  disabled={index === 0}
                  onClick={() => setActiveStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === STEPS.length && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            All steps complete.
          </Typography>
          <Button size="small" onClick={() => setActiveStep(0)}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

/** The vertical form is the one that carries content between steps. */
export const Vertical: Story = {
  render: () => (
    <Stacked title="Vertical, with StepContent">
      <VerticalDemo />
    </Stacked>
  ),
};

const NonLinearDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});

  return (
    <Stack spacing={2} sx={{ maxWidth: 640 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {STEPS.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          size="small"
          onClick={() => setCompleted((c) => ({ ...c, [activeStep]: true }))}
        >
          Mark complete
        </Button>
        <Button size="small" onClick={() => setCompleted({})}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
};

/** `nonLinear` lets a user jump between steps in any order. */
export const NonLinear: Story = {
  render: () => (
    <Stacked title="nonLinear" description="StepButton makes each label a jump target.">
      <NonLinearDemo />
    </Stacked>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <Stacked title="Error and optional">
      <Box sx={{ maxWidth: 640 }}>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Select a model</StepLabel>
          </Step>
          <Step>
            <StepLabel error optional={<Typography variant="caption" color="error">Missing a required field</Typography>}>
              Add content
            </StepLabel>
          </Step>
          <Step>
            <StepLabel optional={<Typography variant="caption">Optional</Typography>}>
              Publish
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
    </Stacked>
  ),
};
