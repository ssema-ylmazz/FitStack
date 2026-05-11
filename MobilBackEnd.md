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

## 10. Sonraki aşamalar (final kapsamı dışı — bilgilendirme)

Aşağıdaki başlıklar **bu mobil doküman kapsamında uygulanmamıştır**; ders / proje gereksinimlerine göre **ileriki aşamada** ele alınacaktır:

- **Docker:** API ve istemcilerin konteyner içinde çalıştırılması, `docker-compose` ile ortamın tek komutta ayağa kalkması.  
- **Redis / Memcache:** Oturum, önbellek veya hız sınırlandırma gibi kullanım kanıtı.  
- **RabbitMQ / Kafka:** Asenkron iş kuyruğu veya olay akışı kanıtı.  
- **CI/CD (ör. Jenkinsfile):** Otomatik derleme, test ve dağıtım hattı.

Bu maddeler eklendiğinde hem [README.md](README.md) hem de dağıtım adresleri güncellenmelidir.
