import { Stack } from 'expo-router';

import { ThemeProvider } from '../ui/theme';

const RootLayout = () => {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
};

export default RootLayout;
