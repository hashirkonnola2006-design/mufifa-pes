/**
 * Generate a bcrypt hash for use as ADMIN_PASSWORD_HASH.
 *
 * Usage:
 *   node server/scripts/gen-hash.js                  → hashes "mufifa2026" (default)
 *   node server/scripts/gen-hash.js mySecurePassword  → hashes the given password
 *
 * Copy the output hash to your .env file or Vercel dashboard as ADMIN_PASSWORD_HASH.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'mufifa2026';

bcrypt.hash(password, 10).then((hash) => {
  console.log('\n──────────────────────────────────────────────────────');
  console.log(`  Password : ${password}`);
  console.log(`  Hash     : ${hash}`);
  console.log('──────────────────────────────────────────────────────');
  console.log('\nAdd the following to your .env file or Vercel dashboard:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
}).catch((err) => {
  console.error('Error generating hash:', err);
  process.exit(1);
});
