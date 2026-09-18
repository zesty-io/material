import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Section, Stacked } from "./StorySection";

/**
 * Neither progress indicator is restyled by either theme — both take
 * `primary.main` straight from the palette, so this page doubles as a check
 * that the brand colour reads at small sizes and on thin strokes.
 *
 * M3 defines its own progress indicators with a track gap and rounded caps;
 * these are still MUI's MD2 shapes.
 */
const meta: Meta<typeof CircularProgress> = {
  title: "MUI/Feedback/Progress",
  component: CircularProgress,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

const COLORS = ["primary", "secondary", "success", "error", "warning", "info"] as const;

export const Circular: Story = {
  render: () => (
    <>
      <Section title="Indeterminate">
        <CircularProgress />
        <CircularProgress size={24} />
        <CircularProgress size={64} />
        <CircularProgress thickness={2} />
        <CircularProgress thickness={8} />
      </Section>

      <Section title="Colors">
        {COLORS.map((color) => (
          <Stack key={color} spacing={1} alignItems="center" sx={{ minWidth: 76 }}>
            <CircularProgress color={color} size={32} />
            <Typography variant="caption">{color}</Typography>
          </Stack>
        ))}
      </Section>

      <Section title="Determinate">
        {[0, 25, 50, 75, 100].map((value) => (
          <Stack key={value} spacing={1} alignItems="center">
            <CircularProgress variant="determinate" value={value} />
            <Typography variant="caption">{value}%</Typography>
          </Stack>
        ))}
      </Section>
    </>
  ),
};

export const LinearVariants: Story = {
  name: "Linear",
  render: () => (
    <>
      <Stacked title="Variants">
        {(["indeterminate", "determinate", "buffer", "query"] as const).map((variant) => (
          <Stack key={variant} spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              {variant}
            </Typography>
            <LinearProgress
              variant={variant}
              value={variant === "determinate" || variant === "buffer" ? 60 : undefined}
              valueBuffer={variant === "buffer" ? 80 : undefined}
            />
          </Stack>
        ))}
      </Stacked>

      <Stacked title="Colors">
        {COLORS.map((color) => (
          <Stack key={color} spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              {color}
            </Typography>
            <LinearProgress color={color} variant="determinate" value={65} />
          </Stack>
        ))}
      </Stacked>
    </>
  ),
};

/** A progress bar nobody labels is a progress bar nobody trusts. */
const WithLabel = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const id = setInterval(
      () => setProgress((prev) => (prev >= 100 ? 0 : prev + 10)),
      800
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Stack spacing={4} sx={{ maxWidth: 420 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
          {progress}%
        </Typography>
      </Stack>

      <Box sx={{ position: "relative", display: "inline-flex", alignSelf: "flex-start" }}>
        <CircularProgress variant="determinate" value={progress} size={56} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {progress}%
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export const Labelled: Story = {
  render: () => (
    <Stacked title="With a value label" description="Animates so you can see the transition.">
      <WithLabel />
    </Stacked>
  ),
};
