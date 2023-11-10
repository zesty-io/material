import { Story, Meta } from "@storybook/react/types-6-0";
import { SSOButtonProps } from ".";
import SSOButton from ".";

export default {
  title: "SSOButton",
  component: SSOButton,
  argType: {},
} as Meta;

const Template: Story<SSOButtonProps> = (args) => {
  return <SSOButton {...args} />;
};

export const Google = Template.bind({});
export const Microsoft = Template.bind({});
export const Github = Template.bind({});
Google.args = {
  service: "google",
};
Microsoft.args = {
  service: "azure",
};
Github.args = {
  service: "github",
};
