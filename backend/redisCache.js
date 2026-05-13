'use strict';

const KEY_PREFIX = 'fitstack:';

let client = null;
let connectPromise = null;
let disabled =
  process.env.REDIS_DISABLED === '1' || process.env.REDIS_DISABLED === 'true';
let unavailable = false;
let missingPackageLogged = false;
let redisModuleMissing = false;

function redisUrl() {
  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  const host = process.env.REDIS_HOST;
  const port = process.env.REDIS_PORT;
  const hasHost = host != null && String(host).trim() !== '';
  const hasPort = port != null && String(port).trim() !== '';
  if (hasHost || hasPort) {
    return `redis://${hasHost ? host : '127.0.0.1'}:${hasPort ? port : '6379'}`;
  }
  return null;
}

function tryCreateRedisClient() {
  if (redisModuleMissing) return null;
  try {
    return require('redis');
  } catch {
    redisModuleMissing = true;
    if (!missingPackageLogged) {
      missingPackageLogged = true;
      console.warn('[redisCache] redis paketi yüklü değil; cache no-op.');
    }
    return null;
  }
}

async function ensureClient() {
  if (disabled || unavailable) return null;

  const redisMod = tryCreateRedisClient();
  if (!redisMod) return null;

  const url = redisUrl();
  if (!url) return null;

  if (client && client.isOpen) return client;

  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    try {
      const { createClient } = redisMod;
      const c = createClient({ url });
      c.on('error', (err) => {
        console.warn('[redisCache] client error:', err && err.message ? err.message : err);
      });
      await c.connect();
      client = c;
      return c;
    } catch (err) {
      unavailable = true;
      client = null;
      console.warn(
        '[redisCache] bağlantı başarısız:',
        err && err.message ? err.message : err,
      );
      return null;
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
}

/**
 * @param {string} key
 * @returns {Promise<string|null>}
 */
async function cacheGet(key) {
  try {
    const c = await ensureClient();
    if (!c) return null;
    const fullKey = KEY_PREFIX + String(key);
    const val = await c.get(fullKey);
    return val;
  } catch (err) {
    console.warn('[redisCache] cacheGet:', err && err.message ? err.message : err);
    return null;
  }
}

/**
 * @param {string} key
 * @param {string} value
 * @param {number} ttlSeconds
 * @returns {Promise<void>}
 */
async function cacheSet(key, value, ttlSeconds) {
  try {
    const c = await ensureClient();
    if (!c) return;
    const fullKey = KEY_PREFIX + String(key);
    const ex = Math.max(1, Number(ttlSeconds) || 60);
    await c.set(fullKey, String(value), { EX: ex });
  } catch (err) {
    console.warn('[redisCache] cacheSet:', err && err.message ? err.message : err);
  }
}

module.exports = {
  cacheGet,
  cacheSet,
};
