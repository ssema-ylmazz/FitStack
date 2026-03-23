Hüseyin Boğatekin - REST API Testleri
API Test Videosu: [Buraya Video Linkini Ekleyin]

REST API Domain: http://localhost:3000

1. Kullanıcı Girişi
Endpoint: POST /users/login

Request Body:

JSON

{
  "email": "test@mail.com",
  "password": "123456"
}
Response: 200 OK - Giriş başarılı.

2. Profil Güncelleme
Endpoint: PUT /users/profile

Request Body:

JSON

{
  "name": "Hüseyin",
  "level": "Orta"
}
Response: 200 OK - Profil başarıyla güncellendi.

3. Program Listeleme
Endpoint: GET /programs

Response: 200 OK - Tüm spor programlarını listeler.

4. Program Seçme ve Detay
Endpoint: POST /programs/:id/select

Path Parameters: * id: Seçilecek programın ID'si

Response: 200 OK - Program seçimi başarılı.

5. Geçmiş Antrenmanlar
Endpoint: GET /workouts

Response: 200 OK - Kullanıcının geçmiş antrenman listesini döndürür.

6. Antrenman Puanı Güncelleme
Endpoint: PUT /workouts/:id/points

Path Parameters:

id: Puanı güncellenecek antrenmanın ID'si

Request Body:

JSON

{
  "points": 100
}
Response: 200 OK - Puan başarıyla güncellendi.

7. Rozetleri Görüntüleme
Endpoint: GET /badges

Response: 200 OK - Kazanılan rozetlerin listesini döndürür.

8. Seri Bilgisi Güncelleme (Streak)
Endpoint: PUT /streak

Request Body:

JSON

{
  "days": 5
}
Response: 200 OK - Günlük seri (streak) bilgisi güncellendi.
