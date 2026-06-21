# FitStack Mobile

FitStack Mobile, FitStack projesi için Expo SDK 54 tabanlı React Native mobil uygulamasıdır. Expo Go, iOS/Android emülatörü veya web üzerinden çalıştırılır.

## Kurulum

```bash
cd fitstack-mobile
npm install
```

## Çalıştırma

```bash
npm start
npm run android
npm run ios
npm run web
```

## Backend Bağlantısı

Varsayılan API adresi `src/constants/config.js` içinde `http://localhost:3000` olarak ayarlıdır.

Fiziksel telefonda test ederken `localhost` telefonun kendisini işaret eder. Bu nedenle backend'e bağlanmak için bilgisayarın LAN IP adresini kullanın:

```js
export const API_BASE_URL = 'http://192.168.1.35:3000';
```

Android emulator kullanırken genellikle:

```js
export const API_BASE_URL = 'http://10.0.2.2:3000';
```

Web/local test için:

```js
export const API_BASE_URL = 'http://localhost:3000';
```

## Test Edilecek Ekranlar

| Ekran | Demo amacı |
|---|---|
| Login / Register | Auth akışı |
| Ana Sayfa | Puan, rozet, seri ve demo rozet/seri aksiyonları |
| Programlar | Program listesi ve filtreleme |
| Program Detayı | Egzersiz listesi ve program seçme |
| Antrenmanlar | Workout geçmişi, puan kazanma, silme ve RabbitMQ demo aksiyonu |
| Liderlik | Redis cache kanıtı için leaderboard |
| Profil | Profil görüntüleme, güncelleme, silme ve çıkış |

## Redis ve RabbitMQ Demo Tetikleyicileri

| Kanıt | Mobil aksiyon | Backend etkisi |
|---|---|---|
| RabbitMQ | Antrenmanlar > Demo Antrenman Kaydet | `POST /workouts` çağrılır ve `fitstack.workout.created` kuyruğunda mesaj hareketi oluşur. |
| Redis | Liderlik > Yenile | `GET /leaderboard?period=week/month` çağrılır; cache miss/hit backend logları veya Redis CLI ile gösterilebilir. |

## Not

Mobil uygulama Docker container olarak çalıştırılmaz. Docker Compose backend, web frontend, Redis ve RabbitMQ servislerini ayağa kaldırır; mobil uygulama bu backend REST API'ye telefon veya emülatör üzerinden bağlanır.
