import { createAuthClient } from 'better-auth/react';
import {
  convexClient,
  crossDomainClient,
} from '@convex-dev/better-auth/client/plugins';

const baseURL = process.env.CONVEX_SITE_URL;
if (!baseURL) throw new Error('CONVEX_SITE_URL is not defined');

export const authClient = createAuthClient({
  baseURL,
  plugins: [convexClient(), crossDomainClient()],
});
