/**
 * Express app — shared between local dev (server/index.js) and Vercel (api/index.js).
 * Does NOT call app.listen() — the caller decides how to serve it.
 */
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const connectDB = require('./lib/db');

const authRoutes = require('./routes/auth');
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

const app = express();

// ─── HELMET SECURITY HEADERS ──────────────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    // Always allow in development/local environments
    if (process.env.NODE_ENV !== 'production') {
      return cb(null, true);
    }
    // Allow requests with no origin (mobile apps, curl, same-origin)
    if (!origin) return cb(null, true);

    // In production, check allowed origins, local addresses, or Vercel preview domains
    const isAllowed = allowedOrigins.length === 0 || 
                      allowedOrigins.includes(origin) ||
                      origin.startsWith('http://localhost') ||
                      origin.startsWith('http://127.0.0.1') ||
                      origin.startsWith('http://[::1]') ||
                      origin.endsWith('.vercel.app') ||
                      /^https:\/\/mufifa-pes-.*\.vercel\.app$/.test(origin);

    if (isAllowed) {
      return cb(null, true);
    }
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cookieParser());

// ─── DB connection middleware (serverless-safe) ───────────────────────────────
// Ensures the DB connection is established before any route handler runs.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('DB connection failed:', err.message);
    res.status(503).json({ error: 'Database unavailable' });
  }
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/admin', authRoutes);
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// ─── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

// ─── Global error handler ────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

module.exports = app;
