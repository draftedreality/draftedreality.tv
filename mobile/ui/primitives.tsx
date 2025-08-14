import React, { useContext } from 'react';
// eslint-disable-next-line no-restricted-imports
import { FlatList, View, Text as RNText } from 'react-native';
import type { ViewStyle, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeContext } from './theme-context';
import { spacing, radii, fontSizes, fontWeights } from './tokens';
import type {
  ColorToken,
  SpacingToken,
  RadiusToken,
  FontSizeToken,
  FontWeightToken,
} from './tokens';

type BaseLayoutProps = {
  children?: React.ReactNode;
  fill?: boolean;
  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  background?: ColorToken;
  radius?: RadiusToken;
  borderColor?: ColorToken;
  borderWidth?: number;
};

const useColors = () => useContext(ThemeContext).colors;

const getSpacing = (value?: SpacingToken): number | undefined => {
  if (!value) return undefined;
  return spacing[value];
};

const getRadius = (value?: RadiusToken): number | undefined => {
  if (!value) return undefined;
  return radii[value];
};

const getColor = (
  colorTokens: Record<ColorToken, string>,
  value?: ColorToken
): string | undefined => {
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
  gap?: SpacingToken;
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
    overflow: 'hidden',
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
  const childArray = React.Children.toArray(children);
  const spacedChildren = childArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;
    return <View key={child.key ?? index}>{child}</View>;
  });
  return <View style={computedStyle}>{spacedChildren}</View>;
};

type RowProps = BaseLayoutProps & {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: SpacingToken;
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
    gap: getSpacing(gap),
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
    if (!React.isValidElement(child)) return child;
    return <View key={child.key ?? index}>{child}</View>;
  });
  return <View style={computedStyle}>{spacedChildren}</View>;
};

type TextProps = {
  children?: React.ReactNode;
  size?: FontSizeToken;
  weight?: FontWeightToken;
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

type ListProps<ItemT> = {
  data: ReadonlyArray<ItemT>;
  renderItem: (item: ItemT, index: number) => React.ReactElement | null;
  keyExtractor?: (item: ItemT, index: number) => string;
  horizontal?: boolean;
  gap?: SpacingToken;
  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  fill?: boolean;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
};

export const List = <ItemT,>({
  data,
  renderItem,
  keyExtractor,
  horizontal,
  gap,
  padding,
  paddingHorizontal,
  paddingVertical,
  fill,
  onEndReached,
  onEndReachedThreshold,
}: ListProps<ItemT>) => {
  const separatorSize = getSpacing(gap) ?? 0;
  const containerPadding = getSpacing(padding);
  const containerPaddingHorizontal = getSpacing(paddingHorizontal);
  const containerPaddingVertical = getSpacing(paddingVertical);

  return (
    <FlatList
      data={data}
      horizontal={horizontal}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => renderItem(item, index)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: fill === true ? 1 : undefined }}
      contentContainerStyle={{
        padding: containerPadding,
        paddingHorizontal: containerPaddingHorizontal,
        paddingVertical: containerPaddingVertical,
      }}
      ItemSeparatorComponent={() => (
        <View
          style={
            horizontal === true
              ? { width: separatorSize }
              : { height: separatorSize }
          }
        />
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
    />
  );
};

type ScreenProps = {
  children?: React.ReactNode;
  background?: ColorToken;
};

export const Screen: React.FC<ScreenProps> = ({
  children,
  background = 'bg',
}) => {
  const colors = useColors();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: getColor(colors, background) }}
    >
      {children}
    </SafeAreaView>
  );
};
