import palette from './palette';
import typography from './typography';
import { createTheme, Theme } from '@mui/material/styles';

let theme: Theme = createTheme({
  palette,
  typography,
});

theme = createTheme(theme, {
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
          }
      }
  }
})
export default theme;
