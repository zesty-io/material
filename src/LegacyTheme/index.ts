// No checking legacy theme to not have conflicting module augmentation
// @ts-nocheck
import palette from "./palette";
import typography from "./typography";
import { createTheme } from "@mui/material/styles";
let theme = createTheme({
  palette,
  typography,
});

theme = createTheme(theme, {
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "#e4e9f1",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          boxShadow: "none",
          textTransform: "none",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          fontSize: "14px",
          lineHeight: "20px",
        },
        arrow: {
          color: theme.palette.primary.main,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.contrastText,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.dark,
        },
        asterisk: {
          color: theme.palette.error.main,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: "visible",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#e4e9f1",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          boxSizing: "content-box",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track-piece, & *::-webkit-scrollbar-track-piece":
            {
              backgroundColor: "#f2f4f7",
              borderRadius: "4px",
            },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#d0d5dd",
            borderRadius: "4px",
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
            borderColor: "#E4E7EC",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E4E7EC",
          },
          "&.Mui-focused:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main,
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
          borderColor: "#E4E7EC",
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
  },
});

export default theme;
