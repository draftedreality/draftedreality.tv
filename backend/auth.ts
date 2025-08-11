import { BetterAuth, type AuthFunctions } from '@convex-dev/better-auth';
import { components, internal } from './_generated/api';
import type { Id, DataModel } from './_generated/dataModel';

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
