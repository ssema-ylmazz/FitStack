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

export const programs = [
  {
    id: 'full-body-beginner',
    title: 'Full Body Beginner',
    level: 'Baslangic',
    duration: 25,
    description: 'Tum vucudu calistiran, baslangic seviyesine uygun dengeli program.',
    exercises: ['Warm-up march', 'Bodyweight squat', 'Incline push-up', 'Glute bridge'],
  },
  {
    id: 'cardio-burn',
    title: 'Cardio Burn',
    level: 'Orta',
    duration: 30,
    description: 'Kalp ritmini yukselten, tempolu ve enerjik kardiyo rutini.',
    exercises: ['Jumping jack', 'High knees', 'Mountain climber', 'Cool-down walk'],
  },
  {
    id: 'strength-builder',
    title: 'Strength Builder',
    level: 'Orta-Zor',
    duration: 40,
    description: 'Guc kazanimi icin temel direncli egzersizlerden olusan program.',
    exercises: ['Push-up', 'Lunge', 'Plank hold', 'Shoulder press'],
  },
];
