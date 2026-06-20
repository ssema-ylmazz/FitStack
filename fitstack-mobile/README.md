# FitStack Mobile

FitStack Mobile, FitStack projesi icin Expo tabanli React Native mobil uygulama iskeletidir.

## Kurulum

```bash
cd fitstack-mobile
npm install
```

## Calistirma

```bash
npm start
npm run android
npm run ios
npm run web
```

## Backend Baglantisi

Varsayilan API adresi `src/constants/config.js` icinde `http://localhost:3000` olarak ayarlidir.

Fiziksel telefonda test ederken `localhost` telefonun kendisini isaret eder. Bu nedenle backend'e baglanmak icin bilgisayarin LAN IP adresini kullanin:

```js
export const API_BASE_URL = 'http://192.168.1.25:3000';
```

Android emulator kullanirken genellikle `http://10.0.2.2:3000` kullanilir.
