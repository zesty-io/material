import React from "react";
import { Story, Meta } from "@storybook/react";
import * as Icons from "./index";

export default {
  title: "Icons",
} as Meta;

const Template: Story = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
    {Object.entries(Icons).map(([name, Icon]) => (
      <div key={name} style={{ textAlign: "center" }}>
        <Icon style={{ fontSize: 48 }} />
        <div style={{ marginTop: 8 }}>{name}</div>
      </div>
    ))}
  </div>
);

export const AllIcons = Template.bind({});