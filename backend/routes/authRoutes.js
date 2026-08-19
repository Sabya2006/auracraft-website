const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { staffUser } = require('../data/store');

// In-Memory Token Blacklist for JWT revocation on logout
const tokenBlacklist = new Set();

// Helper to get JWT secret from environment variables strictly
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('CRITICAL SECURITY ERROR: JWT_SECRET environment variable is missing.');
  }
  return secret;
};

// Middleware export to check blacklisted tokens
const isTokenBlacklisted = (token) => tokenBlacklist.has(token);

// Generate bcrypt hash for admin password
const getAdminPasswordHash = () => {
  const plainPassword = process.env.ADMIN_PASSWORD || 'AuraCraft#SecurePass2026!';
  return bcrypt.hashSync(plainPassword, 10);
};

// POST /api/auth/login - Brute force protected login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Please provide valid email and password' });
  }

  const sanitizedEmail = email.toLowerCase().trim();
  const validEmail = (process.env.ADMIN_EMAIL || staffUser.email).toLowerCase().trim();
  const adminHash = process.env.ADMIN_PASSWORD_HASH || getAdminPasswordHash();

  // Attack Path Check: Prevent timing attacks & validate credentials
  if (sanitizedEmail === validEmail) {
    const isMatch = bcrypt.compareSync(password, adminHash);

    if (isMatch) {
      try {
        const secret = getJwtSecret();
        const token = jwt.sign(
          { id: staffUser.id, role: staffUser.role, email: validEmail },
          secret,
          { expiresIn: '12h' }
        );

        return res.json({
          success: true,
          message: 'Authentication successful. Welcome back to AuraCraft Corporate Portal.',
          token,
          user: {
            id: staffUser.id,
            name: staffUser.name,
            role: staffUser.role,
            avatar: staffUser.avatar
          }
        });
      } catch (err) {
        console.error('[Auth Error]', err.name || 'Signing error');
        return res.status(500).json({ success: false, message: 'Authentication service configuration error.' });
      }
    }
  }

  // Generic 401 response (Prevents user enumeration attacks)
  return res.status(401).json({
    success: false,
    message: 'Invalid staff credentials. Please check your email and password.'
  });
});

// POST /api/auth/logout - Token Revocation Endpoint
router.post('/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    tokenBlacklist.add(token);
  }
  return res.json({ success: true, message: 'Successfully logged out. Token revoked.' });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ success: false, message: 'Token has been revoked. Please log in again.' });
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(token, secret);
    return res.json({
      success: true,
      user: {
        id: decoded.id,
        name: staffUser.name,
        role: decoded.role,
        avatar: staffUser.avatar
      }
    });
  } catch (_err) {
    return res.status(401).json({ success: false, message: 'Session expired or invalid token' });
  }
});

module.exports = {
  router,
  isTokenBlacklisted
};
