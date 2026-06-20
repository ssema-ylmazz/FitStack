import client from './client';

export function registerUser(payload) {
  return client.post('/users/register', payload);
}

export function loginUser(credentials) {
  return client.post('/users/login', credentials);
}

export function getProfile() {
  return client.get('/users/profile');
}

export function updateProfile(payload) {
  return client.put('/users/profile', payload);
}

export function deleteProfile() {
  return client.delete('/users/profile');
}
