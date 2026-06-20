import client from './client';

export function login(credentials) {
  return client.post('/users/login', credentials);
}

export function register(payload) {
  return client.post('/users/register', payload);
}
