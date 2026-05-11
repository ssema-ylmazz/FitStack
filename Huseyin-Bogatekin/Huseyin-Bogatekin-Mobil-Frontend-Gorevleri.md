# Hüseyin Boğatekin — Mobil Front-End Görevleri (FitStack)

Bu doküman, **DevFit / FitStack** mobil uygulamasında **Hüseyin Boğatekin** tarafından üstlenmesi planlanan **mobil arayüz** görevlerini listeler. Gereksinim numaraları [gereksinimler.md](../gereksinimler.md) ile uyumludur.

---

## Sorumlu olunan gereksinimler (mobil)

| No | Gereksinim | Öncelikli ekran / bileşen |
|----|-------------|---------------------------|
| 2 | Kullanıcı girişi | `LoginScreen` — e-posta / şifre, `POST /users/login`, token’ı `tokenStorage` ile saklama, ana sekmelere geçiş |
| 4 | Profil güncelleme | `EditProfileScreen` — düzenlenebilir alanlar, `PUT /users/profile`, başarı geri bildirimi ve `ProfileScreen` ile tutarlılık |
| 6 | Program listeleme | `ProgramsScreen` — `GET /programs` ile kart veya liste; yükleme ve boş durum (`Loading`, `EmptyState`) |
| 8 | Program seçme ve detay görüntüleme | `ProgramsScreen` → `ProgramDetailScreen`; detayda `GET /programs/:id`, seçimde `POST /programs/:id/select` ve kullanıcıya geri bildirim |
| 10 | Geçmiş antrenmanları görüntüleme | `WorkoutHistoryScreen` — `GET /workouts`, tarih / süre / not gösterimi, silme (Sema ile UI uyumu) |
| 12 | Toplam puan görüntüleme | `PointsScreen` — `GET /users/points`, `totalPoints` vurgusu; istenirse ana sayfada özet |
| 14 | Rozetleri görüntüleme | `BadgesScreen` — `GET /badges`, rozet kartları (`name`, `earnedAt` formatı için [formatters.js](../fitstack-mobile/src/utils/formatters.js) genişletilebilir) |
| 16 | Seri bilgisi güncelleme | `StreakScreen` — form veya adım adım akış ile `PUT /streak` (`currentStreak`, `lastWorkoutDate`) |

---

## Teknik notlar

- Giriş akışı, `AuthContext` içindeki `login` fonksiyonunun gerçek API ile doldurulmasıyla tamamlanır; çıkış `ProfileScreen` üzerinden veya ortak bir menü ile yapılabilir.  
- Program detay ekranında seçim butonu ve seçim sonrası antrenman oluşturma ekranına yönlendirme kullanıcı deneyimini iyileştirir.  
- Genel mimari: [MobilFrontEnd.md](../MobilFrontEnd.md).

---

## Teslim ve doğrulama önerisi

- Girişten sonra dört sekmenin tamamında tutarlı başlık ve geri navigasyon davranışı.  
- Puan ve rozet ekranlarında sunucudan gelen verinin doğrudan yansıtılması (mock sayılara güvenmeden).
