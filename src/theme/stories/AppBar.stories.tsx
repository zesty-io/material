import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon, MoreVert, Notifications, Search } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * AppBar is a Paper, so under M3 it would otherwise inherit Paper's 12px
 * radius and container colour. `MuiAppBar` overrides that back to square,
 * full-bleed, on `surface` at elevation 0 — M3's small top app bar.
 *
 * Because of that, M3 sets `color="default"` as the default prop. Passing
 * `color="primary"` still gives you the MD2-style branded bar.
 */
const meta: Meta<typeof AppBar> = {
  title: "MUI/Surfaces/AppBar",
  component: AppBar,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

/** Stories use position="static" so the bar stays inside the canvas. */
const Bar = ({
  color,
  elevation,
  children,
}: {
  color?: "default" | "primary" | "secondary" | "transparent" | "inherit";
  elevation?: number;
  children: ReactNode;
}) => (
  <AppBar position="static" color={color} elevation={elevation}>
    {children}
  </AppBar>
);

export const Default: Story = {
  render: () => (
    <Stacked title="Standard toolbar">
      <Bar>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 2 }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Zesty
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Bar>
    </Stacked>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stacked
      title="color"
      description="M3 defaults to `default` (surface); the legacy theme defaults to `primary`."
    >
      <Stack spacing={2}>
        {(["default", "primary", "secondary", "transparent"] as const).map((color) => (
          <Bar key={color} color={color}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                color=&ldquo;{color}&rdquo;
              </Typography>
              <IconButton color="inherit" aria-label="more">
                <MoreVert />
              </IconButton>
            </Toolbar>
          </Bar>
        ))}
      </Stack>
    </Stacked>
  ),
};

export const Elevation: Story = {
  render: () => (
    <Stacked
      title="elevation"
      description="M3 puts the top app bar at elevation 0 at rest and level 2 once content scrolls under it."
    >
      <Stack spacing={2}>
        {[0, 2, 4].map((elevation) => (
          <Bar key={elevation} elevation={elevation}>
            <Toolbar>
              <Typography variant="h6" component="div">
                elevation={elevation}
              </Typography>
            </Toolbar>
          </Bar>
        ))}
      </Stack>
    </Stacked>
  ),
};

export const DenseToolbar: Story = {
  render: () => (
    <Stacked title="Toolbar variant" description="`dense` drops the bar from 64px to 48px.">
      <Stack spacing={2}>
        <Bar>
          <Toolbar variant="regular">
            <Typography variant="h6" component="div">
              regular
            </Typography>
          </Toolbar>
        </Bar>
        <Bar>
          <Toolbar variant="dense">
            <Typography variant="h6" component="div">
              dense
            </Typography>
          </Toolbar>
        </Bar>
      </Stack>
    </Stacked>
  ),
};

/** The shape most product headers actually take. */
export const WithActions: Story = {
  render: () => (
    <Stacked title="Leading, headline and trailing actions">
      <Bar>
        <Toolbar>
          <IconButton edge="start" color="inherit" sx={{ mr: 1 }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Content
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Search">
              <IconButton color="inherit" aria-label="search">
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit" aria-label="notifications">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
            <IconButton edge="end" color="inherit" aria-label="account">
              <AccountCircle />
            </IconButton>
          </Stack>
        </Toolbar>
      </Bar>
    </Stacked>
  ),
};

/** Content scrolling under a sticky bar — the case elevation exists for. */
export const Sticky: Story = {
  render: () => (
    <Stacked title="position=&quot;sticky&quot;" description="Scroll the box to see the bar hold position.">
      <Box sx={{ height: 240, overflow: "auto", border: 1, borderColor: "divider" }}>
        <AppBar position="sticky" elevation={2}>
          <Toolbar>
            <Avatar sx={{ width: 28, height: 28, mr: 1.5 }}>Z</Avatar>
            <Typography variant="h6" component="div">
              Sticky header
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ p: 2 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Typography key={i} variant="body2" sx={{ mb: 2 }}>
              Row {i + 1} — content scrolls beneath the bar.
            </Typography>
          ))}
        </Box>
      </Box>
    </Stacked>
  ),
};
