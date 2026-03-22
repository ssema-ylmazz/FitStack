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
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  // Basit kontrol (şimdilik fake)
  if (email === 'test@mail.com' && password === '123456') {
    return res.status(200).json({
      message: 'Giriş başarılı',
      user: {
        email: email
      }
    });
  } else {
    return res.status(401).json({
      message: 'Email veya şifre yanlış'
    });
  }
});
app.post('/users/register', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email ve şifre zorunludur'
    });
  }

  return res.status(201).json({
    message: 'Kayıt başarılı',
    user: {
      email: email
    }
  });
});
app.get('/users/profile', (req, res) => {
  return res.status(200).json({
    email: "test@mail.com",
    name: "Hüseyin",
    level: "Başlangıç"
  });
});
app.put('/users/profile', (req, res) => {
  const { name, level } = req.body;

  return res.status(200).json({
    message: 'Profil güncellendi',
    updatedProfile: {
      name: name,
      level: level
    }
  });
});
app.delete('/users/profile', (req, res) => {
  return res.status(200).json({
    message: 'Kullanıcı hesabı silindi'
  });
});
app.get('/programs', (req, res) => {
  const programs = [
    { id: 1, name: 'Başlangıç Programı', level: 'Başlangıç' },
    { id: 2, name: 'Orta Seviye Program', level: 'Orta' },
    { id: 3, name: 'İleri Seviye Program', level: 'İleri' }
  ];

  res.status(200).json(programs);
});
app.get('/programs/:id', (req, res) => {
  const programs = [
    { id: 1, name: 'Başlangıç Programı', level: 'Başlangıç' },
    { id: 2, name: 'Orta Seviye Program', level: 'Orta' },
    { id: 3, name: 'İleri Seviye Program', level: 'İleri' }
  ];

  const programId = parseInt(req.params.id);

  const program = programs.find(p => p.id === programId);

  if (!program) {
    return res.status(404).json({
      message: 'Program bulunamadı'
    });
  }

  res.status(200).json(program);
});
app.post('/programs/:id/select', (req, res) => {
  const programId = req.params.id;

  return res.status(200).json({
    message: `Program ${programId} seçildi`,
    selectedProgramId: programId
  });
});
app.get('/workouts', (req, res) => {
  const workouts = [
    { id: 1, name: 'Şınav', duration: '10 dk' },
    { id: 2, name: 'Koşu', duration: '20 dk' },
    { id: 3, name: 'Plank', duration: '5 dk' }
  ];

  res.status(200).json(workouts);
});
app.post('/workouts', (req, res) => {
  const { name, duration } = req.body;

  if (!name || !duration) {
    return res.status(400).json({
      message: 'İsim ve süre zorunludur'
    });
  }

  return res.status(201).json({
    message: 'Workout eklendi',
    workout: {
      name,
      duration
    }
  });
});app.delete('/workouts/:id', (req, res) => {
  const workoutId = req.params.id;

  return res.status(200).json({
    message: `Workout ${workoutId} silindi`
  });
});
app.put('/workouts/:id/points', (req, res) => {
  const workoutId = req.params.id;
  const { points } = req.body;

  return res.status(200).json({
    message: `Workout ${workoutId} puanı güncellendi`,
    newPoints: points
  });
});