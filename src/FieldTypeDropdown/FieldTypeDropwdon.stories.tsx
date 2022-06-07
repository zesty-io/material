import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeDropdown, { FieldTypeDropdownProps } from './';
import { MenuItem } from '@mui/material';

export default {
  title: 'FieldTypeDropdown',
  component: FieldTypeDropdown,
  argType: {},
} as Meta;

const options = [
  {
    value: 'option1',
    label: 'Option 1',
  },
  {
    value: 'option2',
    label: 'Option 2',
  },
  {
    value: 'option3',
    label: 'Option 3',
  },
];

const Template: Story<FieldTypeDropdownProps> = (args) => {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <FieldTypeDropdown
      {...args}
      value={value}
      onChange={handleOnChange}
      options={options}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
  label: 'Dropdown label',
  helperText: 'Dropdown helper text',
};



