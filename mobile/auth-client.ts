import { createAuthClient } from 'better-auth/react';
import { convexClient } from '@convex-dev/better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'https://fleet-pigeon-413.convex.site',
  plugins: [convexClient()],
});
