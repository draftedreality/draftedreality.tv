import { internalMutation } from './_generated/server';
import { faker } from '@faker-js/faker';

export const init = internalMutation({
  args: {},
  handler: async ctx => {
    faker.seed();

    for (let i = 0; i < 30; i++) {
      await ctx.db.insert('shows', {
        title: faker.book.title(),
        imageUrl: faker.image.urlPicsumPhotos({ height: 472, width: 332 }),
      });
    }
  },
});
