import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeUrl, { FieldTypeUrlProps } from './';

export default {
  title: 'FieldTypeUrl',
  component: FieldTypeUrl,
  argType: {},
} as Meta;

const Template: Story<FieldTypeUrlProps> = (args) => {
  const [value, setValue] = useState('');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  return (
    <FieldTypeUrl
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
  fullWidth: true,
};

