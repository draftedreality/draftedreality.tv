import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const forUser = query({
  args: {
    userId: v.id('users'),
    status: v.optional(
      v.union(v.literal('inProgress'), v.literal('concluded'))
    ),
  },
  handler: async (ctx, args) => {
    const leaguePlayers = await ctx.db
      .query('leaguePlayers')
      .withIndex('byPlayerIdByLeagueId', q => q.eq('playerId', args.userId))
      .filter(q => q.eq(q.field('inviteStatus'), 'accepted'))
      .order('desc')
      .collect();

    const leagues = await Promise.all(
      leaguePlayers.map(t =>
        ctx.db
          .query('leagues')
          .filter(q => q.eq(q.field('_id'), t.leagueId))
          .withIndex('byStatus', q =>
            q.eq('status', args.status ?? 'inProgress')
          )
          .unique()
      )
    );

    return leagues.filter(l => !!l);
  },
});

export const create = mutation({
  args: {
    hostId: v.id('users'),
    name: v.string(),
    seasonId: v.id('seasons'),
    initialPlayers: v.array(v.id('users')),
  },
  handler: async (ctx, { name, seasonId, hostId, initialPlayers }) => {
    const leagueId = await ctx.db.insert('leagues', {
      name,
      seasonId,
      status: 'inProgress',
      hostId,
    });
    await ctx.db.insert('leaguePlayers', {
      leagueId,
      playerId: hostId,
      inviteStatus: 'accepted',
    });
    await Promise.all(
      initialPlayers
        .filter(playerId => playerId !== hostId)
        .map(playerId =>
          ctx.db.insert('leaguePlayers', {
            leagueId,
            playerId,
            inviteStatus: 'invited',
          })
        )
    );
    return leagueId;
  },
});

export const invitePlayer = mutation({
  args: {
    leagueId: v.id('leagues'),
    playerId: v.id('users'),
  },
  handler: async (ctx, args) => {
    const playerAlreadyInvited = await ctx.db
      .query('leaguePlayers')
      .withIndex('byPlayerIdByLeagueId', q =>
        q.eq('playerId', args.playerId).eq('leagueId', args.leagueId)
      )
      .unique();

    if (playerAlreadyInvited) {
      throw new Error(
        `Player ${args.playerId} is already invited to league ${args.leagueId}`
      );
    }

    return ctx.db.insert('leaguePlayers', { ...args, inviteStatus: 'invited' });
  },
});

export const rescindInvite = mutation({
  args: {
    leagueInviteId: v.id('leaguePlayers'),
  },
  handler: async (ctx, args) => {
    const leagueInvite = await ctx.db.get(args.leagueInviteId);
    if (!leagueInvite) {
      throw new Error(`No player invite found with id ${args.leagueInviteId}`);
    }

    return ctx.db.patch(leagueInvite._id, { inviteStatus: 'rescinded' });
  },
});

export const respondToInvite = mutation({
  args: {
    leagueId: v.id('leagues'),
    playerId: v.id('users'),
    response: v.union(v.literal('accepted'), v.literal('declined')),
  },
  handler: async (ctx, args) => {
    const league = await ctx.db.get(args.leagueId);
    if (!league) {
      throw new Error(`League ${args.leagueId} does not exist!`);
    }

    if (league.status === 'concluded') {
      throw new Error(`League ${args.leagueId} already concluded!`);
    }

    const existingPlayerInvite = await ctx.db
      .query('leaguePlayers')
      .withIndex('byPlayerIdByLeagueId', q =>
        q.eq('playerId', args.playerId).eq('leagueId', args.leagueId)
      )
      .unique();

    if (!existingPlayerInvite) {
      throw new Error(
        `Player ${args.playerId} has not been invited to league ${args.leagueId}`
      );
    }

    if (existingPlayerInvite.inviteStatus !== 'invited') {
      throw new Error(
        `Player ${args.playerId} has already responded to invite to league ${args.leagueId}`
      );
    }

    return ctx.db.patch(existingPlayerInvite._id, {
      inviteStatus: args.response,
    });
  },
});

export const conclude = mutation({
  args: {
    leagueId: v.id('leagues'),
  },
  handler: async (ctx, args) => {
    const league = await ctx.db.get(args.leagueId);
    if (!league) {
      throw new Error(`League ${args.leagueId} does not exist!`);
    }

    if (league.status === 'concluded') {
      throw new Error(`League ${args.leagueId} already concluded!`);
    }

    return ctx.db.patch(league._id, { status: 'concluded' });
  },
});
