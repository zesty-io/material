import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Typography } from "@mui/material";
import { Stacked } from "./StorySection";

/**
 * Box is the styling primitive everything else is built on — a `div` with the
 * `sx` prop attached. It has no appearance of its own, so nothing here is
 * themed; what it *does* give you is access to theme tokens from any call site.
 */
const meta: Meta<typeof Box> = {
  title: "MUI/Layout/Box",
  component: Box,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    sx: { p: 3, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 1 },
    children: "A Box with sx",
  },
};

/** `sx` resolves palette paths, spacing units and shape from the active theme. */
export const ThemeAware: Story = {
  render: () => (
    <Stacked
      title="Theme tokens in sx"
      description="Values like 'primary.main' and spacing multiples resolve against whichever theme the toolbar has active."
    >
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {(
          [
            ["primary.main", "primary.contrastText"],
            ["secondary.main", "secondary.contrastText"],
            ["error.main", "error.contrastText"],
            ["background.paper", "text.primary"],
          ] as const
        ).map(([bg, fg]) => (
          <Box
            key={bg}
            sx={{
              bgcolor: bg,
              color: fg,
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
              minWidth: 160,
            }}
          >
            <Typography variant="caption">{bg}</Typography>
          </Box>
        ))}
      </Box>
    </Stacked>
  ),
};

/** Spacing values are multiples of `theme.spacing` (8px by default), not pixels. */
export const Spacing: Story = {
  render: () => (
    <Stacked title="Spacing scale" description="p={n} is n × theme.spacing, not n pixels.">
      <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
        {[1, 2, 3, 4, 6].map((p) => (
          <Box key={p} sx={{ bgcolor: "action.hover", borderRadius: 1 }}>
            <Box sx={{ p, display: "inline-block" }}>
              <Box sx={{ bgcolor: "primary.main", width: 48, height: 48, borderRadius: 0.5 }} />
            </Box>
            <Typography variant="caption" sx={{ display: "block", textAlign: "center", pb: 0.5 }}>
              p={p}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stacked>
  ),
};

/** `component` changes the rendered element without changing the styling API. */
export const AsElement: Story = {
  render: () => (
    <Stacked title="component" description="Same sx, different semantics.">
      <Box component="section" sx={{ p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          component=&ldquo;section&rdquo;
        </Typography>
      </Box>
      <Box component="ul" sx={{ p: 2, m: 0, border: 1, borderColor: "divider", borderRadius: 1 }}>
        <Box component="li">component=&ldquo;ul&rdquo; with an li child</Box>
      </Box>
    </Stacked>
  ),
};

/** Breakpoint objects work anywhere in sx. */
export const Responsive: Story = {
  render: () => (
    <Stacked
      title="Responsive values"
      description="Resize the canvas — width and colour change at the sm and md breakpoints."
    >
      <Box
        sx={{
          p: 3,
          borderRadius: 1,
          color: "common.white",
          width: { xs: "100%", sm: "60%", md: "40%" },
          bgcolor: { xs: "error.main", sm: "warning.main", md: "success.main" },
        }}
      >
        <Typography variant="body2">xs: full / sm: 60% / md: 40%</Typography>
      </Box>
    </Stacked>
  ),
};
