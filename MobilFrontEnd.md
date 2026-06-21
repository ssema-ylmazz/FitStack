# Mobil Frontend Görev Dağılımı

## Genel Bilgi

Bu dokümanda FitStack mobil uygulamasının kullanıcı arayüzü ve kullanıcı deneyimi görevleri listelenir. Mobil uygulama `fitstack-mobile/` klasörü altında Expo tabanlı React Native projesi olarak geliştirilmiştir.

## Grup Üyelerinin Mobil Frontend Görevleri

| Üye | Görev alanı | Doküman |
|---|---|---|
| Sema Nur Yılmaz | Mobil ekran tasarımları, component yapısı, navigation ve final demo görünümü | [Sema mobil frontend görevleri](Sema-Yilmaz/Sema-Yilmaz-Mobil-Frontend-Gorevleri.md) |
| Hüseyin Boğatekin | Mobil REST API bağlantıları ve veri akışı | [Hüseyin mobil backend görevleri](Huseyin-Bogatekin/Huseyin-Bogatekin-Mobil-Backend-Gorevleri.md) |

Not: Mobil frontend ana sorumluluğu Sema Nur Yılmaz'a aittir. Hüseyin Boğatekin'in katkısı daha çok API bağlantısı, Redis/RabbitMQ demo tetikleyicileri ve son entegrasyon akışları üzerindedir.

## Genel Mobil Frontend Prensipleri

- Türkçe, sade ve demo sırasında kolay anlaşılır arayüz metinleri kullanılmıştır.
- Ekranlar SafeArea ve scroll desteğiyle mobil cihazlarda taşma riskine karşı düzenlenmiştir.
- Loading, error ve empty state bileşenleriyle API durumları kullanıcıya görünür yapılmıştır.
- Kart tabanlı, okunabilir ve öğrenci projesi için profesyonel bir tasarım dili tercih edilmiştir.
- Redis/RabbitMQ kanıtı gerektiren aksiyonlar açıklayıcı butonlarla görünür tutulmuştur.

## Kullanılan Mobil Frontend Teknolojileri

| Teknoloji | Kullanım amacı |
|---|---|
| React Native | Mobil arayüz geliştirme |
| Expo | Mobil geliştirme ve Expo Go ile çalıştırma |
| Expo SDK 54 | Güncel iOS Expo Go ile uyumluluk |
| React Navigation | Auth, tab ve program detay navigasyonu |
| React Native StyleSheet | Ekran ve component stilleri |
| Axios | REST API istekleri için altyapı |
| AsyncStorage | Token saklama altyapısı |

## Mobil Klasör Yolu

```text
fitstack-mobile/
```

## Mobil Ekranlar

| Ekran | Açıklama | İlgili gereksinimler |
|---|---|---|
| `LoginScreen` | Giriş ekranı; e-posta/şifre alanları ve kayıt yönlendirmesi içerir. | 2 |
| `RegisterScreen` | Kayıt ekranı; ad soyad, e-posta ve şifre alanları içerir. | 1 |
| `DashboardScreen` / Ana Sayfa | Puan, seri, rozet, seçili program ve son aktiviteler alanlarını gösterir. | 12, 13, 14, 15, 16 |
| `ProgramsScreen` / Programlar | Program listesini ve seviye filtrelerini gösterir. | 6, 7 |
| `ProgramDetailScreen` | Program detayını, egzersiz listesini ve program seçme aksiyonunu gösterir. | 8 |
| `WorkoutHistoryScreen` / Antrenmanlar | Antrenman geçmişi, workout kaydetme, puan kazanma ve silme aksiyonlarını gösterir. | 9, 10, 11, 17 |
| `LeaderboardScreen` / Liderlik | Redis cache kanıtı için liderlik tablosunu gösterir. | Demo/Redis kanıtı |
| `ProfileScreen` / Profil | Kullanıcı bilgilerini, profil güncelleme/silme ve çıkış aksiyonlarını gösterir. | 3, 4, 5 |

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

## Sema Nur Yılmaz'ın Frontend Katkıları

Sema Nur Yılmaz'ın mobil front-end kapsamındaki katkıları:

- Expo mobil iskeletinin oluşturulması
- Login/Register ekran tasarımları
- Dashboard ekran tasarımı
- Programs ve ProgramDetail ekran tasarımları
- Profile ekranının temel görünümü
- Ortak component yapısı
- Mobil navigation kurulumu
- Mock data ile demo görünümünün hazırlanması
- Türkçe tab adları ve final demo görünümü

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
