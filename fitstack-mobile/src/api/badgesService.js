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

export async function fetchBadges() {
  try {
    const { data } = await client.get('/badges');
    if (!data?.success) {
      throw new Error(data?.message || 'Rozetler alınamadı.');
    }
    return Array.isArray(data.badges) ? data.badges : [];
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {{ name?: string, key?: string }} payload
 */
export async function createBadge(payload = {}) {
  try {
    const body = {};
    if (payload.name != null && String(payload.name).trim() !== '') {
      body.name = String(payload.name).trim();
    }
    if (payload.key != null && String(payload.key).trim() !== '') {
      body.key = String(payload.key).trim();
    }
    const { data } = await client.post('/badges', body);
    if (!data?.success || !data.badge) {
      throw new Error(data?.message || 'Rozet eklenemedi.');
    }
    return data.badge;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
