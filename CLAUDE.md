# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@zesty-io/material` is a React component library that extends the MUI (Material UI) v7 design system. It is published to npm and consumed by other Zesty.io apps. It ships three things: a customized MUI **theme**, a set of **custom icons** (SVG wrappers), and a handful of **composite components** (mostly form "FieldType" inputs built on top of MUI primitives).

There is no application to run — it is a library. The only way to view/interact with components is Storybook.

## Commands

```bash
npm run storybook        # Dev: launch Storybook on port 6006 (the primary dev loop)
npm run build            # npm ci && tsc — type-checks and emits ES modules to es/
npm run build-storybook  # Static Storybook build
npm run deploy           # build-storybook + publish to GitHub Pages
npm run release          # build + npm publish --access public
npm run release:alpha    # build + publish under the `alpha` dist-tag
npm run format           # prettier --write on src/**/*.{ts,tsx}
npm run format:check     # prettier --check on src/**/*.{ts,tsx}
```

There are **no tests** — `npm test` is a placeholder (`echo 'add tests'`). Do not assume a test runner exists.

`tsc` runs in `strict` mode and Storybook type-checks via `react-docgen-typescript`, so type errors surface in both the build and the Storybook dev server.

**Formatting is enforced via a pre-commit hook.** Prettier runs on Prettier's own defaults (no `.prettierrc` — deliberately, to stay decision-free and consistent with manager-ui, which runs on the same defaults) against `src/**/*.{ts,tsx}` (scope narrowed by `.prettierignore` to just that source tree — the rest of the repo, e.g. `tsconfig.json`/`.storybook/`, is intentionally left untouched for now). `npm install` runs `husky` via the `prepare` script, which wires up `.husky/pre-commit` to run `pretty-quick --staged` — new/modified staged source files are auto-formatted at commit time. This is currently the only enforcement (bypassable with `git commit --no-verify`); CI wiring for `format:check` is tracked separately.

## Architecture & conventions

**Everything is wired through `src/index.ts`** — the public API surface. A component does not exist to consumers until it is exported here. When adding a component, add its export to `src/index.ts`.

**Component layout.** Each component lives in its own directory under `src/` containing `index.tsx` (the component) and `<Name>.stories.tsx` (its Storybook story). Components are default exports re-exported as named exports in `src/index.ts` — e.g. `export { default as FieldTypeText } from "./FieldTypeText"`. The exception is `IconButton`, which is itself a named export (`export { IconButton }`).

**Composite component pattern** (see `src/FieldTypeText/index.tsx` as the canonical example): wrap MUI components, define a `<Name>Props` interface that `extends`/`Omit`s the underlying MUI props, set sensible `defaultProps`-style defaults via destructuring, and **spread `{...props}` last** so consumers can override anything. JSDoc comments on props feed Storybook's controls docs.

**Icons** (`src/icons/`). Each icon is a named-export functional component wrapping MUI's `<SvgIcon {...props}>` with a single `<path>`. New icons must be added to `src/icons/index.ts`, which is re-exported wholesale via `export * from "./icons"` in `src/index.ts`. Keep icons as pass-through `SvgIconProps` so they inherit theme sizing/color.

**Theme** (`src/theme/`). `theme/index.tsx` builds the exported `theme` (light) and `darkTheme` via MUI's `createTheme`, composed from `palette.ts` and `typography.ts`. This file is large and is mostly per-MUI-component `styleOverrides`/`variants`/`defaultProps` — it is the central place that defines the library's visual language (border radii, the custom `border` palette color, brand color scales like `blue`/`green`/`red`, etc.). `LegacyTheme/` exports the older `legacyTheme` for backwards compatibility.

**Module augmentation is load-bearing.** The library extends MUI's TypeScript types in two places: `src/declarations.d.ts` and inline `declare module "@mui/material/..."` blocks in `theme/index.tsx`. These add custom palette colors (`blue`, `green`, `red`, `yellow`, `border`, etc.), the `body3` typography variant, and custom component sizes (`xsmall`/`xxsmall` on `IconButton`, `xsmall` on `Button`). If you reference a custom token, the corresponding augmentation must exist or `strict` `tsc` will fail.

**Storybook** (`.storybook/`). All stories are wrapped in the library's `theme` via the `ThemeProvider` decorator in `preview.js`, so stories render exactly as consumers will see them. Stories follow the CSF `Template.bind({})` + `.args` pattern.

## Gotchas

- `package.json` `main` points at `./cjs/index.js`, but `tsc` only emits ESM to `es/` (`module`/`types` fields). The CJS build path exists in `package.json` but is not produced by the documented scripts — verify before relying on CJS output.
- `src/VitualizedAutocomplete/` is misspelled (missing "r") and is exported as `VirtualizedAutocomplete`. The directory name is intentional/historical — don't "fix" it without updating the import in `src/index.ts`.
- The repo contains committed `.tgz` pack artifacts and a checked-in `es/` build output; these are generated, not source.
