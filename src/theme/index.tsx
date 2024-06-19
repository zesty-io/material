import { lightThemePalette, darkThemePalette } from "./palette";
import typography from "./typography";
import { alpha, Components, createTheme, Theme } from "@mui/material/styles";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

declare module "@mui/material/styles" {
  interface Palette {
    border: string;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsSizeOverrides {
    xsmall: true;
    xxsmall: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsSizeOverrides {
    xsmall: true;
  }
}

const components: Components = {
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        minHeight: "44px",
      },
      flexContainer: {
        gap: "16px",
        height: "44px",
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.disabled,
        paddingLeft: 0,
        paddingRight: 0,
        minHeight: "unset",
        minWidth: "unset",
        textTransform: "none",
        "&:hover": {
          color: theme.palette.text.primary,
        },
        "&.Mui-selected": {
          color: theme.palette.text.primary,
        },
        "& .MuiTab-iconWrapper": {
          marginRight: "4px",
        },
      }),
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
      outlinedInherit: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.secondary,
        borderColor: theme.palette.border,
      }),
      containedInherit: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.secondary,
        backgroundColor: theme.palette.grey[100],
      }),
      textInherit: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.secondary,
      }),
      containedWarning: ({ theme }: { theme: any }) => ({
        color: theme.palette.common.white,
      }),
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
      groupedContainedPrimary: ({ theme }: { theme: any }) => ({
        color: theme.palette.primary.main,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.hoverOpacity,
        ),
        "&:hover": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        padding: "0px 8px",
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.border,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.border,
        },
        "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.main,
        },
        "&.MuiInputBase-adornedStart .MuiInputAdornment-root": {
          color: theme.palette.action.active,
        },
      }),
      input: ({ theme }: { theme: any }) => ({
        padding: "10px 0px",
        ":read-only": {
          color: theme.palette.text.secondary,
        },
        "::placeholder": {
          color: theme.palette.text.disabled,
        },
      }),
      sizeSmall: {
        input: {
          padding: "8px 0px",
        },
      },
      notchedOutline: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
        margin: "4px 0px 0px 0px",
      }),
    },
  },
  MuiInputBase: {
    styleOverrides: {
      input: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
        "::placeholder": {
          color: theme.palette.text.disabled,
          opacity: 1,
        },
      }),
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
        color: theme.palette.text.primary,
        marginBottom: "4px",
        fontWeight: 600,
      }),
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        "& > .MuiSvgIcon-root": {
          margin: "4px",
        },
        "&.MuiInputAdornment-positionStart": {
          marginRight: "4px",
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
      },
      sizeSmall: {
        padding: "6px",
      },
    },
    variants: [
      {
        props: { size: "xsmall" },
        style: {
          width: "24px",
          height: "24px",
          padding: "3px",
        },
      },
      {
        props: { size: "xxsmall" },
        style: {
          width: "20px",
          height: "20px",
          padding: "2px",
        },
      },
    ],
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: "4px",
      },
      paperWidthXs: {
        width: "480px",
        maxWidth: "480px",
      },
    },
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        ...theme.typography.h5,
        fontWeight: 700,
        padding: "20px",
      }),
    },
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: "20px",
        paddingTop: 0,
      },
      dividers: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
      }),
    },
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
      }),
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
      root: ({ theme }: { theme: any }) => ({
        backgroundColor: alpha(theme.palette.grey[900], 0.5),
      }),
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
  MuiMenuItem: {
    styleOverrides: {
      root: {
        // Overrides the media query of the MenuItem that sets minHeight
        minHeight: "36px !important",
        " .MuiListItemIcon-root": {
          minWidth: "32px",
        },
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        "&:before": {
          backgroundColor: theme.palette.border,
        },
      }),
    },
  },
  MuiSlider: {
    styleOverrides: {
      rail: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.grey[400],
      }),
    },
  },
  MuiChip: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: "4px",
      }),
      // @ts-ignore
      colorDefault: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.text.secondary,
        ":hover": {
          backgroundColor: theme.palette.grey[200],
        },
        ":focus": {
          backgroundColor: theme.palette.grey[300],
        },
      }),
      colorInfo: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.blue[100],
        color: theme.palette.blue[600],
      }),
      colorSuccess: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.green[50],
        color: theme.palette.green[600],
      }),
      colorWarning: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.yellow[100],
        color: theme.palette.yellow[600],
      }),
      colorError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.red[100],
        color: theme.palette.red[600],
      }),
      sizeSmall: ({ theme }: { theme: any }) => ({
        "& .MuiChip-label": {
          ...theme.typography.body3,
          fontWeight: 600,
        },
      }),
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        padding: "8px 12px",
        gap: "12px",
      },
      action: ({ theme }: { theme: any }) => ({
        color: theme.palette.common.white,
        alignItems: "center",
        padding: 0,
        paddingLeft: "16px",
        marginRight: 0,
      }),
      message: ({ theme }: { theme: any }) => ({
        alignSelf: "center",
        color: theme.palette.common.white,
      }),
      icon: ({ theme }: { theme: any }) => ({
        alignSelf: "center",
        marginRight: 0,
        color: theme.palette.common.white,
      }),
      filledSuccess: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.success.dark,
      }),
      filledInfo: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.info.main,
      }),
      filledWarning: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.warning.main,
      }),
      filledError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.error.dark,
      }),
      standardWarning: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.yellow[100],
        color: theme.palette.warning.dark,
        " .MuiAlert-icon": {
          color: theme.palette.warning.dark,
        },
        "& .MuiAlert-message": {
          color: theme.palette.warning.dark,
        },
      }),
      standardInfo: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.palette.blue[100],
        " .MuiAlert-icon": {
          color: theme.palette.info.dark,
        },
        "& .MuiAlert-message": {
          color: theme.palette.info.dark,
        },
      }),
      standardError: ({ theme }: { theme: any }) => ({
        backgroundColor: alpha(theme.palette.error.main, 0.1),
        " .MuiAlert-icon": {
          color: theme.palette.error.main,
        },
        "& .MuiAlert-message": {
          color: theme.palette.error.main,
        },
      }),
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
        borderRadius: "8px",
      }),
      cell: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
        padding: "0 16px",
        "&:focus": {
          outline: "none",
        },
      }),
      columnHeaders: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
        backgroundColor: theme.palette.grey[100],
      }),
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
      staticTooltipLabel: ({ theme }: { theme: any }) => ({
        ...theme.typography.body2,
        fontWeight: 500,
        color: theme.palette.common.white,
        backgroundColor: "transparent",
        whiteSpace: "nowrap",
        boxShadow: "none",
        paddingRight: 0,
      }),
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      divider: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
      }),
    },
  },
  MuiLink: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.info.dark,
        textDecorationColor: theme.palette.info.main,
        "&:hover": {
          textDecorationColor: theme.palette.info.dark,
        },
      }),
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
      tooltip: ({ theme }: { theme: any }) => ({
        ...theme.typography.body3,
        backgroundColor: alpha(theme.palette.grey[900], 0.9),
      }),
    },
  },
  MuiTreeItem: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.disabled,
        svg: {
          color: theme.palette.action.active,
        },
      }),
      content: ({ theme }: { theme: any }) => ({
        paddingTop: "6px",
        paddingBottom: "6px",
        paddingLeft: 0,
        paddingRight: "12px",
        borderRadius: 4,
        width: "unset",
        "&.Mui-focused:hover": {
          background: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
        "&.Mui-selected, &.Mui-selected:hover, &.Mui-selected.Mui-focused": {
          background: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
          " .MuiTreeItem-label .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
          },
          " .MuiTypography-root": {
            color: theme.palette.primary.main,
          },
        },
      }),
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
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track-piece, & *::-webkit-scrollbar-track-piece":
          ({ theme }: { theme: any }) => ({
            backgroundColor: theme.palette.grey[100],
            borderRadius: "4px",
          }),
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": ({
          theme,
        }: {
          theme: any;
        }) => ({
          backgroundColor: theme.palette.grey[300],
          borderRadius: "4px",
        }),
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
      }),
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        color: theme.palette.text.secondary,
        "&.Mui-selected": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
          color: theme.palette.primary.main,
          svg: {
            color: theme.palette.primary.main,
          },
        },
      }),
      divider: ({ theme }: { theme: any }) => ({
        borderColor: theme.palette.border,
      }),
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        '& button[aria-label="Show path"]': {
          backgroundColor: "transparent",
          margin: 0,
          color: theme.palette.action.active,
          svg: {
            width: "20px",
            height: "20px",
          },
          "&:hover": {
            color: theme.palette.primary.main,
          },
        },
      }),
      separator: ({ theme }: { theme: any }) => ({
        color: theme.palette.grey[400],
        height: "20px",
        alignItems: "center",
      }),
    },
  },
  MuiScopedCssBaseline: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-track-piece, & *::-webkit-scrollbar-track-piece":
          {
            backgroundColor: theme.palette.grey[800],
            borderRadius: "4px",
          },
        "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.grey[700],
          borderRadius: "4px",
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      sizeSmall: {
        fontSize: "16px",
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      dense: {
        marginTop: "4px",
        marginBottom: "4px",
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        "&.MuiPickersDay-today": {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
          border: "none",
        },
      }),
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: "text.disabled",
      },
    },
  },
  MuiAutocomplete: {
    defaultProps: {
      popupIcon: <KeyboardArrowDownRoundedIcon />,
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: KeyboardArrowDownRoundedIcon,
    },
  },
};

export let theme = createTheme({
  typography,
  palette: {
    mode: "light",
    ...lightThemePalette,
  },
  components,
});

export let darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
    ...darkThemePalette,
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.grey[800],
          },
        },
      },
    },
  },
});
