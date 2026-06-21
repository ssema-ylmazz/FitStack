# FitStack Video Sunum / Kanıt Planı

## Proje Özeti

FitStack; egzersiz programı listeleme, antrenman takibi, puan, rozet ve günlük seri sistemini içeren bir fitness takip uygulamasıdır. Projede web frontend, Expo tabanlı mobil uygulama, Node.js/Express REST API, Redis cache, RabbitMQ mesaj kuyruğu, Docker Compose ve Jenkins CI/CD akışı birlikte gösterilecektir.

## Ekip ve Görev Dağılımı

| Ekip üyesi | Görev |
|---|---|
| Sema Nur Yılmaz | Mobil Frontend |
| Hüseyin Boğatekin | Mobil Backend / REST API bağlantısı |

## Kanıt Videosunda Gösterilecek Başlıklar

- Mobil FrontEnd
- REST API + UI Bağlantısı
- RabbitMQ
- Redis
- Docker
- Jenkins CI/CD
- Cep telefonu
- Demo gösterim

## Mobil Gereksinim Kanıt Akışı

1. Register ekranında kullanıcı kaydı gösterilir.
2. Login ekranında kullanıcı girişi gösterilir.
3. Profil ekranında kullanıcı bilgileri görüntülenir.
4. Profil ekranında profil güncelleme gösterilir.
5. Profil ekranında hesap silme onay akışı gösterilir.
6. Programlar ekranında hazır egzersiz programları listelenir.
7. Programlar ekranında zorluk seviyesi filtresi kullanılır.
8. Program Detayı ekranında program bilgisi ve program seçme aksiyonu gösterilir.
9. Antrenmanlar ekranında Demo Antrenman Kaydet butonu ile workout kaydı oluşturulur.
10. Antrenmanlar ekranında geçmiş antrenmanlar görüntülenir.
11. Antrenmanlar ekranında Puan Kazan butonu gösterilir.
12. Ana Sayfa ekranında toplam puan görüntülenir.
13. Ana Sayfa ekranında Demo Rozet Kazan aksiyonu gösterilir.
14. Ana Sayfa ekranında rozet listesi görüntülenir.
15. Ana Sayfa ekranında günlük seri bilgisi görüntülenir.
16. Ana Sayfa ekranında Seriyi Güncelle aksiyonu gösterilir.
17. Antrenmanlar ekranında workout silme aksiyonu gösterilir.

## RabbitMQ Kanıtı

- Mobil ekran: Antrenmanlar
- Mobil aksiyon: Demo Antrenman Kaydet
- Backend endpoint: `POST /workouts`
- RabbitMQ paneli: `http://localhost:15672`
- Queue: `fitstack.workout.created`

Videoda butona basıldıktan sonra RabbitMQ management panelinde ilgili queue üzerinde mesaj hareketi/spike gösterilir.

## Redis Kanıtı

- Mobil ekran: Liderlik
- Mobil aksiyon: Yenile
- Backend endpoint: `GET /leaderboard?period=week/month`
- Redis kanıtı: cache key oluşumu ve cache hit/miss logları

Videoda ilk istek cache miss, sonraki istek cache hit olacak şekilde backend logları veya Redis CLI gösterilir.

## Docker Kanıtı

```bash
docker compose up -d --build
docker compose ps
```

Kanıtta backend, web frontend, Redis ve RabbitMQ servislerinin çalıştığı gösterilir. Mobil Expo uygulaması Docker container olarak çalıştırılmaz; telefon veya emülatör üzerinden backend REST API'ye bağlanır.

## Jenkins Kanıtı

Jenkins pipeline ekranında proje pipeline'ı çalıştırılır. Mobil uygulama için `Mobile Install and Config Check` stage'i gösterilir.

Bu stage içinde:

```bash
cd fitstack-mobile
npm ci || npm install
npx expo config --type public
```

CI/CD kanıtında GitHub Actions değil Jenkins kullanılmalıdır.

## Cep Telefonu Kanıtı

Expo Go ile mobil uygulama fiziksel telefonda açılır. Telefon ve bilgisayar aynı Wi-Fi ağında olmalıdır. Fiziksel telefonda backend bağlantısı için `localhost` yerine bilgisayarın LAN IP adresi kullanılmalıdır. Android emulator için `http://10.0.2.2:3000` kullanılabilir.

## Video Öncesi Komutlar

```bash
docker compose up -d --build
docker compose ps
curl http://localhost:3000
docker compose exec redis redis-cli ping
cd fitstack-mobile
npm install
npm start
```

## Video Linkleri

| Video | Bağlantı |
|---|---|
| CI/CD ve Docker kanıt videosu | [Video linki buraya eklenecek](#) |
| RabbitMQ kanıt videosu | [Video linki buraya eklenecek](#) |
| Redis kanıt videosu | [Video linki buraya eklenecek](#) |
| Genel ekip sunum videosu | [Sunum videosu linki buraya eklenecek](#) |

## Sunum Kontrol Listesi

- [ ] Ekip üyeleri kendisini ve görevlerini tanıttı.
- [ ] Mobil FrontEnd ekranları telefonda gösterildi.
- [ ] REST API + UI bağlantısı gösterildi.
- [ ] POST, PUT ve DELETE işlemlerinde veri değişimi gösterildi.
- [ ] RabbitMQ queue hareketi gösterildi.
- [ ] Redis cache miss/hit davranışı gösterildi.
- [ ] Docker servislerinin çalıştığı gösterildi.
- [ ] Jenkins pipeline ve mobil stage sonucu gösterildi.
- [ ] Video linkleri erişilebilir şekilde eklendi.
