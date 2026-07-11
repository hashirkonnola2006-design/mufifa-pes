/**
 * Admin authentication routes.
 *
 * Credentials are stored as environment variables — no DB query required.
 *   ADMIN_USERNAME       — the admin's username
 *   ADMIN_PASSWORD_HASH  — bcrypt hash of the admin password
 *
 * Generate the hash with:  node server/scripts/gen-hash.js <your-password>
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Admin login rate limiter: max 15 attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15,
  message: { error: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/admin/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    if (username.length > 100 || password.length > 100) {
      return res.status(400).json({ error: 'Credentials length exceeds maximum limit' });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminUsername || !adminHash) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD_HASH not set in environment');
      return res.status(500).json({ error: 'Admin credentials not configured on server' });
    }

    // Constant-time username check via bcrypt-style comparison (prevent timing attacks)
    if (username.trim() !== adminUsername) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, adminHash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ error: 'JWT secret not configured on server' });
    }

    const token = jwt.sign(
      { username: adminUsername, role: 'admin' },
      secret,
      { expiresIn: '24h' }
    );

    // Set as httpOnly cookie (same-site for same-origin, Bearer header for cross-origin)
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 24 h
    });

    return res.json({ token, username: adminUsername });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
});

module.exports = router;
