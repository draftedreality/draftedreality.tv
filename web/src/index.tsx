import { serve } from 'bun';

import index from './index.html';

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      GET(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        });
      },
      PUT(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        });
      },
    },

    '/api/hello/:name': req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    '/.well-known/apple-app-site-association': new Response(
      await Bun.file('./assets/apple-app-site-association').bytes()
    ),
    '/.well-known/assetlinks.json': new Response(await Bun.file('./assets/assetlinks.json').bytes()),
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url.href}`);
