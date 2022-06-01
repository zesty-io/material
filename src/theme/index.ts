import palette from './palette';
import typography from './typography';
import { createTheme, Theme } from '@mui/material/styles';

let theme: Theme = createTheme({
  palette,
  typography,
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          fontSize: '14px',
          lineHeight: '20px',
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
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ ownerState, theme }: any) => ({
          backgroundColor: `${
            theme.palette[ownerState.color].contrastText
          } !important`,
          ...(ownerState.selected && {
            color: `${theme.palette[ownerState.color].contrastText} !important`,
            backgroundColor: `${
              theme.palette[ownerState.color].main
            } !important`,
          }),
        }),
      },
    },
  },
});

export default theme;
