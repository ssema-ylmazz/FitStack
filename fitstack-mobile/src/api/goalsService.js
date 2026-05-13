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

function normalizeGoal(row) {
  return {
    id: Number(row.id),
    type: String(row.type || ''),
    title: String(row.title || ''),
    target: Number(row.target) || 0,
    current: Number(row.current) || 0,
    completed: Boolean(row.completed),
    progressPercent: Math.min(100, Math.max(0, Number(row.progressPercent) || 0)),
    manualComplete: Boolean(row.manualComplete),
    createdAt: row.createdAt != null ? String(row.createdAt) : '',
  };
}

export async function fetchGoals() {
  try {
    const { data } = await client.get('/goals');
    if (!data?.success) {
      throw new Error(data?.message || 'Hedefler alınamadı.');
    }
    const list = Array.isArray(data.goals) ? data.goals : [];
    return list.map(normalizeGoal);
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {{ type: 'weekly_workouts'|'total_points'|'streak_days', title?: string, target?: number }} payload
 */
export async function createGoal(payload) {
  try {
    const body = { type: payload.type };
    if (payload.title != null && String(payload.title).trim() !== '') {
      body.title = String(payload.title).trim();
    }
    if (payload.target != null && !Number.isNaN(Number(payload.target)) && Number(payload.target) > 0) {
      body.target = Number(payload.target);
    }
    const { data } = await client.post('/goals', body);
    if (!data?.success || !data.goal) {
      throw new Error(data?.message || 'Hedef oluşturulamadı.');
    }
    return normalizeGoal(data.goal);
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {number|string} id
 * @param {{ title?: string, target?: number, manualComplete?: boolean }} payload
 */
export async function updateGoal(id, payload = {}) {
  try {
    const body = {};
    if (payload.title != null && String(payload.title).trim() !== '') {
      body.title = String(payload.title).trim();
    }
    if (payload.target != null && !Number.isNaN(Number(payload.target)) && Number(payload.target) > 0) {
      body.target = Number(payload.target);
    }
    if (payload.manualComplete != null) {
      body.manualComplete = Boolean(payload.manualComplete);
    }
    const { data } = await client.put(`/goals/${encodeURIComponent(id)}`, body);
    if (!data?.success || !data.goal) {
      throw new Error(data?.message || 'Hedef güncellenemedi.');
    }
    return normalizeGoal(data.goal);
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
