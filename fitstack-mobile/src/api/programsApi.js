import client from './client';

export function getPrograms(params) {
  return client.get('/programs', { params });
}

export function getProgramById(id) {
  return client.get(`/programs/${id}`);
}

export function selectProgram(id) {
  return client.post(`/programs/${id}/select`);
}
