import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Authenticated, AuthLoading, ConvexReactClient, Unauthenticated } from 'convex/react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { StrictMode } from 'react';

import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import { authClient } from '@/auth-client';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono });
  const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
  if (typeof convexUrl !== 'string') throw new Error('Missing Convex URL');
  const convex = new ConvexReactClient(convexUrl);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <StrictMode>
      <ConvexBetterAuthProvider authClient={authClient} client={convex}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthLoading>
            <ThemedText>Loading...</ThemedText>
          </AuthLoading>
          <Authenticated>
            <Stack>
              <Stack.Screen name='(home)/(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </Authenticated>
          <Unauthenticated>
            <Stack>
              <Stack.Screen name='(auth)/sign-in' options={{ headerShown: false }} />
            </Stack>
          </Unauthenticated>
          <StatusBar style='auto' />
        </ThemeProvider>
      </ConvexBetterAuthProvider>
    </StrictMode>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
