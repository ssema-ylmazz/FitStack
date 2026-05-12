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
 * @param {'week'|'month'} [period]
 * @returns {Promise<{ period: 'week'|'month', leaderboard: Array<{ id:number, username:string, points:number, streak:number, rank:number }> }>}
 */
export async function fetchLeaderboard(period = 'week') {
  const p = period === 'month' ? 'month' : 'week';
  try {
    const { data } = await client.get('/leaderboard', { params: { period: p } });
    if (!data?.success) {
      throw new Error(data?.message || 'Liderlik tablosu alınamadı.');
    }
    const list = Array.isArray(data.leaderboard) ? data.leaderboard : [];
    const normalized = list.map((row, i) => ({
      id: Number(row.id),
      username: String(row.username ?? ''),
      points: Number(row.points) || 0,
      streak: Number(row.streak) || 0,
      rank: Number(row.rank) || i + 1,
    }));
    return {
      period: data.period === 'month' ? 'month' : 'week',
      leaderboard: normalized,
    };
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
