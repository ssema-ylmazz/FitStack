import * as workoutService from './workoutService';
import * as programService from './programService';
import * as pointsService from './pointsService';

const DAY_SHORT_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

const CATEGORY_LABELS = {
  cardio: 'Kardiyo',
  strength: 'Güç',
  hiit: 'HIIT',
  flexibility: 'Esneklik',
  other: 'Diğer',
};

/** @type {Promise<{ workouts: object[], programsById: Map<number, object>, totalPoints: number }> | null} */
let sharedContextPromise = null;

function getSharedContext() {
  if (sharedContextPromise) return sharedContextPromise;
  sharedContextPromise = Promise.all([
    workoutService.fetchWorkouts(),
    programService.fetchPrograms('all'),
    pointsService.fetchPointsSummary().catch(() => ({ totalPoints: 0 })),
  ])
    .then(([workouts, programs, points]) => {
      const programsById = new Map(programs.map((p) => [Number(p.id), p]));
      return {
        workouts,
        programsById,
        totalPoints: Number(points?.totalPoints) || 0,
      };
    })
    .finally(() => {
      sharedContextPromise = null;
    });
  return sharedContextPromise;
}

function parseWorkoutDateKey(raw) {
  if (raw == null) return null;
  const s = String(raw).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

function dateKeyToLocalDate(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function startOfWeekMondayLocal(ref) {
  const d = new Date(ref.getFullYear(), ref.getMonth(), ref.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDaysLocal(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() + n);
  return x;
}

function toDateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function normalizeWorkout(w) {
  const duration = Number(w.duration) || 0;
  const calories = Number(w.calories) || 0;
  const programId = Number(w.programId) || 0;
  const dateKey = parseWorkoutDateKey(w.date) || toDateKey(new Date());
  return { raw: w, duration, calories, programId, dateKey };
}

function buildLastSevenDaysKeys(today) {
  const keys = [];
  for (let i = 6; i >= 0; i -= 1) {
    const d = addDaysLocal(today, -i);
    keys.push(toDateKey(d));
  }
  return keys;
}

function categoryKeyForWorkout(programsById, programId) {
  const p = programsById.get(programId);
  const c = p && p.category != null ? String(p.category).toLowerCase() : 'other';
  return c in CATEGORY_LABELS ? c : 'other';
}

function categoryLabel(key) {
  return CATEGORY_LABELS[key] || CATEGORY_LABELS.other;
}

/**
 * Antrenman sayıları, süreler, haftalık (takvim haftası) ve son 7 gün dağılımı + toplam puan özeti.
 */
export async function fetchWorkoutStats() {
  const { workouts, programsById, totalPoints } = await getSharedContext();
  const list = workouts.map(normalizeWorkout);
  const totalWorkouts = list.length;
  const totalDurationMinutes = list.reduce((s, w) => s + w.duration, 0);
  const avgDurationMinutes = totalWorkouts > 0 ? Math.round(totalDurationMinutes / totalWorkouts) : 0;

  const today = new Date();
  const monday = startOfWeekMondayLocal(today);
  const currentWeekLabels = [];
  const currentWeekMinutes = [];
  for (let i = 0; i < 7; i += 1) {
    const d = addDaysLocal(monday, i);
    const key = toDateKey(d);
    currentWeekLabels.push(DAY_SHORT_TR[d.getDay()]);
    const minutes = list.filter((w) => w.dateKey === key).reduce((s, w) => s + w.duration, 0);
    currentWeekMinutes.push(minutes);
  }

  const lastKeys = buildLastSevenDaysKeys(today);
  const lastSevenDays = lastKeys.map((dateKey) => {
    const dayDate = dateKeyToLocalDate(dateKey);
    const dayLabel = dayDate ? DAY_SHORT_TR[dayDate.getDay()] : '';
    const dayList = list.filter((w) => w.dateKey === dateKey);
    const durationMinutes = dayList.reduce((s, w) => s + w.duration, 0);
    const calories = dayList.reduce((s, w) => s + w.calories, 0);
    return {
      dateKey,
      dayLabel,
      durationMinutes,
      workoutCount: dayList.length,
      calories,
    };
  });

  return {
    totalWorkouts,
    totalDurationMinutes,
    avgDurationMinutes,
    totalPoints,
    currentWeekLabels,
    currentWeekMinutes,
    lastSevenDays,
  };
}

/**
 * Kalori toplamları ve son 7 gün kalori özeti (antrenman kayıtlarından).
 */
export async function fetchCaloriesStats() {
  const { workouts } = await getSharedContext();
  const list = workouts.map(normalizeWorkout);
  const totalCalories = list.reduce((s, w) => s + w.calories, 0);
  const totalWorkouts = list.length;
  const avgCaloriesPerWorkout = totalWorkouts > 0 ? Math.round(totalCalories / totalWorkouts) : 0;

  const today = new Date();
  const lastKeys = buildLastSevenDaysKeys(today);
  const lastSevenDaysCalories = lastKeys.map((dateKey) => {
    const dayDate = dateKeyToLocalDate(dateKey);
    const dayLabel = dayDate ? DAY_SHORT_TR[dayDate.getDay()] : '';
    const calories = list.filter((w) => w.dateKey === dateKey).reduce((s, w) => s + w.calories, 0);
    return { dateKey, dayLabel, calories };
  });

  return {
    totalCalories,
    avgCaloriesPerWorkout,
    lastSevenDaysCalories,
  };
}

/**
 * Program kategorisine göre antrenman dağılımı (süre ve adet).
 */
export async function fetchCategoryStats() {
  const { workouts, programsById } = await getSharedContext();
  const list = workouts.map(normalizeWorkout);
  const buckets = new Map();

  for (const w of list) {
    const key = categoryKeyForWorkout(programsById, w.programId);
    if (!buckets.has(key)) {
      buckets.set(key, { key, label: categoryLabel(key), count: 0, totalMinutes: 0, totalCalories: 0 });
    }
    const b = buckets.get(key);
    b.count += 1;
    b.totalMinutes += w.duration;
    b.totalCalories += w.calories;
  }

  const arr = Array.from(buckets.values());
  const totalMinutes = arr.reduce((s, c) => s + c.totalMinutes, 0) || 1;
  const totalCount = arr.reduce((s, c) => s + c.count, 0) || 1;

  const categories = arr
    .map((c) => ({
      ...c,
      percentOfMinutes: Math.round((c.totalMinutes / totalMinutes) * 1000) / 10,
      percentOfWorkouts: Math.round((c.count / totalCount) * 1000) / 10,
    }))
    .sort((a, b) => b.totalMinutes - a.totalMinutes);

  return { categories };
}
