import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// eslint-disable-next-line import/no-default-export
export default defineSchema({
  users: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    username: v.string(),
    email: v.string(),
  }),
  shows: defineTable({
    title: v.string(),
    imageUrl: v.string(),
  }),
  seasons: defineTable({
    title: v.string(),
    startDate: v.string(),
    endDate: v.string(),
    showId: v.id('shows'),
  }),
  scoringOutlines: defineTable({
    title: v.string(),
    description: v.string(),
    points: v.number(),
    status: v.union(v.literal('active'), v.literal('inactive')),
    leagueId: v.id('leagues'),
  }),
  scoringEvents: defineTable({
    note: v.string(),
    contestantId: v.id('contestants'),
    leagueId: v.id('leagues'),
    outlineId: v.id('scoringOutlines'),
    episodeId: v.id('episodes'),
  }),
  leagues: defineTable({
    name: v.string(),
    status: v.string(),
    seasonId: v.id('seasons'),
  }),
  leaguePlayers: defineTable({
    status: v.string(),
    playerId: v.id('users'),
    leagueId: v.id('leagues'),
  }),
  leaguePicks: defineTable({
    leaguePlayerId: v.id('leaguePlayers'),
    contestantId: v.id('contestants'),
  }),
  episodes: defineTable({
    title: v.string(),
    airDate: v.string(),
    seasonId: v.id('seasons'),
  }),
  contestants: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    age: v.number(),
    occupation: v.string(),
    hometown: v.string(),
    imageUrl: v.string(),
    seasonId: v.id('seasons'),
  }),
});
