import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../src/index.ts';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];
