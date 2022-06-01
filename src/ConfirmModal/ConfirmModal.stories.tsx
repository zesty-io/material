import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Button, Stack } from '@mui/material';
import ConfirmDialog, { ConfirmDialogProps } from '.';

export default {
  title: 'ConfirmDialog',
  component: ConfirmDialog,
  argType: {},
} as Meta;

const Template: Story<ConfirmDialogProps> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>Click me to open</Button>
      <ConfirmDialog {...args} open={open} callback={(confirmed) => setOpen(false) } />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Confirm modal title',
  content: 'Confirm modal content',
};

export const CustomChildren = Template.bind({});
CustomChildren.args = {
  title: 'Confirm modal title',
  content: 'Confirm modal content',
  children: <><Button color="error" variant="contained">Custom 1</Button><Button color="success" variant="contained">Custom 2</Button></>
};

