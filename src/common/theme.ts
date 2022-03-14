import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: '#F50057',
    },
  },
  typography: {
    h2: {
      fontSize: 40,
    },
    h4: {
      fontSize: 16,
    },
  },
  zIndex: {
    appBar: 2,
  },
});

export default defaultTheme;
