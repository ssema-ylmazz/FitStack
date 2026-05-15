# FitStack — Mobil Back-End (REST API) Dokümantasyonu

Bu doküman, **mobil uygulamanın** bağlanacağı FitStack **REST API** özetidir. Sunucu kökünde çalışır; **`/v1` öneki kullanılmaz**. Ayrıntılı şema için [openapi.yaml](openapi.yaml) dosyasına bakınız.

---

## 1. Base URL

| Ortam | URL |
|--------|-----|
| Yerel geliştirme (mobil emülatör / aynı makine) | **`http://localhost:3000`** |

**Not:** Android emülatörde bilgisayardaki sunucuya erişim genelde `http://10.0.2.2:3000` ile yapılır. Fiziksel telefonda bilgisayarın yerel ağ IP adresi kullanılmalıdır.

---

## 2. Genel yanıt biçimi

Başarılı işlemlerde çoğu endpoint `success: true` ve ilgili veri alanlarını döner. Hatalarda HTTP durum kodu ile birlikte tipik olarak:

```json
{
  "success": false,
  "error": "KOD",
  "message": "Açıklama"
}
```

---

## 3. Auth (kayıt ve giriş)

### `POST /users/register`

- **Amaç:** Yeni kullanıcı kaydı (mobil: Kayıt ekranı).  
- **İstek gövdesi (özet):** `email`, `password` (zorunlu); `username`, `name` (isteğe bağlı).  
- **Yanıt (özet):** `201` — `success`, `message`, `user` (`id`, `name`, `username`, `email`, `level`).

### `POST /users/login`

- **Amaç:** Oturum açma (mobil: Giriş ekranı).  
- **İstek gövdesi (özet):** `email`, `password`.  
- **Yanıt (özet):** `200` — `success`, `message`, **`token`** (mock JWT benzeri), `user` (yukarıdaki alanlar).

---

## 4. Profile (profil ve hesap)

### `GET /users/profile`

- **Amaç:** Oturumdaki kullanıcının profilini okuma.  
- **Yanıt (özet):** `200` — `success`, `user` (`id`, `name`, `username`, `email`, `level`).

### `PUT /users/profile`

- **Amaç:** Profil güncelleme.  
- **İstek gövdesi (özet):** `name`, `username`, `email`, `level` (gönderilen alanlar güncellenir).  
- **Yanıt (özet):** `200` — `success`, `message`, `user`.

### `DELETE /users/profile`

- **Amaç:** Hesabı silme (mobilde onay diyaloğu önerilir).  
- **Yanıt (özet):** `200` — `success`, `message` (mock ortamda yeni demo oturumu oluşabilir).

---

## 5. Programs (programlar)

### `GET /programs`

- **Amaç:** Tüm programları veya filtreyi listeleme.  
- **Sorgu:** `?level=beginner` | `intermediate` | `advanced` (isteğe bağlı).  
- **Yanıt (özet):** `200` — `success`, `programs[]` (her biri: `id`, `title`, `level`, `duration`, `category`, `calories`, `description`), `count`.

### `GET /programs/:id`

- **Amaç:** Tek program detayı.  
- **Yanıt (özet):** `200` — `success`, `program` nesnesi; bulunamazsa `404`.

### `POST /programs/:id/select`

- **Amaç:** Kullanıcının aktif program seçimi (sonraki `POST /workouts` için varsayılan program).  
- **Yanıt (özet):** `200` — `success`, `message`, `programId`, `program`.

---

## 6. Workouts (antrenmanlar)

### `POST /workouts`

- **Amaç:** Yeni antrenman kaydı.  
- **İstek gövdesi (özet):** `programId` (isteğe bağlı; yoksa seçili veya varsayılan program), `duration`, `calories`, `date`, `note`.  
- **Yanıt (özet):** `201` — `success`, `message`, `workout` (`id`, `programId`, `programTitle`, `duration`, `calories`, `date`, `note`).

### `GET /workouts`

- **Amaç:** Geçmiş antrenman listesi.  
- **Yanıt (özet):** `200` — `success`, `workouts[]`, `count`.

### `PUT /workouts/:id/points`

- **Amaç:** Tamamlama / puan ekleme.  
- **İstek gövdesi (özet):** `points` (sayı; varsayılan sunucu tarafında tanımlı olabilir).  
- **Yanıt (özet):** `200` — `success`, `gainedPoints`, `totalPoints`, `workout`, vb.

### `DELETE /workouts/:id`

- **Amaç:** Kayıt silme.  
- **Yanıt (özet):** `200` — `success`, `message`, `id`, `workout` (silinen kayıt özeti).

---

## 7. Points (toplam puan)

### `GET /users/points`

- **Amaç:** Kullanıcının toplam puanını görüntüleme.  
- **Yanıt (özet):** `200` — `success`, `totalPoints`, `userId`, `updatedAt`.

---

## 8. Badges (rozetler)

### `GET /badges`

- **Amaç:** Kazanılan rozetlerin listesi.  
- **Yanıt (özet):** `200` — `success`, `badges[]` (`id`, `key`, `name`, `earnedAt`), `count`.

### `POST /badges`

- **Amaç:** Yeni rozet kazanma (kurallar istemci veya sunucu iş kuralına bağlı).  
- **İstek gövdesi (özet):** `key`, `name` (isteğe bağlı; varsayılanlar uygulanabilir).  
- **Yanıt (özet):** `201` — `success`, `message`, `badge`.

---

## 9. Streak (günlük seri)

### `GET /streak`

- **Amaç:** Seri bilgisini okuma.  
- **Yanıt (özet):** `200` — `success`, `streak` (`currentStreak`, `lastWorkoutDate`, `updatedAt`).

### `PUT /streak`

- **Amaç:** Seri güncelleme.  
- **İstek gövdesi (özet):** `currentStreak`, `lastWorkoutDate` (isteğe bağlı alanlar).  
- **Yanıt (özet):** `200` — `success`, `message`, `streak`.

---

## 10. Leaderboard (sıralama tablosu)

### `GET /leaderboard`

- **Amaç:** Haftalık veya aylık puan sıralaması (mobil: Liderlik sekmesi).  
- **Sorgu:** `?period=week` | `month` (varsayılan `week`).  
- **Yanıt (özet):** `200` — `success`, `period`, `leaderboard[]` (`id`, `username`, `points`, `streak`, `rank`).  
- **Önbellek:** Redis ile `fitstack:leaderboard:week` / `fitstack:leaderboard:month` (TTL 60 sn). Ayrıntı: [README.md](README.md).

---

## 11. Goals (hedefler)

### `GET /goals`

- **Amaç:** Kullanıcının hedef listesi ve ilerleme yüzdeleri.  
- **Yanıt (özet):** `200` — `success`, `goals[]`, `count`.

### `POST /goals`

- **Amaç:** Yeni hedef oluşturma.  
- **İstek gövdesi (özet):** `type` (`weekly_workouts` | `total_points` | `streak_days`); isteğe bağlı `title`, `target`.  
- **Yanıt (özet):** `201` — `success`, `message`, `goal` (ilerleme alanlarıyla).

### `PUT /goals/:id`

- **Amaç:** Hedef güncelleme veya manuel tamamlama.  
- **İstek gövdesi (özet):** `title`, `target`, `manualComplete` (isteğe bağlı).  
- **Yanıt (özet):** `200` — `success`, `message`, `goal`.

---

## 12. Activity Feed (aktivite akışı)

### `GET /activity-feed`

- **Amaç:** Son kullanıcı aktiviteleri (antrenman, puan, rozet, hedef).  
- **Yanıt (özet):** `200` — `success`, `activities[]` (`id`, `type`, `message`, `createdAt`), `count`.  
- **Mobil not:** `HomeScreen` son 5 kaydı gösterir; tam liste aynı endpoint’ten alınabilir.

---

## 13. Altyapı (Docker, Jenkins, Redis, RabbitMQ)

Proje final kapsamında aşağıdaki bileşenler **tamamlanmıştır**; ayrıntılar [README.md](README.md) içindedir:

| Bileşen | Kullanım |
|---------|----------|
| **Docker Compose** | `backend`, `web-frontend`, `redis`, `rabbitmq` — tek komutla yerel yığın |
| **Redis** | Leaderboard önbelleği (`fitstack:` öneki) |
| **RabbitMQ** | `fitstack.workout.created` kuyruğu; `POST /workouts` sonrası olay yayını |
| **Jenkins** | Kök `Jenkinsfile` — kurulum, syntax check, web build, mobil export, `docker compose build` |

**Statistics (mobil):** Ayrı REST endpoint yoktur; mobil uygulama workout/program/points verisinden istemci tarafında özet üretir.
