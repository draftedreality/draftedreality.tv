import { View } from 'react-native';
import type { ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = ({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) => {
  const backgroundColor = useThemeColor(
    {
      ...(lightColor !== undefined && { light: lightColor }),
      ...(darkColor !== undefined && { dark: darkColor }),
    },
    'background'
  );

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
};
