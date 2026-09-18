import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { ContentCopy, ContentCut, ContentPaste, Delete } from "@mui/icons-material";
import { Section, Stacked } from "./StorySection";

/** M3 uses a 4px radius on a `surfaceContainer` ground with 48px items. */
const meta: Meta<typeof Menu> = {
  title: "MUI/Navigation/Menu",
  component: Menu,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const Demo = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        Open menu
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCut fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cut</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <ListItemIcon>
            <ContentPaste fontSize="small" />
          </ListItemIcon>
          <ListItemText>Paste</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem selected onClick={() => setAnchorEl(null)}>
          <ListItemText>Selected item</ListItemText>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Disabled</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <Section title="Menu" description="MuiMenu paper + MuiMenuItem states.">
      <Demo />
    </Section>
  ),
};

export const ItemStates: Story = {
  render: () => (
    <Stacked title="MenuItem, inline" description="Rendered outside a popover to inspect states.">
      <Paper variant="outlined" sx={{ maxWidth: 280, py: 1 }}>
        <MenuItem>Default</MenuItem>
        <MenuItem selected>Selected</MenuItem>
        <MenuItem disabled>Disabled</MenuItem>
        <MenuItem dense>Dense</MenuItem>
      </Paper>
    </Stacked>
  ),
};
