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
          padding: "8px",
          margin: "8px",
          borderRadius: "8px",
          minHeight: "unset",
          minWidth: "unset",
          textTransform: "none",
          "&:hover": {
            backgroundColor: theme.palette.grey[100],
          },
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: theme.palette.deepOrange[50],
            },
          },
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
          backgroundColor: theme.palette.common.white,
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border,
          },
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
          borderColor: theme.palette.border,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          margin: "4px 0px 0px 0px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          ...theme.typography.body2,
          "::placeholder": {
            color: theme.palette.text.disabled,
            opacity: 1,
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
          fontWeight: 600,
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
        root: {
          "*::-webkit-scrollbar-track-piece": {
            backgroundColor: `${theme.palette.grey[100]} !important`,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: `${theme.palette.grey[300]} !important`,
          },
        },
        paper: {
          borderRadius: "8px",
        },
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
        standardInfo: {
          backgroundColor: alpha(theme.palette.blue[500], 0.1),
          " .MuiAlert-icon": {
            color: theme.palette.info.main,
          },
        },
        standardError: {
          backgroundColor: alpha(theme.palette.error.main, 0.1),
          " .MuiAlert-icon": {
            color: theme.palette.error.main,
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
          padding: "0 16px",
          "&:focus": {
            outline: "none",
          },
        },
        columnHeaders: {
          borderColor: theme.palette.border,
          backgroundColor: theme.palette.grey[50],
        },
        columnHeader: {
          padding: "0 16px",
          "&:focus": {
            outline: "none",
          },
        },
        columnHeaderTitle: {
          fontWeight: 600,
        },
        columnSeparator: {
          visibility: "hidden",
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
    MuiLink: {
      styleOverrides: {
        root: {
          color: theme.palette.info.dark,
          textDecorationColor: theme.palette.info.main,
          "&:hover": {
            textDecorationColor: theme.palette.info.dark,
          },
        },
      },
      defaultProps: {
        underline: "hover",
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          maxWidth: "240px",
        },
        tooltip: {
          ...theme.typography.body3,
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
    MuiPopper: {
      styleOverrides: {
        root: {
          "*::-webkit-scrollbar-track-piece": {
            backgroundColor: `${theme.palette.grey[100]} !important`,
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: `${theme.palette.grey[300]} !important`,
          },
        },
      },
    },
  },
});

export default theme;
