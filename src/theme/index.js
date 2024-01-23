import { createTheme } from '@mui/material/styles';
import palette from './palette';

const themeOptions = {
  palette: palette,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
  }
};

const theme = createTheme(themeOptions);

export default theme;