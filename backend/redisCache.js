const { createClient } = require('redis');

const CACHE_PREFIX = 'fitstack:';

/** @type {import('redis').RedisClientType | undefined} */
let client;

function redisUrl() {
  if (process.env.REDIS_URL) return String(process.env.REDIS_URL).trim();
  const host = process.env.REDIS_HOST || '127.0.0.1';
  const port = Number(process.env.REDIS_PORT) || 6379;
  return `redis://${host}:${port}`;
}

/**
 * Redis kullanılamazsa null döner; uygulama çökmez.
 * @returns {Promise<import('redis').RedisClientType | null>}
 */
async function getRedisClient() {
  if (process.env.REDIS_DISABLED === '1') {
    return null;
  }
  if (client && client.isOpen) {
    return client;
  }
  try {
    if (client && !client.isOpen) {
      try {
        await client.quit();
      } catch (_) {
        /* ignore */
      }
      client = undefined;
    }
    const c = createClient({
      url: redisUrl(),
      socket: {
        connectTimeout: 2500,
        reconnectStrategy: () => false,
      },
    });
    c.on('error', (err) => {
      console.error('[Redis] client error:', err.message);
    });
    await c.connect();
    client = c;
    return client;
  } catch (err) {
    console.error('[Redis] Bağlantı kurulamadı, cache devre dışı:', err && err.message ? err.message : err);
    client = undefined;
    return null;
  }
}

/**
 * @param {string} key
 * @returns {Promise<string | null>}
 */
async function cacheGet(key) {
  try {
    const c = await getRedisClient();
    if (!c) return null;
    return await c.get(CACHE_PREFIX + key);
  } catch (err) {
    console.error('[Redis] cacheGet hatası:', err && err.message ? err.message : err);
    return null;
  }
}

/**
 * @param {string} key
 * @param {string} value JSON string
 * @param {number} ttlSeconds
 */
async function cacheSet(key, value, ttlSeconds) {
  try {
    const c = await getRedisClient();
    if (!c) return false;
    await c.set(CACHE_PREFIX + key, value, { EX: ttlSeconds });
    return true;
  } catch (err) {
    console.error('[Redis] cacheSet hatası:', err && err.message ? err.message : err);
    return false;
  }
}

module.exports = {
  getRedisClient,
  cacheGet,
  cacheSet,
  redisUrl,
};
