import { paginationOptsValidator } from 'convex/server';

import { query } from './_generated/server';

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return ctx.db.query('shows').order('desc').paginate(args.paginationOpts);
  },
});
