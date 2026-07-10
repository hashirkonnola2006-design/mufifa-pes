const jwt = require('jsonwebtoken');

/**
 * JWT auth middleware.
 * Reads token from:
 *   1. Authorization: Bearer <token>  header
 *   2. httpOnly cookie "token"
 */
const authMiddleware = (req, res, next) => {
  let token = null;

  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7);
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized: invalid or expired token' });
  }
};

module.exports = authMiddleware;
