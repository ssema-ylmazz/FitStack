const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/** @type {Array<{id:number,title:string,level:'beginner'|'intermediate'|'advanced',duration:number,category:string,calories:number,description:string}>} */
const PROGRAMS = [
  {
    id: 1,
    title: 'Morning Cardio Ignite',
    level: 'beginner',
    duration: 25,
    category: 'cardio',
    calories: 180,
    description: 'Düşük tempolu kardiyo ile güne güvenli bir başlangıç.',
  },
  {
    id: 2,
    title: 'Upper Body Strength',
    level: 'intermediate',
    duration: 45,
    category: 'strength',
    calories: 320,
    description: 'Göğüs, sırt ve omuz odaklı direnç antrenmanı.',
  },
  {
    id: 3,
    title: 'HIIT Power Blast',
    level: 'advanced',
    duration: 40,
    category: 'hiit',
    calories: 450,
    description: 'Yüksek yoğunluklu aralıklı antrenman ile maksimum kalori.',
  },
];

let nextUserId = 1;
let nextWorkoutId = 1;
let nextBadgeId = 1;

/** @type {Map<string, {id:number,email:string,password:string,name:string,username:string,level:string}>} */
const usersByEmail = new Map();

/** @type {Map<number, {workouts:object[], badges:object[], totalPoints:number, streak:{currentStreak:number,lastWorkoutDate:string|null,updatedAt:string}, selectedProgramId:number|null}>} */
const userState = new Map();

function defaultUserState() {
  return {
    workouts: [],
    badges: [
      {
        id: nextBadgeId++,
        key: 'welcome',
        name: 'FitStack\'e Hoş Geldin',
        earnedAt: new Date().toISOString(),
      },
    ],
    totalPoints: 120,
    streak: {
      currentStreak: 3,
      lastWorkoutDate: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString(),
    },
    selectedProgramId: null,
  };
}

function getState(userId) {
  if (!userState.has(userId)) userState.set(userId, defaultUserState());
  return userState.get(userId);
}

function publicUser(u) {
  return {
    id: u.id,
    name: u.name,
    username: u.username,
    email: u.email,
    level: u.level,
  };
}

function mockToken(userId, email) {
  const payload = JSON.stringify({ sub: userId, email, typ: 'mock', iat: Date.now() });
  return `fitstack.${Buffer.from(payload).toString('base64url')}.${crypto.randomBytes(8).toString('hex')}`;
}

function seedDemoUser() {
  const email = 'demo@fitstack.local';
  const u = {
    id: nextUserId++,
    email,
    password: 'demo',
    name: 'FitStacker',
    username: 'fitstacker',
    level: 'intermediate',
  };
  usersByEmail.set(email, u);
  return u;
}

let activeUser = seedDemoUser();

app.get('/', (req, res) => {
  res.type('text/plain').send('FitStack API çalışıyor — REST kökünde aktif.');
});

/* ---------------- USERS ---------------- */

app.post('/users/register', (req, res) => {
  const { email, password, username, name } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'email ve password zorunludur.',
    });
  }
  if (usersByEmail.has(String(email).toLowerCase())) {
    return res.status(409).json({
      success: false,
      error: 'EMAIL_IN_USE',
      message: 'Bu e-posta ile kayıtlı kullanıcı var.',
    });
  }
  const u = {
    id: nextUserId++,
    email: String(email).toLowerCase(),
    password: String(password),
    name: name ? String(name) : 'Kullanıcı',
    username: username ? String(username) : String(email).split('@')[0],
    level: 'beginner',
  };
  usersByEmail.set(u.email, u);
  activeUser = u;
  return res.status(201).json({
    success: true,
    message: 'Kayıt başarılı',
    user: publicUser(u),
  });
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'email ve password zorunludur.',
    });
  }
  const u = usersByEmail.get(String(email).toLowerCase());
  if (!u || u.password !== String(password)) {
    return res.status(401).json({
      success: false,
      error: 'INVALID_CREDENTIALS',
      message: 'E-posta veya şifre hatalı.',
    });
  }
  activeUser = u;
  const token = mockToken(u.id, u.email);
  return res.status(200).json({
    success: true,
    message: 'Giriş başarılı',
    token,
    user: publicUser(u),
  });
});

app.get('/users/profile', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok; önce kayıt olun veya giriş yapın.',
    });
  }
  return res.status(200).json({
    success: true,
    user: publicUser(activeUser),
  });
});

app.put('/users/profile', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const { name, username, level, email } = req.body || {};
  if (name != null) activeUser.name = String(name);
  if (username != null) activeUser.username = String(username);
  if (level != null) activeUser.level = String(level);
  if (email != null) {
    const ne = String(email).toLowerCase();
    if (ne !== activeUser.email && usersByEmail.has(ne)) {
      return res.status(409).json({
        success: false,
        error: 'EMAIL_IN_USE',
        message: 'Bu e-posta kullanımda.',
      });
    }
    usersByEmail.delete(activeUser.email);
    activeUser.email = ne;
    usersByEmail.set(ne, activeUser);
  }
  return res.status(200).json({
    success: true,
    message: 'Profil güncellendi',
    user: publicUser(activeUser),
  });
});

app.delete('/users/profile', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  usersByEmail.delete(activeUser.email);
  userState.delete(activeUser.id);
  activeUser = seedDemoUser();
  return res.status(200).json({
    success: true,
    message: 'Hesap silindi (mock: yeni demo oturumu başlatıldı).',
  });
});

app.get('/users/points', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const st = getState(activeUser.id);
  return res.status(200).json({
    success: true,
    totalPoints: st.totalPoints,
    userId: activeUser.id,
    updatedAt: new Date().toISOString(),
  });
});

/* ---------------- PROGRAMS (liste / filtre önce, :id rotaları sonra) ---------------- */

app.get('/programs', (req, res) => {
  const { level } = req.query;
  const allowed = ['beginner', 'intermediate', 'advanced'];
  let list = [...PROGRAMS];
  if (level != null && level !== '') {
    const lv = String(level).toLowerCase();
    if (!allowed.includes(lv)) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_LEVEL',
        message: `level şu değerlerden biri olmalıdır: ${allowed.join(', ')}`,
      });
    }
    list = list.filter((p) => p.level === lv);
  }
  return res.status(200).json({
    success: true,
    programs: list,
    count: list.length,
  });
});

app.post('/programs/:id/select', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const pid = Number(req.params.id);
  const program = PROGRAMS.find((p) => p.id === pid);
  if (!program) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'Program bulunamadı.',
    });
  }
  getState(activeUser.id).selectedProgramId = program.id;
  return res.status(200).json({
    success: true,
    message: 'Program seçildi',
    programId: program.id,
    program,
  });
});

app.get('/programs/:id', (req, res) => {
  const pid = Number(req.params.id);
  const program = PROGRAMS.find((p) => p.id === pid);
  if (!program) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'Program bulunamadı.',
    });
  }
  return res.status(200).json({
    success: true,
    program,
  });
});

/* ---------------- WORKOUTS ---------------- */

app.post('/workouts', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const body = req.body || {};
  let programId = body.programId != null ? Number(body.programId) : getState(activeUser.id).selectedProgramId;
  if (programId == null || Number.isNaN(programId)) {
    programId = PROGRAMS[0].id;
  }
  const program = PROGRAMS.find((p) => p.id === programId);
  if (!program) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_PROGRAM',
      message: 'Geçersiz programId.',
    });
  }
  const workout = {
    id: nextWorkoutId++,
    programId: program.id,
    programTitle: program.title,
    duration: body.duration != null ? Number(body.duration) : program.duration,
    calories: body.calories != null ? Number(body.calories) : program.calories,
    date: body.date ? String(body.date) : new Date().toISOString().slice(0, 10),
    note: body.note != null ? String(body.note) : '',
  };
  getState(activeUser.id).workouts.unshift(workout);
  return res.status(201).json({
    success: true,
    message: 'Antrenman kaydedildi',
    workout,
  });
});

app.get('/workouts', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const list = getState(activeUser.id).workouts;
  return res.status(200).json({
    success: true,
    workouts: list,
    count: list.length,
  });
});

app.put('/workouts/:id/points', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const wid = Number(req.params.id);
  const st = getState(activeUser.id);
  const workout = st.workouts.find((w) => w.id === wid);
  if (!workout) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'Antrenman bulunamadı.',
    });
  }
  const gained = req.body && req.body.points != null ? Number(req.body.points) : 50;
  st.totalPoints += gained;
  return res.status(200).json({
    success: true,
    message: 'Puan eklendi',
    gainedPoints: gained,
    totalPoints: st.totalPoints,
    workout,
  });
});

app.delete('/workouts/:id', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const wid = Number(req.params.id);
  const st = getState(activeUser.id);
  const idx = st.workouts.findIndex((w) => w.id === wid);
  if (idx === -1) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'Antrenman bulunamadı.',
    });
  }
  const [removed] = st.workouts.splice(idx, 1);
  return res.status(200).json({
    success: true,
    message: 'Antrenman silindi',
    id: wid,
    workout: removed,
  });
});

/* ---------------- BADGES & STREAK ---------------- */

app.post('/badges', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const body = req.body || {};
  const name = body.name ? String(body.name) : 'Yeni Rozet';
  const key = body.key ? String(body.key) : `badge_${nextBadgeId}`;
  const badge = {
    id: nextBadgeId++,
    key,
    name,
    earnedAt: new Date().toISOString(),
  };
  getState(activeUser.id).badges.push(badge);
  return res.status(201).json({
    success: true,
    message: 'Rozet kazanıldı',
    badge,
  });
});

app.get('/badges', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const list = getState(activeUser.id).badges;
  return res.status(200).json({
    success: true,
    badges: list,
    count: list.length,
  });
});

app.get('/streak', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const s = getState(activeUser.id).streak;
  return res.status(200).json({
    success: true,
    streak: {
      currentStreak: s.currentStreak,
      lastWorkoutDate: s.lastWorkoutDate,
      updatedAt: s.updatedAt,
    },
  });
});

app.put('/streak', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const body = req.body || {};
  const st = getState(activeUser.id);
  if (body.currentStreak != null) st.streak.currentStreak = Math.max(0, Number(body.currentStreak));
  if (body.lastWorkoutDate != null) st.streak.lastWorkoutDate = String(body.lastWorkoutDate);
  st.streak.updatedAt = new Date().toISOString();
  return res.status(200).json({
    success: true,
    message: 'Seri bilgisi güncellendi',
    streak: {
      currentStreak: st.streak.currentStreak,
      lastWorkoutDate: st.streak.lastWorkoutDate,
      updatedAt: st.streak.updatedAt,
    },
  });
});

app.listen(PORT, () => {
  console.log(`FitStack API http://localhost:${PORT} üzerinde aktif.`);
});
