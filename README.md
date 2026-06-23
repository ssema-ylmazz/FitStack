

# FitStack

<img width="2752" height="1536" alt="Gemini_Generated_Image_lxc6ralxc6ralxc6" src="https://github.com/user-attachments/assets/2ee58bed-56eb-4527-b161-f3060cd81d83" />

---

## Not

FitStack; egzersiz programı keşfi, antrenman takibi, puan, rozet ve günlük streak sistemi içeren bir fitness takip uygulamasıdır. Projede web arayüzü, mobil Expo uygulaması, REST API, Redis önbelleği, RabbitMQ olay kuyruğu, Docker ve Jenkins CI/CD akışı birlikte ele alınmıştır.

## Proje Hakkında

**Proje Tanımı:**

> FitStack uygulaması, kullanıcıların kişisel antrenmanlarını takip edebildiği, hazır egzersiz programlarını keşfedip tamamlayabildiği ve ilerlemelerini puan ve rozetlerle görüntüleyebildiği kapsamlı bir fitness takip sistemidir. Kullanıcılar sisteme kayıt olabilir, profil bilgilerini yönetebilir ve hesaplarını silebilir. Mevcut egzersiz programlarını listeleyebilir, filtreleyebilir, istedikleri programı seçip detaylarını görüntüleyebilir ve egzersizleri tamamladıkça işaretleyebilirler. Ayrıca, kullanıcılar antrenmanlarını kaydedebilir, geçmiş egzersizlerini görebilir, puan ve rozet kazanabilir, toplam puanlarını takip edebilir ve günlük serilerini güncelleyebilirler. Uygulama, düzenli egzersizi motive eden ve ilerlemeyi görselleştiren bir sistem sunar.

**Proje Kategorisi:**

> Fitness / Sağlık / Egzersiz Takip

**Referans uygulamalar:**

> Nike Training Club, Strava, Fitbod ve Google Fit gibi antrenman takip ve motivasyon uygulamaları.

---

## Kullanılan teknolojiler

| Katman | Teknolojiler |
|--------|----------------|
| **Backend** | Node.js, Express, in-memory mock veri; isteğe bağlı **Redis** (önbellek) ve **RabbitMQ** (olay yayını) |
| **Web** | React (Create React App), Axios, React Router |
| **Mobil** | Expo SDK 54, React Native, React Navigation, Axios |
| **Altyapı** | Docker, Docker Compose, Jenkins (CI/CD) |

---

## Proje Linkleri

- **REST API local adresi:** [http://localhost:3000](http://localhost:3000)
- **Web frontend local adresi:** [http://localhost:3001](http://localhost:3001)
- **Mobil uygulama klasörü:** `fitstack-mobile/`
- **Canlı REST API adresi:** [https://fitstack-a5v0.onrender.com](https://fitstack-a5v0.onrender.com)
- **Canlı web frontend adresi:** [https://fit-stack-nine.vercel.app](https://fit-stack-nine.vercel.app)

---

## Proje Ekibi

**Grup adı:** DevFit

**Ekip üyeleri:**

* Sema Nur Yılmaz
* Hüseyin Boğatekin

### Ekip ve Görev Dağılımı

Her ekip üyesi kendi sorumlu olduğu gereksinimin mobil ekranını ve REST API bağlantılı çalışmasını kendi kanıt videosunda göstermektedir. Görev dağılımı teknoloji bazlı değil, gereksinim bazlı yapılmıştır.

| Ekip üyesi | Sorumlu gereksinimler | Kapsam |
|---|---|---|
| Sema Nur Yılmaz | 1, 2, 6, 7, 8, 12, 14, 15 | Kayıt/giriş, program listeleme, filtreleme, program detay/seçme, toplam puan, rozet görüntüleme ve günlük seri görüntüleme gereksinimlerinin mobil ekran + API bağlantılı demo akışı |
| Hüseyin Boğatekin | 3, 4, 5, 9, 10, 11, 13, 16, 17 | Profil işlemleri, antrenman kaydetme/geçmiş/puan/silme, rozet kazanma, seri güncelleme, Redis/RabbitMQ tetikleyicileri ve REST API bağlantılı demo akışı |

---
## Dokümantasyon

Proje dokümantasyonuna aşağıdaki bağlantılardan ulaşabilirsiniz:

1. [Gereksinim Analizi](docs/Kullanim-Senaryolari.md)
2. [REST API Tasarımı](openapi.yaml)
3. [REST API](Rest-API.md)
4. [Web Front-End](Web%20Frontend.md)
5. [Mobil Front-End](MobilFrontEnd.md) — React Native + Expo SDK 54, ekranlar, navigation, componentler ve 17 gereksinim eşlemesi
6. [Mobil Back-End / REST API Bağlantısı](MobilBackEnd.md) — Mobil API client, endpointler, Redis/RabbitMQ ve Jenkins mobil stage açıklaması
7. [Video Sunum / Kanıt Planı](Sunum.md)
8. [Mobil Expo README](fitstack-mobile/README.md)





## Yerel geliştirme

### Backend

```bash
cd backend && npm install && npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde dinler. Demo giriş: `demo@fitstack.local` / `demo`. Yerel Redis için `docker compose up -d redis` ile Redis’i açın; `REDIS_HOST=127.0.0.1` ve `REDIS_PORT=6379` kullanın.

### Web frontend

```bash
cd fitstack-frontend && npm install && npm start
```

Geliştirme sunucusu varsayılan olarak **3000** portunu kullanır. Backend ile aynı anda çalıştırırken port çakışmasını önlemek için örneğin `PORT=3001 npm start` kullanabilirsiniz. API tabanı için `REACT_APP_API_URL` (ör. `http://localhost:3000`) ortam değişkenini ayarlayın.

### Mobil uygulama

Mobil Expo uygulaması `fitstack-mobile/` klasörü altındadır ve Expo SDK 54 kullanır.

```bash
cd fitstack-mobile
npm install
npm start
```

Expo Go ile fiziksel telefonda test ederken telefon ve bilgisayar aynı Wi-Fi ağında olmalıdır. Telefonda `localhost` bilgisayarı değil telefonun kendisini gösterir; bu nedenle `fitstack-mobile/src/constants/config.js` içinde backend adresi bilgisayarın LAN IP adresiyle geçici olarak ayarlanmalıdır. Android emulator için genellikle `http://10.0.2.2:3000`, web/local test için `http://localhost:3000` kullanılır.

## Docker

Tam yığın dört servisi birlikte kapsar: **backend**, **web-frontend**, **redis**, **rabbitmq**.

| Servis | Açıklama | Örnek erişim |
|--------|-----------|----------------|
| **backend** | REST API | [http://localhost:3000](http://localhost:3000) |
| **web-frontend** | React üretim build’i (nginx) | [http://localhost:3001](http://localhost:3001) — istemci istekleri `REACT_APP_API_URL` ile backend’e gider |
| **redis** | Önbellek (leaderboard vb.) | `localhost:6379` |
| **rabbitmq** | AMQP broker; yönetim paneli | AMQP **5672**; panel [http://localhost:15672](http://localhost:15672) — **guest** / **guest** |

Backend konteynerinde `REDIS_HOST=redis`, `REDIS_PORT=6379`, `RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672` tanımlıdır.

Mobil Expo uygulaması Docker container olarak çalıştırılmaz. Mobil uygulama Expo Go, iOS/Android emülatörü veya web üzerinden backend REST API'ye bağlanır.

### Docker ile test

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose down
```

1. `docker compose build` ardından `docker compose up -d` (veya tek seferde `docker compose up -d --build`).
2. `http://localhost:3000` → API kök yanıtını doğrulayın.
3. `http://localhost:3001` → web uygulaması; kayıt/giriş ve API çağrılarını kontrol edin.
4. Leaderboard önbelleği ve antrenman olayları için Redis/RabbitMQ erişimini doğrulayın.

### Port çakışmaları

Bilgisayarda **3000**, **3001**, **6379** veya **5672** / **15672** başka süreçlerde kullanılıyorsa `docker-compose.yml` içindeki `ports` eşlemelerini ve web build argümanı `REACT_APP_API_URL` değerini uyumlu olacak şekilde güncelleyin.

---

## Redis ve RabbitMQ Kanıt Akışları

| Teknoloji | Mobil akış | Backend etkisi | Kanıt |
|---|---|---|---|
| RabbitMQ | Antrenmanlar ekranı > Demo Antrenman Kaydet | `POST /workouts` çağrılır | `fitstack.workout.created` kuyruğunda mesaj/spike |
| Redis | Liderlik ekranı > Yenile | `GET /leaderboard?period=week/month` çağrılır | Redis cache miss/hit logları ve `fitstack:leaderboard:*` anahtarları |

RabbitMQ management paneli: [http://localhost:15672](http://localhost:15672) — **guest** / **guest**. Redis varsayılan portu: `6379`.

## CI/CD

Kök dizinde **`Jenkinsfile`** bulunur. Declarative pipeline şu aşamaları çalıştırır:

1. **Checkout** — `checkout scm` (job’un SCM ile bağlanmış olması gerekir).
2. **Backend install** — `backend` içinde `npm ci` veya başarısızsa `npm install`.
3. **Backend syntax check** — `node --check server.js` (backend’deki `npm test` placeholder olduğu için kullanılmaz).
4. **Web frontend install** — `fitstack-frontend` içinde `npm ci` veya `npm install`.
5. **Web frontend build** — `npm run build`.
6. **Mobile Install and Config Check** — `fitstack-mobile` içinde `npm ci || npm install` ve `npx expo config --type public`.
7. **Docker compose build** — proje kökünde `docker compose build` (veya `docker-compose build`). **İmaj push ve canlı deploy bu dosyada yok.**

### Jenkins’te job oluşturma (özet)

1. Yeni Item → **Pipeline** (veya **Multibranch Pipeline**).
2. **Pipeline** bölümünde *Definition*: **Pipeline script from SCM**.
3. Git repo URL’inizi ve dalı (branch) seçin; *Script Path*: `Jenkinsfile`.
4. Agent’ta **Node.js**, **npm** ve **Docker** (ve tercihen `docker compose` eklentisi) bulunduğundan emin olun.

### Gereksinimler

- **Node.js** ve **npm** (projede `>=18` önerilir).
- **Docker** — `docker compose build` adımı için Jenkins çalıştığı makinede Docker erişimi (Linux agent + docker grubu veya Docker-in-Docker yapılandırması).

Bu pipeline **GitHub token / secret / credential** tanımlamaz; özel registry push veya sunucu deploy adımları eklenmemiştir.

CI/CD kanıtı için GitHub Actions değil Jenkins pipeline ekranı gösterilmelidir. Mobil kontrol için `Mobile Install and Config Check` stage'i kullanılır.

---

## Redis önbelleği

Backend, **leaderboard** yanıtlarını Redis üzerinde kısa süreli (TTL) önbelleğe alır. Anahtarlar `fitstack:` önekiyle saklanır (ör. `fitstack:leaderboard:week`, `fitstack:leaderboard:month`; TTL 60 sn). Loglar: `Leaderboard cache hit` / `Leaderboard cache miss`. Redis kapalı, hata veya `REDIS_DISABLED=1` iken uygulama çalışmaya devam eder; yanıt doğrudan hesaplanır.

Mobil kanıt akışı: **Liderlik** ekranındaki **Yenile** butonu `GET /leaderboard?period=week/month` isteğini tetikler. İlk istek cache miss, sonraki istek cache hit olarak backend logları veya Redis CLI ile gösterilebilir.

---

## RabbitMQ

Antrenman oluşturma olayları **`fitstack.workout.created`** kuyruğuna yayınlanabilir. Broker erişilemez veya `amqplib` / bağlantı yapılandırması yoksa backend çökmez; yayın no-op olur. Yönetim arayüzü: [http://localhost:15672](http://localhost:15672) — **guest** / **guest**.

Mobil kanıt akışı: **Antrenmanlar** ekranındaki **Demo Antrenman Kaydet** butonu `POST /workouts` isteğini tetikler ve RabbitMQ tarafında `fitstack.workout.created` kuyruğunda hareket oluşturur.

---

## Demo kullanıcı

Mock oturum için: **`demo@fitstack.local`** / **`demo`**.

---

## Mobilde Karşılanan Gereksinimler

| No | Gereksinim | HTTP metodu | Mobil ekran | Durum |
|---|---|---|---|---|
| 1 | Kullanıcı sisteme kayıt olur | POST | Register | Tamam |
| 2 | Kullanıcı sisteme giriş yapar | POST | Login | Tamam |
| 3 | Kullanıcı profil bilgilerini görüntüler | GET | Profil | Tamam |
| 4 | Kullanıcı profil bilgilerini günceller | PUT | Profil | Tamam |
| 5 | Kullanıcı hesabını siler | DELETE | Profil | Tamam |
| 6 | Kullanıcı hazır egzersiz programlarını listeler | GET | Programlar | Tamam |
| 7 | Kullanıcı programları zorluk seviyesine göre filtreler | GET | Programlar | Tamam |
| 8 | Kullanıcı bir program seçer ve detaylarını görüntüler | GET, POST | Program Detayı | Tamam |
| 9 | Kullanıcı yaptığı antrenmanı kaydeder | POST | Antrenmanlar | Tamam |
| 10 | Kullanıcı geçmiş antrenmanlarını görüntüler | GET | Antrenmanlar | Tamam |
| 11 | Kullanıcı tamamladığı antrenman için puan kazanır | PUT | Antrenmanlar | Tamam |
| 12 | Kullanıcı toplam puanını görüntüler | GET | Ana Sayfa | Tamam |
| 13 | Kullanıcı belirli puanlara ulaştığında rozet kazanır | POST | Ana Sayfa | Tamam |
| 14 | Kullanıcı kazandığı rozetleri görüntüler | GET | Ana Sayfa | Tamam |
| 15 | Kullanıcı günlük seri sayısını görüntüler | GET | Ana Sayfa | Tamam |
| 16 | Kullanıcı seri bilgilerini günceller | PUT | Ana Sayfa | Tamam |
| 17 | Kullanıcı antrenman kaydını siler | DELETE | Antrenmanlar | Tamam |

---

## API ve OpenAPI

Makine okunur API sözleşmesi: **[openapi.yaml](openapi.yaml)** (kök dizin, `/v1` öneki kullanılmaz).

---
