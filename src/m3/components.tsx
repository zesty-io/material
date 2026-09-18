import { alpha } from "@mui/material/styles";
import type { Components, Theme } from "@mui/material/styles";
import type { M3Scheme } from "./tokens";
import { m3Shape, m3State } from "./shape";
import { m3TypeScale } from "./typography";

/**
 * M3 component overrides.
 *
 * These are built from the resolved colour scheme rather than read off
 * `theme.palette`, so the full M3 role set is available without pretending
 * every MUI theme carries it.
 */
export const buildM3Components = (s: M3Scheme): Components<Theme> => {
  /** M3 expresses hover/focus/pressed as a low-alpha layer of the "on" colour. */
  const layer = (on: string, opacity: number) => alpha(on, opacity);

  const disabledContainer = alpha(s.onSurface, m3State.disabledContainer);
  const disabledContent = alpha(s.onSurface, m3State.disabledContent);

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: s.background,
          color: s.onSurface,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: s.surfaceContainerLow,
          color: s.onSurface,
          borderRadius: m3Shape.medium,
        },
        outlined: {
          borderColor: s.outlineVariant,
          backgroundColor: s.surface,
        },
      },
    },

    // AppBar is a Paper, so without this it inherits the 12px Paper radius —
    // a top app bar is full-bleed and square-edged. M3's small top app bar sits
    // on `surface` at elevation 0, with onSurface text.
    //
    // `color: "default"` is set as the default prop because M3's top app bar is
    // surface-coloured, not primary. Passing color="primary" still works.
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "default" },
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: "none",
        },
        colorDefault: {
          backgroundColor: s.surface,
          color: s.onSurface,
        },
      },
    },

    // ---- Buttons -----------------------------------------------------------
    // M3 buttons are pill-shaped and come in five styles. MUI ships three of
    // them (contained/outlined/text); `tonal` and `elevated` are added here and
    // registered on ButtonPropsVariantOverrides in ./index.tsx.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          ...m3TypeScale.labelLarge,
          textTransform: "none",
          borderRadius: m3Shape.full,
          minHeight: 40,
          paddingInline: 24,
          "&.Mui-disabled": {
            color: disabledContent,
          },
        },
        sizeSmall: { minHeight: 32, paddingInline: 16 },
        sizeLarge: { minHeight: 48, paddingInline: 32 },
        contained: {
          backgroundColor: s.primary,
          color: s.onPrimary,
          "&:hover": { backgroundColor: s.primary, boxShadow: "none" },
          "&:hover::after": { opacity: m3State.hover },
          "&.Mui-disabled": {
            backgroundColor: disabledContainer,
            color: disabledContent,
          },
        },
        outlined: {
          borderColor: s.outline,
          color: s.primary,
          "&:hover": {
            borderColor: s.outline,
            backgroundColor: layer(s.primary, m3State.hover),
          },
          "&.Mui-disabled": { borderColor: disabledContainer },
        },
        text: {
          color: s.primary,
          paddingInline: 12,
          "&:hover": { backgroundColor: layer(s.primary, m3State.hover) },
        },
      },
      variants: [
        {
          props: { variant: "tonal" },
          style: {
            backgroundColor: s.secondaryContainer,
            color: s.onSecondaryContainer,
            "&:hover": {
              backgroundColor: s.secondaryContainer,
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              backgroundColor: disabledContainer,
              color: disabledContent,
            },
          },
        },
        {
          props: { variant: "elevated" },
          style: {
            backgroundColor: s.surfaceContainerLow,
            color: s.primary,
            boxShadow:
              "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 1px 3px 1px rgba(0,0,0,0.15)",
            "&:hover": {
              backgroundColor: s.surfaceContainer,
              boxShadow:
                "0px 1px 2px 0px rgba(0,0,0,0.30), 0px 2px 6px 2px rgba(0,0,0,0.15)",
            },
            "&.Mui-disabled": {
              boxShadow: "none",
              backgroundColor: disabledContainer,
              color: disabledContent,
            },
          },
        },
      ],
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.full,
          color: s.onSurfaceVariant,
          "&:hover": { backgroundColor: layer(s.onSurfaceVariant, m3State.hover) },
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.large,
          backgroundColor: s.primaryContainer,
          color: s.onPrimaryContainer,
          boxShadow:
            "0px 1px 3px 0px rgba(0,0,0,0.30), 0px 4px 8px 3px rgba(0,0,0,0.15)",
          "&:hover": { backgroundColor: s.primaryContainer },
        },
        extended: { borderRadius: m3Shape.large, paddingInline: 20 },
      },
    },

    // ---- Selection ---------------------------------------------------------
    MuiChip: {
      styleOverrides: {
        root: {
          ...m3TypeScale.labelLarge,
          borderRadius: m3Shape.small,
          height: 32,
          backgroundColor: "transparent",
          border: `1px solid ${s.outline}`,
          color: s.onSurfaceVariant,
        },
        filled: {
          border: "none",
          backgroundColor: s.secondaryContainer,
          color: s.onSecondaryContainer,
        },
        outlined: { borderColor: s.outline },
        deleteIcon: { color: s.onSurfaceVariant },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: s.onSurfaceVariant,
          borderRadius: m3Shape.full,
          "&.Mui-checked": { color: s.primary },
          "&:hover": { backgroundColor: layer(s.primary, m3State.hover) },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: s.onSurfaceVariant,
          "&.Mui-checked": { color: s.primary },
          "&:hover": { backgroundColor: layer(s.primary, m3State.hover) },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        root: { padding: 8 },
        track: { borderRadius: m3Shape.full, backgroundColor: s.surfaceVariant },
        thumb: { backgroundColor: s.outline },
        switchBase: {
          "&.Mui-checked": {
            color: s.onPrimary,
            "& + .MuiSwitch-track": {
              backgroundColor: s.primary,
              opacity: 1,
            },
          },
        },
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: {
          ...m3TypeScale.labelLarge,
          textTransform: "none",
          borderColor: s.outline,
          color: s.onSurface,
          "&.Mui-selected": {
            backgroundColor: s.secondaryContainer,
            color: s.onSecondaryContainer,
            "&:hover": { backgroundColor: s.secondaryContainer },
          },
        },
      },
    },

    MuiToggleButtonGroup: {
      styleOverrides: {
        root: { borderRadius: m3Shape.full },
        grouped: {
          "&:first-of-type": {
            borderTopLeftRadius: m3Shape.full,
            borderBottomLeftRadius: m3Shape.full,
          },
          "&:last-of-type": {
            borderTopRightRadius: m3Shape.full,
            borderBottomRightRadius: m3Shape.full,
          },
        },
      },
    },

    // ---- Text fields -------------------------------------------------------
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.extraSmall,
          backgroundColor: "transparent",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: s.outline },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: s.onSurface },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: s.primary,
            borderWidth: 2,
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: s.error },
        },
        input: { ...m3TypeScale.bodyLarge, color: s.onSurface },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...m3TypeScale.bodyLarge,
          color: s.onSurfaceVariant,
          "&.Mui-focused": { color: s.primary },
          "&.Mui-error": { color: s.error },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...m3TypeScale.bodySmall,
          color: s.onSurfaceVariant,
          marginInline: 16,
          "&.Mui-error": { color: s.error },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: { ...m3TypeScale.bodyLarge, color: s.onSurfaceVariant },
      },
    },

    MuiInputAdornment: {
      styleOverrides: { root: { color: s.onSurfaceVariant } },
    },

    // ---- Containment -------------------------------------------------------
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.medium,
          backgroundColor: s.surfaceContainerLow,
          color: s.onSurface,
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        title: m3TypeScale.titleLarge,
        subheader: { ...m3TypeScale.bodyMedium, color: s.onSurfaceVariant },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: { ...m3TypeScale.bodyMedium, color: s.onSurfaceVariant },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: s.surfaceContainerLow,
          borderRadius: m3Shape.medium,
          "&::before": { display: "none" },
          "&.Mui-expanded": { margin: "8px 0" },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: m3Shape.extraLarge,
          backgroundColor: s.surfaceContainerHigh,
          backgroundImage: "none",
          padding: 8,
        },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: { ...m3TypeScale.headlineSmall, color: s.onSurface },
      },
    },

    MuiDialogContentText: {
      styleOverrides: {
        root: { ...m3TypeScale.bodyMedium, color: s.onSurfaceVariant },
      },
    },

    MuiDialogActions: {
      styleOverrides: { root: { padding: 16, gap: 8 } },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: m3Shape.extraSmall,
          backgroundColor: s.surfaceContainer,
          backgroundImage: "none",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...m3TypeScale.labelLarge,
          minHeight: 48,
          color: s.onSurface,
          "&:hover": { backgroundColor: layer(s.onSurface, m3State.hover) },
          "&.Mui-selected": {
            backgroundColor: s.secondaryContainer,
            color: s.onSecondaryContainer,
          },
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: m3Shape.full,
          minHeight: 56,
          "&:hover": { backgroundColor: layer(s.onSurface, m3State.hover) },
          "&.Mui-selected": {
            backgroundColor: s.secondaryContainer,
            color: s.onSecondaryContainer,
            "&:hover": { backgroundColor: s.secondaryContainer },
          },
        },
      },
    },

    MuiListItemText: {
      styleOverrides: {
        primary: m3TypeScale.bodyLarge,
        secondary: { ...m3TypeScale.bodyMedium, color: s.onSurfaceVariant },
      },
    },

    MuiDivider: {
      styleOverrides: { root: { borderColor: s.outlineVariant } },
    },

    // ---- Communication -----------------------------------------------------
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...m3TypeScale.bodySmall,
          borderRadius: m3Shape.extraSmall,
          backgroundColor: s.inverseSurface,
          color: s.inverseOnSurface,
        },
        arrow: { color: s.inverseSurface },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: { ...m3TypeScale.bodyMedium, borderRadius: m3Shape.medium },
        standardError: { backgroundColor: s.errorContainer, color: s.onErrorContainer },
        standardInfo: { backgroundColor: s.infoContainer, color: s.onInfoContainer },
        standardSuccess: { backgroundColor: s.successContainer, color: s.onSuccessContainer },
        standardWarning: { backgroundColor: s.warningContainer, color: s.onWarningContainer },
      },
    },

    MuiBackdrop: {
      styleOverrides: { root: { backgroundColor: alpha(s.scrim, 0.32) } },
    },

    // ---- Navigation --------------------------------------------------------
    MuiTabs: {
      styleOverrides: {
        root: { borderBottom: `1px solid ${s.outlineVariant}` },
        indicator: {
          height: 3,
          borderRadius: "3px 3px 0 0",
          backgroundColor: s.primary,
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          ...m3TypeScale.titleSmall,
          textTransform: "none",
          minHeight: 48,
          color: s.onSurfaceVariant,
          "&.Mui-selected": { color: s.primary },
        },
      },
    },

    MuiBreadcrumbs: {
      styleOverrides: {
        root: { ...m3TypeScale.bodyMedium, color: s.onSurfaceVariant },
        separator: { color: s.outline },
      },
    },

    MuiLink: {
      styleOverrides: { root: { color: s.primary, textDecorationColor: "inherit" } },
    },

    // ---- Progress ----------------------------------------------------------
    // M3's linear indicator is a 4dp fully-rounded bar on a secondaryContainer
    // track, with a "stop indicator" dot at the end of determinate progress.
    //
    // Two parts of the spec are NOT reproduced here because they need DOM that
    // MUI does not render: the 4dp gap between the active indicator and the
    // track, and the track arc on the determinate circular indicator. Both
    // would require a custom component rather than styleOverrides.
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 4,
          borderRadius: m3Shape.full,
          backgroundColor: s.secondaryContainer,
        },
        // The stop indicator applies to determinate progress only.
        determinate: {
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: s.primary,
          },
        },
        bar: {
          borderRadius: m3Shape.full,
          backgroundColor: s.primary,
        },
      },
    },

    MuiCircularProgress: {
      // M3 specifies a 4dp stroke. Size is left at MUI's 40px rather than M3's
      // 48dp default: forcing it would resize every existing call site,
      // including the spinner inside Backdrop.
      defaultProps: { thickness: 4 },
      styleOverrides: {
        root: { color: s.primary },
        circle: { strokeLinecap: "round" },
      },
    },

    // M3 snackbar: inverseSurface container, inverseOnSurface label,
    // inversePrimary action, 4dp corners.
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          ...m3TypeScale.bodyMedium,
          borderRadius: m3Shape.extraSmall,
          backgroundColor: s.inverseSurface,
          color: s.inverseOnSurface,
        },
        action: {
          ...m3TypeScale.labelLarge,
          color: s.inversePrimary,
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: { color: s.primary, height: 4 },
        rail: { backgroundColor: s.surfaceVariant, opacity: 1 },
        thumb: {
          width: 20,
          height: 20,
          "&:hover, &.Mui-focusVisible": {
            boxShadow: `0 0 0 8px ${layer(s.primary, m3State.hover)}`,
          },
        },
      },
    },
  };
};
