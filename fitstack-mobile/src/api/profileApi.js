import client from './client';

export function getProfile() {
  return client.get('/users/profile');
}

export function updateProfile(payload) {
  return client.put('/users/profile', payload);
}

export function getPoints() {
  return client.get('/users/points');
}
