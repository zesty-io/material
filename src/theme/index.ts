import palette from './palette';
import typography from './typography';
import { createTheme, Theme } from '@mui/material/styles';

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
          borderBottom: 2,
          borderColor: theme.palette.grey[100],
          borderStyle: "solid",
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
      styleOverrides: { textTransform: 'none' },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
