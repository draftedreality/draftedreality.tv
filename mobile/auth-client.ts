import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_CONVEX_SITE_URL;
if (!baseURL) throw new Error('EXPO_PUBLIC_CONVEX_SITE_URL is not defined');

export const authClient = createAuthClient({
  baseURL,
  plugins: [
    expoClient({
      scheme: 'draftedreality',
      storagePrefix: 'mdraftedreality',
      storage: SecureStore,
    }),
    convexClient(),
  ],
});
