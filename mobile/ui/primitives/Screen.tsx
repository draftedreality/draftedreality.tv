import type React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { ScreenProps } from './types';
import { useColors, getColor } from './utils';

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
