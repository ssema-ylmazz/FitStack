# Sema Yılmaz Mobil Front-End Görevleri

## Öğrenci Bilgisi

| Alan | Bilgi |
|---|---|
| Öğrenci adı | Sema Nur Yılmaz |
| Görev alanı | Mobil Front-End |
| Branch | `feature/sema-mobile-frontend` |
| Commitler | `bf2595bc Add FitStack mobile frontend screens`, `b27bbe1 Polish mobile UI for final demo` |

## Yapılan İşler

Sema'nın mobil front-end kapsamında yaptığı işler:

- Expo mobil uygulama iskeletinin oluşturulması
- Login ekranı tasarımı
- Register ekranı tasarımı
- Dashboard ekranı tasarımı
- Programs ekranı tasarımı
- ProgramDetail ekranı tasarımı
- Profile ekranı temel görünümü
- Ortak componentlerin oluşturulması
- Navigation yapısının kurulması
- Mock data ile demo görünümünün hazırlanması
- Türkçe tab adları ve final demo görünümünün iyileştirilmesi
- Program kartları, dashboard, leaderboard ve workout ekranlarında okunabilirlik düzenlemeleri

## İlgili Dosyalar

| Dosya/Klasör | Açıklama |
|---|---|
| `fitstack-mobile/App.js` | Mobil uygulama giriş noktası |
| `fitstack-mobile/app.json` | Expo yapılandırması |
| `fitstack-mobile/package.json` | Mobil bağımlılıklar ve scriptler |
| `fitstack-mobile/src/navigation/AppNavigator.js` | Ana navigasyon yapısı |
| `fitstack-mobile/src/navigation/AuthNavigator.js` | Login/Register navigasyonu |
| `fitstack-mobile/src/navigation/MainTabs.js` | Tab navigasyonu ve program stack |
| `fitstack-mobile/src/screens/LoginScreen.js` | Login ekranı |
| `fitstack-mobile/src/screens/RegisterScreen.js` | Register ekranı |
| `fitstack-mobile/src/screens/DashboardScreen.js` | Dashboard ekranı |
| `fitstack-mobile/src/screens/ProgramsScreen.js` | Program listesi ekranı |
| `fitstack-mobile/src/screens/ProgramDetailScreen.js` | Program detay ekranı |
| `fitstack-mobile/src/screens/ProfileScreen.js` | Profile ekranı |
| `fitstack-mobile/src/screens/WorkoutHistoryScreen.js` | Workout tab ekranı |
| `fitstack-mobile/src/components/AppButton.js` | Ortak buton componenti |
| `fitstack-mobile/src/components/AppInput.js` | Ortak input componenti |
| `fitstack-mobile/src/components/ScreenContainer.js` | Ortak ekran container yapısı |
| `fitstack-mobile/src/components/ProgramCard.js` | Program kart componenti |
| `fitstack-mobile/src/components/StatCard.js` | Dashboard istatistik kartı |
| `fitstack-mobile/src/components/SectionTitle.js` | Bölüm başlığı componenti |
| `fitstack-mobile/src/components/LoadingState.js` | Loading durumu |
| `fitstack-mobile/src/components/ErrorState.js` | Hata durumu |
| `fitstack-mobile/src/constants/colors.js` | Renk sabitleri |
| `fitstack-mobile/src/constants/mockData.js` | Demo veriler |

## İlgili Gereksinim Numaraları

| Gereksinim no | Frontend katkısı |
|---|---|
| 1, 2 | Login/Register ekranlarının kullanıcı arayüzü |
| 3, 4, 5 | Profil ekranı form ve aksiyon görünümü |
| 6, 7, 8 | Program listeleme, filtreleme ve detay ekranları |
| 9, 10, 11, 17 | Antrenmanlar ekranı, workout kartları ve aksiyon butonları |
| 12, 13, 14, 15, 16 | Ana Sayfa puan, rozet ve seri kartları |
| Demo | Liderlik tabı ve Redis kanıt ekranı görünümü |

## Kanıt Videosunda Gösterilecek Sema Görevleri

1. Login/Register ekran tasarımları
2. Dashboard kartları ve genel mobil görünüm
3. Programs ekranındaki program kartları
4. ProgramDetail ekranındaki egzersiz listesi
5. Tab navigasyon yapısı
6. Ortak componentlerin farklı ekranlarda kullanımı
7. Final demo için Türkçe tablar: Ana Sayfa, Programlar, Antrenmanlar, Liderlik, Profil
8. 17 gereksinimin mobil ekranda görünür olması

## Not

Bu dosya Sema'nın mobil front-end katkılarını görünür yapmak için hazırlanmıştır. REST API bağlantıları ve token yönetimi Hüseyin'in mobil back-end/API entegrasyon görevi altında belgelenmiştir.
