# FitStack Mobil Back-End / REST API Bağlantısı

## Genel Bilgi

FitStack mobil uygulaması backend ile REST API üzerinden konuşur. Mobil tarafta API istekleri `fitstack-mobile/src/api/` klasörü altında toplanmıştır. Auth state ve token yönetimi `AuthContext` ve `AsyncStorage` ile yapılır.

## API Client

Ana dosya:

```text
fitstack-mobile/src/api/client.js
```

API client özellikleri:

- `baseURL`, `src/constants/config.js` içindeki `API_BASE_URL` değerinden gelir.
- İsteklerde JSON header kullanılır.
- AsyncStorage içinden token okunur.
- Token varsa istek headerına şu formatta eklenir:

```text
Authorization: Bearer <token>
```

- Response interceptor API hatalarını kullanıcıya gösterilebilir mesaja çevirir.
- Hata durumunda uygulama çökmez; hata ilgili ekranda gösterilir.

## AuthContext

Ana dosya:

```text
fitstack-mobile/src/context/AuthContext.js
```

Sağlanan temel işlemler:

| İşlem | Açıklama |
|---|---|
| `login` | Kullanıcı girişi yapar, token varsa saklar. |
| `register` | Kullanıcı kaydı isteği gönderir. |
| `logout` | Token'ı temizler ve kullanıcı oturumunu kapatır. |
| `refreshProfile` | Profil bilgisini tekrar API'den çekmeyi dener. |

Uygulama açılışında token varsa profil çekilmeye çalışılır. Hata olursa uygulama çökmeyecek şekilde davranır.

## AsyncStorage Token Yönetimi

Ana dosya:

```text
fitstack-mobile/src/utils/storage.js
```

Fonksiyonlar:

| Fonksiyon | Açıklama |
|---|---|
| `saveToken(token)` | Token'ı kaydeder. |
| `getToken()` | Kayıtlı token'ı okur. |
| `removeToken()` | Token'ı siler. |

## Bağlanan Endpointler

| Method | Endpoint | Mobil kullanım |
|---|---|---|
| POST | `/users/register` | Register ekranı |
| POST | `/users/login` | Login ekranı |
| GET | `/users/profile` | Auth/profile bilgisi |
| PUT | `/users/profile` | Profile güncelleme |
| DELETE | `/users/profile` | Profile silme |
| GET | `/users/points` | Dashboard toplam puan |
| GET | `/programs` | Program listesi ve filtre |
| GET | `/programs/:id` | Program detay API fonksiyonu |
| POST | `/programs/:id/select` | Program seçme |
| GET | `/workouts` | Workout geçmişi |
| DELETE | `/workouts/:id` | Workout silme |
| POST | `/workouts` | Workout ekleme API fonksiyonu |
| PUT | `/workouts/:id/points` | Workout puanı güncelleme API fonksiyonu |
| POST | `/exercises/complete` | Egzersiz tamamlama API fonksiyonu |
| GET | `/badges` | Dashboard rozet bilgisi |
| GET | `/streak` | Dashboard streak bilgisi |
| PUT | `/streak` | Streak güncelleme API fonksiyonu |
| GET | `/leaderboard?period=week/month` | Leaderboard ve Redis cache kanıtı |

## Redis ve RabbitMQ Mobil Tetikleyicileri

| Mobil aksiyon | Endpoint | Kanıt |
|---|---|---|
| Antrenmanlar > Demo Antrenman Kaydet | `POST /workouts` | RabbitMQ `fitstack.workout.created` kuyruğunda mesaj hareketi |
| Liderlik > Yenile | `GET /leaderboard?period=week/month` | Redis `fitstack:leaderboard:week/month` cache hit/miss davranışı |

## 17 Gereksinim ve API İlişkisi

| Gereksinim | API / mobil bağlantı |
|---|---|
| Register / Login | `/users/register`, `/users/login` |
| Profil görüntüle / güncelle / sil | `/users/profile` GET/PUT/DELETE |
| Program listele / filtrele | `/programs` |
| Program detay + program seç | `/programs/:id`, `/programs/:id/select` |
| Antrenman kaydet | `/workouts` POST |
| Geçmiş antrenmanları görüntüle | `/workouts` GET |
| Antrenman için puan kazan | `/workouts/:id/points` |
| Toplam puan görüntüle | `/users/points` |
| Rozet kazan / görüntüle | `/badges` |
| Streak/seri görüntüle / güncelle | `/streak` GET/PUT |
| Antrenman kaydını sil | `/workouts/:id` DELETE |

## Hüseyin'in Katkısı

Hüseyin Boğatekin'in mobil back-end / REST API entegrasyonu kapsamındaki katkıları:

- Axios API client kurulumu
- Authorization Bearer token interceptor
- Response error handling
- AuthContext yapısı
- AsyncStorage token yönetimi
- Login/Register API bağlantısı
- Programs API bağlantısı
- Program seçme API bağlantısı
- Dashboard için points, badges ve streak bağlantıları
- Workout history listeleme ve silme bağlantısı
- Profile update/delete/logout bağlantısı
- Backend kapalıyken mock fallback davranışları

İlgili branch ve commitler:

```text
feature/huseyin-mobile-api
c0835f4e Connect FitStack mobile screens to API
ac561364 Improve mobile API connected screens
c9a9fe97 Add mobile Redis and RabbitMQ demo triggers
75e423b3 Complete mobile requirement demo actions
419dbfe4 Upgrade mobile app to Expo SDK 54
```

## Backend Kapalıyken Davranış

Backend kapalıysa uygulama çökmez.

Fallback davranışları:

- `ProgramsScreen`: Mock program listesi gösterilir.
- `WorkoutHistoryScreen`: Mock workout geçmişi gösterilir.
- `DashboardScreen`: Mock puan/streak/rozet bilgileri korunur.
- `LeaderboardScreen`: Mock liderlik listesi gösterilir.

Bu fallback sadece demo akışının tamamen boş kalmaması içindir. REST API kanıtı için backend açıkken gösterim yapılmalıdır.

## Jenkins Mobil CI Bilgisi

Kök `Jenkinsfile` içinde mobil uygulama için `Mobile Install and Config Check` stage'i vardır. Bu stage `fitstack-mobile` içinde bağımlılık kurulumunu ve `npx expo config --type public` kontrolünü çalıştırır. CI ortamında takılı kalmaması için `expo start` kullanılmaz.

## REST API Kanıtı İçin Demo Senaryosu

1. Kullanıcı kayıt ekranı açılır.
2. Kullanıcı giriş ekranından demo kullanıcıyla giriş yapar.
3. Program listesi API'den çekilir.
4. Program detayına girilir.
5. Program seçme butonu ile `/programs/:id/select` isteği gösterilir.
6. Dashboard'da points/badges/streak bilgileri kontrol edilir.
7. Profile ekranında profil güncelleme denenir.
8. Workout geçmişi ekranında kayıtlar listelenir.

## Kapsam Dışı Kalanlar

Goals ve activity feed endpointleri backend tarafında vardır, ancak bu aşamada mobil UI'a bağlanmamıştır.
