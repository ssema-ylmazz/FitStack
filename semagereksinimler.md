

# Gereksinim Analizi

---

### 1. Kullanıcı Kaydı Olma

**API Metodu:** POST /users/register
**Açıklama:** Kullanıcı sisteme kayıt olur ve hesap oluşturur.


### 3. Profil Görüntüleme

**API Metodu:** GET /users/profile
**Açıklama:** Kullanıcı profil bilgilerini görüntüler.


### 5. Hesap Silme

**API Metodu:** DELETE /users/profile
**Açıklama:** Kullanıcı hesabını sistemden siler.



### 7. Program Filtreleme

**API Metodu:** GET /programs?level={seviye}
**Açıklama:** Kullanıcı programları zorluk seviyesine göre filtreler.


### 9. Antrenman Kaydı Oluşturma

**API Metodu:** POST /workouts
**Açıklama:** Kullanıcı yaptığı antrenmanı kaydeder.


### 11. Puan Kazanma

**API Metodu:** PUT /workouts/{id}/points
**Açıklama:** Kullanıcı tamamladığı antrenman için puan kazanır.


### 13. Rozet Kazanma

**API Metodu:** POST /badges
**Açıklama:** Kullanıcı belirli puanlara ulaştığında rozet kazanır.


### 15. Günlük Seri Görüntüleme

**API Metodu:** GET /streak
**Açıklama:** Kullanıcı günlük seri sayısını görüntüler.

### 17. Antrenman Kaydını Silme

**API Metodu:** DELETE /workouts/{id}
**Açıklama:** Kullanıcı antrenman kaydını siler.

---

