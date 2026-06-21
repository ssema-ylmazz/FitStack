# Sema Yılmaz Sorumlu Mobil Gereksinim Görevleri

## Öğrenci Bilgisi

| Alan | Bilgi |
|---|---|
| Öğrenci adı | Sema Nur Yılmaz |
| Görev alanı | Sorumlu mobil gereksinimlerin ekran + API bağlantılı demo akışı |
| Branch | `feature/sema-mobile-frontend` |
| Commitler | `bf2595bc Add FitStack mobile frontend screens`, `b27bbe1 Polish mobile UI for final demo` |

## Yapılan İşler

Sema'nın sorumlu olduğu mobil gereksinimlerin demo akışı kapsamında yaptığı işler:

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
- Sorumlu gereksinimlerin mobilde API bağlantılı çalışır şekilde gösterilmesi

## Sorumlu Gereksinimler

| Gereksinim no | Açıklama | HTTP metodu | Mobil ekran | Videoda gösterilecek işlem |
|---|---|---|---|---|
| 1 | Kullanıcı sisteme kayıt olur | POST | Register | Kayıt formu ve kayıt isteği |
| 2 | Kullanıcı sisteme giriş yapar | POST | Login | Giriş formu ve oturum açma |
| 6 | Kullanıcı hazır egzersiz programlarını listeler | GET | Programlar | Program listesinin görüntülenmesi |
| 7 | Kullanıcı programları zorluk seviyesine göre filtreler | GET | Programlar | Seviye filtresinin kullanılması |
| 8 | Kullanıcı bir program seçer ve detaylarını görüntüler | GET, POST | Program Detayı | Detay ekranı ve Programı Seç aksiyonu |
| 12 | Kullanıcı toplam puanını görüntüler | GET | Ana Sayfa | Toplam puan kartının gösterilmesi |
| 14 | Kullanıcı kazandığı rozetleri görüntüler | GET | Ana Sayfa | Rozet listesinin gösterilmesi |
| 15 | Kullanıcı günlük seri sayısını görüntüler | GET | Ana Sayfa | Seri bilgisinin gösterilmesi |

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

## Kanıt Videosunda Gösterilecek Sema Görevleri

1. Register ve Login akışı
2. Program listesinin API bağlantılı şekilde gösterilmesi
3. Program seviye filtresinin kullanılması
4. Program detay ve seçme akışı
5. Ana Sayfa toplam puan, rozet ve seri alanları
6. Kendi sorumlu gereksinimlerini kendi sesiyle anlatması

## Not

Bu dosya Sema'nın sorumlu olduğu gereksinimlerin mobil ekran ve API bağlantılı demo akışını görünür yapmak için hazırlanmıştır.
