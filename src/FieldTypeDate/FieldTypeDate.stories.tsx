import {useState} from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeDate, { FieldTypeDateProps } from '.';

export default {
  title: 'FieldTypeDate',
  component: FieldTypeDate,
  argType: {},
} as Meta;

const Template: Story<FieldTypeDateProps> = (args) => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <FieldTypeDate {...args} value={value} onChange={(value) => setValue(value)}/>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Date label',
  textFieldProps: {
    helperText: 'Date helper text',
    error: false,
  }
};
