# Hüseyin Boğatekin Sorumlu Mobil Gereksinim Görevleri

## Öğrenci Bilgisi

| Alan | Bilgi |
|---|---|
| Öğrenci adı | Hüseyin Boğatekin |
| Görev alanı | Sorumlu mobil gereksinimlerin REST API bağlantılı demo akışı |
| Branch | `feature/huseyin-mobile-api` |

## Commitler

| Commit | Açıklama |
|---|---|
| `c0835f4e Connect FitStack mobile screens to API` | Mobil API client, AuthContext, token storage ve temel API bağlantıları |
| `ac561364 Improve mobile API connected screens` | Dashboard, profile, program filtreleme ve workout history API bağlantılarının güçlendirilmesi |
| `c9a9fe97 Add mobile Redis and RabbitMQ demo triggers` | Redis leaderboard ve RabbitMQ workout demo tetikleyicilerinin mobil UI'a bağlanması |
| `75e423b3 Complete mobile requirement demo actions` | 17 gereksinimin mobil demo sırasında görünür hale getirilmesi |
| `419dbfe4 Upgrade mobile app to Expo SDK 54` | Expo Go uyumluluğu için mobil uygulamanın SDK 54'e yükseltilmesi |

## Yapılan İşler

Hüseyin'in sorumlu olduğu mobil gereksinimlerin REST API bağlantılı demo akışı kapsamında yaptığı işler:

- Axios API client kurulumu
- `Authorization: Bearer <token>` header desteği
- Response error handling
- AuthContext oluşturulması
- AsyncStorage token yönetimi
- Login API bağlantısı
- Register API bağlantısı
- Programs API bağlantısı
- Program seçme API bağlantısı
- Dashboard için points/badges/streak API bağlantıları
- Workout history listeleme
- Workout silme
- Profile update
- Profile delete
- Logout akışı
- Backend kapalıyken mock fallback davranışları
- Redis kanıtı için Leaderboard endpoint bağlantısı
- RabbitMQ kanıtı için Demo Antrenman Kaydet aksiyonu
- Jenkins mobil CI stage bilgisinin dokümantasyonda görünür hale getirilmesi

## Sorumlu Gereksinimler

| Gereksinim no | Açıklama | HTTP metodu | Mobil ekran | Videoda gösterilecek işlem |
|---|---|---|---|---|
| 3 | Kullanıcı profil bilgilerini görüntüler | GET | Profil | Profil bilgisinin API ile görüntülenmesi |
| 4 | Kullanıcı profil bilgilerini günceller | PUT | Profil | Profil güncelleme isteği |
| 5 | Kullanıcı hesabını siler | DELETE | Profil | Hesap silme onay akışı |
| 9 | Kullanıcı yaptığı antrenmanı kaydeder | POST | Antrenmanlar | Demo Antrenman Kaydet ve RabbitMQ kuyruğu |
| 10 | Kullanıcı geçmiş antrenmanlarını görüntüler | GET | Antrenmanlar | Workout geçmişi listesi |
| 11 | Kullanıcı tamamladığı antrenman için puan kazanır | PUT | Antrenmanlar | Puan Kazan aksiyonu |
| 13 | Kullanıcı belirli puanlara ulaştığında rozet kazanır | POST | Ana Sayfa | Demo Rozet Kazan aksiyonu |
| 16 | Kullanıcı seri bilgilerini günceller | PUT | Ana Sayfa | Seriyi Güncelle aksiyonu |
| 17 | Kullanıcı antrenman kaydını siler | DELETE | Antrenmanlar | Workout silme işlemi |

## İlgili Dosyalar

| Dosya | Açıklama |
|---|---|
| `fitstack-mobile/src/api/client.js` | Axios client, baseURL, token interceptor, error handling |
| `fitstack-mobile/src/api/authApi.js` | Register, login, profile get/update/delete API fonksiyonları |
| `fitstack-mobile/src/api/programsApi.js` | Programs list/detail/select API fonksiyonları |
| `fitstack-mobile/src/api/workoutsApi.js` | Workout list/create/delete/points ve exercise complete fonksiyonları |
| `fitstack-mobile/src/api/profileApi.js` | Points, streak, badges ve profile yardımcı API fonksiyonları |
| `fitstack-mobile/src/context/AuthContext.js` | Auth state, login/register/logout/refreshProfile |
| `fitstack-mobile/src/utils/storage.js` | Token save/get/remove fonksiyonları |
| `fitstack-mobile/src/screens/LoginScreen.js` | Login API bağlantısı |
| `fitstack-mobile/src/screens/RegisterScreen.js` | Register API bağlantısı |
| `fitstack-mobile/src/screens/ProgramsScreen.js` | Program listesi API bağlantısı ve filtre |
| `fitstack-mobile/src/screens/ProgramDetailScreen.js` | Program seçme API bağlantısı |
| `fitstack-mobile/src/screens/DashboardScreen.js` | Points, badges, streak API bağlantısı |
| `fitstack-mobile/src/screens/WorkoutHistoryScreen.js` | Workout geçmişi ve silme API bağlantısı |
| `fitstack-mobile/src/screens/ProfileScreen.js` | Profile update/delete/logout bağlantısı |
| `fitstack-mobile/src/screens/LeaderboardScreen.js` | Leaderboard API bağlantısı ve Redis cache demo akışı |

## Bağlanan REST Endpointleri

| Method | Endpoint |
|---|---|
| POST | `/users/register` |
| POST | `/users/login` |
| GET | `/users/profile` |
| PUT | `/users/profile` |
| DELETE | `/users/profile` |
| GET | `/users/points` |
| GET | `/programs` |
| GET | `/programs/:id` |
| POST | `/programs/:id/select` |
| GET | `/workouts` |
| DELETE | `/workouts/:id` |
| POST | `/workouts` |
| PUT | `/workouts/:id/points` |
| POST | `/exercises/complete` |
| GET | `/badges` |
| GET | `/streak` |
| PUT | `/streak` |
| GET | `/leaderboard?period=week/month` |

## Redis/RabbitMQ Kanıt Akışları

| Teknoloji | Mobil ekran/aksiyon | Endpoint | Kanıt |
|---|---|---|---|
| RabbitMQ | Antrenmanlar > Demo Antrenman Kaydet | `POST /workouts` | `fitstack.workout.created` kuyruğunda mesaj hareketi |
| Redis | Liderlik > Yenile | `GET /leaderboard?period=week/month` | Redis cache miss/hit ve `fitstack:leaderboard:*` anahtarları |

## Kanıt Videosunda Gösterilecek Hüseyin Görevleri

1. Profil görüntüleme, güncelleme ve silme
2. Demo Antrenman Kaydet ile `POST /workouts` ve RabbitMQ kuyruğu
3. Workout geçmişi listeleme
4. Puan Kazan aksiyonu
5. Demo Rozet Kazan aksiyonu
6. Seriyi Güncelle aksiyonu
7. Workout silme işlemi
8. Redis için Liderlik > Yenile akışı
9. Kendi sorumlu gereksinimlerini kendi sesiyle anlatması

## Backend Kapalıyken Fallback

Mobil uygulama backend kapalıyken çökmez. Programs, Dashboard ve WorkoutHistory ekranlarında mock fallback davranışı vardır. Bu davranış demo akışının boş kalmaması içindir; REST API kanıtı için backend açıkken gösterim yapılmalıdır.

## Not

Goals ve activity feed mobil UI'a bağlanmamıştır. Bu alanlar teslim videosunda yapılmış gibi gösterilmemelidir.
