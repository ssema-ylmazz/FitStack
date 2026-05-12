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
 * @returns {Promise<{ id: number, name: string, username: string, email: string, level: string }>}
 */
export async function fetchProfile() {
  try {
    const { data } = await client.get('/users/profile');
    if (!data?.success || !data.user) {
      throw new Error(data?.message || 'Profil alınamadı.');
    }
    return data.user;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

/**
 * @param {{ name?: string, username?: string, email?: string, level?: string }} fields
 */
export async function updateProfile(fields = {}) {
  try {
    const body = {};
    if (fields.name != null) body.name = String(fields.name).trim();
    if (fields.username != null) body.username = String(fields.username).trim();
    if (fields.email != null) body.email = String(fields.email).trim().toLowerCase();
    if (fields.level != null) body.level = String(fields.level).trim();

    const { data } = await client.put('/users/profile', body);
    if (!data?.success || !data.user) {
      throw new Error(data?.message || 'Profil güncellenemedi.');
    }
    return data.user;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}

export async function deleteProfile() {
  try {
    const { data } = await client.delete('/users/profile');
    if (!data?.success) {
      throw new Error(data?.message || 'Hesap silinemedi.');
    }
    return data;
  } catch (error) {
    throw wrapAxiosError(error);
  }
}
