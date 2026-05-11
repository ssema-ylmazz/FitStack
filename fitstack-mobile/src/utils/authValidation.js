const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 6;

export function isNonEmpty(value) {
  return value != null && String(value).trim().length > 0;
}

export function isValidEmail(email) {
  return EMAIL_RE.test(String(email).trim());
}

/**
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function validateRegisterForm({ name, username, email, password }) {
  if (!isNonEmpty(name)) return { ok: false, error: 'Ad soyad gerekli.' };
  if (!isNonEmpty(username)) return { ok: false, error: 'Kullanıcı adı gerekli.' };
  if (!isNonEmpty(email)) return { ok: false, error: 'E-posta gerekli.' };
  if (!isValidEmail(email)) return { ok: false, error: 'Geçerli bir e-posta girin.' };
  if (!isNonEmpty(password)) return { ok: false, error: 'Şifre gerekli.' };
  if (String(password).length < MIN_PASSWORD_LENGTH) {
    return { ok: false, error: `Şifre en az ${MIN_PASSWORD_LENGTH} karakter olmalı.` };
  }
  return { ok: true };
}

/**
 * @returns {{ ok: true } | { ok: false, error: string }}
 */
export function validateLoginForm({ email, password }) {
  if (!isNonEmpty(email)) return { ok: false, error: 'E-posta gerekli.' };
  if (!isValidEmail(email)) return { ok: false, error: 'Geçerli bir e-posta girin.' };
  if (!isNonEmpty(password)) return { ok: false, error: 'Şifre gerekli.' };
  return { ok: true };
}
