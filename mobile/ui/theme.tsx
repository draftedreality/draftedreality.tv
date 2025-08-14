import type React from 'react';
import { useColorScheme } from 'react-native';

import { ThemeContext, defaultTheme } from './theme-context';
import { getThemeTokens } from './tokens';

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const scheme = useColorScheme();
  const theme = scheme ? getThemeTokens(scheme) : defaultTheme;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
