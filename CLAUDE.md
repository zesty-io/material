# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@zesty-io/material` is a React component library that extends the MUI (Material UI) v7 design system. It is published to npm and consumed by other Zesty.io apps. It ships three things: a customized MUI **theme**, a set of **custom icons** (SVG wrappers), and a handful of **composite components** (mostly form "FieldType" inputs built on top of MUI primitives).

There is no application to run — it is a library. The only way to view/interact with components is Storybook.

## Commands

```bash
npm install              # required first — nothing runs without node_modules
npm run storybook        # Dev: launch Storybook on port 6006 (the primary dev loop)
npm run typecheck        # tsc over src + .storybook (no emit) — use this to check stories
npm run build            # npm ci && tsc — type-checks and emits ES modules to es/
npm run build-storybook  # Static Storybook build into storybook-static/
npm run deploy           # build-storybook + publish to GitHub Pages
npm run release          # build + npm publish --access public
npm run release:alpha    # build + publish under the `alpha` dist-tag
npm run format           # prettier --write on src/**/*.{ts,tsx}
npm run format:check     # prettier --check on src/**/*.{ts,tsx}
```

Storybook 10 with the Vite builder. Requires Node >= 20.19 (or >= 22.12), per Vite's engines field.

There are **no tests** — `npm test` is a placeholder (`echo 'add tests'`). Do not assume a test runner exists.

`tsc` runs in `strict` mode. Two tsconfigs: `tsconfig.json` is the **build** config (emits `es/`, excludes `*.stories.tsx`), and `tsconfig.storybook.json` is the **check-everything** config used by `npm run typecheck` — it adds the stories and `.storybook/` and uses `Bundler` module resolution, which Storybook 10's subpath `exports` require. Storybook itself does not block on type errors; run `npm run typecheck` before pushing.

**Formatting is enforced via a pre-commit hook.** Prettier runs on Prettier's own defaults (no `.prettierrc` — deliberately, to stay decision-free and consistent with manager-ui, which runs on the same defaults) against `src/**/*.{ts,tsx}` (scope narrowed by `.prettierignore` to just that source tree — the rest of the repo, e.g. `tsconfig.json`/`.storybook/`, is intentionally left untouched for now). `npm install` runs `husky` via the `prepare` script, which wires up `.husky/pre-commit` to run `pretty-quick --staged` — new/modified staged source files are auto-formatted at commit time. This is currently the only enforcement (bypassable with `git commit --no-verify`); CI wiring for `format:check` is tracked separately.

## Architecture & conventions

**Everything is wired through `src/index.ts`** — the public API surface. A component does not exist to consumers until it is exported here. When adding a component, add its export to `src/index.ts`.

**Component layout.** Each component lives in its own directory under `src/` containing `index.tsx` (the component) and `<Name>.stories.tsx` (its Storybook story). Components are default exports re-exported as named exports in `src/index.ts` — e.g. `export { default as FieldTypeText } from "./FieldTypeText"`. The exception is `IconButton`, which is itself a named export (`export { IconButton }`).

**Composite component pattern** (see `src/FieldTypeText/index.tsx` as the canonical example): wrap MUI components, define a `<Name>Props` interface that `extends`/`Omit`s the underlying MUI props, set sensible `defaultProps`-style defaults via destructuring, and **spread `{...props}` last** so consumers can override anything. JSDoc comments on props feed Storybook's controls docs.

**Icons** (`src/icons/`). Each icon is a named-export functional component wrapping MUI's `<SvgIcon {...props}>` with a single `<path>`. New icons must be added to `src/icons/index.ts`, which is re-exported wholesale via `export * from "./icons"` in `src/index.ts`. Keep icons as pass-through `SvgIconProps` so they inherit theme sizing/color.

**Two theme families.** `theme`/`darkTheme` (labelled **Legacy** in the Storybook toolbar) and `m3Theme`/`m3DarkTheme` (**M3**). The toolbar has two independent controls — family and colour mode — so you can hold one steady while changing the other. The separate `legacyTheme` export is older than both and mounts its own provider.

**M3** (`src/m3/`). Material 3 generated from the brand seed `#4254BD`. Note this is *not* the legacy theme's primary (`#FF5D0A`) — M3 derives its entire harmony from one seed, so the two families are not expected to match. `tokens.ts` is **generated and committed** — produced by `scripts/generate-m3-tokens.mjs` via Google's `@material/material-color-utilities`. Do not hand-edit it. To rebrand: change `SEED` in the script, run `npm run gen:m3`, commit the diff. Day-to-day work never runs the generator, so the dependency is not needed to build or run Storybook.

That package ships `"type": "module"` with extensionless internal imports, which bare Node ESM cannot resolve — `scripts/m3-loader.mjs` is a narrow resolve hook that retries those with `.js`. Without it the generator throws `ERR_MODULE_NOT_FOUND` from inside the package.

M3 ships no success/warning/info roles. They are generated as M3 **custom colours** (`CUSTOM_COLORS` in the generator) sourced from the legacy theme's semantic colours and harmonised toward the seed with `blend: true`, so green still means success. Do not map them onto tertiary/secondary — every M3 accent role sits at the same tone, so a "success" borrowed from tertiary differs from primary only in hue, and at tertiary's low chroma it does not read as a state change at all.

**Paper is inherited by Card, Dialog, Menu, Accordion and AppBar.** M3 gives `MuiPaper` a 12px radius and a `surfaceContainerLow` ground, so anything built on Paper picks both up. `MuiAppBar` overrides them back to square-edged on `surface` — a top app bar is full-bleed. If you add a Paper-based component that should not be rounded, it needs the same treatment.

Two parts of the M3 progress spec are **deliberately not implemented**: the 4dp gap between a linear indicator's active bar and its track, and the track arc on the determinate circular indicator. Both need DOM that MUI does not render, so they would require a custom component rather than `styleOverrides`. Everything else (4dp height, pill caps, secondaryContainer track, the determinate stop-indicator dot, 4dp stroke, round caps) is in place.

`m3/components.tsx` builds its overrides from the resolved colour scheme rather than reading `theme.palette`, so the full M3 role set is available without pretending every MUI theme carries it. `Button` gains typed `tonal` and `elevated` variants; the M3 type scale is registered as `displayLarge`…`labelSmall` Typography variants *and* mapped onto MUI's built-ins.

**Theme** (`src/theme/`). `theme/index.tsx` builds the exported `theme` (light) and `darkTheme` via MUI's `createTheme`, composed from `palette.ts` and `typography.ts`. This file is large and is mostly per-MUI-component `styleOverrides`/`variants`/`defaultProps` — it is the central place that defines the library's visual language (border radii, the custom `border` palette color, brand color scales like `blue`/`green`/`red`, etc.). `LegacyTheme/` exports the older `legacyTheme` for backwards compatibility.

**Module augmentation is load-bearing.** The library extends MUI's TypeScript types in two places: `src/declarations.d.ts` and inline `declare module "@mui/material/..."` blocks in `theme/index.tsx`. These add custom palette colors (`blue`, `green`, `red`, `yellow`, `border`, etc.), the `body3` typography variant, and custom component sizes (`xsmall`/`xxsmall` on `IconButton`, `xsmall` on `Button`). If you reference a custom token, the corresponding augmentation must exist or `strict` `tsc` will fail.

**Storybook** (`.storybook/`). Storybook 10 on `@storybook/react-vite`. `main.ts` declares the framework and the `react-docgen-typescript` props-table settings; `preview.tsx` wraps every story in the library's own MUI `ThemeProvider` + `CssBaseline`, so stories render exactly as consumers will see them, and exposes a **Theme** toolbar control that swaps `theme` for `darkTheme`. `preview-head.html` loads the Mulish webfont the typography scale expects.

`@storybook/react-vite` does **not** apply `@vitejs/plugin-react` itself — the root `vite.config.ts` supplies it, and Storybook merges that config in. Don't delete `vite.config.ts` just because there's no app to build.

Stories use **CSF3**: a `satisfies Meta<typeof X>` default export and named `StoryObj` exports. Where a story needs state (most of the `FieldType*` inputs are controlled), define a small `Controlled` component in the story file and call it from `render` — don't put hooks directly in `render`. Titles are grouped: `Theme`, `Icons`, `Components/*`, `Field Types/*`; the sort order lives in `preview.tsx`. `src/Introduction.mdx` is the landing page.

**MUI reference pages** (`src/theme/stories/`). One file per component, titled `MUI/<Category>/<Component>` following mui.com's own grouping: Layout, Inputs, Data Display, Feedback, Surfaces, Navigation, plus MUI X and Baseline. **Every category on mui.com is now covered** — when MUI adds a component, add the page here too. They render plain MUI components with nothing wrapped, so a `styleOverrides` regression shows up visually under whichever theme the toolbar has active.

Most of these are components the theme restyles — all 45 `Mui*` keys in `theme/index.tsx` are represented, and **when you add a key, add it to the matching page**. A few (Avatar, Badge, Table) are *not* themed and are documented anyway, so it stays visible that they fall through to MUI defaults.

`src/theme/stories/` is excluded from the `es/` build alongside `*.stories.tsx`, so `StorySection.tsx` is shared between pages without shipping.

Two pages document *patterns* rather than exported components, because MUI does the same: `MUI/Inputs/Transfer List` is composed from Card/List/Checkbox/Button, and `MUI/Inputs/Number Field` is `TextField type="number"` — MUI ships no NumberField, its docs page composes Base UI's and targets v9.

The top-level **Icons** section is the Zesty icon set; `MUI/Data Display/Icons` is MUI's `SvgIcon` and `@mui/icons-material`. They are different things — don't merge them.

`legacyTheme` is documented under `Theme/Legacy v1`. Those stories mount their own `ThemeProvider`, so the toolbar Theme control does not affect them.

## Gotchas

- `package.json` `main` points at `./cjs/index.js`, but `tsc` only emits ESM to `es/` (`module`/`types` fields). The CJS build path exists in `package.json` but is not produced by the documented scripts — verify before relying on CJS output.
- `src/VitualizedAutocomplete/` is misspelled (missing "r") and is exported as `VirtualizedAutocomplete`. The directory name is intentional/historical — don't "fix" it without updating the import in `src/index.ts`.
- The repo contains committed `.tgz` pack artifacts and a checked-in `es/` build output; these are generated, not source.
- DataGrid Pro and the Pro date pickers render a "MUI X Missing license key" watermark in the `MUI/MUI X` stories. That is the unlicensed-dev-build watermark, not a theme bug.
- `react`/`react-dom` are **devDependencies with no matching `peerDependencies`**. A consumer installing this package gets no signal about which React it needs. Worth adding a `peerDependencies` block on the next release.
- React is pinned to 18 rather than 19 because `@mui/x-data-grid-pro` / `@mui/x-date-pickers-pro` v7 do not support React 19 — that needs MUI X v8 first.
