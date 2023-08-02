import { Story, Meta } from "@storybook/react/types-6-0";
import { IconButton, Props } from "./";

export default {
  title: "IconButton",
  component: IconButton,
  argType: {},
} as Meta;

const Template: Story<Props> = (args) => {
  return <IconButton />;
};

export const Default = Template.bind({});
