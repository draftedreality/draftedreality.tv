import { BlurView } from 'expo-blur';
import { Platform, StyleSheet } from 'react-native';

export const TabBarBackground = () => {
  if (Platform.OS === 'android') return null;
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      intensity={100}
      style={StyleSheet.absoluteFill}
      tint='systemChromeMaterial'
    />
  );
};
