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

function normalizeActivity(row) {
  return {
    id: Number(row.id),
    type: String(row.type || ''),
    message: String(row.message || ''),
    createdAt: row.createdAt != null ? String(row.createdAt) : '',
  };
}

/**
 * @param {number} [limit] en fazla kaç kayıt (varsayılan 5)
 * @returns {Promise<Array<{ id:number, type:string, message:string, createdAt:string }>>}
 */
export async function fetchActivityFeed(limit = 5) {
  try {
    const { data } = await client.get('/activity-feed');
    if (!data?.success) {
      throw new Error(data?.message || 'Aktivite akışı alınamadı.');
    }
    const list = Array.isArray(data.activities) ? data.activities : [];
    const normalized = list.map(normalizeActivity);
    if (limit > 0 && normalized.length > limit) {
      return normalized.slice(0, limit);
    }
    return normalized;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
