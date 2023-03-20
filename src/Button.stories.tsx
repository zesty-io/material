import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, ButtonProps } from '@mui/material';

export default {
  title: 'Button',
  component: Button,
  argType: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => {

  return (
    <Button {...args}>Button</Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'contained',
  size: 'medium',
}
