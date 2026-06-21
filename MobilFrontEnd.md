# FitStack Mobil Front-End

## Genel Bilgi

FitStack mobil uygulaması `fitstack-mobile/` klasörü altında Expo tabanlı React Native projesi olarak geliştirilmiştir. Bu doküman mobil arayüz, ekranlar, component yapısı ve demo sırasında gösterilecek front-end akışını özetler.

## Kullanılan Teknolojiler

| Teknoloji | Kullanım amacı |
|---|---|
| React Native | Mobil arayüz geliştirme |
| Expo | Mobil geliştirme ve Expo Go ile çalıştırma |
| Expo SDK 54 | Güncel iOS Expo Go ile uyumluluk |
| React Navigation | Auth, tab ve program detay navigasyonu |
| Axios | REST API istekleri için altyapı |
| AsyncStorage | Token saklama altyapısı |

## Mobil Klasör Yolu

```text
fitstack-mobile/
```

## Ekranlar

| Ekran | Açıklama |
|---|---|
| `LoginScreen` | Giriş ekranı; email/password alanları ve kayıt yönlendirmesi içerir. |
| `RegisterScreen` | Kayıt ekranı; ad soyad, email ve password alanları içerir. |
| `DashboardScreen` | Puan, streak, rozet, seçili program ve son aktiviteler alanlarını gösterir. |
| `ProgramsScreen` | Program listesini ve seviye filtrelerini gösterir. |
| `ProgramDetailScreen` | Program detayını, egzersiz listesini ve program seçme aksiyonunu gösterir. |
| `WorkoutHistoryScreen` | Antrenman geçmişi listesini ve silme aksiyonunu gösterir. |
| `LeaderboardScreen` | Redis cache kanıtı için liderlik tablosunu gösterir. |
| `ProfileScreen` | Kullanıcı bilgilerini, profil güncelleme/silme ve çıkış aksiyonlarını gösterir. |

## Ortak Componentler

| Component | Amaç |
|---|---|
| `AppButton` | Ortak buton görünümü |
| `AppInput` | Ortak input görünümü |
| `ScreenContainer` | Ekran gövdesi, safe area ve scroll desteği |
| `ProgramCard` | Program liste kartı |
| `StatCard` | Dashboard özet kartı |
| `SectionTitle` | Bölüm başlığı |
| `LoadingState` | Yüklenme durumu |
| `ErrorState` | Hata mesajı gösterimi |

## Navigasyon Yapısı

| Navigasyon | Açıklama |
|---|---|
| `AuthNavigator` | Login ve Register ekranlarını yönetir. |
| `MainTabs` | Ana Sayfa, Programlar, Antrenmanlar, Liderlik ve Profil tablarını içerir. |
| Program stack | Programs listesinden ProgramDetail ekranına geçiş sağlar. |

Uygulama `AuthProvider` ile sarılır. Token veya kullanıcı bilgisi varsa ana tab ekranları, yoksa auth ekranları gösterilir.

## Güncel Tab Adları

| Tab | Amaç |
|---|---|
| Ana Sayfa | Puan, seri, rozet ve son aktivite özeti |
| Programlar | Program listesi, filtreleme ve detay geçişi |
| Antrenmanlar | Workout geçmişi, puan kazanma, kayıt silme ve RabbitMQ demo aksiyonu |
| Liderlik | Redis cache kanıtı için leaderboard listesi |
| Profil | Profil görüntüleme, güncelleme, silme ve çıkış |

## 17 Gereksinimin Front-End Görünürlüğü

| Gereksinim | Mobil ekran |
|---|---|
| Register / Login | `RegisterScreen`, `LoginScreen` |
| Profil görüntüle / güncelle / sil | `ProfileScreen` |
| Program listele / filtrele | `ProgramsScreen` |
| Program detay + program seç | `ProgramDetailScreen` |
| Antrenman kaydet | `WorkoutHistoryScreen` |
| Geçmiş antrenmanları görüntüle | `WorkoutHistoryScreen` |
| Antrenman için puan kazan | `WorkoutHistoryScreen` |
| Toplam puan görüntüle | `DashboardScreen` |
| Rozet kazan / rozetleri görüntüle | `DashboardScreen` |
| Streak/seri görüntüle / güncelle | `DashboardScreen` |
| Antrenman kaydını sil | `WorkoutHistoryScreen` |

## Sema'nın Katkısı

Sema Nur Yılmaz'ın mobil front-end kapsamındaki katkıları:

- Expo mobil iskeletinin oluşturulması
- Login/Register ekran tasarımları
- Dashboard ekran tasarımı
- Programs ve ProgramDetail ekran tasarımları
- Profile ekranının temel görünümü
- Ortak component yapısı
- Mobil navigation kurulumu
- Mock data ile demo görünümünün hazırlanması

İlgili branch ve commit:

```text
feature/sema-mobile-frontend
bf2595bc Add FitStack mobile frontend screens
b27bbe1 Polish mobile UI for final demo
```

## Çalıştırma Komutları

```bash
cd fitstack-mobile
npm install
npm start
```

Platforma göre:

```bash
npm run android
npm run ios
npm run web
```

## Fiziksel Telefon Notu

Expo Go ile gerçek telefonda test etmek için:

- Bilgisayar ve telefon aynı Wi-Fi ağına bağlı olmalıdır.
- Backend yerelde çalışıyorsa `localhost` telefon için doğru adres değildir.
- `fitstack-mobile/src/constants/config.js` içinde `API_BASE_URL` değeri bilgisayarın LAN IP adresiyle güncellenmelidir.

Örnek:

```js
export const API_BASE_URL = 'http://192.168.1.25:3000';
```

Android emulator için genellikle:

```js
export const API_BASE_URL = 'http://10.0.2.2:3000';
```

Bu proje Expo SDK 54 ile güncellenmiştir; iOS Expo Go ile testte bu sürüm kullanılmalıdır.

## Demo Sırasında Gösterilecek Front-End Ekranları

1. Login ekranı
2. Register ekranı
3. Dashboard ekranı
4. Programs listesi ve filtreleri
5. ProgramDetail ekranı
6. WorkoutHistory ekranı
7. Leaderboard ekranı
8. Profile ekranı

## Kısa Not

Goals ve activity feed için mobil UI bu aşamada yapılmamıştır. Bu alanlar yapılmış gibi gösterilmemelidir.
