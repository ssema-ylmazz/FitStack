Hüseyin Boğatekin için hazırladığın backend gereksinimlerini, senin frontend dosyanın görseldeki formatıyla birebir uyumlu hale getirdim. Bu içeriği **Huseyin-Rest-API-Gorevleri.md** olarak kaydedebilirsin:

---

# Hüseyin Boğatekin'in REST API Görevleri
**Back-end Test Raporu (Postman/Swagger):** [Link buraya eklenecek]

### 1. Kullanıcı Girişi (G-2)
**API Endpoint:** `POST /users/login`
**Görev:** Kullanıcı hesap bilgileri ile sisteme güvenli giriş yapılması için gerekli API'nın sağlanması.
**İş Mantığı:**
*   Email ve şifre doğrulama kontrolü.
*   Hatalı girişlerde uygun hata kodlarının (401 Unauthorized vb.) dönülmesi.
*   Başarılı girişte session veya token yönetimi.

---

### 2. Profil Güncelleme (G-4)
**API Endpoint:** `PUT /users/profile`
**Görev:** Kullanıcının mevcut profil bilgilerini güncellemesini sağlayan endpoint'in geliştirilmesi.
**İş Mantığı:**
*   Gelen verilerin (ad, soyad, vb.) validasyonu.
*   Veritabanındaki kullanıcı kaydının güncellenmesi.

---

### 3. Program Listeleme ve Detay (G-6, G-8)
**API Endpoints:** 
*   `GET /programs` (Listeleme)
*   `GET /programs/{id}` (Detay)
*   `POST /programs/{id}/select` (Seçme)

**Görev:** Egzersiz programlarının yönetimi ve kullanıcıya özel seçimlerin kaydedilmesi.
**İş Mantığı:**
*   Mevcut tüm egzersiz programlarının listelenmesi.
*   Seçilen programın tüm detaylarının (hareketler, setler) döndürülmesi.
*   Kullanıcının bir programı aktif programı olarak seçebilmesi.

---

### 4. Geçmiş Antrenmanları Görüntüleme (G-10)
**API Endpoint:** `GET /workouts`
**Görev:** Kullanıcının geçmişte tamamladığı tüm antrenman verilerinin çekilmesi.
**İş Mantığı:**
*   Kullanıcı ID'sine göre antrenman geçmişinin sorgulanması.
*   Verilerin tarih sırasına göre döndürülmesi.

---

### 5. Başarı Takibi ve Puanlama (G-12, G-14)
**API Endpoints:**
*   `GET /users/points` (Toplam Puan)
*   `GET /badges` (Rozetler)

**Görev:** Kullanıcın gelişimini takip eden puan ve rozet sisteminin API üzerinden sunulması.
**İş Mantığı:**
*   Kullanıcının o ana kadar kazandığı toplam puanın hesaplanması.
*   Kazanılan rozetlerin listelenmesi.

---

### 6. Seri (Streak) Bilgisi Güncelleme (G-16)
**API Endpoint:** `PUT /streak`
**Görev:** Kullanıcının antrenman sürekliliğini takip eden seri bilgilerinin güncellenmesi.
**İş Mantığı:**
*   Kullanıcı seri bilgilerinin güncellenmesi.
*   Günlük takibe göre serinin artırılması veya kontrolü.

---

### 🛠️ Kullanılan Teknolojiler
*   **Java & Spring Boot:** REST API geliştirme.
*   **Spring Data JPA:** Veritabanı yönetimi ve CRUD işlemleri.
*   **Spring Security:** Yetkilendirme ve güvenli giriş.
*   **OpenAPI/Swagger:** API dökümantasyonu.

---
