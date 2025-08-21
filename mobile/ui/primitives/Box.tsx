import type React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import type { BaseLayoutProps } from './types';
import { useColors, getSpacing, getRadius, getColor } from './utils';

export const Box: React.FC<BaseLayoutProps> = ({
  children,
  fill = false,
  padding,
  paddingHorizontal,
  paddingVertical,
  background,
  radius,
  borderColor,
  borderWidth,
}) => {
  const colors = useColors();
  const computedStyle: ViewStyle = {
    flex: fill ? 1 : undefined,
    padding: getSpacing(padding),
    paddingHorizontal: getSpacing(paddingHorizontal),
    paddingVertical: getSpacing(paddingVertical),
    backgroundColor: getColor(colors, background),
    borderRadius: getRadius(radius),
    borderColor: getColor(colors, borderColor),
    borderWidth,
  };
  return <View style={computedStyle}>{children}</View>;
};
