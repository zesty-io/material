import type { GridLocaleText } from "@mui/x-data-grid-pro";
import * as dataGridLocales from "@mui/x-data-grid-pro/locales";

import { hiIN } from "./datagrid-locales/hi-IN";

// Hand-authored bundles for locales MUI X Data Grid doesn't ship.
// Add an entry here whenever a new unsupported locale is needed.
const OVERRIDES: Record<string, Partial<GridLocaleText>> = {
  hiIN,
};

// Returns undefined (not enUS) for unmapped locales — MUI X treats undefined as
// "use built-in defaults", which are already English. An explicit enUS fallback
// would be redundant. This differs from MUI core, which always needs a locale
// object merged into the theme.
export const getDataGridLocaleText = (
  locale: string | undefined
): Partial<GridLocaleText> | undefined => {
  if (!locale) { return undefined; }
  if (OVERRIDES[locale]) { return OVERRIDES[locale]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry = dataGridLocales[locale as keyof typeof dataGridLocales] as any;
  return entry?.components?.MuiDataGrid?.defaultProps?.localeText;
};
