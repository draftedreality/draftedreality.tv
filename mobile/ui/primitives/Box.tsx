import type React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';

import type { BaseLayoutProps } from './types';
import { useColors, getSpacing, getRadius, getColor, getShadow } from './utils';

export const Box: React.FC<BaseLayoutProps> = ({
  children,
  fill,
  padding,
  paddingHorizontal,
  paddingVertical,
  background,
  radius,
  borderColor,
  borderWidth,
  shadow,
}) => {
  const colors = useColors();
  const shadowStyle = getShadow(shadow);
  const computedStyle: ViewStyle = {
    flex: fill === true ? 1 : undefined,
    padding: getSpacing(padding),
    paddingHorizontal: getSpacing(paddingHorizontal),
    paddingVertical: getSpacing(paddingVertical),
    backgroundColor: getColor(colors, background),
    borderRadius: getRadius(radius),
    borderColor: getColor(colors, borderColor),
    borderWidth,
    ...shadowStyle,
  };
  return <View style={computedStyle}>{children}</View>;
};
