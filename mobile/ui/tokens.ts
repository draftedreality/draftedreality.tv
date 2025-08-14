export type ColorToken =
  | 'bg'
  | 'surface'
  | 'text'
  | 'muted'
  | 'primary'
  | 'primaryText'
  | 'border';

export type ColorScheme = 'light' | 'dark';

export const lightColors: Record<ColorToken, string> = {
  bg: '#ffffff',
  surface: '#f4f4f5',
  text: '#111113',
  muted: '#71717a',
  primary: '#6e56cf',
  primaryText: '#ffffff',
  border: '#e5e7eb',
};

export const darkColors: Record<ColorToken, string> = {
  bg: '#0b0b0d',
  surface: '#151518',
  text: '#f4f4f5',
  muted: '#a1a1aa',
  primary: '#6e56cf',
  primaryText: '#ffffff',
  border: '#2a2a2e',
};

export type SpacingToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const spacing: Record<SpacingToken, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export type RadiusToken = 'sm' | 'md' | 'lg' | 'pill' | 'full';

export const radii: Record<RadiusToken, number> = {
  sm: 6,
  md: 10,
  lg: 14,
  pill: 999,
  full: 9999,
};

export type FontSizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'display';

export const fontSizes: Record<FontSizeToken, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  display: 32,
};

export type FontWeightToken = 'regular' | 'medium' | 'bold';

export const fontWeights: Record<FontWeightToken, '400' | '600' | '700'> = {
  regular: '400',
  medium: '600',
  bold: '700',
};

export type Tokens = {
  colors: Record<ColorToken, string>;
  spacing: Record<SpacingToken, number>;
  radii: Record<RadiusToken, number>;
  fontSizes: Record<FontSizeToken, number>;
  fontWeights: Record<FontWeightToken, string | number>;
};

export const getThemeTokens = (scheme: ColorScheme): Tokens => {
  return {
    colors: scheme === 'dark' ? darkColors : lightColors,
    spacing,
    radii,
    fontSizes,
    fontWeights,
  };
};
