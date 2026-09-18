import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import SSOButtonGroup from ".";
import SSOButton from "../SSOButton";

/**
 * Wraps SSOButtons and owns the auth handshake — each child button posts to
 * `authServiceUrl` and the group reports back through `onSuccess` / `onError`.
 */
const meta = {
  title: "Components/SSOButtonGroup",
  component: SSOButtonGroup,
  parameters: { layout: "centered" },
} satisfies Meta<typeof SSOButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    authServiceUrl: "https://auth.api.dev.zesty.io",
    onSuccess: action("onSuccess"),
    onError: action("onError"),
    children: (
      <>
        <SSOButton service="google" />
        <SSOButton service="azure" />
        <SSOButton service="github" />
      </>
    ),
  },
};
