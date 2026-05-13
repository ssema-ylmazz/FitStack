

# FitStack

<img width="2752" height="1536" alt="Gemini_Generated_Image_lxc6ralxc6ralxc6" src="https://github.com/user-attachments/assets/2ee58bed-56eb-4527-b161-f3060cd81d83" />

---

## Proje Hakkında



**Proje Tanımı:**

> FitStack uygulaması, kullanıcıların kişisel antrenmanlarını takip edebildiği, hazır egzersiz programlarını keşfedip tamamlayabildiği ve ilerlemelerini puan ve rozetlerle görüntüleyebildiği kapsamlı bir fitness takip sistemidir. Kullanıcılar sisteme kayıt olabilir, profil bilgilerini yönetebilir ve hesaplarını silebilir. Mevcut egzersiz programlarını listeleyebilir, filtreleyebilir, istedikleri programı seçip detaylarını görüntüleyebilir ve egzersizleri tamamladıkça işaretleyebilirler. Ayrıca, kullanıcılar antrenmanlarını kaydedebilir, geçmiş egzersizlerini görebilir, puan ve rozet kazanabilir, toplam puanlarını takip edebilir ve günlük serilerini güncelleyebilirler. Uygulama, düzenli egzersizi motive eden ve ilerlemeyi görselleştiren bir sistem sunar.

**Proje Kategorisi:**

> Fitness Takip Sistemi


---

## Proje Linkleri

**REST-API ADRESİ:**(https://fitstack-a5v0.onrender.com)

**Web-Frontend ADRESİ:**(https://fit-stack-nine.vercel.app)



---

## Proje Ekibi

**Grup Adı:**

> DevFit

**Ekip Üyeleri:**

* Sema Nur Yılmaz
* Hüseyin Boğatekin

---





## Backend (yerel çalıştırma)

```bash
cd backend && npm install && npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde dinler. İlk açılışta `demo@fitstack.local` / `demo` ile giriş yapılabilir (mock oturum).

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

## Dokümantasyon

Proje dokümantasyonuna aşağıdaki bağlantılardan erişebilirsiniz:

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

