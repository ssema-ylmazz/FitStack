Hüseyin Boğatekin - REST API Testleri
API Test Videosu: [YOUTUBE_LINKI_BURAYA]
REST API Domain: http://localhost:3000

1. Kullanıcı Girişi
Endpoint: POST /users/login

Request Body:

JSON

{
  "email": "test@mail.com",
  "password": "123456"
}
Response: 200 OK

2. Profil Güncelleme
Endpoint: PUT /users/profile

Request Body:

JSON

{
  "name": "Hüseyin",
  "level": "Orta"
}
Response: 200 OK

3. Program Listeleme
Endpoint: GET /programs

Response: 200 OK - Tüm spor programlarını döner.

4. Program Seçme ve Detay
Endpoint: POST /programs/:id/select

Path Parameter: id: 1

Response: 200 OK - "Program 1 seçildi" mesajı döner.

5. Geçmiş Antrenmanlar
Endpoint: GET /workouts

Response: 200 OK - Yapılan antrenmanların listesini döner.

6. Toplam Puan
Endpoint: PUT /workouts/:id/points

Request Body:

JSON

{
  "points": 100
}
Response: 200 OK

7. Rozetleri Görüntüleme
Endpoint: GET /badges

Response: 200 OK - (Kodda eksikti, manuel ekledik: Kullanıcının kazandığı rozetler.)

8. Seri Bilgisi Güncelleme (Streak)
Endpoint: PUT /streak

Request Body:

JSON

{
  "days": 5
}
Response: 200 OK
