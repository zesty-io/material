import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import * as muiCoreLocales from "@mui/material/locale";
import { enUS } from "@mui/material/locale";

import { getDataGridLocaleText } from "./datagrid";
import { getDatePickersLocaleText } from "./datepickers";

// All valid MUI locale strings — keyof typeof muiCoreLocales covers every
// locale MUI core ships.
export type MuiLocaleString = keyof typeof muiCoreLocales;

/**
 * Apply MUI locale bundles onto a base theme for the given MUI locale string
 * (e.g. "esES"). Covers MUI core, Data Grid, and Date Pickers.
 *
 * Every locale is resolved dynamically against MUI's own bundles — no
 * hand-authored overrides. Locales unsupported by a given package fall back
 * to that package's built-in English defaults.
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
