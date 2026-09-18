import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Stack,
} from "@mui/material";
import { Folder, InsertDriveFile, Settings } from "@mui/icons-material";
import { Stacked } from "./StorySection";

/**
 * Covers `MuiListItem`, `MuiListItemButton` and `MuiListItemText`. M3 gives
 * list items a pill hover shape and a 56px minimum height.
 */
const meta: Meta<typeof List> = {
  title: "MUI/Data Display/List",
  component: List,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  render: () => (
    <Stack direction="row" spacing={4} sx={{ flexWrap: "wrap", rowGap: 4 }}>
      <Paper variant="outlined" sx={{ width: 280 }}>
        <List subheader={<ListSubheader>ListItem</ListSubheader>}>
          <ListItem>
            <ListItemText primary="Plain ListItem" secondary="with secondary text" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Primary only" />
          </ListItem>
          <ListItem secondaryAction={<Chip size="small" label="12" />}>
            <ListItemText primary="With secondaryAction" />
          </ListItem>
        </List>
      </Paper>

      <Paper variant="outlined" sx={{ width: 280 }}>
        <List subheader={<ListSubheader>ListItemButton</ListSubheader>}>
          <ListItemButton selected>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Selected" secondary="ListItemButton" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <InsertDriveFile />
            </ListItemIcon>
            <ListItemText primary="Default" />
          </ListItemButton>
          <ListItemButton disabled>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Disabled" />
          </ListItemButton>
        </List>
      </Paper>
    </Stack>
  ),
};

export const Dense: Story = {
  render: () => (
    <Stacked title="dense">
      <Paper variant="outlined" sx={{ width: 280 }}>
        <List dense>
          {["One", "Two", "Three", "Four"].map((label) => (
            <ListItemButton key={label}>
              <ListItemIcon>
                <InsertDriveFile fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Stacked>
  ),
};
