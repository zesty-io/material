import React from "react";
import ReactJson from "react-json-view";
import { Story, Meta } from "@storybook/react/types-6-0";
import { darkTheme, theme } from ".";

export default {
  title: "Theme",
} as Meta;

const LightTheme: Story = (args) => {
  return <ReactJson src={theme} />;
};

const DarkTheme: Story = (args) => {
  return <ReactJson src={darkTheme} />;
};

export const light = LightTheme.bind({});
export const dark = DarkTheme.bind({});
