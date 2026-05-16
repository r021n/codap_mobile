import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.js';
import progressRoutes from './routes/progress.js';

const app = new Hono();

// Middlewares
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// Basic route
app.get('/', (c) => {
  return c.json({ message: 'Codap Mobile Backend API is running!' });
});

// Register routes
app.route('/api/auth', authRoutes);
app.route('/api/progress', progressRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
