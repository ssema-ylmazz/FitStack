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
 * @param {'all' | 'beginner' | 'intermediate' | 'advanced'} levelFilter
 * @returns {Promise<Array>}
 */
export async function fetchPrograms(levelFilter = 'all') {
  try {
    const params = {};
    if (levelFilter && levelFilter !== 'all') {
      params.level = levelFilter;
    }
    const { data } = await client.get('/programs', { params });
    if (!data?.success) {
      throw new Error(data?.message || 'Program listesi alınamadı.');
    }
    return Array.isArray(data.programs) ? data.programs : [];
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export async function fetchProgramById(id) {
  try {
    const { data } = await client.get(`/programs/${encodeURIComponent(id)}`);
    if (!data?.success || !data.program) {
      throw new Error(data?.message || 'Program bulunamadı.');
    }
    return data.program;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {number|string} id
 * @returns {Promise<{ message: string, programId: number, program: object }>}
 */
export async function selectProgram(id) {
  try {
    const { data } = await client.post(`/programs/${encodeURIComponent(id)}/select`);
    if (!data?.success) {
      throw new Error(data?.message || 'Program seçilemedi.');
    }
    return {
      message: data.message || 'Program seçildi.',
      programId: data.programId,
      program: data.program,
    };
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

export function programLevelLabel(level) {
  switch (level) {
    case 'beginner':
      return 'Başlangıç';
    case 'intermediate':
      return 'Orta';
    case 'advanced':
      return 'İleri';
    default:
      return String(level ?? '');
  }
}
