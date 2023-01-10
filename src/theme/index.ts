import palette from "./palette";
import typography from "./typography";
import { alpha, createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    border: string;
  }
  interface Theme {
    typography: TypographyVariantsOptions;
  }
}

let theme: Theme = createTheme({
  palette,
  typography,
});

theme = createTheme(theme, {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: '14px',
          minHeight: 'unset',
          textTransform: 'none',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 16px 0px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "8px 16px 16px",
          ":last-child": {
            paddingBottom: "16px",
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { size: "xsmall" },
          style: {
            padding: "2px 10px",
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          fontSize: "14px",
        },
        outlinedInherit: {
          color: theme.palette.text.secondary,
          borderColor: theme.palette.border,
        },
        containedInherit: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey[100],
        },
        textInherit: {
          color: theme.palette.text.secondary,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        groupedContained: {
          color: theme.palette.primary.main,
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.hoverOpacity
          ),
          "&:hover": {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity
            ),
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0px 8px",
          borderRadius: "8px",
        },
        input: {
          padding: "10px 0px",
          ":read-only": {
            color: theme.palette.text.secondary,
          },
        },
        sizeSmall: {
          input: {
            padding: "8px 0px",
          },
        },
        notchedOutline: {
          // Important to override all pseudo classes
          borderColor: `${theme.palette.border} !important`,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          ...theme.typography.body2,
          "::placeholder": {
            color: theme.palette.text.disabled,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          color: theme.palette.text.primary,
          marginBottom: "4px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          "& > .MuiSvgIcon-root": {
            margin: "4px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: "4px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paperWidthXs: {
          width: "480px",
          maxWidth: "480px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...theme.typography.h5,
          fontWeight: 600,
          padding: "20px",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "20px",
          paddingTop: 0,
        },
        dividers: {
          borderColor: theme.palette.border,
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "20px",
          paddingTop: 0,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.5),
        },
        invisible: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        list: {
          minWidth: "240px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          "&:before": {
            backgroundColor: theme.palette.border,
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        rail: {
          backgroundColor: theme.palette.grey[400],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "4px",
        },
        colorDefault: {
          backgroundColor: theme.palette.grey[100],
          ":hover": {
            backgroundColor: theme.palette.grey[200],
          },
          ":focus": {
            backgroundColor: theme.palette.grey[300],
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        icon: {
          alignSelf: "center",
        },
        standardWarning: {
          " .MuiAlert-icon": {
            color: theme.palette.common.black,
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.border,
          borderRadius: "8px",
        },
        cell: {
          borderColor: theme.palette.border,
        },
        columnHeaders: {
          borderColor: theme.palette.border,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiSpeedDial: {
      styleOverrides: {
        actions: {
          paddingTop: "38px !important",
        },
      },
    },
    MuiSpeedDialAction: {
      styleOverrides: {
        fab: {
          marginTop: "6px",
          marginBottom: "6px",
        },
        staticTooltipLabel: {
          ...theme.typography.body2,
          fontWeight: 500,
          color: theme.palette.common.white,
          backgroundColor: "transparent",
          whiteSpace: "nowrap",
          boxShadow: "none",
          paddingRight: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        divider: {
          borderColor: theme.palette.border,
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        content: {
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: 0,
          paddingRight: "12px",
          borderRadius: 4,
          width: "unset",
          "&.Mui-selected": {
            background: alpha(theme.palette.primary.main, 0.04),
            " .MuiTreeItem-label .MuiSvgIcon-root": {
              color: theme.palette.primary.main,
            },
            " .MuiTypography-root": {
              color: theme.palette.primary.dark,
            },
          },
        },
        label: {
          paddingLeft: "0",
        },
        iconContainer: {
          marginRight: "0",
          width: "24px",
          svg: {
            fontSize: "24px",
          },
        },
      },
    },
  },
});

export default theme;
