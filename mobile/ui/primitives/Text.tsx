import type React from 'react';
import { Text as RNText } from 'react-native';
import type { TextStyle } from 'react-native';

import { fontSizes, fontWeights } from '../tokens';

import type { TextProps } from './types';
import { useColors, getColor } from './utils';

export const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'regular',
  color: colorToken = 'text',
  align,
}) => {
  const colors = useColors();
  const resolvedSize = fontSizes[size];
  const resolvedWeight = fontWeights[weight];

  const computedStyle: TextStyle = {
    fontSize: resolvedSize,
    fontWeight: resolvedWeight,
    color: getColor(colors, colorToken),
    textAlign: align,
  };

  return <RNText style={computedStyle}>{children}</RNText>;
};
