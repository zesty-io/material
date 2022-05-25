import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { TextFieldProps } from '@mui/material';
import FieldTypeSort, { FieldTypeSortProps } from './';

export default {
  title: 'FieldTypeSort',
  component: FieldTypeSort,
  argType: {},
} as Meta;

const Template: Story<FieldTypeSortProps> = (args) => {
  const [value, setValue] = useState('3');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <FieldTypeSort
      {...args}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
  label: 'Some label',
};



