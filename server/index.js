/**
 * Local development entry point — not used in Vercel production.
 * Imports app.js and starts the HTTP server.
 */
const app = require('./app');
const connectDB = require('./lib/db');

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await connectDB();
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀  Server running at http://localhost:${PORT}`);
      console.log(`   Health: http://localhost:${PORT}/api/health`);
    });
  } catch (err) {
    console.error('❌  Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
