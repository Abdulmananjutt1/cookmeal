import { useThemeContext } from '@/context/ThemeContext';

export function useTheme() {
  const { theme, colorScheme, isDark } = useThemeContext();

  return {
    theme,
    colorScheme,
    isDark,
  };
}

