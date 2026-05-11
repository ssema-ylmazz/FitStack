/**
 * Tarih / sayı formatları — ekranlar bağlandıkça genişletilebilir.
 * @param {string} value
 * @returns {string}
 */
export function formatDateDisplay(value) {
  if (value == null || value === '') return '';
  return String(value);
}
