export const dashboardSummary = {
  userName: 'Sema',
  totalPoints: 1240,
  streakDays: 6,
  completedWorkouts: 18,
  selectedProgram: 'Full Body Beginner',
  recentActivities: [
    'Cardio Burn programında 20 dakika tamamlandı.',
    'Yeni seri hedefi: 7 gün.',
    'Full Body Beginner programa eklendi.',
  ],
};

export const mockWorkouts = [
  {
    id: 'mock-1',
    programTitle: 'Full Body Beginner',
    date: '2026-06-18',
    duration: 25,
    calories: 180,
    points: 60,
  },
  {
    id: 'mock-2',
    programTitle: 'Cardio Burn',
    date: '2026-06-17',
    duration: 30,
    calories: 240,
    points: 80,
  },
  {
    id: 'mock-3',
    programTitle: 'Strength Builder',
    date: '2026-06-15',
    duration: 40,
    calories: 310,
    points: 90,
  },
];

export const mockLeaderboard = [
  {
    id: 'mock-leader-1',
    username: 'Sema',
    points: 1240,
    streak: 6,
    rank: 1,
  },
  {
    id: 'mock-leader-2',
    username: 'Hüseyin',
    points: 1120,
    streak: 5,
    rank: 2,
  },
  {
    id: 'mock-leader-3',
    username: 'FitStacker',
    points: 980,
    streak: 4,
    rank: 3,
  },
];

export const programs = [
  {
    id: 'full-body-beginner',
    title: 'Full Body Beginner',
    level: 'beginner',
    duration: 25,
    description: 'Tüm vücudu çalıştıran, başlangıç seviyesine uygun dengeli program.',
    exercises: ['Isınma yürüyüşü', 'Vücut ağırlığı squat', 'Eğimli şınav', 'Glute bridge'],
  },
  {
    id: 'cardio-burn',
    title: 'Cardio Burn',
    level: 'intermediate',
    duration: 30,
    description: 'Kalp ritmini yükselten, tempolu ve enerjik kardiyo rutini.',
    exercises: ['Jumping jack', 'High knees', 'Mountain climber', 'Soğuma yürüyüşü'],
  },
  {
    id: 'strength-builder',
    title: 'Strength Builder',
    level: 'advanced',
    duration: 40,
    description: 'Güç kazanımı için temel direnç egzersizlerinden oluşan program.',
    exercises: ['Şınav', 'Lunge', 'Plank hold', 'Shoulder press'],
  },
];
