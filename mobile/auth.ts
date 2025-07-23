import { convexAdapter } from '@convex-dev/better-auth';
import { convex, crossDomain } from '@convex-dev/better-auth/plugins';
import { betterAuth } from 'better-auth';
import { betterAuthComponent } from '../backend/auth';
import { type GenericCtx } from '../backend/_generated/server';

// You'll want to replace this with an environment variable
const siteUrl = 'http://localhost:5173';

export const createAuth = (ctx: GenericCtx) =>
  betterAuth({
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [convex(), crossDomain({ siteUrl })],
  });
