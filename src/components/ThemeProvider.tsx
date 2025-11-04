import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    if (savedMode) {
      setMode(savedMode);
      document.documentElement.classList.toggle('dark', savedMode === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('theme-mode', newMode);
    document.documentElement.classList.toggle('dark', newMode === 'dark');
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: 'hsl(262, 83%, 58%)',
      },
      secondary: {
        main: 'hsl(270, 95%, 96%)',
      },
      success: {
        main: 'hsl(142, 76%, 36%)',
      },
      info: {
        main: 'hsl(172, 66%, 50%)',
      },
      background: {
        default: mode === 'light' ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 3.9%)',
        paper: mode === 'light' ? 'hsl(0, 0%, 100%)' : 'hsl(240, 10%, 8%)',
      },
      text: {
        primary: mode === 'light' ? 'hsl(240, 10%, 3.9%)' : 'hsl(0, 0%, 98%)',
        secondary: mode === 'light' ? 'hsl(240, 4%, 46%)' : 'hsl(240, 5%, 65%)',
      },
    },
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      h3: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 400,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '12px',
            padding: '10px 24px',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
