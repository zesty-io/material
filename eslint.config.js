const tseslint = require("typescript-eslint");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = tseslint.config(
  {
    ignores: ["es/**", "cjs/**", "storybook-static/**", "**/*.tgz"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    extends: [...tseslint.configs.recommended],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  {
    // Typing MUI's styleOverrides/variants surface properly is a separate,
    // larger effort — scope `any` usage there down to a warning instead of
    // fixing (or disabling) it line-by-line.
    files: ["src/theme/**/*.ts", "src/theme/**/*.tsx", "src/LegacyTheme/**/*.ts", "src/LegacyTheme/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  }
);
