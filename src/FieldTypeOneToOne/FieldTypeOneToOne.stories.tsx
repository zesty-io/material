import { ReactNode, SyntheticEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import FieldTypeOneToOne, { FieldTypeOneToOneProps } from './';

export default {
  title: 'FieldTypeOneToOne',
  component: FieldTypeOneToOne,
  argType: {},
} as Meta;

const Template: Story<FieldTypeOneToOneProps> = (args) => {
  const [value, setValue] = useState<{component: string | ReactNode, value: string, inputLabel: string}>({component: '- None -', value: '0', inputLabel: '- None -'});

  const [options, setOptions] = useState<{component: string | ReactNode, value: string, inputLabel: string}[]>([]);

  const handleOnOpen = async () => {
    const largeArr = new Array(1000).fill(null);
    await new Promise((resolve) => setTimeout(resolve, 3000))
    const data = largeArr.map((_, idx) => ({component: <div>{`Test ${idx}`}</div>, value: String(Math.random()), inputLabel: `Test ${idx}`}));
    setOptions(data);
  }

  const handleOnChange = (e: SyntheticEvent<Element, Event>, option: {component: string | ReactNode, value: string, inputLabel: string}) => {
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
  label: 'OneToOne label',
  helperText: 'OneToOne helperText',
  placeholder: 'OneToOne placeholder'
};



