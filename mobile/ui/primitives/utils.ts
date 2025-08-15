import { useContext } from 'react';

import { ThemeContext } from '../theme-context';
import { spacing, radii } from '../tokens';
import type { ColorToken, SpacingToken, RadiusToken } from '../tokens';

export const useColors = () => useContext(ThemeContext).colors;

export const getSpacing = (value?: SpacingToken): number | undefined => {
  if (!value) return undefined;
  return spacing[value];
};

export const getRadius = (value?: RadiusToken): number | undefined => {
  if (!value) return undefined;
  return radii[value];
};

export const getColor = (
  colorTokens: Record<ColorToken, string>,
  value?: ColorToken
): string | undefined => {
  if (!value) return undefined;
  return colorTokens[value];
};
