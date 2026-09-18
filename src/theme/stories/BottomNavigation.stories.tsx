import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { Archive, Favorite, Folder, Restore, Search } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Neither theme restyles BottomNavigation, so it takes `primary.main` for the
 * selected action straight from the palette.
 *
 * M3 replaced this pattern with the navigation bar, which keeps labels visible
 * and puts an active indicator pill behind the selected icon. What renders here
 * is still MUI's MD2 shape under both themes.
 */
const meta: Meta<typeof BottomNavigation> = {
  title: "MUI/Navigation/Bottom Navigation",
  component: BottomNavigation,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

const Demo = ({ showLabels }: { showLabels?: boolean }) => {
  const [value, setValue] = useState(0);

  return (
    <Paper variant="outlined" sx={{ width: 420, maxWidth: "100%" }}>
      <BottomNavigation
        showLabels={showLabels}
        value={value}
        onChange={(_e, next: number) => setValue(next)}
      >
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Archive" icon={<Archive />} />
      </BottomNavigation>
    </Paper>
  );
};

/** Without `showLabels`, only the selected action keeps its label. */
export const Default: Story = {
  render: () => (
    <>
      <Stacked title="showLabels off" description="Only the selected action shows its label.">
        <Demo />
      </Stacked>
      <Stacked title="showLabels on">
        <Demo showLabels />
      </Stacked>
    </>
  ),
};

export const FourActions: Story = {
  render: () => {
    const Four = () => {
      const [value, setValue] = useState(1);
      return (
        <Paper variant="outlined" sx={{ width: 480, maxWidth: "100%" }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_e, next: number) => setValue(next)}
          >
            <BottomNavigationAction label="Recents" icon={<Restore />} />
            <BottomNavigationAction label="Search" icon={<Search />} />
            <BottomNavigationAction label="Files" icon={<Folder />} />
            <BottomNavigationAction label="Saved" icon={<Favorite />} />
          </BottomNavigation>
        </Paper>
      );
    };
    return (
      <Stacked title="Four actions" description="Three to five is the usable range.">
        <Four />
      </Stacked>
    );
  },
};

/** Pinned to the bottom of a scrolling container, which is the real use. */
export const Fixed: Story = {
  render: () => {
    const Pinned = () => {
      const [value, setValue] = useState(0);
      return (
        <Box
          sx={{
            position: "relative",
            height: 280,
            width: 420,
            maxWidth: "100%",
            border: 1,
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Box sx={{ height: "100%", overflow: "auto", pb: 7, p: 2 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <Typography key={i} variant="body2" sx={{ mb: 2 }}>
                Row {i + 1}
              </Typography>
            ))}
          </Box>
          <Paper
            elevation={3}
            sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          >
            <BottomNavigation
              showLabels
              value={value}
              onChange={(_e, next: number) => setValue(next)}
            >
              <BottomNavigationAction label="Recents" icon={<Restore />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Archive" icon={<Archive />} />
            </BottomNavigation>
          </Paper>
        </Box>
      );
    };
    return (
      <Stacked title="Pinned" description="Scroll the panel — the bar holds position.">
        <Pinned />
      </Stacked>
    );
  },
};
