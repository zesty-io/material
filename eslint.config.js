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
      // Module augmentation regularly declares an interface that only
      // `extends` a mapped type (e.g. `interface X extends Record<...> {}`)
      // to merge it onto an existing ambient interface — that's not
      // equivalent to a type alias, since only an interface merges.
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
    },
  }
);
