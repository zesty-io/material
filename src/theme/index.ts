import components from './components'
import palette from './palette';
import typography from './typography';
import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  components, 
  palette,
  typography,
});

export default theme;
