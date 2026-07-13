# Adding a New Language

This guide covers MUI built-in component label support for a language — things like DataGrid column menus, DatePicker buttons, and Autocomplete labels. These are separate from any i18next/app-level strings and are resolved through MUI's own locale bundle system.

`localizeTheme(theme, muiLocaleString)` is the single entry point. It accepts a MUI locale string (e.g. `"frFR"`) and resolves the correct bundles for MUI core, Data Grid, and Date Pickers dynamically against MUI's own packages — no hand-authored overrides are maintained in this repo. If a package doesn't ship a given locale, that package silently falls back to its built-in English defaults.

---

## Steps

### 1. Check MUI core

Try importing the locale from `@mui/material/locale`:

```ts
import { frFR } from "@mui/material/locale";
```

If it resolves, MUI core is handled automatically — no changes needed in this repo.

### 2. Check MUI X Data Grid

Try importing the locale from `@mui/x-data-grid-pro/locales`:

```ts
import { frFR } from "@mui/x-data-grid-pro/locales";
```

If it resolves, the dynamic resolver in `src/i18n/datagrid.ts` picks it up automatically — no changes needed. If it doesn't resolve, that locale isn't supported for Data Grid; it falls back to English until MUI ships it.

### 3. Check MUI X Date Pickers

Same pattern — try importing from `@mui/x-date-pickers-pro/locales`:

```ts
import { frFR } from "@mui/x-date-pickers-pro/locales";
```

If it resolves, no changes needed. If it doesn't resolve, that locale falls back to English until MUI ships it.

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
