import client from './client';

function extractMessage(error) {
  const data = error.response?.data;
  if (data && typeof data.message === 'string') return data.message;
  if (error.code === 'ECONNABORTED') return 'İstek zaman aşımına uğradı.';
  if (error.message === 'Network Error') {
    return 'Sunucuya ulaşılamıyor. Backend çalışıyor mu ve adres doğru mu kontrol edin.';
  }
  return 'Beklenmeyen bir hata oluştu.';
}

function wrapAxiosError(error) {
  if (error.response) return new Error(extractMessage(error));
  if (error instanceof Error) return error;
  return new Error(extractMessage(error));
}

/**
 * @returns {Promise<Array>}
 */
export async function fetchWorkouts() {
  try {
    const { data } = await client.get('/workouts');
    if (!data?.success) {
      throw new Error(data?.message || 'Antrenman listesi alınamadı.');
    }
    return Array.isArray(data.workouts) ? data.workouts : [];
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {{ programId?: number|null, duration?: number|string|null, note?: string|null }} payload
 * @returns {Promise<object>} workout
 */
export async function createWorkout(payload = {}) {
  try {
    const body = {};
    if (payload.programId != null && !Number.isNaN(Number(payload.programId))) {
      body.programId = Number(payload.programId);
    }
    if (payload.duration != null && String(payload.duration).trim() !== '') {
      const d = Number(String(payload.duration).trim());
      if (!Number.isNaN(d) && d > 0) body.duration = d;
    }
    if (payload.note != null) {
      body.note = String(payload.note);
    }
    const { data } = await client.post('/workouts', body);
    if (!data?.success || !data.workout) {
      throw new Error(data?.message || 'Antrenman kaydedilemedi.');
    }
    return data.workout;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {number|string} id
 */
export async function deleteWorkout(id) {
  try {
    const { data } = await client.delete(`/workouts/${encodeURIComponent(id)}`);
    if (!data?.success) {
      throw new Error(data?.message || 'Antrenman silinemedi.');
    }
    return data;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
