# FitStack — Mobil Front-End Dokümantasyonu

Bu doküman, **Yazılım Mühendisliği** dersi final teslimi kapsamında mobil istemci (React Native + Expo) mimarisini ve web ile özdeş **17 fonksiyonel gereksinimin** mobilde nasıl karşılandığını özetler.

---

## 1. Teknoloji yığını

| Bileşen | Açıklama |
|--------|-----------|
| **React Native** | Çok platformlu mobil arayüz |
| **Expo** | Geliştirme, derleme ve cihazda önizleme akışı (`expo start`) |
| **React Navigation** | Native stack ve alt sekme (bottom tabs) navigasyonu |
| **Axios** | REST API ile HTTP iletişimi (`src/api/client.js`) |
| **AsyncStorage** | Oturum token’ının kalıcı saklanması (`src/storage/tokenStorage.js`) |

Kaynak kod kökü: **`fitstack-mobile/`** klasörü.

---

## 2. Klasör yapısı (`fitstack-mobile`)

```
fitstack-mobile/
├── App.js
├── package.json
├── index.js
├── src/
│   ├── api/               # client.js, authService, goalsService, leaderboardService, …
│   ├── components/        # AppButton, AppInput, AppCard, Loading, EmptyState
│   ├── context/
│   │   └── AuthContext.js
│   ├── navigation/
│   │   ├── AppNavigator.js
│   │   ├── AuthNavigator.js
│   │   └── MainTabs.js
│   ├── screens/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── programs/
│   │   ├── workouts/
│   │   ├── profile/
│   │   ├── points/
│   │   ├── badges/
│   │   ├── streak/
│   │   ├── leaderboard/
│   │   ├── statistics/
│   │   └── goals/
│   ├── storage/
│   └── utils/
```

---

## 3. Ekran listesi

| Ekran | Dosya | Amaç |
|--------|--------|------|
| Giriş | `screens/auth/LoginScreen.js` | Kullanıcı girişi (Gereksinim 2) |
| Kayıt | `screens/auth/RegisterScreen.js` | Kullanıcı kaydı (Gereksinim 1) |
| Ana sayfa | `screens/home/HomeScreen.js` | Activity feed + puan/rozet/seri kısayolları |
| Programlar | `screens/programs/ProgramsScreen.js` | Liste + filtre (6, 7) |
| Program detayı | `screens/programs/ProgramDetailScreen.js` | Detay ve seçim (8) |
| Antrenman geçmişi | `screens/workouts/WorkoutHistoryScreen.js` | Geçmiş, puan, silme (10, 11, 17) |
| Antrenman oluştur | `screens/workouts/WorkoutCreateScreen.js` | Kayıt oluşturma (9) |
| Liderlik | `screens/leaderboard/LeaderboardScreen.js` | `GET /leaderboard` |
| İstatistikler | `screens/statistics/StatisticsScreen.js` | İstemci tarafı özet (workout/program verisi) |
| Hedefler | `screens/goals/GoalsScreen.js` | `GET/POST/PUT /goals` |
| Profil | `screens/profile/ProfileScreen.js` | Profil, hesap silme (3, 5) |
| Profil düzenle | `screens/profile/EditProfileScreen.js` | Profil güncelleme (4) |
| Puanlar | `screens/points/PointsScreen.js` | Toplam puan (12) |
| Rozetler | `screens/badges/BadgesScreen.js` | Rozetler (13, 14) |
| Seri | `screens/streak/StreakScreen.js` | Seri (15, 16) |

Tüm ekranlar REST API ile bağlıdır; formlar, listeler ve hata geri bildirimi uygulanmıştır.

---

## 4. Navigasyon yapısı

1. **`AppNavigator`**  
   - Oturum yoksa: **`AuthNavigator`** (Login → Register).  
   - Oturum varsa: **`MainTabs`**.

2. **`MainTabs`** — yedi alt sekme  
   - **Ana Sayfa** (`HomeTab`): stack → Home, Points, Badges, Streak.  
   - **Programlar** (`ProgramsTab`): ProgramsList → ProgramDetail.  
   - **Antrenmanlar** (`WorkoutsTab`): WorkoutHistory → WorkoutCreate.  
   - **Liderlik** (`LeaderboardTab`): `LeaderboardScreen`.  
   - **İstatistikler** (`StatisticsTab`): `StatisticsScreen`.  
   - **Hedefler** (`GoalsTab`): `GoalsScreen`.  
   - **Profil** (`ProfileTab`): ProfileMain → EditProfile.

3. **Kimlik doğrulama**  
   - `AuthContext` + `authService`; giriş/kayıt sonrası token `tokenStorage` ile saklanır.

---

## 5. API bağlantı mantığı

- HTTP çağrıları **`src/api/client.js`** üzerinden yapılır.  
- **Base URL:** `EXPO_PUBLIC_API_URL` veya platform varsayılanı (`10.0.2.2:3000` Android emülatör, `127.0.0.1:3000` iOS simülatör).  
- **Oturum:** Mock backend sunucu oturumunu yönetir; mobil token’ı saklar.  
- **Hata yönetimi:** API `message` alanı ekranda gösterilir.  
- **Endpoint özetleri:** [MobilBackEnd.md](MobilBackEnd.md).

---

## 6. On yedi gereksinimin mobilde karşılanması

| No | Gereksinim | Mobil karşılık |
|----|------------|----------------|
| 1 | Kullanıcı kaydı | `RegisterScreen` → `POST /users/register` |
| 2 | Kullanıcı girişi | `LoginScreen` → `POST /users/login` |
| 3 | Profil görüntüleme | `ProfileScreen` → `GET /users/profile` |
| 4 | Profil güncelleme | `EditProfileScreen` → `PUT /users/profile` |
| 5 | Hesap silme | `ProfileScreen` → `DELETE /users/profile` |
| 6 | Program listeleme | `ProgramsScreen` → `GET /programs` |
| 7 | Program filtreleme | `ProgramsScreen` → `GET /programs?level=...` |
| 8 | Program seçme ve detay | `ProgramDetailScreen` → `POST /programs/:id/select`, `GET /programs/:id` |
| 9 | Antrenman kaydı | `WorkoutCreateScreen` → `POST /workouts` |
| 10 | Geçmiş antrenmanlar | `WorkoutHistoryScreen` → `GET /workouts` |
| 11 | Puan kazanma | `WorkoutHistoryScreen` → `PUT /workouts/:id/points` |
| 12 | Toplam puan | `PointsScreen` → `GET /users/points` |
| 13 | Rozet kazanma | `BadgesScreen` → `POST /badges` |
| 14 | Rozetleri görüntüleme | `BadgesScreen` → `GET /badges` |
| 15 | Günlük seri | `StreakScreen` → `GET /streak` |
| 16 | Seri güncelleme | `StreakScreen` → `PUT /streak` |
| 17 | Antrenman silme | `WorkoutHistoryScreen` → `DELETE /workouts/:id` |

### Ek özellikler (17 gereksinim dışı)

| Özellik | Ekran | API / not |
|---------|--------|-----------|
| Leaderboard | `LeaderboardScreen` | `GET /leaderboard` |
| Goals | `GoalsScreen` | `GET/POST/PUT /goals` |
| Activity Feed | `HomeScreen` | `GET /activity-feed` |
| Statistics | `StatisticsScreen` | İstemci tarafı hesaplama (workout/program/points) |

Üye bazlı görev dağılımı: [README.md](README.md) — Ek özellikler tablosu; [Sema — Mobil FE](Sema-Yilmaz/Sema-Yilmaz-Mobil-Frontend-Gorevleri.md), [Hüseyin — Mobil FE](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Frontend-Gorevleri.md).

---

## 7. İlgili dokümanlar

- [MobilBackEnd.md](MobilBackEnd.md) — REST uçları ve örnek yanıtlar  
- [OpenAPI spesifikasyonu](openapi.yaml) — Makine okunur sözleşme (kök path, `/v1` yok)  
- [README.md](README.md) — Docker, Jenkins, Redis, RabbitMQ
