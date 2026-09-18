import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, Stack, SvgIcon, Typography } from "@mui/material";
import {
  Delete,
  DeleteOutlined,
  DeleteRounded,
  DeleteSharp,
  DeleteTwoTone,
  Favorite,
} from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * MUI's icon system: `SvgIcon` and the `@mui/icons-material` set.
 *
 * For the Zesty icon library — the ~32 brand icons this package exports — see
 * the top-level **Icons** section instead. Those are `SvgIcon` wrappers, so
 * everything on this page applies to them too.
 */
const meta: Meta<typeof SvgIcon> = {
  title: "MUI/Data Display/Icons",
  component: SvgIcon,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SvgIcon>;

export const FontSizes: Story = {
  render: () => (
    <Section
      title="fontSize"
      description="Icons scale by font size, not width/height, so they align with adjacent text."
    >
      {(["small", "medium", "large"] as const).map((fontSize) => (
        <Stack key={fontSize} spacing={1} alignItems="center">
          <Favorite fontSize={fontSize} />
          <Typography variant="caption">{fontSize}</Typography>
        </Stack>
      ))}
      <Stack spacing={1} alignItems="center">
        <Box sx={{ fontSize: 48, display: "flex" }}>
          <Favorite fontSize="inherit" />
        </Box>
        <Typography variant="caption">inherit (48px)</Typography>
      </Stack>
    </Section>
  ),
};

export const Colors: Story = {
  render: () => (
    <Section title="color" description="Palette-aware; `inherit` takes the surrounding text colour.">
      {(
        ["inherit", "primary", "secondary", "action", "success", "error", "warning", "info", "disabled"] as const
      ).map((color) => (
        <Stack key={color} spacing={1} alignItems="center" sx={{ minWidth: 72 }}>
          <Favorite color={color} />
          <Typography variant="caption">{color}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

/** Every icon in @mui/icons-material ships in five themes. */
export const Themes: Story = {
  render: () => (
    <Section title="Icon themes" description="Same glyph, five drawing styles.">
      {(
        [
          ["Filled", Delete],
          ["Outlined", DeleteOutlined],
          ["Rounded", DeleteRounded],
          ["TwoTone", DeleteTwoTone],
          ["Sharp", DeleteSharp],
        ] as const
      ).map(([label, Icon]) => (
        <Stack key={label} spacing={1} alignItems="center" sx={{ minWidth: 80 }}>
          <Icon fontSize="large" />
          <Typography variant="caption">{label}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

/** Wrapping a raw path in SvgIcon is exactly how `src/icons/` is built. */
export const Custom: Story = {
  render: () => (
    <Stacked
      title="SvgIcon"
      description="Set viewBox to match the source artwork; the icon then inherits theme sizing and colour."
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <SvgIcon fontSize="large" color="primary">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7.5L4.2 6 12 2.2 19.8 6 12 9.5zM2 17l10 5 10-5-2.2-1.1L12 19.6 4.2 15.9 2 17zm0-5l10 5 10-5-2.2-1.1L12 14.6 4.2 10.9 2 12z" />
        </SvgIcon>
        <Typography variant="body2" color="text.secondary">
          A custom SvgIcon at fontSize=&ldquo;large&rdquo;, color=&ldquo;primary&rdquo;
        </Typography>
      </Stack>
    </Stacked>
  ),
};

/** Icons sit on the text baseline when sized with fontSize="inherit". */
export const Inline: Story = {
  render: () => (
    <Stacked title="Inline with text">
      {(["h4", "body1", "body2", "caption"] as const).map((variant) => (
        <Typography key={variant} variant={variant}>
          <Favorite fontSize="inherit" sx={{ verticalAlign: "middle", mr: 0.5 }} />
          Icon inside {variant}
        </Typography>
      ))}
    </Stacked>
  ),
};
