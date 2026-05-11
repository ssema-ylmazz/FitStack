# FitStack — Mobil Front-End Dokümantasyonu

Bu doküman, **Yazılım Mühendisliği** dersi final teslimi kapsamında mobil istemci (React Native + Expo) mimarisini ve web ile özdeş **17 fonksiyonel gereksinimin** mobilde nasıl karşılanacağını özetler.

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
├── App.js                 # SafeAreaProvider, AuthProvider, NavigationContainer, AppNavigator
├── package.json
├── index.js
├── src/
│   ├── api/
│   │   └── client.js      # Axios örneği (baseURL)
│   ├── components/        # AppButton, AppInput, AppCard, Loading, EmptyState
│   ├── context/
│   │   └── AuthContext.js # Token ve login/logout/register durumu
│   ├── navigation/
│   │   ├── AppNavigator.js    # Oturum: Auth ↔ Ana uygulama
│   │   ├── AuthNavigator.js   # Giriş / Kayıt stack
│   │   └── MainTabs.js        # Alt sekmeler + iç içe stack’ler
│   ├── screens/
│   │   ├── auth/          # LoginScreen, RegisterScreen
│   │   ├── home/          # HomeScreen
│   │   ├── programs/      # ProgramsScreen, ProgramDetailScreen
│   │   ├── workouts/      # WorkoutHistoryScreen, WorkoutCreateScreen
│   │   ├── profile/       # ProfileScreen, EditProfileScreen
│   │   ├── points/        # PointsScreen
│   │   ├── badges/        # BadgesScreen
│   │   └── streak/        # StreakScreen
│   ├── storage/
│   │   └── tokenStorage.js
│   └── utils/
│       └── formatters.js
```

---

## 3. Ekran listesi

| Ekran | Dosya | Amaç (final) |
|--------|--------|----------------|
| Giriş | `screens/auth/LoginScreen.js` | Kullanıcı girişi (Gereksinim 2) |
| Kayıt | `screens/auth/RegisterScreen.js` | Kullanıcı kaydı (Gereksinim 1) |
| Ana sayfa | `screens/home/HomeScreen.js` | Özet / kısayollar |
| Programlar | `screens/programs/ProgramsScreen.js` | Liste + filtre (6, 7) |
| Program detayı | `screens/programs/ProgramDetailScreen.js` | Detay görüntüleme (8) |
| Antrenman geçmişi | `screens/workouts/WorkoutHistoryScreen.js` | Geçmiş (10) |
| Antrenman oluştur | `screens/workouts/WorkoutCreateScreen.js` | Kayıt oluşturma (9) |
| Profil | `screens/profile/ProfileScreen.js` | Profil görüntüleme, hesap silme (3, 5) |
| Profil düzenle | `screens/profile/EditProfileScreen.js` | Profil güncelleme (4) |
| Puanlar | `screens/points/PointsScreen.js` | Toplam puan (12) + tamamlama puanı akışı (11) |
| Rozetler | `screens/badges/BadgesScreen.js` | Rozet listesi ve kazanma (13, 14) |
| Seri | `screens/streak/StreakScreen.js` | Seri görüntüleme ve güncelleme (15, 16) |

İskelet aşamasında ekranlar başlık ve kısa açıklama içerir; finalde formlar, listeler ve API bağlantıları tamamlanacaktır.

---

## 4. Navigasyon yapısı

1. **`AppNavigator`**  
   - Oturum yoksa: **`AuthNavigator`** (stack: Login → Register).  
   - Oturum varsa: **`MainTabs`** (alt sekme navigatörü).

2. **`MainTabs`** — dört sekme  
   - **Ana Sayfa** (`HomeTab`): iç stack → Home, Points, Badges, Streak.  
   - **Programlar** (`ProgramsTab`): ProgramsList → ProgramDetail.  
   - **Antrenmanlar** (`WorkoutsTab`): WorkoutHistory → WorkoutCreate.  
   - **Profil** (`ProfileTab`): ProfileMain → EditProfile.

3. **Kimlik doğrulama**  
   - `AuthContext` üzerinden `token` durumu; `tokenStorage` ile AsyncStorage senkronizasyonu.  
   - Finalde `login` / `register` gerçek API yanıtlarıyla token yazılacak; çıkışta token silinecektir.

---

## 5. API bağlantı mantığı

- Tüm HTTP çağrıları tek bir Axios örneği üzerinden yapılır: **`src/api/client.js`**.  
- **Base URL:** `http://localhost:3000` (yerel backend). Fiziksel cihaz veya Android emülatör için üretim öncesi ortam değişkeni veya yapılandırma ile adres güncellenebilir (ör. LAN IP, `10.0.2.2` emülatör).  
- **Oturum:** Giriş sonrası dönen `token`, AsyncStorage’da saklanır; isteklerde (backend desteklediğinde) `Authorization: Bearer <token>` başlığı eklenebilir. Mevcut mock backend oturumu sunucu tarafında yönetebilir; mobil yine de token’ı saklamaya hazır olmalıdır.  
- **Hata yönetimi:** `success: false` ve `error` / `message` alanları için ortak bir hata gösterimi (ör. toast veya `Alert`) planlanmalıdır.  
- **Detaylı endpoint ve gövde özetleri:** [MobilBackEnd.md](MobilBackEnd.md).

---

## 6. On yedi gereksinimin mobilde karşılanması

| No | Gereksinim | Mobil karşılık (önerilen ekran / akış) |
|----|----------------|----------------------------------------|
| 1 | Kullanıcı kaydı | `RegisterScreen` → `POST /users/register` |
| 2 | Kullanıcı girişi | `LoginScreen` → `POST /users/login`, token saklama |
| 3 | Profil görüntüleme | `ProfileScreen` → `GET /users/profile` |
| 4 | Profil güncelleme | `EditProfileScreen` → `PUT /users/profile` |
| 5 | Hesap silme | `ProfileScreen` (onay ile) → `DELETE /users/profile` |
| 6 | Program listeleme | `ProgramsScreen` → `GET /programs` |
| 7 | Program filtreleme | `ProgramsScreen` (segment veya picker) → `GET /programs?level=...` |
| 8 | Program seçme ve detay | `ProgramsScreen` + `ProgramDetailScreen` → `POST /programs/:id/select`, `GET /programs/:id` |
| 9 | Antrenman kaydı oluşturma | `WorkoutCreateScreen` → `POST /workouts` |
| 10 | Geçmiş antrenmanlar | `WorkoutHistoryScreen` → `GET /workouts` |
| 11 | Puan kazanma | Antrenman tamamlama akışı → `PUT /workouts/:id/points` (ör. `WorkoutCreate` veya detay sonrası) |
| 12 | Toplam puan görüntüleme | `PointsScreen` → `GET /users/points` |
| 13 | Rozet kazanma | Koşul sağlandığında → `POST /badges` |
| 14 | Rozetleri görüntüleme | `BadgesScreen` → `GET /badges` |
| 15 | Günlük seri görüntüleme | `StreakScreen` → `GET /streak` |
| 16 | Seri bilgisi güncelleme | `StreakScreen` → `PUT /streak` |
| 17 | Antrenman kaydını silme | `WorkoutHistoryScreen` (swipe veya menü) → `DELETE /workouts/:id` |

Üye bazlı görev dağılımı için bkz.:  
[Sema — Mobil Front-End görevleri](Sema-Yilmaz/Sema-Yilmaz-Mobil-Frontend-Gorevleri.md), [Hüseyin — Mobil Front-End görevleri](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Frontend-Gorevleri.md).

---

## 7. İlgili dokümanlar

- [MobilBackEnd.md](MobilBackEnd.md) — REST uçları ve örnek yanıtlar  
- [OpenAPI spesifikasyonu](openapi.yaml) — Makine okunur sözleşme (kök path, `/v1` yok)
