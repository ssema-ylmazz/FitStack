### 2. Kullanıcı Girişi

**API Metodu:** POST /users/login
**Açıklama:** Kullanıcı hesap bilgileri ile sisteme giriş yapar.

### 4. Profil Güncelleme

**API Metodu:** PUT /users/profile
**Açıklama:** Kullanıcı profil bilgilerini günceller.

### 6. Program Listeleme

**API Metodu:** GET /programs
**Açıklama:** Kullanıcı mevcut egzersiz programlarını listeler.

### 8. Program Seçme ve Detay Görüntüleme

**API Metodu:** POST /programs/{id}/select
**Açıklama:** Kullanıcı bir program seçer.
**API Metodu:** GET /programs/{id}
**Açıklama:** Kullanıcı seçtiği programın detaylarını görüntüler.


### 10. Geçmiş Antrenmanları Görüntüleme

**API Metodu:** GET /workouts
**Açıklama:** Kullanıcı geçmiş antrenmanlarını görüntüler.


### 12. Toplam Puan Görüntüleme

**API Metodu:** GET /users/points
**Açıklama:** Kullanıcı toplam puanını görüntüler.


### 14. Rozetleri Görüntüleme

**API Metodu:** GET /badges
**Açıklama:** Kullanıcı kazandığı rozetleri görüntüler.

### 16. Seri Bilgisi Güncelleme

**API Metodu:** PUT /streak
**Açıklama:** Kullanıcı seri bilgilerini günceller.
