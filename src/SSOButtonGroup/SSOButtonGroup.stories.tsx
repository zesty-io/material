import { ChangeEvent, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SSOButtonGroup, { SSOButtonGroupProps } from '.';
import SSOButton from '../SSOButton';



export default {
  title: 'SSOButtonGroup',
  component: SSOButtonGroup,
  argType: {},
} as Meta;

const Template: Story<SSOButtonGroupProps> = (args) => {

  return (
      <SSOButtonGroup {...args}>
        <SSOButton service='google' />
        <SSOButton service='azure' />
        <SSOButton service='github' />
      </SSOButtonGroup>

    
  );
};

export const Google = Template.bind({});
Google.args = {
  authServiceUrl: "https://auth.api.dev.zesty.io",
  onSuccess: () => {
    console.log('exittoooo')
  },
  onError: (error: string) => {
    console.log(error)
  },

};

