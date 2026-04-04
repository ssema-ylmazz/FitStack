Web Frontend Görev Dağılımı (FitStack)

Web Frontend Adresi: fit-stack-nine.vercel.app

Bu dokümanda, FitStack uygulamasının kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) görevleri listelenmektedir. Her grup üyesi, kendisine atanan sayfaların tasarımı, implementasyonu ve API entegrasyonlarından sorumludur.
Grup Üyelerinin Web Frontend Görevleri

    Sema Yılmaz'ın Web Frontend Görevleri: Sema-Yilmaz/Sema-Yilmaz-Web-Frontend-Gorevleri.md

    Hüseyin Boğatekin'in Web Frontend Görevleri: Huseyin-Bogatekin/Huseyin-Rest-API-Gorevleri.md

Genel Web Frontend Prensipleri
1. Responsive Tasarım

    Mobile-First Approach: Antrenman takibi için önce mobil tasarım, sonra desktop.

    Breakpoints:

        Mobile: < 768px

        Tablet: 768px - 1024px

        Desktop: > 1024px

    Flexible Layouts: CSS Grid ve Flexbox kullanımı.

2. Tasarım Sistemi

    CSS Framework: Tailwind CSS veya Custom CSS (Dark Mode uyumlu).

    Renk Paleti: FitStack markasına uygun tutarlı karanlık tema renkleri.

    Tipografi: Okunabilirliği yüksek Google Fonts kullanımı.

    Iconography: Antrenman hareketleri için Icon kütüphaneleri (Heroicons).

3. Performans Optimizasyonu

    Lazy Loading: Antrenman GIF'leri ve ağır görsellerin gecikmeli yüklenmesi.

    Minification: Üretim aşamasında CSS ve JavaScript sıkıştırma.

    Bundle Size: Gereksiz paketlerden kaçınarak hızlı açılış sağlama.

4. API Entegrasyonu

    HTTP Client: Axios ile Spring Boot backend servisine bağlantı.

    Request Interceptors: Her isteğe otomatik JWT Token enjeksiyonu.

    Error Handling: API hatalarının (401, 500) merkezi yönetimi ve Toast mesajları.

    Loading States: Veri çekme sırasında Spinner veya Skeleton gösterimi.

5. State Management

    Global State: Kullanıcı oturumu ve XP puanları için Context API.

    Local State: Form girişleri ve anlık filtreler için React Hooks (useState).

6. Routing

    Client-Side Routing: React Router ile sayfalar arası hızlı geçiş.

    Protected Routes: Giriş yapmamış kullanıcılar için yetki kontrolü.

    404 Handling: Özel tasarlanmış "Sayfa Bulunamadı" ekranı.

7. Build ve Deployment

    Build Tool: Vite veya Create React App.

    Environment Variables: API URL bilgilerinin .env dosyasında saklanması.

    CI/CD: GitHub main branch üzerinden otomatik Vercel dağıtımı.
