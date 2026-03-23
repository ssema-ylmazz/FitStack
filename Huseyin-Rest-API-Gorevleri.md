# Hüseyin Boğatekin - REST API Testleri

**API Test Videosu:** [YOUTUBE_LINKI_BURAYA]  
**REST API Domain:** `http://localhost:3000`

---

## 1. Kullanıcı Girişi
* **Endpoint:** `POST /users/login`
* **Request Body:**
```json
{
  "email": "test@mail.com",
  "password": "123456"
}
Response: 200 OK - Giriş başarılı.
