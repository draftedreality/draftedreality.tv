import { expoClient } from '@better-auth/expo/client';
import { convexClient } from '@convex-dev/better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_CONVEX_SITE_URL;
if (baseURL === undefined)
  throw new Error('EXPO_PUBLIC_CONVEX_SITE_URL is not defined');

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
