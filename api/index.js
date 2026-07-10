/**
 * Vercel serverless function entry point.
 *
 * Vercel routes all /api/* requests here via vercel.json rewrites.
 * The Express app (server/app.js) handles internal routing.
 *
 * The api/package.json sets "type":"commonjs" so this file can use require().
 */
const app = require('../server/app');

module.exports = app;
