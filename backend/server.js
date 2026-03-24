const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FitStack API çalışıyor 🚀 - 17 Gereksinim Tamamlandı');
});

const PORT = 3000;

/* ---------------- USERS (Gereksinim 1, 2, 3, 4, 5, 12) ---------------- */

// 1. Kullanıcı Kaydı Olma (Sema)
app.post('/users/register', (req, res) => {
  const { email, password } = req.body;
  res.status(201).json({ message: 'Kayıt başarılı', user: { email } });
});

// 2. Kullanıcı Girişi (Hüseyin)
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: 'Giriş başarılı', user: { email } });
});

// 3. Profil Görüntüleme (Sema)
app.get('/users/profile', (req, res) => {
  res.status(200).json({ email: "test@mail.com", name: "FitStacker", level: "Orta" });
});

// 4. Profil Güncelleme (Hüseyin)
app.put('/users/profile', (req, res) => {
  res.status(200).json({ message: 'Profil güncellendi', updatedProfile: req.body });
});

// 5. Hesap Silme (Sema)
app.delete('/users/profile', (req, res) => {
  res.status(200).json({ message: 'Hesap silindi' });
});

// 12. Toplam Puan Görüntüleme (Hüseyin)
app.get('/users/points', (req, res) => {
  res.status(200).json({ totalPoints: 1250 });
});

/* ---------------- PROGRAMS (Gereksinim 6, 7, 8) ---------------- */

// 6. Program Listeleme (Hüseyin)
// 7. Program Filtreleme (Sema)
app.get('/programs', (req, res) => {
  const { level } = req.query;
  const programs = [
    { id: 1, name: 'Başlangıç', level: 'Başlangıç' },
    { id: 2, name: 'Orta', level: 'Orta' }
  ];
  if (level) {
    return res.status(200).json(programs.filter(p => p.level === level));
  }
  res.status(200).json(programs);
});

// 8. Program Seçme ve Detay (Hüseyin)
app.post('/programs/:id/select', (req, res) => {
  res.status(200).json({ message: `Program ${req.params.id} seçildi` });
});
app.get('/programs/:id', (req, res) => {
  res.status(200).json({ id: req.params.id, name: "Seçilen Program", details: "Detaylar..." });
});

/* ---------------- WORKOUTS (Gereksinim 9, 10, 11, 17) ---------------- */

// 9. Antrenman Kaydı Oluşturma (Sema)
app.post('/workouts', (req, res) => {
  res.status(201).json({ message: 'Antrenman kaydedildi', data: req.body });
});

// 10. Geçmiş Antrenmanları Görüntüleme (Hüseyin)
app.get('/workouts', (req, res) => {
  res.status(200).json([{ id: 1, name: "Koşu", date: "2026-03-20" }]);
});

// 11. Puan Kazanma (Sema)
app.put('/workouts/:id/points', (req, res) => {
  res.status(200).json({ message: "Puan kazanıldı", gainedPoints: 50 });
});

// 17. Antrenman Kaydını Silme (Sema)
app.delete('/workouts/:id', (req, res) => {
  res.status(200).json({ message: `Antrenman ${req.params.id} silindi` });
});

/* ---------------- BADGES & STREAK (Gereksinim 13, 14, 15, 16) ---------------- */

// 13. Rozet Kazanma (Sema)
app.post('/badges', (req, res) => {
  res.status(200).json({ message: 'Yeni rozet kazanıldı!' });
});

// 14. Rozetleri Görüntüleme (Hüseyin)
app.get('/badges', (req, res) => {
  res.status(200).json([{ id: 1, name: "İlk Koşu Rozeti" }]);
});

// 15. Günlük Seri Görüntüleme (Sema)
app.get('/streak', (req, res) => {
  res.status(200).json({ currentStreak: 5 });
});

// 16. Seri Bilgisi Güncelleme (Hüseyin)
app.put('/streak', (req, res) => {
  res.status(200).json({ message: 'Seri bilgisi güncellendi', newStreak: 6 });
});

app.listen(PORT, () => {
  console.log(`FitStack API http://localhost:${PORT} üzerinde aktif.`);
});