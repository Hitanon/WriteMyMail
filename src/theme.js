import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D918CF',
    },
    secondary: {
      main: '#00A3FF',
    },
  },
  typography: {
    fontFamily: 'Involve, Arial, sans-serif',
    h1: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Involve, Arial, sans-serif',
      fontWeight: 400,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          padding: 0,
          fontFamily: 'Involve, Arial, sans-serif',
        },
      },
    },
  },
});

export default theme;
