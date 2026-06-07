

# FitStack

<img width="2752" height="1536" alt="Gemini_Generated_Image_lxc6ralxc6ralxc6" src="https://github.com/user-attachments/assets/2ee58bed-56eb-4527-b161-f3060cd81d83" />

---

## Proje Hakkında

**Proje Tanımı:**

> FitStack uygulaması, kullanıcıların kişisel antrenmanlarını takip edebildiği, hazır egzersiz programlarını keşfedip tamamlayabildiği ve ilerlemelerini puan ve rozetlerle görüntüleyebildiği kapsamlı bir fitness takip sistemidir. Kullanıcılar sisteme kayıt olabilir, profil bilgilerini yönetebilir ve hesaplarını silebilir. Mevcut egzersiz programlarını listeleyebilir, filtreleyebilir, istedikleri programı seçip detaylarını görüntüleyebilir ve egzersizleri tamamladıkça işaretleyebilirler. Ayrıca, kullanıcılar antrenmanlarını kaydedebilir, geçmiş egzersizlerini görebilir, puan ve rozet kazanabilir, toplam puanlarını takip edebilir ve günlük serilerini güncelleyebilirler. Uygulama, düzenli egzersizi motive eden ve ilerlemeyi görselleştiren bir sistem sunar.

**Proje Kategorisi:**

> Fitness Takip Sistemi

---

## Kullanılan teknolojiler

| Katman | Teknolojiler |
|--------|----------------|
| **Backend** | Node.js, Express, in-memory mock veri; isteğe bağlı **Redis** (önbellek) ve **RabbitMQ** (olay yayını) |
| **Web** | React (Create React App), Axios, React Router |
| **Mobil** | React Native, Expo, React Navigation |
| **Altyapı** | Docker, Docker Compose, Jenkins (CI/CD) |

---

## Proje linkleri

- **REST API adresi:** [https://fitstack-a5v0.onrender.com](https://fitstack-a5v0.onrender.com)
- **Web frontend adresi:** [https://fit-stack-nine.vercel.app](https://fit-stack-nine.vercel.app)

---

## Proje ekibi

**Grup adı:** DevFit

**Ekip üyeleri:**

* Sema Nur Yılmaz
* Hüseyin Boğatekin

---

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

```bash
cd fitstack-mobile && npm install && npx expo start
```

**fitstack-mobile** Docker Compose yığınının parçası değildir; yerelde Expo ile çalıştırılır. Aynı makinede geliştirme için API genelde `http://localhost:3000`; Android emülatörde `http://10.0.2.2:3000` veya bilgisayarın LAN IP’si (`EXPO_PUBLIC_API_URL`, mobil `client.js` dokümantasyonuna bakın).

---

## Docker Compose

Tam yığın dört servisi birlikte kapsar: **backend**, **web-frontend**, **redis**, **rabbitmq**.

| Servis | Açıklama | Örnek erişim |
|--------|-----------|----------------|
| **backend** | REST API | [http://localhost:3000](http://localhost:3000) |
| **web-frontend** | React üretim build’i (nginx) | [http://localhost:3001](http://localhost:3001) — istemci istekleri `REACT_APP_API_URL` ile backend’e gider |
| **redis** | Önbellek (leaderboard vb.) | `localhost:6379` |
| **rabbitmq** | AMQP broker; yönetim paneli | AMQP **5672**; panel [http://localhost:15672](http://localhost:15672) — **guest** / **guest** |

Backend konteynerinde `REDIS_HOST=redis`, `REDIS_PORT=6379`, `RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672` tanımlıdır.

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

## Jenkins CI/CD

Kök dizinde **`Jenkinsfile`** bulunur. Declarative pipeline şu aşamaları çalıştırır:

1. **Checkout** — `checkout scm` (job’un SCM ile bağlanmış olması gerekir).
2. **Backend install** — `backend` içinde `npm ci` veya başarısızsa `npm install`.
3. **Backend syntax check** — `node --check server.js` (backend’deki `npm test` placeholder olduğu için kullanılmaz).
4. **Web frontend install** — `fitstack-frontend` içinde `npm ci` veya `npm install`.
5. **Web frontend build** — `npm run build`.
6. **Mobile install** — `fitstack-mobile` içinde `npm ci` veya `npm install`.
7. **Mobile export check** — `npx expo export --platform android` (başarısızsa yedek olarak `npm run start -- --help` / `expo --help`); **mobil deploy yok**, yalnızca derlenebilirlik kanıtı.
8. **Docker compose build** — proje kökünde `docker compose build` (veya `docker-compose build`). **İmaj push ve canlı deploy bu dosyada yok.**

### Jenkins’te job oluşturma (özet)

1. Yeni Item → **Pipeline** (veya **Multibranch Pipeline**).
2. **Pipeline** bölümünde *Definition*: **Pipeline script from SCM**.
3. Git repo URL’inizi ve dalı (branch) seçin; *Script Path*: `Jenkinsfile`.
4. Agent’ta **Node.js**, **npm** ve **Docker** (ve tercihen `docker compose` eklentisi) bulunduğundan emin olun.

### Gereksinimler

- **Node.js** ve **npm** (Expo export için uyumlu Node sürümü, projede `>=18` önerilir).
- **Docker** — `docker compose build` adımı için Jenkins çalıştığı makinede Docker erişimi (Linux agent + docker grubu veya Docker-in-Docker yapılandırması).

Bu pipeline **GitHub token / secret / credential** tanımlamaz; özel registry push veya sunucu deploy adımları eklenmemiştir.

---

## Redis önbelleği

Backend, **leaderboard** yanıtlarını Redis üzerinde kısa süreli (TTL) önbelleğe alır. Anahtarlar `fitstack:` önekiyle saklanır (ör. `fitstack:leaderboard:week`, `fitstack:leaderboard:month`; TTL 60 sn). Loglar: `Leaderboard cache hit` / `Leaderboard cache miss`. Redis kapalı, hata veya `REDIS_DISABLED=1` iken uygulama çalışmaya devam eder; yanıt doğrudan hesaplanır.

---

## RabbitMQ

Antrenman oluşturma olayları **`fitstack.workout.created`** kuyruğuna yayınlanabilir. Broker erişilemez veya `amqplib` / bağlantı yapılandırması yoksa backend çökmez; yayın no-op olur. Yönetim arayüzü: [http://localhost:15672](http://localhost:15672) — **guest** / **guest**.

---

## Demo kullanıcı

Mock oturum için: **`demo@fitstack.local`** / **`demo`**.

---

## API ve OpenAPI

Makine okunur API sözleşmesi: **[openapi.yaml](openapi.yaml)** (kök dizin, `/v1` öneki kullanılmaz).

---

## Dokümantasyon

### Genel

1. [Gereksinim Analizi](gereksinimler.md)
2. [REST API Tasarımı](API-Tasarimi.md)
3. [REST API](Rest-API.md)
4. [Web Front-End](Web%20Frontend.md)

### Mobil (final)

5. [Mobil Front-End](MobilFrontEnd.md) — React Native + Expo, klasör yapısı, ekranlar, navigasyon, API mantığı ve 17 gereksinim eşlemesi
6. [Mobil Back-End (REST)](MobilBackEnd.md) — Mobil istemcinin kullanacağı endpoint özetleri ve örnek yanıtlar

### Mobil görev dağılımı

7. [Sema — Mobil Front-End görevleri](Sema-Yilmaz/Sema-Yilmaz-Mobil-Frontend-Gorevleri.md)
8. [Sema — Mobil Back-End (API) görevleri](Sema-Yilmaz/Sema-Yilmaz-Mobil-Backend-Gorevleri.md)
9. [Hüseyin — Mobil Front-End görevleri](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Frontend-Gorevleri.md)
10. [Hüseyin — Mobil Back-End (API) görevleri](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Backend-Gorevleri.md)
11. [Kullanım Senaryoları](docs/Kullanim-Senaryolari.md)
12. [Video Sunum ve Kanıtlar](Sunum.md)

### Ek özellikler ve altyapı (görev dağılımı)

| Özellik | Sorumlu |
|---------|---------|
| **Leaderboard** | Hüseyin Boğatekin |
| **Statistics** (istemci tarafı özet) | Sema Nur Yılmaz |
| **Goals** | Sema Nur Yılmaz |
| **Activity Feed** | Ortak |
| **Docker / Jenkins / Redis / RabbitMQ** | Ortak |
