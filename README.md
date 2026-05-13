

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

## Docker (REST API + Web Frontend)

Backend ve React web arayüzünü konteyner olarak çalıştırmak için:

```bash
docker compose build
docker compose up
```

Durdurmak için:

```bash
docker compose down
```

- **Backend:** [http://localhost:3000](http://localhost:3000) — kök yanıt ve REST API.
- **Web frontend:** [http://localhost:3001](http://localhost:3001) — statik build; tarayıcıdan API istekleri `http://localhost:3000` adresine gider (`REACT_APP_API_URL` ile derlenir).

### Docker ile test

1. `docker compose up --build` (veya önce `build`, sonra `up`).
2. Tarayıcıda `http://localhost:3000` → API çalışıyor mesajını doğrula.
3. `http://localhost:3001` → web uygulaması; kayıt/giriş ve API çağrılarının çalıştığını kontrol et.

### Port çakışmaları

- Bilgisayarda **3000** veya **3001** başka bir süreç tarafından kullanılıyorsa `docker compose.yml` içindeki `ports` eşlemesini değiştirin (örn. `"3002:3000"` ve `REACT_APP_API_URL` ile uyumlu yeni backend URL’si; web için build arg’ı da aynı makineden erişilebilir URL olmalıdır).

### Mobil (Expo)

- **fitstack-mobile** bu Docker kurulumunun parçası değildir; yerelde `cd fitstack-mobile && npx expo start` ile çalıştırılır.
- Mobil istemcinin API adresi: aynı makinede geliştirme için genelde `http://localhost:3000` veya emülatör/LAN için `http://10.0.2.2:3000` / bilgisayarın **LAN IP**’si (`EXPO_PUBLIC_API_URL` ile, mobil `client.js` dokümantasyonuna bakın).

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

