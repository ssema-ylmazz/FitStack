import client from './client';

function extractMessage(error) {
  const data = error.response?.data;
  if (data && typeof data.message === 'string') return data.message;
  if (error.code === 'ECONNABORTED') return 'İstek zaman aşımına uğradı.';
  if (error.message === 'Network Error') {
    return 'Sunucuya ulaşılamıyor. Backend çalışıyor mu kontrol edin.';
  }
  return 'Beklenmeyen bir hata oluştu.';
}

function wrapAxiosError(error) {
  if (error.response) return new Error(extractMessage(error));
  if (error instanceof Error) return error;
  return new Error(extractMessage(error));
}

/**
 * @returns {Promise<{ currentStreak: number, lastWorkoutDate: string|null, updatedAt: string }>}
 */
export async function fetchStreak() {
  try {
    const { data } = await client.get('/streak');
    if (!data?.success || !data.streak) {
      throw new Error(data?.message || 'Seri bilgisi alınamadı.');
    }
    return data.streak;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {{ currentStreak?: number|string, lastWorkoutDate?: string|null }} fields
 */
export async function updateStreak(fields = {}) {
  try {
    const body = {};
    if (fields.currentStreak !== undefined && fields.currentStreak !== null && fields.currentStreak !== '') {
      const n = Number(fields.currentStreak);
      if (!Number.isNaN(n)) body.currentStreak = n;
    }
    if (fields.lastWorkoutDate != null && String(fields.lastWorkoutDate).trim() !== '') {
      body.lastWorkoutDate = String(fields.lastWorkoutDate).trim();
    }
    const { data } = await client.put('/streak', body);
    if (!data?.success || !data.streak) {
      throw new Error(data?.message || 'Seri güncellenemedi.');
    }
    return data.streak;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
