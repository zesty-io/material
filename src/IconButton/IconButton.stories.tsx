import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, Typography } from "@mui/material";
import { IconButton } from "./";
import { Brain } from "../icons/Brain";

/**
 * The library's IconButton adds a `contained` variant on top of MUI's, plus the
 * `xsmall` and `xxsmall` sizes registered through module augmentation.
 */
const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["standard", "contained"],
    },
    color: {
      control: "select",
      options: ["inherit", "primary", "secondary", "success", "error", "warning", "info"],
    },
    size: {
      control: "select",
      options: ["xxsmall", "xsmall", "small", "medium", "large"],
    },
  },
  args: {
    variant: "contained",
    color: "primary",
    size: "medium",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Brain fontSize="small" />
    </IconButton>
  ),
};

/** Both variants side by side. `standard` is a plain MUI IconButton. */
export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={4} alignItems="center">
      {(["standard", "contained"] as const).map((variant) => (
        <Stack key={variant} spacing={1} alignItems="center">
          <IconButton variant={variant} color="primary">
            <Brain />
          </IconButton>
          <Typography variant="caption">{variant}</Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Includes the two sizes this library adds to MUI's set. */
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {(["xxsmall", "xsmall", "small", "medium", "large"] as const).map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <IconButton variant="contained" color="primary" size={size}>
            <Brain fontSize="inherit" />
          </IconButton>
          <Typography variant="caption">{size}</Typography>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Every palette colour the `contained` variant supports. */
export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={3} alignItems="center">
      {(["primary", "secondary", "success", "error", "warning", "info"] as const).map(
        (color) => (
          <Stack key={color} spacing={1} alignItems="center">
            <IconButton variant="contained" color={color}>
              <Brain />
            </IconButton>
            <Typography variant="caption">{color}</Typography>
          </Stack>
        )
      )}
    </Stack>
  ),
};
