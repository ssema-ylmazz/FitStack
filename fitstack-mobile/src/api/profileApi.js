import client from './client';

export function getProfile() {
  return client.get('/users/profile');
}

export function updateProfile(payload) {
  return client.put('/users/profile', payload);
}

export function getUserPoints() {
  return client.get('/users/points');
}

export function getStreak() {
  return client.get('/streak');
}

export function updateStreak(payload) {
  return client.put('/streak', payload);
}

export function getBadges() {
  return client.get('/badges');
}
