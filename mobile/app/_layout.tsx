import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';
import { StrictMode } from 'react';

import { ThemeProvider } from '../ui/theme';

const RootLayout = () => {
  const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
  if (typeof convexUrl !== 'string') throw new Error('Missing Convex URL');
  const convex = new ConvexReactClient(convexUrl);

  return (
    <StrictMode>
      <ConvexProvider client={convex}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ThemeProvider>
      </ConvexProvider>
    </StrictMode>
  );
};

export default RootLayout;
