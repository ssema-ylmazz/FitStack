# Sema Yılmaz'ın Web Frontend Görevleri

**Front-end Test Videosu:** [https://www.youtube.com/watch?v=PEZuT-yQX50]

**Web Frontend Adresi:** [frontend](https://fit-stack-nine.vercel.app)

---

## 1. Üye Olma (Kayıt) Sayfası (G-1)
**API Endpoint:** `POST /users/register`  
**Görev:** Kullanıcı kayıt işlemi için web sayfası tasarımı ve implementasyonu.

### UI Bileşenleri:
- Responsive kayıt formu (Dark mode uyumlu)
- Kullanıcı adı input alanı
- Email input alanı (`type="email"`)
- Şifre input alanı (`type="password"`)
- "Kayıt Ol (G-1)" butonu (Primary style)
- "Zaten hesabınız var mı? Giriş Yap" linki

### Form Validasyonu:
- HTML5 form validation (`required`)
- Email format kontrolü
- Boş alan kontrolü

---

## 2. Kullanıcı Profil Sayfası (G-3)
**API Endpoint:** `GET /users/profile`  
**Görev:** Kullanıcının mevcut bilgilerinin backend'den çekilerek dashboard üzerinde gösterilmesi.

### UI Bileşenleri:
- Kullanıcı karşılama metni ("Merhaba, Sema!")
- Profil kartı tasarımı
- Loading (yükleme) durumu yönetimi

---

## 3. Hesap Silme İşlemi (G-5)
**API Endpoint:** `DELETE /users/profile`  
**Görev:** Kullanıcının hesabını kalıcı olarak silme fonksiyonu.

### UI Bileşenleri:
- "Hesabı Tamamen Kapat (G-5)" butonu
- Silme işlemi öncesi `window.confirm` onay kutusu
- Başarılı silme sonrası landing sayfasına yönlendirme

---

## 4. Antrenman Programı Filtreleme (G-7)
**API Endpoint:** `GET /programs?level={level}`  
**Görev:** Antrenman programlarını zorluk seviyesine göre filtreleme arayüzü.

### UI Bileşenleri:
- Filtreleme butonları (Başlangıç, İleri, Tümü)
- Aktif filtreyi belirten vurgulu buton stili
- Filtrelenmiş program kartları listesi

---

## 5. Antrenman Kaydı Oluşturma (G-9)
**API Endpoint:** `POST /workouts`  
**Görev:** Seçilen antrenmanın bitişinde sisteme kayıt atılması.

### UI Bileşenleri:
- "Antrenmanı Bitir & Kaydet (G-9)" butonu
- Görsel antrenman rehberi (GIF/Resim alanı)
- İşlem başarı mesajı (Alert)

---

## 6. Puan Kazanma ve Seri Takibi (G-11, G-13, G-15)
### API Endpoints:
- `PUT /workouts/{id}/points` (Puan)
- `POST /badges` (Rozet)
- `GET /streak` (Seri)

**Görev:** Oyunlaştırma öğelerinin dashboard üzerinde canlı gösterilmesi.

### UI Bileşenleri:
- XP Puanı istatistik kartı (G-11/12)
- Günlük seri sayacı (G-15/16)
- Kazanılan rozetlerin ikonik gösterimi (G-13/14)

---

## 7. Antrenman Kaydı Silme (G-17)
**API Endpoint:** `DELETE /workouts/{id}`  
**Görev:** Kullanıcının geçmiş antrenman kayıtlarını silme yetkisi.

### UI Bileşenleri:
- "Son Kaydı Sil (G-17)" butonu
- Dashboard üzerinden hızlı işlem yeteneği

---

## 🛠️ Kullanılan Teknolojiler
- **React.js**: Bileşen tabanlı arayüz geliştirme
- **Axios**: REST API entegrasyonu
- **CSS-in-JS**: Dinamik stil yönetimi ve modern karanlık tema tasarımı
