# FitStack Kullanım Senaryoları

Bu doküman, [gereksinimler.md](../gereksinimler.md) içindeki 17 fonksiyonel
gereksinimi aktör, mobil ekran, REST endpoint ve sorumlu üye ile eşleştirir.
Ayrıntılı senaryo yazımında
[Kullanım Senaryosu Şablonu](Kullanim-Senaryosu-Sablonu.md) kullanılmalıdır.

## Aktörler

| Aktör | Açıklama |
|-------|----------|
| Kullanıcı | Mobil veya web uygulaması üzerinden fitness işlemlerini yürütür. |
| FitStack API | İstekleri doğrular, iş kurallarını uygular ve veriyi yönetir. |
| Redis | Uygun okuma sonuçlarını önbelleğe alır. |
| RabbitMQ | Asenkron antrenman olaylarını taşır. |

## Senaryo Matrisi

| UC | G | Kullanım senaryosu | Sorumlu | Endpoint | Mobil karşılık |
|----|---|--------------------|---------|----------|----------------|
| UC-01 | G-1 | Kullanıcı kaydı oluşturma | Sema | `POST /users/register` | `RegisterScreen` |
| UC-02 | G-2 | Kullanıcı girişi yapma | Hüseyin | `POST /users/login` | `LoginScreen` |
| UC-03 | G-3 | Profil görüntüleme | Sema | `GET /users/profile` | `ProfileScreen` |
| UC-04 | G-4 | Profil güncelleme | Hüseyin | `PUT /users/profile` | `EditProfileScreen` |
| UC-05 | G-5 | Hesap silme | Sema | `DELETE /users/profile` | `ProfileScreen` |
| UC-06 | G-6 | Programları listeleme | Hüseyin | `GET /programs` | `ProgramsScreen` |
| UC-07 | G-7 | Programları filtreleme | Sema | `GET /programs?level=...` | `ProgramsScreen` |
| UC-08 | G-8 | Program seçme ve detay görüntüleme | Hüseyin | `GET /programs/:id`, `POST /programs/:id/select` | `ProgramDetailScreen` |
| UC-09 | G-9 | Antrenman kaydı oluşturma | Sema | `POST /workouts` | `WorkoutCreateScreen` |
| UC-10 | G-10 | Geçmiş antrenmanları görüntüleme | Hüseyin | `GET /workouts` | `WorkoutHistoryScreen` |
| UC-11 | G-11 | Antrenman puanı kazanma | Sema | `PUT /workouts/:id/points` | `WorkoutHistoryScreen` |
| UC-12 | G-12 | Toplam puanı görüntüleme | Hüseyin | `GET /users/points` | `PointsScreen` |
| UC-13 | G-13 | Rozet kazanma | Sema | `POST /badges` | `BadgesScreen` |
| UC-14 | G-14 | Rozetleri görüntüleme | Hüseyin | `GET /badges` | `BadgesScreen` |
| UC-15 | G-15 | Günlük seriyi görüntüleme | Sema | `GET /streak` | `StreakScreen` |
| UC-16 | G-16 | Seri bilgisini güncelleme | Hüseyin | `PUT /streak` | `StreakScreen` |
| UC-17 | G-17 | Antrenman kaydını silme | Sema | `DELETE /workouts/:id` | `WorkoutHistoryScreen` |

## Ortak Ana Akış

1. Kullanıcı ilgili mobil ekrana gider ve işlemi başlatır.
2. Mobil uygulama girdileri doğrular ve REST API isteğini gönderir.
3. FitStack API isteği işler ve uygun HTTP durum koduyla yanıt verir.
4. Veri oluşturan veya değiştiren işlemlerde kalıcı veri güncellenir.
5. Mobil uygulama başarılı sonucu veya hata mesajını kullanıcıya gösterir.

## Genel Alternatif Akışlar

- Geçersiz girdide API `400` döndürür ve mobil uygulama doğrulama mesajı gösterir.
- Yetkisiz işlemde API `401` döndürür ve kullanıcı giriş akışına yönlendirilir.
- Kayıt bulunamadığında API `404` döndürür ve ilgili boş/hata durumu gösterilir.
- Ağ hatasında işlem tekrar denenebilir ve kullanıcıya bağlantı hatası bildirilir.

## Kanıt Kuralı

Her bireysel mobil back-end videosunda ilgili UC/G numarası söylenmeli; mobil
işlem, REST isteği, backend logu ve veri değişimi aynı kayıt içinde net biçimde
gösterilmelidir.
