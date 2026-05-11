/**
 * Metro 0.83+ (Expo SDK 54) `mergeConfig` içinde `Array.prototype.toReversed` kullanır.
 * Bu metot Node 20+ ile gelir; Node 18 ve öncesinde yükleme sırasında hata oluşur.
 * Metro yapılandırması yüklenmeden önce güvenli bir polyfill uygulanır.
 */
if (typeof Array.prototype.toReversed !== 'function') {
  Object.defineProperty(Array.prototype, 'toReversed', {
    value: function toReversed() {
      return [...this].reverse();
    },
    configurable: true,
    writable: true,
  });
}

const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
module.exports = getDefaultConfig(__dirname);
