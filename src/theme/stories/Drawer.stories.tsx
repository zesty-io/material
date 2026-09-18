import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Code, Folder, Image, Settings } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/**
 * Drawer's paper is a Paper, so under M3 it inherits the `surfaceContainerLow`
 * ground — but not the 12px radius in any visible way, since the paper is
 * flush to the viewport edge on three sides.
 *
 * M3's navigation drawer uses a 16dp radius on the inner edge and pill-shaped
 * items. The item pills come through from the `MuiListItemButton` override;
 * the drawer's own inner radius does not, and is not applied here.
 */
const meta: Meta<typeof Drawer> = {
  title: "MUI/Navigation/Drawer",
  component: Drawer,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const NAV = [
  { label: "Content", icon: <Folder /> },
  { label: "Media", icon: <Image /> },
  { label: "Code", icon: <Code /> },
  { label: "Settings", icon: <Settings /> },
];

const NavList = ({ onSelect }: { onSelect?: () => void }) => {
  const [selected, setSelected] = useState(0);
  return (
    <List>
      {NAV.map((item, i) => (
        <ListItemButton
          key={item.label}
          selected={selected === i}
          onClick={() => {
            setSelected(i);
            onSelect?.();
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}
    </List>
  );
};

const Temporary = ({ anchor }: { anchor: "left" | "right" | "top" | "bottom" }) => {
  const [open, setOpen] = useState(false);
  const horizontal = anchor === "left" || anchor === "right";

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        {anchor}
      </Button>
      <Drawer anchor={anchor} open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: horizontal ? 260 : "auto" }} role="presentation">
          <Toolbar>
            <Typography variant="h6">Zesty</Typography>
          </Toolbar>
          <Divider />
          <NavList onSelect={() => setOpen(false)} />
        </Box>
      </Drawer>
    </>
  );
};

export const Temporary_: Story = {
  name: "Temporary",
  render: () => (
    <Section title="anchor" description="Temporary drawers overlay the page and dismiss on click-away.">
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <Temporary key={anchor} anchor={anchor} />
      ))}
    </Section>
  ),
};

/**
 * A permanent drawer is just a fixed sidebar. Rendered inside a bounded box
 * here so it stays on the canvas rather than pinning to the viewport.
 */
export const Permanent: Story = {
  render: () => (
    <Stacked title="Permanent" description="Scoped to a container via PaperProps rather than the viewport.">
      <Box
        sx={{
          display: "flex",
          height: 320,
          border: 1,
          borderColor: "divider",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              position: "absolute",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6">Zesty</Typography>
          </Toolbar>
          <Divider />
          <NavList />
        </Drawer>
        <Box sx={{ flex: 1, p: 3, ml: "240px", overflow: "auto" }}>
          <Typography variant="body2" color="text.secondary">
            Main content sits beside the drawer. Under M3 the list items pick up the pill hover
            shape from the MuiListItemButton override.
          </Typography>
        </Box>
      </Box>
    </Stacked>
  ),
};

/** Persistent drawers push content aside instead of overlaying it. */
export const Persistent: Story = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(true);
      return (
        <Stack spacing={2}>
          <Button variant="contained" onClick={() => setOpen((v) => !v)} sx={{ alignSelf: "flex-start" }}>
            {open ? "Close" : "Open"} drawer
          </Button>
          <Box
            sx={{
              display: "flex",
              height: 280,
              border: 1,
              borderColor: "divider",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Drawer
              variant="persistent"
              open={open}
              sx={{
                width: open ? 220 : 0,
                flexShrink: 0,
                "& .MuiDrawer-paper": { width: 220, position: "absolute" },
              }}
            >
              <NavList />
            </Drawer>
            <Box
              sx={{
                flex: 1,
                p: 3,
                ml: open ? "220px" : 0,
                transition: (theme) =>
                  theme.transitions.create("margin", { duration: theme.transitions.duration.enteringScreen }),
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Content shifts as the drawer opens and closes.
              </Typography>
            </Box>
          </Box>
        </Stack>
      );
    };
    return (
      <Stacked title="Persistent" description="Toggle it — the content margin animates.">
        <Demo />
      </Stacked>
    );
  },
};
