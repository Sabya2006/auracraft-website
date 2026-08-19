const mongoose = require('mongoose');
const { getSupabaseClient } = require('./supabase');

const connectDB = async () => {
  const isProd = process.env.NODE_ENV === 'production';

  // 1. Check for Supabase Cloud Client (Enforces HTTPS/TLS encrypted REST connection)
  const supabase = getSupabaseClient();
  if (supabase) {
    console.log('⚡ Connected to Supabase Cloud Database (TLS Encrypted)');
    return { type: 'supabase', client: supabase };
  }

  // 2. Check for MongoDB URI via environment variable ONLY (Enforces TLS/SSL in Prod)
  if (process.env.MONGO_URI) {
    try {
      const options = {
        serverSelectionTimeoutMS: 3000,
        tls: isProd,
        retryWrites: true
      };

      const conn = await mongoose.connect(process.env.MONGO_URI, options);
      console.log(`⚡ MongoDB Connected (TLS ${isProd ? 'Enabled' : 'Default'}): ${conn.connection.host}`);
      return { type: 'mongodb' };
    } catch (err) {
      console.warn('[Database Connection Notice] MongoDB connection error:', err.name || 'Connection refused');
    }
  }

  // 3. Isolated in-memory fallback datastore for local testing
  console.log('⚡ Active session powered by isolated in-memory datastore');
  return { type: 'in_memory' };
};

module.exports = connectDB;
