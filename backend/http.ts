import { httpRouter } from 'convex/server';

import { betterAuthComponent, createAuth } from './auth';

const http = httpRouter();

// { cors: true } is required for client side frameworks
betterAuthComponent.registerRoutes(http, createAuth, { cors: true });

// eslint-disable-next-line import/no-default-export
export default http;
