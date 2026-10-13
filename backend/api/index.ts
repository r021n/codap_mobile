import { handle } from 'hono/vercel';
// @ts-ignore
import app from '../dist/index.js';

export default handle(app);
