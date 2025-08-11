import {
  BetterAuth,
  type AuthFunctions,
  convexAdapter,
} from '@convex-dev/better-auth';
import { components, internal } from './_generated/api';
import type { Id, DataModel } from './_generated/dataModel';
import { convex } from '@convex-dev/better-auth/plugins';
import { betterAuth } from 'better-auth';
import { type GenericCtx } from 'backend/_generated/server';
import { expo } from '@better-auth/expo';

// You'll want to replace this with an environment variable
const siteUrl = 'http://localhost:5173';

export const createAuth = (ctx: GenericCtx) =>
  // Configure your Better Auth instance here
  betterAuth({
    trustedOrigins: [siteUrl],
    database: convexAdapter(ctx, betterAuthComponent),

    // Simple non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required
      convex(),
      expo(),
    ],
  });

// Typesafe way to pass Convex functions defined in this file
const authFunctions: AuthFunctions = internal.auth;

// Initialize the component
export const betterAuthComponent = new BetterAuth(components.betterAuth, {
  authFunctions,
});

export const { createUser, updateUser, deleteUser, createSession } =
  betterAuthComponent.createAuthFunctions<DataModel>({
    onCreateUser: async (ctx, user) => {
      return ctx.db.insert('users', {
        email: user.email,
        firstName: user.name,
        lastName: user.name,
        username: user.username ?? '',
      });
    },

    onDeleteUser: async (ctx, userId) => {
      await ctx.db.delete(userId as Id<'users'>);
    },
  });
