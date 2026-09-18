import type { Meta, StoryObj } from "@storybook/react-vite";
import CopyButton from ".";

/** Copies its `value` to the clipboard and confirms with a transient tooltip. */
const meta = {
  title: "Components/CopyButton",
  component: CopyButton,
  parameters: { layout: "centered" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Copy Me!",
  },
};
