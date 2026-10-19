import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Stack is one-dimensional flexbox with theme-aware `spacing`. It is the right
 * default for rows and columns; reach for Grid only when you need two
 * dimensions.
 */
const meta: Meta<typeof Stack> = {
  title: "MUI/Layout/Stack",
  component: Stack,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Item = ({ children }: { children: ReactNode }) => (
  <Paper variant="outlined" sx={{ p: 2, textAlign: "center", minWidth: 72 }}>
    <Typography variant="body2">{children}</Typography>
  </Paper>
);

export const Direction: Story = {
  render: () => (
    <Stacked title="direction">
      <Stack spacing={3}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            row
          </Typography>
          <Stack direction="row" spacing={2}>
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
          </Stack>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            column (default)
          </Typography>
          <Stack spacing={2} sx={{ maxWidth: 200 }}>
            <Item>1</Item>
            <Item>2</Item>
          </Stack>
        </Box>
      </Stack>
    </Stacked>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Stacked
      title="spacing"
      description="Multiples of theme.spacing, same scale as sx."
    >
      <Stack spacing={3}>
        {[0, 1, 2, 4].map((spacing) => (
          <Box key={spacing}>
            <Typography variant="caption" color="text.secondary">
              spacing={spacing}
            </Typography>
            <Stack direction="row" spacing={spacing}>
              <Item>1</Item>
              <Item>2</Item>
              <Item>3</Item>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stacked>
  ),
};

export const Dividers: Story = {
  render: () => (
    <Stacked
      title="divider"
      description="Inserted between children only — not at the ends."
    >
      <Stack
        direction="row"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
        sx={{ alignItems: "center" }}
      >
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    </Stacked>
  ),
};

/** Direction can change per breakpoint. */
export const Responsive: Story = {
  render: () => (
    <Stacked
      title="Responsive direction"
      description="Column on xs, row from sm up. Resize the canvas to see it flip."
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </Stack>
    </Stacked>
  ),
};

/**
 * `spacing` uses margins by default, which do not wrap correctly. `useFlexGap`
 * switches to the `gap` property, which does.
 */
export const Wrapping: Story = {
  render: () => (
    <Stacked
      title="useFlexGap"
      description="With flexWrap, margin-based spacing leaves an uneven first row. useFlexGap fixes it."
    >
      <Box>
        <Typography variant="caption" color="text.secondary">
          without useFlexGap
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ flexWrap: "wrap", maxWidth: 340 }}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <Item key={i}>{i + 1}</Item>
          ))}
        </Stack>
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          useFlexGap
        </Typography>
        <Stack
          useFlexGap
          direction="row"
          spacing={2}
          sx={{ flexWrap: "wrap", maxWidth: 340 }}
        >
          {Array.from({ length: 7 }, (_, i) => (
            <Item key={i}>{i + 1}</Item>
          ))}
        </Stack>
      </Box>
    </Stacked>
  ),
};
