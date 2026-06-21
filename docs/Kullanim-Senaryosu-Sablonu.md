# Kullanım Senaryosu Şablonu

Bu şablon yeni bir FitStack kullanım senaryosu eklenirken kopyalanıp
doldurulmalıdır.

| Alan | Açıklama |
|------|----------|
| Senaryo kimliği | UC-XX |
| Senaryo adı | Kısa ve eylem bildiren ad |
| İlgili gereksinim | G-XX |
| Birincil aktör | Kullanıcı veya sistem rolü |
| Sorumlu üye | Sema Nur Yılmaz / Hüseyin Boğatekin |
| Tetikleyici | Senaryoyu başlatan olay |
| Ön koşullar | Başlamadan önce sağlanması gereken koşullar |
| Son koşullar | Başarılı işlemden sonra oluşan durum |
| REST endpoint | HTTP metodu ve yol |
| Mobil ekran | İlgili ekran veya bileşen |
| Kanıt | Video bağlantısı veya zaman damgası |

## Ana Başarı Akışı

1. Aktör işlemi başlatır.
2. Sistem girdileri doğrular.
3. Mobil uygulama REST API isteğini gönderir.
4. Backend işlemi gerçekleştirir ve sonucu kaydeder.
5. Sistem sonucu kullanıcıya gösterir.

## Alternatif ve Hata Akışları

1. Geçersiz girdi durumunda kullanıcıya anlaşılır hata gösterilir.
2. Ağ veya backend hatasında işlem başarısız olarak bildirilir.
3. Yetkisiz erişimde kullanıcı giriş ekranına yönlendirilir.

## Kabul Kriterleri

- [ ] Ana başarı akışı gerçek cihaz veya simülatörde tamamlanır.
- [ ] API isteği ve HTTP durum kodu doğrulanır.
- [ ] Veri değişikliği veya backend logu kanıtlanır.
- [ ] Hata durumu kullanıcıya anlaşılır şekilde gösterilir.
