import React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { theme, darkTheme } from "../src/theme";
import { m3Theme, m3DarkTheme } from "../src/m3";

/**
 * Two independent axes: which theme family, and which colour mode. Keeping
 * them separate means you can hold the mode steady while flipping the family,
 * which is the comparison that matters when porting a component to M3.
 *
 * Note this is about the two *current* families. The separate `legacyTheme`
 * export (Theme/Legacy v1) is older still and mounts its own provider, so it
 * ignores both controls.
 */
const THEMES = {
  legacy: { light: theme, dark: darkTheme },
  m3: { light: m3Theme, dark: m3DarkTheme },
} as const;

type Family = keyof typeof THEMES;
type Mode = "light" | "dark";

const withZestyTheme: Decorator = (Story, context) => {
  const family = (context.globals.family ?? "legacy") as Family;
  const mode = (context.globals.mode ?? "light") as Mode;
  const activeTheme = (THEMES[family] ?? THEMES.legacy)[mode];

  return (
    <ThemeProvider theme={activeTheme}>
      <CssBaseline />
      <Box
        sx={{
          p: 3,
          minHeight: "100%",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <Story />
      </Box>
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withZestyTheme],

  globalTypes: {
    family: {
      description: "Theme family",
      toolbar: {
        title: "Theme",
        icon: "component",
        items: [
          { value: "legacy", title: "Legacy" },
          { value: "m3", title: "M3" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Colour mode",
      toolbar: {
        title: "Mode",
        icon: "paintbrush",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    family: "legacy",
    mode: "light",
  },

  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The theme decorator owns the canvas background; the backgrounds addon
    // would only fight with it.
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Theme",
          "M3",
          "Icons",
          "Components",
          "Field Types",
          // A child array must follow its parent entry directly.
          "MUI",
          [
            "Layout",
            "Inputs",
            "Data Display",
            "Feedback",
            "Surfaces",
            "Navigation",
            "MUI X",
            "Baseline",
          ],
          "*",
        ],
      },
    },
  },

  tags: ["autodocs"],
};

export default preview;
