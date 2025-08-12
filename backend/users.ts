import type { Id } from './_generated/dataModel';
import { query, type QueryCtx } from './_generated/server';
import { betterAuthComponent } from './auth';

export const currentUser = query({
  args: {},
  handler: async ctx => getCurrentUser(ctx),
});

export async function getCurrentUser(ctx: QueryCtx) {
  // The component provides a convenience method to get the user id
  const userId = await betterAuthComponent.getAuthUserId(ctx);
  if (userId === null) throw new Error('Could not get current user');
  const user = await ctx.db.get(userId as Id<'users'>);
  if (!user) throw new Error('No logged in user');

  return user;
}
