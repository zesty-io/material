import React from 'react';
import ReactJson from 'react-json-view'
import { Story, Meta } from '@storybook/react/types-6-0';
import theme from '../theme';

export default {
  title: 'Theme',
} as Meta;

const Template: Story = (args) => {
  return (
    <ReactJson src={theme} />
  );
};

export const Default = Template.bind({});
