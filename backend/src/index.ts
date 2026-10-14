import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import authRoutes from './routes/auth.js';
import progressRoutes from './routes/progress.js';
import aiRoutes from './routes/ai.js';
import chatRoutes from './routes/chat.js';
import chatUploadRoutes from './routes/chatUpload.js';
import adminChatRoutes from './routes/adminChat.js';

const app = new Hono();

// Middlewares
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Static file serving for uploads (chat images & files)
app.use('/uploads/*', serveStatic({ root: './' }));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ status: 'ok', uptime: process.uptime() });
});

// Basic route
app.get('/', (c) => {
  return c.json({ message: 'Codap Mobile Backend API is running!' });
});

// Register routes
app.route('/api/auth', authRoutes);
app.route('/api/progress', progressRoutes);
app.route('/api/ai', aiRoutes);
app.route('/api/chat/upload', chatUploadRoutes);
app.route('/api/chat', chatRoutes);
app.route('/api/admin/chat', adminChatRoutes);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const hostname = process.env.HOST || '0.0.0.0';

const server = serve({
  fetch: app.fetch,
  port,
  hostname,
}, (info) => {
  console.log(`Server is running on http://${info.address}:${info.port}`);
});

const gracefulShutdown = () => {
  console.log('Received shutdown signal, shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

export default app;
