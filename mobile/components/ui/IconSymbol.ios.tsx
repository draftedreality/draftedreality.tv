import type { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { SymbolView } from 'expo-symbols';
import type { StyleProp, ViewStyle } from 'react-native';

export const IconSymbol = ({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) => {
  return (
    <SymbolView
      name={name}
      resizeMode='scaleAspectFit'
      tintColor={color}
      weight={weight}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
};
