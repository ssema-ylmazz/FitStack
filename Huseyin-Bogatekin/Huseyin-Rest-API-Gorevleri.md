# Hüseyin Boğatekin - REST API Testleri

**API Test Videosu:** [YOUTUBE_LINKI_BURAYA]  
**REST API Domain:** `[http://localhost:3000](https://fitstack-a5v0.onrender.com)`

---

## 1. Kullanıcı Girişi

- **Endpoint:** `POST /users/login`
- **Request Body:**

```json
{
  "email": "test@mail.com",
  "password": "123456"
}
```

- **Response:** `200 OK` - Giriş başarılı.

---

## 2. Profil Güncelleme

- **Endpoint:** `PUT /users/profile`
- **Request Body:**

```json
{
  "name": "Hüseyin",
  "level": "Orta"
}
```

- **Response:** `200 OK` - Profil güncellendi.

---

## 3. Program Listeleme

- **Endpoint:** `GET /programs`
- **Response:** `200 OK` - Tüm program listesi döner.

---

## 4. Program Seçme ve Detay

- **Endpoint:** `POST /programs/:id/select`
- **Path Parameter:** `id` (Program ID'si)
- **Response:** `200 OK` - Seçilen program bilgisi döner.

---

## 5. Geçmiş Antrenmanlar

- **Endpoint:** `GET /workouts`
- **Response:** `200 OK` - Antrenman listesi döner.

---

## 6. Toplam Puan (Workout Bazlı)

- **Endpoint:** `PUT /workouts/:id/points`
- **Request Body:**

```json
{
  "points": 50
}
```

- **Response:** `200 OK` - Puan güncellendi.

---

## 7. Rozetleri Görüntüleme

- **Endpoint:** `GET /badges`
- **Response:** `200 OK` - Kullanıcının kazandığı rozetler listelenir.

---

## 8. Seri Bilgisi Güncelleme (Streak)

- **Endpoint:** `PUT /streak`
- **Request Body:**

```json
{
  "days": 5
}
```

- **Response:** `200 OK` - Günlük seri bilgisi güncellendi.
