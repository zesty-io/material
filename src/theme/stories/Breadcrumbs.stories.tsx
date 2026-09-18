import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { Stacked } from "./StorySection";

const meta: Meta<typeof Breadcrumbs> = {
  title: "MUI/Navigation/Breadcrumbs",
  component: Breadcrumbs,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: () => (
    <Stacked title="Default">
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Content
        </Link>
        <Typography color="text.primary">Article</Typography>
      </Breadcrumbs>
    </Stacked>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stacked title="Icons and a custom separator">
      <Breadcrumbs separator="›">
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <Home fontSize="small" />
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Media
        </Link>
        <Typography color="text.primary">Image.png</Typography>
      </Breadcrumbs>
    </Stacked>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <Stacked title="maxItems" description="Long trails collapse behind an ellipsis button.">
      <Breadcrumbs maxItems={3}>
        {["Home", "Content", "Models", "Fields", "Settings"].map((crumb) => (
          <Link key={crumb} underline="hover" color="inherit" href="#">
            {crumb}
          </Link>
        ))}
        <Typography color="text.primary">Current</Typography>
      </Breadcrumbs>
    </Stacked>
  ),
};
