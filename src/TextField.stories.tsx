import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { InputAdornment, TextField, TextFieldProps, IconButton } from '@mui/material';
import { Close, Search } from '@mui/icons-material';

export default {
  title: 'TextField',
  component: TextField,
  argType: {},
} as Meta;

const Template: Story<TextFieldProps> = (args) => {

  return (
      <TextField
      {...args}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton size="small">
              <Search fontSize="small"  />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
              <IconButton size="small">
            <Close fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
};

