import type { PickersLocaleText } from "@mui/x-date-pickers-pro";
import * as datePickersLocales from "@mui/x-date-pickers-pro/locales";

import { hiIN } from "./datepickers-locales/hi-IN";

// Hand-authored bundles for locales MUI X Date Pickers doesn't ship.
// Add an entry here whenever a new unsupported locale is needed.
const OVERRIDES: Record<string, Partial<PickersLocaleText<any>>> = {
  hiIN,
};

// Returns undefined (not enUS) for unmapped locales — MUI X treats undefined as
// "use built-in defaults", which are already English. An explicit enUS fallback
// would be redundant. This differs from MUI core, which always needs a locale
// object merged into the theme.
export const getDatePickersLocaleText = (
  locale: string | undefined
): Partial<PickersLocaleText<any>> | undefined => {
  if (!locale) { return undefined; }
  if (OVERRIDES[locale]) { return OVERRIDES[locale]; }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const entry = datePickersLocales[locale as keyof typeof datePickersLocales] as any;
  return entry?.components?.MuiLocalizationProvider?.defaultProps?.localeText;
};
