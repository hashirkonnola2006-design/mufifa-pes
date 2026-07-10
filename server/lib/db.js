/**
 * Serverless-safe Mongoose connection with caching.
 *
 * In serverless environments (Vercel), each function invocation may reuse a warm
 * container that already has an open connection — or spin up a fresh one. Caching
 * on the `global` object prevents connection exhaustion across hot invocations.
 */
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');

// Use a global cache so the connection persists between warm invocations
let cached = global.__mongoose_cache;
if (!cached) {
  cached = global.__mongoose_cache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI environment variable is not set');

    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    }).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    // Reset so the next call retries
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

module.exports = connectDB;
