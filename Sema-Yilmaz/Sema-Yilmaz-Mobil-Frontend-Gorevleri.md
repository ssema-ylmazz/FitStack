# Sema Nur Yılmaz — Mobil Front-End Görevleri (FitStack)

## Mobile Front-end Demo Videosu

**Video Linki:** [YOUTUBE_LINKI_BURAYA]

Bu videoda görev kapsamındaki mobil ekranlar simülatör veya gerçek cihaz
üzerinde çalışır durumda gösterilmelidir.

Bu doküman, **DevFit / FitStack** mobil uygulamasında **Sema Nur Yılmaz** tarafından üstlenmesi planlanan **mobil arayüz** görevlerini listeler. Gereksinim numaraları [gereksinimler.md](../gereksinimler.md) ile uyumludur.

---

## Sorumlu olunan gereksinimler (mobil)

| No | Gereksinim | Öncelikli ekran / bileşen |
|----|-------------|---------------------------|
| 1 | Kullanıcı kaydı olma | `RegisterScreen` — form (ad, kullanıcı adı, e-posta, şifre), doğrulama mesajları, başarılı kayıt sonrası oturum veya giriş ekranına yönlendirme |
| 3 | Profil görüntüleme | `ProfileScreen` — `GET /users/profile` yanıtındaki `user` nesnesini gösterme (`id`, `name`, `username`, `email`, `level`) |
| 5 | Hesap silme | `ProfileScreen` — onay diyaloğu, `DELETE /users/profile`, sonrası token temizliği ve auth akışına dönüş |
| 7 | Program filtreleme | `ProgramsScreen` — `beginner` / `intermediate` / `advanced` seçimi ile `GET /programs?level=...` |
| 9 | Antrenman kaydı oluşturma | `WorkoutCreateScreen` — program seçimi, süre / not vb.; `POST /workouts` |
| 11 | Puan kazanma | Antrenman tamamlama UX’i (ör. geçmiş veya oluşturma sonrası) — `PUT /workouts/:id/points`, kullanıcıya kazanılan puan geri bildirimi |
| 13 | Rozet kazanma | Koşul gerçekleştiğinde `POST /badges` tetikleme; `BadgesScreen` veya ana akışla uyumlu bildirim |
| 15 | Günlük seri görüntüleme | `StreakScreen` — `GET /streak` ile `currentStreak`, `lastWorkoutDate` gösterimi |
| 17 | Antrenman kaydını silme | `WorkoutHistoryScreen` — liste öğesinde silme, `DELETE /workouts/:id`, liste yenileme |

---

## Teknik notlar

- Ortak bileşenler: `AppButton`, `AppInput`, `AppCard`, `Loading`, `EmptyState` (`fitstack-mobile/src/components/`).  
- Navigasyon: Kayıt sonrası uygulama `MainTabs` içine geçer; profil ve antrenman sekmeleri ile koordinasyon gerekir.  
- Genel mobil mimari: [MobilFrontEnd.md](../MobilFrontEnd.md).

---

## Teslim ve doğrulama önerisi

- Her madde için en az bir **ekran görüntüsü** veya kısa **ekran kaydı** (simülatör veya gerçek cihaz).  
- Hata durumlarında API’nin döndürdüğü `message` alanının kullanıcıya anlaşılır şekilde gösterilmesi.
