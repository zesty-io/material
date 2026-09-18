import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Container, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Container centres content and caps its width at a breakpoint. It is the
 * outermost layout element in most pages — nothing else in this library
 * constrains page width.
 */
const meta: Meta<typeof Container> = {
  title: "MUI/Layout/Container",
  component: Container,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Container>;

const Filler = ({ label }: { label: string }) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Typography variant="body2">{label}</Typography>
  </Paper>
);

const Breakpoints = () => {
  const theme = useTheme();
  return (
    <Stack spacing={0.5}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((key) => (
        <Typography key={key} variant="caption" color="text.secondary">
          {key} — breakpoint {theme.breakpoints.values[key]}px, container max{" "}
          {String((theme.breakpoints.values as Record<string, number>)[key])}px
        </Typography>
      ))}
    </Stack>
  );
};

export const MaxWidths: Story = {
  render: () => (
    <Box sx={{ py: 2 }}>
      <Stack spacing={3}>
        {(["xs", "sm", "md", "lg", "xl", false] as const).map((maxWidth) => (
          <Container key={String(maxWidth)} maxWidth={maxWidth}>
            <Box sx={{ bgcolor: "action.hover", borderRadius: 1 }}>
              <Filler label={`maxWidth=${maxWidth === false ? "false (full width)" : `"${maxWidth}"`}`} />
            </Box>
          </Container>
        ))}
      </Stack>
    </Box>
  ),
};

/** `fixed` snaps to the current breakpoint's min-width instead of a fluid max. */
export const Fixed: Story = {
  render: () => (
    <Box sx={{ py: 2 }}>
      <Container fixed>
        <Filler label="fixed — width jumps between breakpoints rather than scaling smoothly" />
      </Container>
    </Box>
  ),
};

export const Gutters: Story = {
  render: () => (
    <Box sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Box sx={{ bgcolor: "action.hover" }}>
          <Container maxWidth="sm">
            <Filler label="default gutters" />
          </Container>
        </Box>
        <Box sx={{ bgcolor: "action.hover" }}>
          <Container maxWidth="sm" disableGutters>
            <Filler label="disableGutters — flush to the container edge" />
          </Container>
        </Box>
      </Stack>
    </Box>
  ),
};

export const BreakpointValues: Story = {
  render: () => (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stacked title="Breakpoints in the active theme" description="Neither theme overrides these.">
        <Breakpoints />
      </Stacked>
    </Container>
  ),
};
