# Adding a New Language

This guide covers adding MUI built-in component label support for a new language — things like DataGrid column menus, DatePicker buttons, and Autocomplete labels. These are separate from any i18next/app-level strings and are resolved through MUI's own locale bundle system.

`localizeTheme(theme, muiLocaleString)` is the single entry point. It accepts a MUI locale string (e.g. `"frFR"`) and resolves the correct bundles for MUI core, Data Grid, and Date Pickers dynamically — no changes needed here for locales MUI already ships. The only time this repo needs updating is when **MUI X doesn't ship a locale** and a hand-authored bundle is required.

---

## Steps

### 1. Check MUI core

Try importing the locale from `@mui/material/locale`:

```ts
import { frFR } from "@mui/material/locale";
```

If it resolves, MUI core is handled automatically — no changes needed in this repo.

If it doesn't resolve, a hand-authored core bundle is needed. This is rare — MUI core ships bundles for most major languages.

### 2. Check MUI X Data Grid

Try importing the locale from `@mui/x-data-grid-pro/locales`:

```ts
import { frFR } from "@mui/x-data-grid-pro/locales";
```

**If it resolves** — no changes needed, the dynamic resolver in `src/i18n/datagrid.ts` picks it up automatically.

**If it doesn't resolve** — create a hand-authored bundle at `src/i18n/datagrid-locales/<muiLocaleString>.ts`. Use `src/i18n/datagrid-locales/hi-IN.ts` as a reference, then register it in the `OVERRIDES` map in `src/i18n/datagrid.ts`:

```ts
import { frFR } from "./datagrid-locales/fr-FR";

const OVERRIDES: Record<string, Partial<GridLocaleText>> = {
  hiIN,
  frFR, // add here
};
```

### 3. Check MUI X Date Pickers

Same pattern — try importing from `@mui/x-date-pickers-pro/locales`:

```ts
import { frFR } from "@mui/x-date-pickers-pro/locales";
```

**If it resolves** — no changes needed.

**If it doesn't resolve** — create `src/i18n/datepickers-locales/<muiLocaleString>.ts` using `src/i18n/datepickers-locales/hi-IN.ts` as a reference, then register it in `OVERRIDES` in `src/i18n/datepickers.ts`.

### 4. Build and publish

```bash
npm run build
npm version patch   # or minor/major depending on the change
npm publish --access public
```

### 5. Update consuming apps

Bump `@zesty-io/material` and add the BCP 47 → MUI locale string mapping in the app. For example in manager-ui, add an entry to `MUI_LOCALE` in `LocalizedThemeProvider.tsx`:

```ts
const MUI_LOCALE: Record<SupportedLocale, string> = {
  ...
  "fr-FR": "frFR",
};
```

---

## Notes

- **English variants** (e.g. `en-PH`, `en-AU`) require no changes here — they fall back to MUI's built-in English strings automatically. In the consuming app, map them to `"enUS"`.
- **MUI X does not need an explicit English fallback.** `getDataGridLocaleText` and `getDatePickersLocaleText` return `undefined` for unmapped locales — MUI X treats `undefined` as "use built-in defaults", which are already English. This is intentional and differs from MUI core, which always needs a locale object merged into the theme.
- **The localization layer is i18next-free.** MUI's built-in label system is separate from app-level strings (form labels, page titles, notifications, etc.) — those remain the consuming app's responsibility.
- Consuming apps that don't use `localizeTheme` are unaffected by changes here.
