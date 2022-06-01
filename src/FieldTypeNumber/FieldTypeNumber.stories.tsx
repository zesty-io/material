import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeNumber, { FieldTypeNumberProps } from './';

export default {
  title: 'FieldTypeNumber',
  component: FieldTypeNumber,
  argType: {},
} as Meta;

const Template: Story<FieldTypeNumberProps> = (args) => {
  const [value, setValue] = useState('0');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <FieldTypeNumber
      {...args}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
  label: 'Number label',
};



