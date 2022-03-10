import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    secondary: {
      main: '#F50057',
    },
  },
  typography: {
    h2: {
      fontWeight: 'bold',
      fontSize: 40,
    },
    h4: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  },
});

export default defaultTheme;
