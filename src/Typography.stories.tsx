import { Story, Meta } from '@storybook/react/types-6-0';
import { Typography, TypographyProps } from '@mui/material';

export default {
  title: 'Typography',
  component: Typography,
  argType: {},
} as Meta;

const Template: Story<TypographyProps> = (args) => {

  return (
    <Typography {...args}>Typography</Typography>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: 'h1',
}
