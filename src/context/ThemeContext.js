"use client";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lexend",
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}