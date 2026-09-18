import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, Stack, Typography } from "@mui/material";
import { Mail, Notifications } from "@mui/icons-material";
import { Section } from "./StorySection";

/**
 * Badge is unthemed by both families, so it reads straight from the palette —
 * which makes it a quick check that the semantic colours are sane in M3.
 */
const meta: Meta<typeof Badge> = {
  title: "MUI/Data Display/Badge",
  component: Badge,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { badgeContent: 4, color: "primary", children: <Mail /> },
};

export const Colors: Story = {
  render: () => (
    <Section title="Colors">
      {(["primary", "secondary", "success", "error", "warning", "info"] as const).map((color) => (
        <Stack key={color} spacing={1} alignItems="center">
          <Badge badgeContent={4} color={color}>
            <Mail />
          </Badge>
          <Typography variant="caption">{color}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <>
      <Section title="Standard vs dot">
        <Badge badgeContent={9} color="primary">
          <Mail />
        </Badge>
        <Badge variant="dot" color="primary">
          <Mail />
        </Badge>
      </Section>

      <Section title="max" description="Counts above `max` render as n+.">
        <Badge badgeContent={99} color="primary">
          <Notifications />
        </Badge>
        <Badge badgeContent={100} color="primary">
          <Notifications />
        </Badge>
        <Badge badgeContent={1000} max={999} color="primary">
          <Notifications />
        </Badge>
      </Section>

      <Section title="Zero and invisible" description="Zero hides unless showZero is set.">
        <Badge badgeContent={0} color="primary">
          <Mail />
        </Badge>
        <Badge badgeContent={0} showZero color="primary">
          <Mail />
        </Badge>
        <Badge badgeContent={4} invisible color="primary">
          <Mail />
        </Badge>
      </Section>
    </>
  ),
};

export const Placement: Story = {
  render: () => (
    <Section title="anchorOrigin">
      {(
        [
          { vertical: "top", horizontal: "right" },
          { vertical: "top", horizontal: "left" },
          { vertical: "bottom", horizontal: "right" },
          { vertical: "bottom", horizontal: "left" },
        ] as const
      ).map((anchorOrigin) => (
        <Stack
          key={`${anchorOrigin.vertical}-${anchorOrigin.horizontal}`}
          spacing={1}
          alignItems="center"
        >
          <Badge badgeContent={4} color="primary" anchorOrigin={anchorOrigin}>
            <Mail />
          </Badge>
          <Typography variant="caption">
            {anchorOrigin.vertical}/{anchorOrigin.horizontal}
          </Typography>
        </Stack>
      ))}
    </Section>
  ),
};
