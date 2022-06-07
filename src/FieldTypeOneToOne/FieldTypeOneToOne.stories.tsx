import { SyntheticEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeOneToOne, { FieldTypeOneToOneProps } from './';
import { randomOptions } from '../utils/virtualization';

export default {
  title: 'FieldTypeOneToOne',
  component: FieldTypeOneToOne,
  argType: {},
} as Meta;

const Template: Story<FieldTypeOneToOneProps> = (args) => {
  const [value, setValue] = useState<string>('');

  const [options, setOptions] = useState<string[]>([]);

  const handleOnOpen = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setOptions(randomOptions);
  }

  const handleOnChange = (e: SyntheticEvent<Element, Event>, option: string) => {
    setValue(option);
  }

  return (
    <FieldTypeOneToOne
      {...args}
      value={value}
      onChange={handleOnChange}
      options={options}
      onOpen={handleOnOpen}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  textFieldProps: {
    placeholder: 'Placeholder Text...',
    label: 'OneToOne label',
    helperText: 'OneToOne helperText',
  }
};



