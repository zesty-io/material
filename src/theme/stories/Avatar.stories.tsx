import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup, Badge, Stack, Typography } from "@mui/material";
import { Folder, Person } from "@mui/icons-material";
import { Section } from "./StorySection";

/**
 * Avatars are not currently restyled by either theme — they inherit MUI's
 * defaults plus the active palette. This page exists so that stays visible.
 */
const meta: Meta<typeof Avatar> = {
  title: "MUI/Data Display/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = { args: { children: "ZI" } };

/** Letter, icon and image avatars. Image avatars fall back to their children. */
export const Content: Story = {
  render: () => (
    <Section title="Content">
      <Avatar>ZI</Avatar>
      <Avatar sx={{ bgcolor: "primary.main" }}>BZ</Avatar>
      <Avatar>
        <Person />
      </Avatar>
      <Avatar sx={{ bgcolor: "secondary.main" }}>
        <Folder />
      </Avatar>
      <Avatar alt="Broken image, falls back to the letter" src="/does-not-exist.png">
        F
      </Avatar>
    </Section>
  ),
};

export const Variants: Story = {
  render: () => (
    <Section title="Variants">
      {(["circular", "rounded", "square"] as const).map((variant) => (
        <Stack key={variant} spacing={1} alignItems="center">
          <Avatar variant={variant} sx={{ bgcolor: "primary.main" }}>
            ZI
          </Avatar>
          <Typography variant="caption">{variant}</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

/** MUI has no size prop on Avatar — size is set through `sx`. */
export const Sizes: Story = {
  render: () => (
    <Section title="Sizes" description="Set via sx; there is no size prop.">
      {[24, 32, 40, 56, 72].map((size) => (
        <Stack key={size} spacing={1} alignItems="center">
          <Avatar sx={{ width: size, height: size, bgcolor: "primary.main" }}>ZI</Avatar>
          <Typography variant="caption">{size}px</Typography>
        </Stack>
      ))}
    </Section>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Section title="AvatarGroup" description="`max` controls how many show before the +n surplus.">
      <AvatarGroup max={4}>
        {["BZ", "AL", "KM", "RT", "JS", "PW"].map((initials) => (
          <Avatar key={initials}>{initials}</Avatar>
        ))}
      </AvatarGroup>
      <AvatarGroup max={3} spacing="small">
        {["BZ", "AL", "KM", "RT"].map((initials) => (
          <Avatar key={initials} sx={{ bgcolor: "secondary.main" }}>
            {initials}
          </Avatar>
        ))}
      </AvatarGroup>
    </Section>
  ),
};

/** Composed with Badge for presence indicators. */
export const WithBadge: Story = {
  render: () => (
    <Section title="With Badge">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        color="success"
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>ZI</Avatar>
      </Badge>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={4}
        color="error"
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>BZ</Avatar>
      </Badge>
    </Section>
  ),
};
