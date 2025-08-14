import React, { useContext } from 'react';
// eslint-disable-next-line no-restricted-imports
import { View, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';

import { ThemeContext } from './theme-context';
import {
  spacing,
  radii,
  fontSizes,
  fontWeights,
  type ColorToken,
  type SpacingToken,
  type RadiusToken,
  type FontSizeToken,
  type FontWeightToken,
} from './tokens';

type BaseLayoutProps = {
  children?: React.ReactNode;
  fill?: boolean;
  padding?: SpacingToken | number;
  paddingHorizontal?: SpacingToken | number;
  paddingVertical?: SpacingToken | number;
  background?: ColorToken;
  radius?: RadiusToken | number;
  borderColor?: ColorToken;
  borderWidth?: number;
};

const useColors = () => useContext(ThemeContext).colors;

const getSpacing = (value?: SpacingToken | number): number | undefined => {
  if (typeof value === 'number') return value;
  if (!value) return undefined;
  return spacing[value];
};

const getRadius = (value?: RadiusToken | number): number | undefined => {
  if (typeof value === 'number') return value;
  if (!value) return undefined;
  return radii[value];
};

const getColor = (colorTokens: Record<ColorToken, string>, value?: ColorToken): string | undefined => {
  if (!value) return undefined;
  return colorTokens[value];
};

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
}) => {
  const colors = useColors();
  const computedStyle: ViewStyle = {
    flex: fill === true ? 1 : undefined,
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

type StackProps = BaseLayoutProps & {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: SpacingToken | number;
};
export const Stack: React.FC<StackProps> = ({
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
    flexDirection: 'column',
    alignItems: align,
    justifyContent: justify,
    flex: fill === true ? 1 : undefined,
    padding: getSpacing(padding),
    paddingHorizontal: getSpacing(paddingHorizontal),
    paddingVertical: getSpacing(paddingVertical),
    backgroundColor: getColor(colors, background),
    borderRadius: getRadius(radius),
    borderColor: getColor(colors, borderColor),
    borderWidth,
  };
  const childArray = React.Children.toArray(children);
  const spacedChildren = childArray.map((child, index) => {
    const marginTop = index === 0 ? 0 : getSpacing(gap);
    if (!React.isValidElement(child)) return child;
    return (
      <View key={child.key ?? index} style={{ marginTop }}>
        {child}
      </View>
    );
  });
  return <View style={computedStyle}>{spacedChildren}</View>;
};

type RowProps = BaseLayoutProps & {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: SpacingToken | number;
};
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
    padding: getSpacing(padding),
    paddingHorizontal: getSpacing(paddingHorizontal),
    paddingVertical: getSpacing(paddingVertical),
    backgroundColor: getColor(colors, background),
    borderRadius: getRadius(radius),
    borderColor: getColor(colors, borderColor),
    borderWidth,
  };
  const childArray = React.Children.toArray(children);
  const spacedChildren = childArray.map((child, index) => {
    const marginLeft = index === 0 ? 0 : getSpacing(gap);
    if (!React.isValidElement(child)) return child;
    return (
      <View key={child.key ?? index} style={{ marginLeft }}>
        {child}
      </View>
    );
  });
  return <View style={computedStyle}>{spacedChildren}</View>;
};

type TextProps = {
  children?: React.ReactNode;
  size?: FontSizeToken | number;
  weight?: FontWeightToken | TextStyle['fontWeight'];
  color?: ColorToken;
  align?: TextStyle['textAlign'];
};

export const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'regular',
  color: colorToken = 'text',
  align,
}) => {
  const colors = useColors();
  const resolvedSize = typeof size === 'number' ? size : fontSizes[size];
  const resolvedWeight =
    typeof weight === 'string' && !/^[0-9]+$/.test(weight) ? fontWeights[weight as FontWeightToken] : weight;

  const computedStyle: TextStyle = {
    fontSize: resolvedSize,
    fontWeight: resolvedWeight as TextStyle['fontWeight'],
    color: getColor(colors, colorToken),
    textAlign: align,
  };

  return <RNText style={computedStyle}>{children}</RNText>;
};
