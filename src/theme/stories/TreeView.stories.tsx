import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paper } from "@mui/material";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Stacked } from "./StorySection";

/** Item spacing and selection styling come from the `MuiTreeItem` overrides. */
const meta: Meta<typeof SimpleTreeView> = {
  title: "MUI/MUI X/TreeView",
  component: SimpleTreeView,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof SimpleTreeView>;

export const Default: Story = {
  render: () => (
    <Stacked title="SimpleTreeView">
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 360 }}>
        <SimpleTreeView defaultExpandedItems={["content", "pages"]}>
          <TreeItem itemId="content" label="Content">
            <TreeItem itemId="pages" label="Pages">
              <TreeItem itemId="home" label="Homepage" />
              <TreeItem itemId="about" label="About us" />
              <TreeItem itemId="pricing" label="Pricing" />
            </TreeItem>
            <TreeItem itemId="listings" label="Listings">
              <TreeItem itemId="blog" label="Blog index" />
            </TreeItem>
          </TreeItem>
          <TreeItem itemId="media" label="Media">
            <TreeItem itemId="images" label="Images" />
            <TreeItem itemId="files" label="Files" />
          </TreeItem>
          <TreeItem itemId="code" label="Code" />
        </SimpleTreeView>
      </Paper>
    </Stacked>
  ),
};

export const MultiSelect: Story = {
  render: () => (
    <Stacked title="multiSelect" description="Ctrl/Cmd-click or shift-click to extend a selection.">
      <Paper variant="outlined" sx={{ p: 2, maxWidth: 360 }}>
        <SimpleTreeView multiSelect defaultExpandedItems={["content"]}>
          <TreeItem itemId="content" label="Content">
            <TreeItem itemId="a" label="Homepage" />
            <TreeItem itemId="b" label="About us" />
            <TreeItem itemId="c" label="Pricing" />
            <TreeItem itemId="d" label="Contact" />
          </TreeItem>
        </SimpleTreeView>
      </Paper>
    </Stacked>
  ),
};
