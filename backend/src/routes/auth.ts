import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { usersTable } from '../db/schema.js';

const authRoutes = new Hono();

// POST /api/auth/register
authRoutes.post('/register', async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, username, password, gender, age, className, attendanceNumber } = body;

    // Validate required fields
    if (!fullName || !username || !password || !gender || !age || !className || !attendanceNumber) {
      return c.json({ error: 'All fields are required' }, 400);
    }

    // Check if user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
    if (existingUser) {
      return c.json({ error: 'Username already taken' }, 400);
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into database
    const [newUser] = await db.insert(usersTable).values({
      fullName,
      username,
      password: hashedPassword,
      gender,
      age: parseInt(age, 10),
      className,
      attendanceNumber: parseInt(attendanceNumber, 10),
      status: 'student',
    }).returning();

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';
    const payload = {
      sub: newUser.id,
      username: newUser.username,
      status: newUser.status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days expiration
    };
    const token = await sign(payload, secret, 'HS256');

    return c.json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        username: newUser.username,
        status: newUser.status,
      }
    }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// POST /api/auth/login
authRoutes.post('/login', async (c) => {
  try {
    const body = await c.req.json();
    const { username, password } = body;

    if (!username || !password) {
      return c.json({ error: 'Username and password are required' }, 400);
    }

    // Find the user
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).get();
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';
    const payload = {
      sub: user.id,
      username: user.username,
      status: user.status,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days expiration
    };
    const token = await sign(payload, secret, 'HS256');

    return c.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        status: user.status,
      }
    }, 200);
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default authRoutes;
