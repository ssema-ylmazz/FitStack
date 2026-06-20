export const dashboardSummary = {
  userName: 'Sema',
  totalPoints: 1240,
  streakDays: 6,
  completedWorkouts: 18,
  selectedProgram: 'Full Body Beginner',
  recentActivities: [
    'Cardio Burn programinda 20 dakika tamamlandi.',
    'Yeni streak hedefi: 7 gun.',
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

export const programs = [
  {
    id: 'full-body-beginner',
    title: 'Full Body Beginner',
    level: 'beginner',
    duration: 25,
    description: 'Tum vucudu calistiran, baslangic seviyesine uygun dengeli program.',
    exercises: ['Warm-up march', 'Bodyweight squat', 'Incline push-up', 'Glute bridge'],
  },
  {
    id: 'cardio-burn',
    title: 'Cardio Burn',
    level: 'intermediate',
    duration: 30,
    description: 'Kalp ritmini yukselten, tempolu ve enerjik kardiyo rutini.',
    exercises: ['Jumping jack', 'High knees', 'Mountain climber', 'Cool-down walk'],
  },
  {
    id: 'strength-builder',
    title: 'Strength Builder',
    level: 'advanced',
    duration: 40,
    description: 'Guc kazanimi icin temel direncli egzersizlerden olusan program.',
    exercises: ['Push-up', 'Lunge', 'Plank hold', 'Shoulder press'],
  },
];
