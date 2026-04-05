# Sema Yılmaz - REST API Testleri

**API Test Videosu:** [YOUTUBE_LINKI_BURAYA]  
**REST API Domain:** 'https://fitstack-a5v0.onrender.com`

---

## 1. Kullanıcı Kaydı

- **Endpoint:** `POST /users/register`
- **Request Body:**

```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

- **Response:** `201 Created` - Kayıt başarılı.

---

## 2. Profil Görüntüleme

- **Endpoint:** `GET /users/profile`
- **Response:** `200 OK` - Profil bilgileri döner.

---

## 3. Hesap Silme

- **Endpoint:** `DELETE /users/profile`
- **Response:** `200 OK` - Kullanıcı hesabı silindi.

---

## 4. Program Listeleme / Filtreleme

- **Endpoint:** `GET /programs`
- **Query Parameter:** `level` (opsiyonel) — `Başlangıç`, `Orta`, `İleri`
- **Örnek:** `GET /programs?level=Orta`
- **Response:** `200 OK` - Program listesi döner.

---

## 5. Antrenman Ekleme

- **Endpoint:** `POST /workouts`
- **Request Body:**

```json
{
  "name": "Sabah Koşusu",
  "duration": 30
}
```

- **Response:** `201 Created` - Workout eklendi.

---

## 6. Antrenman Silme

- **Endpoint:** `DELETE /workouts/:id`
- **Path Parameter:** `id` (Antrenman ID'si)
- **Response:** `200 OK` - Workout silindi.

---

## 7. Puan Kazanma (Workout Bazlı)

- **Endpoint:** `PUT /workouts/:id/points`
- **Path Parameter:** `id` (Antrenman ID'si)
- **Request Body:**

```json
{
  "points": 50
}
```

- **Response:** `200 OK` - Puan güncellendi.

---

## 8. Rozet Kazanma

- **Endpoint:** `POST /badges`
- **Response:** `200 OK` - Rozet kazanıldı.

---

## 9. Seri Bilgisi Görüntüleme (Streak)

- **Endpoint:** `GET /streak`
- **Response:** `200 OK` - Günlük seri bilgisi döner.
