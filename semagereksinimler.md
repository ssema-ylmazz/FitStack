

# Gereksinim Analizi

---

### 1. Kullanıcı Kaydı Olma

**API Metodu:** POST /users/register
**Açıklama:** Kullanıcı sisteme kayıt olur ve hesap oluşturur.

### 2. Kullanıcı Girişi

**API Metodu:** POST /users/login
**Açıklama:** Kullanıcı hesap bilgileri ile sisteme giriş yapar.

### 3. Profil Görüntüleme

**API Metodu:** GET /users/profile
**Açıklama:** Kullanıcı profil bilgilerini görüntüler.

### 4. Profil Güncelleme

**API Metodu:** PUT /users/profile
**Açıklama:** Kullanıcı profil bilgilerini günceller.

### 5. Hesap Silme

**API Metodu:** DELETE /users/profile
**Açıklama:** Kullanıcı hesabını sistemden siler.

### 6. Program Listeleme

**API Metodu:** GET /programs
**Açıklama:** Kullanıcı mevcut egzersiz programlarını listeler.

### 7. Program Filtreleme

**API Metodu:** GET /programs?level={seviye}
**Açıklama:** Kullanıcı programları zorluk seviyesine göre filtreler.

### 8. Program Seçme ve Detay Görüntüleme

**API Metodu:** POST /programs/{id}/select
**Açıklama:** Kullanıcı bir program seçer.
**API Metodu:** GET /programs/{id}
**Açıklama:** Kullanıcı seçtiği programın detaylarını görüntüler.

### 9. Antrenman Kaydı Oluşturma

**API Metodu:** POST /workouts
**Açıklama:** Kullanıcı yaptığı antrenmanı kaydeder.

### 10. Geçmiş Antrenmanları Görüntüleme

**API Metodu:** GET /workouts
**Açıklama:** Kullanıcı geçmiş antrenmanlarını görüntüler.

### 11. Puan Kazanma

**API Metodu:** PUT /workouts/{id}/points
**Açıklama:** Kullanıcı tamamladığı antrenman için puan kazanır.

### 12. Toplam Puan Görüntüleme

**API Metodu:** GET /users/points
**Açıklama:** Kullanıcı toplam puanını görüntüler.

### 13. Rozet Kazanma

**API Metodu:** POST /badges
**Açıklama:** Kullanıcı belirli puanlara ulaştığında rozet kazanır.

### 14. Rozetleri Görüntüleme

**API Metodu:** GET /badges
**Açıklama:** Kullanıcı kazandığı rozetleri görüntüler.

### 15. Günlük Seri Görüntüleme

**API Metodu:** GET /streak
**Açıklama:** Kullanıcı günlük seri sayısını görüntüler.

### 16. Seri Bilgisi Güncelleme

**API Metodu:** PUT /streak
**Açıklama:** Kullanıcı seri bilgilerini günceller.

### 17. Antrenman Kaydını Silme

**API Metodu:** DELETE /workouts/{id}
**Açıklama:** Kullanıcı antrenman kaydını siler.

---

Sema, istersen ben bunu bir adım daha ileri götürüp **span_0, span_1… formatıyla README’ye direkt eklenebilir hâle** getirebilirim.

Bunu da yapayım mı?
