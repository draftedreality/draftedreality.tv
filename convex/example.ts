import { query } from './_generated/server';

export const getShows = query({
  handler: async ctx => ctx.db.query('shows').collect(),
});
