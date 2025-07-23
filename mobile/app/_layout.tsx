import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { ConvexReactClient } from 'convex/react';
import { ConvexBetterAuthProvider } from '@convex-dev/better-auth/react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';

import SpaceMono from '@/assets/fonts/SpaceMono-Regular.ttf';
import { useColorScheme } from '@/hooks/useColorScheme';
import { authClient } from '@/auth-client';
import { Text, View } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono });
  const convex = new ConvexReactClient('https://fleet-pigeon-413.convex.cloud');

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ConvexBetterAuthProvider client={convex} authClient={authClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthLoading>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'blue',
            }}
          >
            <Text style={{ fontSize: 24 }}>Loading...</Text>
          </View>
        </AuthLoading>
        <Unauthenticated>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
            }}
          >
            <Text style={{ fontSize: 24 }}>Time to login!</Text>
          </View>
        </Unauthenticated>
        <Authenticated>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
        </Authenticated>
        <StatusBar style='auto' />
      </ThemeProvider>
    </ConvexBetterAuthProvider>
  );
}
