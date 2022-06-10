import { ReactNode, SyntheticEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeOneToMany, { FieldTypeOneToManyProps } from '.';

export default {
  title: 'FieldTypeOneToMany',
  component: FieldTypeOneToMany,
  argType: {},
} as Meta;

const Template: Story<FieldTypeOneToManyProps> = (args) => {
  const [value, setValue] = useState<{component: string | ReactNode, value: string, inputLabel: string}[]>([]);

  const [options, setOptions] = useState<{component: string | ReactNode, value: string, inputLabel: string}[]>([]);


  const handleOnOpen = async () => {
    const largeArr = new Array(1000).fill(null);
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const data = largeArr.map((_, idx) => ({component: <div>{`Test ${idx}`}</div>, value: String(Math.random()), inputLabel: `Test ${idx}`}));
    setOptions(data);
  }

  const handleOnChange = (e: SyntheticEvent<Element, Event>, values: {component: string | ReactNode, value: string, inputLabel: string}[]) => {
    setValue(values);
  }

  return (
    <FieldTypeOneToMany
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
  placeholder: 'Placeholder Text...',
  label: 'OneToMany label',
  helperText: 'OneToMany helperText',
};



