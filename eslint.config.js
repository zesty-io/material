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
  }
);
