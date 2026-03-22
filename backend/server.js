const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('FitStack API çalışıyor 🚀');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});

/* ---------------- USERS ---------------- */

// KAYIT
app.post('/users/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email ve şifre zorunludur'
    });
  }

  return res.status(201).json({
    message: 'Kayıt başarılı',
    user: { email }
  });
});

// PROFİL GÖRÜNTÜLEME
app.get('/users/profile', (req, res) => {
  return res.status(200).json({
    email: "test@mail.com",
    name: "Sema",
    level: "Orta"
  });
});

// HESAP SİLME
app.delete('/users/profile', (req, res) => {
  return res.status(200).json({
    message: 'Kullanıcı hesabı silindi'
  });
});

/* ---------------- PROGRAMS ---------------- */

// PROGRAM FİLTRELEME
app.get('/programs', (req, res) => {
  const { level } = req.query;

  const programs = [
    { id: 1, name: 'Başlangıç Programı', level: 'Başlangıç' },
    { id: 2, name: 'Orta Seviye Program', level: 'Orta' },
    { id: 3, name: 'İleri Seviye Program', level: 'İleri' }
  ];

  if (level) {
    const filtered = programs.filter(p => p.level === level);
    return res.status(200).json(filtered);
  }

  res.status(200).json(programs);
});

/* ---------------- WORKOUTS ---------------- */

// ANTRENMAN EKLE
app.post('/workouts', (req, res) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({
      message: 'İsim ve süre zorunludur'
    });
  }

  return res.status(201).json({
    message: 'Workout eklendi',
    workout: { name, duration }
  });
});

// ANTRENMAN SİL
app.delete('/workouts/:id', (req, res) => {
  return res.status(200).json({
    message: `Workout ${req.params.id} silindi`
  });
});

// PUAN KAZANMA
app.put('/workouts/:id/points', (req, res) => {
  const { points } = req.body;

  return res.status(200).json({
    message: `Workout ${req.params.id} puan eklendi`,
    gainedPoints: points
  });
});

/* ---------------- BADGES ---------------- */

// ROZET KAZANMA
app.post('/badges', (req, res) => {
  return res.status(200).json({
    message: 'Rozet kazanıldı'
  });
});

/* ---------------- STREAK ---------------- */

// GÜNLÜK SERİ
app.get('/streak', (req, res) => {
  return res.status(200).json({
    currentStreak: 5
  });
});