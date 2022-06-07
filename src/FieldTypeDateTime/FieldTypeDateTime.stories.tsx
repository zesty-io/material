import {useState} from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeDateTime, { FieldTypeDateTimeProps } from '.';

export default {
  title: 'FieldTypeDateTime',
  component: FieldTypeDateTime,
  argType: {},
} as Meta;

const Template: Story<FieldTypeDateTimeProps> = (args) => {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <FieldTypeDateTime {...args} value={value} onChange={(value) => setValue(value)}/>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Date label',
  helperText: 'Date helper text',
};
