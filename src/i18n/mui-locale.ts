import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import * as muiCoreLocales from "@mui/material/locale";
import { enUS } from "@mui/material/locale";

import { getDataGridLocaleText } from "./datagrid";
import { getDatePickersLocaleText } from "./datepickers";

// All valid MUI locale strings. keyof typeof muiCoreLocales covers every locale
// MUI core ships automatically. Hand-authored locales for MUI X (e.g. "hiIN")
// are added here manually — one entry per bundle added to OVERRIDES in
// datagrid.ts / datepickers.ts.
export type MuiLocaleString = keyof typeof muiCoreLocales | "hiIN";

/**
 * Apply MUI locale bundles onto a base theme for the given MUI locale string
 * (e.g. "esES", "hiIN"). Covers MUI core, Data Grid, and Date Pickers.
 *
 * MUI core locales are resolved dynamically — any locale MUI ships is
 * automatically supported with no changes needed here. Data Grid and Date
 * Pickers locales are also resolved dynamically, with hand-authored bundles
 * for locales MUI X doesn't ship (e.g. hiIN).
 *
 * The consuming app is responsible for converting its active language tag
 * (e.g. "es-ES") to the MUI locale string (e.g. "esES") before calling this.
 * Unmapped or undefined locales fall back to English.
 */
export const localizeTheme = (
  baseTheme: Theme,
  locale: string | undefined
): Theme =>
  createTheme(
    baseTheme,
    (locale ? muiCoreLocales[locale as keyof typeof muiCoreLocales] : undefined) ?? enUS,
    {
      components: {
        MuiDataGrid: {
          defaultProps: { localeText: getDataGridLocaleText(locale) },
        },
      },
    },
    {
      components: {
        MuiLocalizationProvider: {
          defaultProps: { localeText: getDatePickersLocaleText(locale) },
        },
      },
    }
  );
