import type { ViewStyle, TextStyle, PressableProps } from 'react-native';

import type {
  ColorToken,
  SpacingToken,
  RadiusToken,
  FontSizeToken,
  FontWeightToken,
} from '../tokens';

export type BaseLayoutProps = {
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

export type StackProps = BaseLayoutProps & {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: SpacingToken;
};

export type RowProps = BaseLayoutProps & {
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: SpacingToken;
};

export type TextProps = {
  children?: React.ReactNode;
  size?: FontSizeToken;
  weight?: FontWeightToken;
  color?: ColorToken;
  align?: TextStyle['textAlign'];
};

export type ListProps<ItemT> = {
  data: ReadonlyArray<ItemT>;
  renderItem: (item: ItemT, index: number) => React.ReactElement | null;
  keyExtractor?: (item: ItemT, index: number) => string;
  horizontal?: boolean;
  gap?: SpacingToken;
  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
};

export type ScreenProps = {
  children?: React.ReactNode;
  background?: ColorToken;
};

export type ButtonProps = {
  label: string;
  onPress: PressableProps['onPress'];
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fill?: boolean;
  padding?: SpacingToken;
  paddingHorizontal?: SpacingToken;
  paddingVertical?: SpacingToken;
  background?: ColorToken;
  textColor?: ColorToken;
  radius?: RadiusToken;
  borderColor?: ColorToken;
  borderWidth?: number;
  disabled?: boolean;
};
