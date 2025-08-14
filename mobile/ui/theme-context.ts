import { createContext } from 'react';

import { getThemeTokens, type Tokens } from './tokens';

export const defaultTheme: Tokens = getThemeTokens('dark');

export const ThemeContext = createContext<Tokens>(defaultTheme);
