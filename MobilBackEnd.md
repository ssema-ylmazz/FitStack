# Mobil Backend (REST API Bağlantısı) Görev Dağılımı

## Genel Bilgi

Bu dokümanda FitStack mobil uygulamasının backend REST API bağlantısı ve mobil veri akışı görevleri listelenir. Mobil tarafta API istekleri `fitstack-mobile/src/api/` klasörü altında toplanmıştır. Auth state ve token yönetimi `AuthContext` ve `AsyncStorage` ile yapılır.

## REST API Adresi

| Ortam | API adresi |
|---|---|
| Local/web test | `http://localhost:3000` |
| Android emulator | `http://10.0.2.2:3000` |
| Fiziksel telefon | `http://BILGISAYAR_LAN_IP:3000` |

Fiziksel telefonda `localhost` telefonun kendisini gösterdiği için bilgisayarın LAN IP adresi kullanılmalıdır. Kişisel IP değerleri repo'ya commitlenmemelidir.

## Grup Üyelerinin Gereksinim Bazlı Mobil Görevleri

| Üye | Sorumlu gereksinimler | Doküman |
|---|---|---|
| Sema Nur Yılmaz | 1, 2, 6, 7, 8, 12, 14, 15 | [Sema mobil görevleri](Sema-Yilmaz/Sema-Yilmaz-Mobil-Frontend-Gorevleri.md) |
| Hüseyin Boğatekin | 3, 4, 5, 9, 10, 11, 13, 16, 17 | [Hüseyin mobil görevleri](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Backend-Gorevleri.md) |

## Genel Mobil Backend Prensipleri

- Tüm HTTP istekleri ortak Axios client üzerinden yönetilir.
- Token varsa isteklerde `Authorization: Bearer <token>` header'ı kullanılır.
- AsyncStorage, mobil oturum token'ını saklamak için kullanılır.
- API hataları kullanıcıya gösterilebilir mesajlara dönüştürülür.
- Backend kapalıyken kritik ekranlarda mock/fallback veri gösterilir.
- Uygulama backend bağlantısı başarısız olduğunda çökmeyecek şekilde tasarlanmıştır.

## API Client ve Auth Yönetimi

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

| Gereksinim no | Endpoint | Method | Mobil ekran | Açıklama |
|---|---|---|---|---|
| 1 | `/users/register` | POST | Register | Kullanıcı kaydı |
| 2 | `/users/login` | POST | Login | Kullanıcı girişi ve token alma |
| 3 | `/users/profile` | GET | Profil | Profil bilgisi görüntüleme |
| 4 | `/users/profile` | PUT | Profil | Profil bilgisi güncelleme |
| 5 | `/users/profile` | DELETE | Profil | Hesap silme |
| 6 | `/programs` | GET | Programlar | Program listesi |
| 7 | `/programs?level=...` | GET | Programlar | Seviye filtresi |
| 8 | `/programs/:id`, `/programs/:id/select` | GET, POST | Program Detayı | Program detay ve seçme |
| 9 | `/workouts` | POST | Antrenmanlar | Antrenman kaydetme |
| 10 | `/workouts` | GET | Antrenmanlar | Geçmiş antrenmanları listeleme |
| 11 | `/workouts/:id/points` | PUT | Antrenmanlar | Workout puanı kazanma |
| 12 | `/users/points` | GET | Ana Sayfa | Toplam puan görüntüleme |
| 13 | `/badges` | POST | Ana Sayfa | Demo rozet kazanma |
| 14 | `/badges` | GET | Ana Sayfa | Rozetleri görüntüleme |
| 15 | `/streak` | GET | Ana Sayfa | Günlük seri görüntüleme |
| 16 | `/streak` | PUT | Ana Sayfa | Günlük seri güncelleme |
| 17 | `/workouts/:id` | DELETE | Antrenmanlar | Antrenman kaydını silme |
| Demo | `/leaderboard?period=week/month` | GET | Liderlik | Redis cache kanıtı |

## Hüseyin Boğatekin'in Sorumlu Gereksinimleri

Hüseyin Boğatekin, aşağıdaki gereksinimlerin mobil ekran/API akışını, REST API bağlantısını ve kanıt videosunda çalışır durumunu anlatır.

| Gereksinim no | Açıklama | Endpoint | Method | Mobil ekran |
|---|---|---|---|---|
| 3 | Kullanıcı profil bilgilerini görüntüler | `/users/profile` | GET | Profil |
| 4 | Kullanıcı profil bilgilerini günceller | `/users/profile` | PUT | Profil |
| 5 | Kullanıcı hesabını siler | `/users/profile` | DELETE | Profil |
| 9 | Kullanıcı yaptığı antrenmanı kaydeder | `/workouts` | POST | Antrenmanlar |
| 10 | Kullanıcı geçmiş antrenmanlarını görüntüler | `/workouts` | GET | Antrenmanlar |
| 11 | Kullanıcı tamamladığı antrenman için puan kazanır | `/workouts/:id/points` | PUT | Antrenmanlar |
| 13 | Kullanıcı belirli puanlara ulaştığında rozet kazanır | `/badges` | POST | Ana Sayfa |
| 16 | Kullanıcı seri bilgilerini günceller | `/streak` | PUT | Ana Sayfa |
| 17 | Kullanıcı antrenman kaydını siler | `/workouts/:id` | DELETE | Antrenmanlar |

## Redis Bağlantısı

Leaderboard ekranı `GET /leaderboard?period=week/month` endpointini çağırır. Backend bu yanıtta Redis cache kullanır. Kanıt videosunda ilk istek cache miss, sonraki istek cache hit olarak backend logları veya Redis CLI ile gösterilebilir.

## RabbitMQ Bağlantısı

Antrenmanlar ekranındaki **Demo Antrenman Kaydet** butonu `POST /workouts` endpointini çağırır. Backend bu işlemde RabbitMQ tarafına `fitstack.workout.created` kuyruğu üzerinden workout oluşturma olayı yayınlar. Kanıt videosunda RabbitMQ management panelde bu kuyrukta spike/hareket gösterilebilir.

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

## Jenkins CI/CD

Kök `Jenkinsfile` içinde mobil uygulama için `Mobile Install and Config Check` stage'i vardır.

```bash
cd fitstack-mobile
npm ci || npm install
npx expo config --type public
```

CI ortamında development server takılı kalmasın diye `npx expo start` kullanılmaz.

## Hüseyin Boğatekin'in Sorumlu Gereksinim Katkıları

Hüseyin Boğatekin'in sorumlu olduğu mobil gereksinimlerin REST API bağlantılı demo akışı kapsamındaki katkıları:

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
- Redis leaderboard bağlantısı
- RabbitMQ workout demo tetikleyicisi
- Jenkins mobil CI stage açıklaması

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

## REST API Kanıtı İçin Demo Senaryosu

1. Kullanıcı kayıt ekranı açılır.
2. Kullanıcı giriş ekranından demo kullanıcıyla giriş yapar.
3. Program listesi API'den çekilir.
4. Program detayına girilir.
5. Program seçme butonu ile `/programs/:id/select` isteği gösterilir.
6. Dashboard'da points/badges/streak bilgileri kontrol edilir.
7. Profile ekranında profil güncelleme denenir.
8. Workout geçmişi ekranında kayıtlar listelenir.
9. Demo Antrenman Kaydet ile RabbitMQ kuyruğu izlenir.
10. Leaderboard Yenile ile Redis cache hit/miss izlenir.
11. Jenkins pipeline içinde mobil stage gösterilir.

## Kanıt Videosunda Gösterilecek Backend Akışı

1. Register/Login isteği
2. Program listesi ve program seçme
3. Antrenman kaydetme ve RabbitMQ kuyruğu
4. Leaderboard yenileme ve Redis cache davranışı
5. Profil güncelleme/silme
6. Workout puan kazanma ve workout silme
7. Jenkins pipeline mobil kontrol stage'i

## Kapsam Dışı Kalanlar

Goals ve activity feed endpointleri backend tarafında vardır, ancak bu aşamada mobil UI'a bağlanmamıştır.
