import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  // Props tables are generated from the TypeScript types, so a component's
  // JSDoc'd props show up as documented controls. The filter keeps the MUI
  // props a component inherits while dropping the rest of node_modules.
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent
          ? /@mui/.test(prop.parent.fileName) ||
            !/node_modules/.test(prop.parent.fileName)
          : true,
    },
  },

  docs: {
    defaultName: "Docs",
  },
};

export default config;
