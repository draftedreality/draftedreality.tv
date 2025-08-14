import type React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import type { RowProps } from './types';
import { useColors, getSpacing, getRadius, getColor } from './utils';

export const Row: React.FC<RowProps> = ({
  children,
  fill,
  padding,
  paddingHorizontal,
  paddingVertical,
  background,
  radius,
  borderColor,
  borderWidth,
  align,
  justify,
  gap,
}) => {
  const colors = useColors();
  const computedStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: align,
    justifyContent: justify,
    flex: fill === true ? 1 : undefined,
    gap: getSpacing(gap),
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
