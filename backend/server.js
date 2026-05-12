const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(
  cors({
    origin: true,
    credentials: false,
    optionsSuccessStatus: 200,
  }),
);
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
let nextGoalId = 1;
let nextActivityId = 1;

function seedDefaultGoals() {
  const t = new Date().toISOString();
  return [
    {
      id: nextGoalId++,
      type: 'weekly_workouts',
      title: 'Haftada 3 antrenman',
      target: 3,
      createdAt: t,
      manualComplete: false,
    },
    {
      id: nextGoalId++,
      type: 'total_points',
      title: '500 puan kazan',
      target: 500,
      createdAt: t,
      manualComplete: false,
    },
    {
      id: nextGoalId++,
      type: 'streak_days',
      title: '5 günlük seri oluştur',
      target: 5,
      createdAt: t,
      manualComplete: false,
    },
  ];
}

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
    goals: seedDefaultGoals(),
    activities: [],
  };
}

function getState(userId) {
  if (!userState.has(userId)) userState.set(userId, defaultUserState());
  const st = userState.get(userId);
  if (!Array.isArray(st.goals)) {
    st.goals = seedDefaultGoals();
  }
  if (!Array.isArray(st.activities)) {
    st.activities = [];
  }
  return st;
}

function toDateKeyLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function addDaysLocal(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}

function startOfWeekMondayLocal(ref) {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function parseWorkoutDateKey(raw) {
  if (raw == null) return null;
  const s = String(raw).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

function countWorkoutsThisCalendarWeek(workouts) {
  const today = new Date();
  const mon = startOfWeekMondayLocal(today);
  const sun = addDaysLocal(mon, 6);
  const monK = toDateKeyLocal(mon);
  const sunK = toDateKeyLocal(sun);
  return workouts.filter((w) => {
    const k = parseWorkoutDateKey(w.date);
    return k != null && k >= monK && k <= sunK;
  }).length;
}

function computeGoalProgress(st, g) {
  let current = 0;
  if (g.type === 'weekly_workouts') {
    current = countWorkoutsThisCalendarWeek(st.workouts);
  } else if (g.type === 'total_points') {
    current = st.totalPoints;
  } else if (g.type === 'streak_days') {
    current = st.streak.currentStreak;
  } else {
    current = 0;
  }
  const target = Math.max(1, Number(g.target) || 1);
  const completed = g.manualComplete === true || current >= target;
  const progressPercent = Math.min(100, Math.round((current / target) * 1000) / 10);
  return {
    id: g.id,
    type: g.type,
    title: g.title,
    target,
    current,
    completed,
    manualComplete: g.manualComplete === true,
    progressPercent,
    createdAt: g.createdAt,
  };
}

function userFirstName(u) {
  if (!u || u.name == null) return 'Kullanıcı';
  const p = String(u.name).trim().split(/\s+/)[0];
  return p || 'Kullanıcı';
}

/**
 * @param {object} st userState
 * @param {string} type
 * @param {string} message
 */
function pushActivity(st, type, message) {
  if (!Array.isArray(st.activities)) st.activities = [];
  st.activities.unshift({
    id: nextActivityId++,
    type,
    message,
    createdAt: new Date().toISOString(),
  });
  if (st.activities.length > 100) {
    st.activities.length = 100;
  }
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
  const st = getState(activeUser.id);
  st.workouts.unshift(workout);
  pushActivity(st, 'workout', `${userFirstName(activeUser)} ${workout.duration} dakikalık bir antrenman tamamladı.`);
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
  pushActivity(st, 'points', `${userFirstName(activeUser)} ${gained} puan kazandı.`);
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
  const st = getState(activeUser.id);
  st.badges.push(badge);
  pushActivity(st, 'badge', `Yeni rozet kazanıldı: ${badge.name}.`);
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

/* ---------------- GOALS ---------------- */

const GOAL_TYPES = new Set(['weekly_workouts', 'total_points', 'streak_days']);

app.get('/goals', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const st = getState(activeUser.id);
  const goals = (st.goals || []).map((g) => computeGoalProgress(st, g));
  return res.status(200).json({
    success: true,
    goals,
    count: goals.length,
  });
});

app.post('/goals', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const body = req.body || {};
  const type = body.type != null ? String(body.type) : '';
  if (!GOAL_TYPES.has(type)) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_TYPE',
      message: 'type: weekly_workouts, total_points veya streak_days olmalıdır.',
    });
  }
  let title = body.title != null ? String(body.title).trim() : '';
  let target = body.target != null ? Number(body.target) : NaN;
  if (type === 'weekly_workouts') {
    if (!title) title = 'Haftada 3 antrenman';
    if (Number.isNaN(target) || target <= 0) target = 3;
  } else if (type === 'total_points') {
    if (!title) title = '500 puan kazan';
    if (Number.isNaN(target) || target <= 0) target = 500;
  } else if (type === 'streak_days') {
    if (!title) title = '5 günlük seri oluştur';
    if (Number.isNaN(target) || target <= 0) target = 5;
  }
  const st = getState(activeUser.id);
  const goal = {
    id: nextGoalId++,
    type,
    title,
    target,
    createdAt: new Date().toISOString(),
    manualComplete: false,
  };
  st.goals.push(goal);
  pushActivity(st, 'goal', `Yeni hedef oluşturuldu: ${title}.`);
  return res.status(201).json({
    success: true,
    message: 'Hedef oluşturuldu',
    goal: computeGoalProgress(st, goal),
  });
});

app.put('/goals/:id', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const gid = Number(req.params.id);
  if (Number.isNaN(gid)) {
    return res.status(400).json({
      success: false,
      error: 'INVALID_ID',
      message: 'Geçersiz hedef id.',
    });
  }
  const st = getState(activeUser.id);
  const g = st.goals.find((x) => x.id === gid);
  if (!g) {
    return res.status(404).json({
      success: false,
      error: 'NOT_FOUND',
      message: 'Hedef bulunamadı.',
    });
  }
  const body = req.body || {};
  if (body.title != null) g.title = String(body.title).trim() || g.title;
  if (body.target != null) {
    const t = Number(body.target);
    if (!Number.isNaN(t) && t > 0) g.target = t;
  }
  if (body.manualComplete != null) {
    g.manualComplete = Boolean(body.manualComplete);
  }
  return res.status(200).json({
    success: true,
    message: 'Hedef güncellendi',
    goal: computeGoalProgress(st, g),
  });
});

app.get('/activity-feed', (req, res) => {
  if (!activeUser) {
    return res.status(401).json({
      success: false,
      error: 'UNAUTHORIZED',
      message: 'Oturum yok.',
    });
  }
  const st = getState(activeUser.id);
  const activities = Array.isArray(st.activities) ? st.activities : [];
  return res.status(200).json({
    success: true,
    activities,
    count: activities.length,
  });
});

app.listen(PORT, () => {
  console.log(`FitStack API http://localhost:${PORT} üzerinde aktif.`);
});
