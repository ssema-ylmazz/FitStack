import client from './client';

function messageFromAxiosError(error) {
  const data = error.response?.data;
  if (data && typeof data.message === 'string') return data.message;
  if (error.code === 'ECONNABORTED') return 'İstek zaman aşımına uğradı.';
  if (error.message === 'Network Error') {
    return 'Sunucuya ulaşılamıyor. Backend açık mı ve adres doğru mu kontrol edin (localhost / Expo Go).';
  }
  return 'Beklenmeyen bir hata oluştu.';
}

/**
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function loginWithPassword(email, password) {
  try {
    const { data } = await client.post('/users/login', {
      email: String(email).trim().toLowerCase(),
      password: String(password),
    });
    if (!data?.success || typeof data.token !== 'string' || !data.token) {
      throw new Error(data?.message || 'Giriş yanıtı geçersiz.');
    }
    return { token: data.token, user: data.user ?? null };
  } catch (error) {
    if (error.response) {
      throw new Error(messageFromAxiosError(error));
    }
    if (error instanceof Error && error.message) throw error;
    throw new Error(messageFromAxiosError(error));
  }
}

/**
 * Kayıt sonrası backend token dönmediği için çağıran tarafın login ile oturum açması gerekir.
 * @returns {Promise<{ user: object }>}
 */
export async function registerAccount({ email, password, name, username }) {
  try {
    const { data } = await client.post('/users/register', {
      email: String(email).trim().toLowerCase(),
      password: String(password),
      name: name != null ? String(name).trim() : undefined,
      username: username != null ? String(username).trim() : undefined,
    });
    if (!data?.success) {
      throw new Error(data?.message || 'Kayıt yanıtı geçersiz.');
    }
    return { user: data.user ?? null };
  } catch (error) {
    if (error.response) {
      throw new Error(messageFromAxiosError(error));
    }
    if (error instanceof Error && error.message) throw error;
    throw new Error(messageFromAxiosError(error));
  }
}
