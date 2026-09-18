import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ButtonGroup } from "@mui/material";
import { Section } from "./StorySection";

const meta: Meta<typeof ButtonGroup> = {
  title: "MUI/Inputs/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <Section title="Variants">
      <ButtonGroup variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
      <ButtonGroup variant="text">
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
    </Section>
  ),
};

export const Orientation: Story = {
  render: () => (
    <Section title="Vertical">
      <ButtonGroup variant="outlined" orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" orientation="vertical" size="small">
        <Button>Small</Button>
        <Button>Group</Button>
      </ButtonGroup>
    </Section>
  ),
};
