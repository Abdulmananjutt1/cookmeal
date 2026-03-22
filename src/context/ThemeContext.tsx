import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: typeof Colors.light;
  colorScheme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType | 'system') => void;
  manualTheme: ThemeType | 'system';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme() as ThemeType;
  const [manualTheme, setManualTheme] = useState<ThemeType | 'system'>('system');

  const colorScheme = manualTheme === 'system' ? systemColorScheme : manualTheme;
  const isDark = colorScheme === 'dark';
  const theme = Colors[colorScheme] ?? Colors.light;

  const toggleTheme = () => {
    setManualTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: ThemeType | 'system') => {
    setManualTheme(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, isDark, toggleTheme, setTheme, manualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
