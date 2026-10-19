import type { Meta, StoryObj } from "@storybook/react-vite";
import SSOButton from ".";

/** Single sign-on button, branded per identity provider. */
const meta = {
  title: "Components/SSOButton",
  component: SSOButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof SSOButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Google: Story = { args: { service: "google" } };
export const Microsoft: Story = { args: { service: "azure" } };
export const Github: Story = { args: { service: "github" } };
