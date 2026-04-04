
---

# Hüseyin Boğatekin'in Web Frontend Görevleri
**Front-end Test Videosu:** [Link buraya eklenecek]

### 1. Kullanıcı Giriş Sayfası (G-2)
**API Endpoint:** `POST /users/login`
**Görev:** Kullanıcının mevcut hesap bilgileri ile sisteme erişebilmesi için giriş arayüzü tasarımı.
**UI Bileşenleri:**
*   Responsive giriş formu (Dark mode uyumlu).
*   Email/Kullanıcı adı input alanı.
*   Şifre input alanı (Maskelenmiş).
*   "Giriş Yap (G-2)" butonu.
*   "Şifremi Unuttum" ve "Hesabınız yok mu? Kayıt Ol" yönlendirmeleri.

---

### 2. Profil Düzenleme Sayfası (G-4)
**API Endpoint:** `PUT /users/profile`
**Görev:** Kullanıcının ad, soyad ve diğer kişisel bilgilerini güncelleyebileceği form ekranı.
**UI Bileşenleri:**
*   Mevcut bilgilerin yüklendiği editör formu.
*   "Değişiklikleri Kaydet (G-4)" butonu.
*   Başarılı güncelleme sonrası "Profil güncellendi" bildirimi (Toast message).

---

### 3. Program Listeleme ve Seçim (G-6, G-8)
**API Endpoint:** `GET /programs` ve `POST /programs/{id}/select`
**Görev:** Sistemdeki tüm antrenman programlarının listelenmesi ve birinin aktif olarak seçilmesi.
**UI Bileşenleri:**
*   Program kartları (Görsel, süre ve zorluk seviyesi bilgisi ile).
*   "Detayları Gör (G-8)" butonu (Modal veya yeni sayfa açılışı).
*   "Bu Programı Seç" butonu.

---

### 4. Geçmiş Antrenmanlar Tablosu (G-10)
**API Endpoint:** `GET /workouts`
**Görev:** Kullanıcının geçmişte yaptığı antrenmanların kronolojik listesi.
**UI Bileşenleri:**
*   Tarih, süre ve yakılan kalori bilgilerini içeren liste/tablo.
*   Yükleme (loading) animasyonu.
*   Boş liste durumu için "Henüz antrenmanınız yok" uyarısı.

---

### 5. Başarı ve Rozet Paneli (G-12, G-14)
**API Endpoint:** `GET /users/points` ve `GET /badges`
**Görev:** Kullanıcının kazandığı puanların ve rozetlerin görselleştirilmesi.
**UI Bileşenleri:**
*   **XP Puan Kartı (G-12):** Toplam puanın büyük ve vurgulu gösterimi.
*   **Rozet Galerisi (G-14):** Kazanılan rozetlerin ikonik gösterimi (Gri/Renkli durumları).

---

### 6. Günlük Seri (Streak) Göstergesi (G-16)
**API Endpoint:** `PUT /streak`
**Görev:** Kullanıcının kaç gündür üst üste antrenman yaptığını gösteren sayaç.
**UI Bileşenleri:**
*   Alev ikonu veya benzeri bir görsel ile "X Günlük Seri" yazısı.
*   Günlük hedefe ulaşıldığında değişen dinamik renkler.

---

### 🛠️ Kullanılan Teknolojiler
*   **React.js:** Bileşen tabanlı arayüz geliştirme.
*   **Axios:** Hüseyin'in yazdığı API'lar ile entegrasyon.
*   **CSS-in-JS / Tailwind:** Modern ve duyarlı tasarım.

---
