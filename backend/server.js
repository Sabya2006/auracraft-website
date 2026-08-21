const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const crypto = require('crypto');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// 1. ENVIRONMENT VARIABLES VALIDATION CHECK
const validateEnvironment = () => {
  const isProd = process.env.NODE_ENV === 'production';
  const missingVars = [];

  if (isProd) {
    if (!process.env.JWT_SECRET) missingVars.push('JWT_SECRET');
    if (!process.env.CORS_ORIGIN) missingVars.push('CORS_ORIGIN');
    if (!process.env.ADMIN_EMAIL) missingVars.push('ADMIN_EMAIL');
    if (!process.env.ADMIN_PASSWORD) missingVars.push('ADMIN_PASSWORD');

    if (missingVars.length > 0) {
      console.error(`❌ CRITICAL SECURITY ERROR: Missing required production environment variables: ${missingVars.join(', ')}`);
      console.error('Server execution halted. Please set all required environment variables in production.');
      process.exit(1);
    }
  }
};

validateEnvironment();

// Connect to Database (TLS/SSL Enforced in Prod)
connectDB();

const app = express();

// SECURITY HEADERS (Helmet & CSP & HSTS)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
      connectSrc: ["'self'", process.env.SUPABASE_URL || "*"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

// Additional Explicit Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS CONFIGURATION
const isProd = process.env.NODE_ENV === 'production';
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim())
  : (isProd ? ['https://auracraft.vercel.app'] : '*');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins === '*' || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Access denied from this origin.'));
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' }));

// RATE LIMITING (Auth & Lead Submissions)
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please wait 60 seconds before trying again.'
  }
});

const leadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many inquiries submitted from this IP. Please try again later.'
  }
});

// Root Status Endpoint
app.get('/', (req, res) => {
  res.json({
    agency: 'AuraCraft Digital Engine',
    description: 'High-Performance Web Engineering for Restaurants, Wholesalers & Cafes',
    status: 'Active & Secure 🚀',
    version: '2.6.0',
    endpoints: {
      auth: '/api/auth/login',
      leads: '/api/leads',
      verifyPayment: '/api/leads/verify-payment',
      portfolio: '/api/portfolio'
    }
  });
});

// API Routes Mounting with Rate Limiters
const { router: authRouter } = require('./routes/authRoutes');
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/leads', leadLimiter, require('./routes/leadRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found.' });
});

// ERROR HANDLING & CORRELATION IDS
app.use((err, req, res, _next) => {
  const correlationId = 'ERR-AURA-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  
  const sanitizedErr = (err.stack || err.message || '').replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, '[REDACTED_EMAIL]');
  console.error(`[${correlationId}] Internal Server Error:`, sanitizedErr);

  res.status(500).json({
    success: false,
    message: 'An internal server error occurred. Please contact support with the reference correlation ID.',
    correlationId: correlationId
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✨ AuraCraft Web Design Agency API Server running securely on port ${PORT}`);
});
