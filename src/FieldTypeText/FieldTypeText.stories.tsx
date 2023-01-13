import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeText, { FieldTypeTextProps } from './';
import { Brain } from '../icons/Brain';
import { IconButton } from '@mui/material';

export default {
  title: 'FieldTypeText',
  component: FieldTypeText,
  argType: {},
} as Meta;

const Template: Story<FieldTypeTextProps> = (args) => {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <>
      <FieldTypeText
        {...args}
        value={value}
        onChange={handleOnChange}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
  label: 'Text label',
  helperText: 'Text helper text',
  endLabel: <IconButton size="small"><Brain fontSize='small' /></IconButton>
};

export const TextArea = Template.bind({});
TextArea.args = {
  multiline: true,
  rows: 4,
  placeholder: 'Placeholder Text...',
  label: 'Text Label',
  helperText: 'Text helper text',
};


