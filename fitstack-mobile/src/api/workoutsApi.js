import client from './client';

export function getWorkouts() {
  return client.get('/workouts');
}

export function createWorkout(payload) {
  return client.post('/workouts', payload);
}

export function deleteWorkout(id) {
  return client.delete(`/workouts/${id}`);
}
