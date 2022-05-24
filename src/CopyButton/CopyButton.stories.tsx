import { Story, Meta } from '@storybook/react/types-6-0';
import CopyButton, { CopyButtonProps } from '.';

export default {
  title: 'CopyButton',
  component: CopyButton,
  argType: {},
} as Meta;

const Template: Story<CopyButtonProps> = (args) => {

  return (
    <CopyButton {...args} />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 'Copy Me!'
};
