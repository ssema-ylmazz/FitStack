import client from './client';

export function getWorkouts() {
  return client.get('/workouts');
}

export function createWorkout(payload) {
  return client.post('/workouts', payload);
}

export function updateWorkoutPoints(id, payload) {
  return client.put(`/workouts/${id}/points`, payload);
}

export function deleteWorkout(id) {
  return client.delete(`/workouts/${id}`);
}

export function completeExercise(payload) {
  return client.post('/exercises/complete', payload);
}
