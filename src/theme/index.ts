import palette from './palette';
import typography from './typography';
import { alpha, createTheme, Theme, } from '@mui/material/styles';
import { Color } from '@mui/material';


declare module '@mui/material/styles' {

  interface Palette {
    border: string;
  }

  interface Theme {
    typography: TypographyVariantsOptions
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
      styleOverrides: { root: { textTransform: 'none' } },
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
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...theme.typography.h5,
          fontWeight: 600,
        }
      }
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
        }
      }
    },
    MuiTreeItem: {
      styleOverrides: {
          content: {
              paddingTop: '6px',
              paddingBottom: '6px',
              paddingLeft: 0,
              paddingRight: '12px',
              borderRadius: 4,
              width: "unset",

              '&.Mui-selected': {
                  background: alpha(theme?.palette?.primary?.main, 0.04),
                  ' .MuiTreeItem-label .MuiSvgIcon-root': {
                      color: theme?.palette?.primary?.main,
                  },
                  ' .MuiTypography-root': {
                      color: theme?.palette?.primary?.dark,
                  }
              }
          },
          label: {
              paddingLeft: '0',
          },
          iconContainer: {
              marginRight: '0',
              width: '24px',
              'svg': {
                  fontSize: '24px',
              }
          }
      }
    }
  },
});

export default theme;
