import axios from 'axios';
import { Platform } from 'react-native';

function normalizeBase(url) {
  return String(url || '')
    .trim()
    .replace(/\/$/, '');
}

/**
 * Ortam değişkeni tüm platformlarda önceliklidir (LAN, tunnel, prod).
 * @returns {string}
 */
export function getApiBaseUrl() {
  const fromEnv =
    typeof process !== 'undefined' && process.env?.EXPO_PUBLIC_API_URL
      ? normalizeBase(process.env.EXPO_PUBLIC_API_URL)
      : '';
  if (fromEnv) return fromEnv;

  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.location?.hostname) {
      const raw = window.location.hostname;
      const host =
        raw === 'localhost' || raw === '127.0.0.1' || raw === '[::1]' || raw === '::1'
          ? '127.0.0.1'
          : raw;
      return `http://${host}:3000`;
    }
    return 'http://127.0.0.1:3000';
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  /* iOS simülatör ve varsayılan */
  return 'http://127.0.0.1:3000';
}

const client = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
