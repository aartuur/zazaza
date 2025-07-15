// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  // Opzionale: palette personalizzata
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#fdd835' }
  }
});

export default theme;
