import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeColor, { FieldTypeColorProps } from './';

export default {
  title: 'FieldTypeColor',
  component: FieldTypeColor,
  argType: {},
} as Meta;

const Template: Story<FieldTypeColorProps> = (args) => {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <FieldTypeColor
      {...args}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Placeholder Text...',
  label: 'Color label',
  helperText: 'Color helper text',
};



