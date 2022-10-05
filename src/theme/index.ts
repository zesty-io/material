import palette from './palette';
import typography from './typography';
import { createTheme, Theme } from '@mui/material/styles';


declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteOptions
    typography: TypographyVariantsOptions
  }

  interface Theme {
    palette: PaletteOptions
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
          borderBottom: 2,
          borderColor: theme?.palette?.grey?.[100],
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
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0px 8px",
          borderRadius: '8px',
        },
        input: {
          padding: "10px 0px",
        },
        sizeSmall: {
          'input' : {
            padding: "8px 0px",
          },
        },
        notchedOutline: {
          // Important to override all pseudo classes
          borderColor: `${theme.palette.border} !important`,
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          ...theme.typography.body2,
          '::placeholder': {
            color: theme?.palette?.text?.disabled
          }
        }
      }
    },
    MuiInputAdornment : {
      styleOverrides: {
        root: {
          '& > .MuiSvgIcon-root': {
            margin: '4px',
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        sizeSmall: {
          padding: '4px',
        }
      }
    }
  },
});

export default theme;
