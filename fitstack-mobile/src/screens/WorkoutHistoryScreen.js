import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import ScreenContainer from '../components/ScreenContainer';
import { createWorkout, deleteWorkout, getWorkouts, updateWorkoutPoints } from '../api/workoutsApi';
import colors from '../constants/colors';
import { mockWorkouts } from '../constants/mockData';

export default function WorkoutHistoryScreen() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);
  const [creatingDemo, setCreatingDemo] = useState(false);
  const [pointsLoadingId, setPointsLoadingId] = useState(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  async function loadWorkouts() {
    setLoading(true);
    setError('');
    try {
      const response = await getWorkouts();
      const apiWorkouts = response.data?.workouts || response.data?.data?.workouts || [];
      setWorkouts(apiWorkouts);
      setUsingFallback(false);
    } catch (err) {
      setWorkouts(mockWorkouts);
      setUsingFallback(true);
      setError(err.userMessage || 'Antrenman gecmisi alinamadi. Demo liste gosteriliyor.');
    } finally {
      setLoading(false);
    }
  }

  function confirmDelete(workout) {
    Alert.alert('Antrenmani sil', 'Bu antrenman kaydi silinsin mi?', [
      { text: 'Vazgec', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: () => handleDelete(workout) },
    ]);
  }

  async function handleDelete(workout) {
    if (usingFallback || String(workout.id).startsWith('mock-')) {
      setWorkouts((current) => current.filter((item) => item.id !== workout.id));
      return;
    }

    try {
      await deleteWorkout(workout.id);
      setWorkouts((current) => current.filter((item) => item.id !== workout.id));
    } catch (err) {
      setError(err.userMessage || 'Antrenman silinemedi.');
    }
  }

  async function handleCreateDemoWorkout() {
    if (creatingDemo) return;

    setCreatingDemo(true);
    setError('');
    try {
      await createWorkout({
        programId: 1,
        duration: 25,
        calories: 180,
        note: 'RabbitMQ demo workout',
      });
      Alert.alert('Antrenman kaydedildi', 'RabbitMQ kuyruğunu kontrol edebilirsiniz.');
      await loadWorkouts();
    } catch (err) {
      setError(err.userMessage || 'Demo antrenman kaydedilemedi. Backend kapali olabilir.');
    } finally {
      setCreatingDemo(false);
    }
  }

  async function handleGainPoints(workout) {
    if (pointsLoadingId) return;

    if (usingFallback || String(workout.id).startsWith('mock-')) {
      setWorkouts((current) =>
        current.map((item) =>
          item.id === workout.id ? { ...item, points: (item.points || 0) + 50, gainedPoints: 50 } : item,
        ),
      );
      Alert.alert('Demo puan kazanildi', 'Backend kapaliyken mock workout puani guncellendi.');
      return;
    }

    setPointsLoadingId(workout.id);
    setError('');
    try {
      const response = await updateWorkoutPoints(workout.id, { points: 50 });
      const gainedPoints = response.data?.gainedPoints ?? 50;
      Alert.alert('Puan kazanildi', `${gainedPoints} puan eklendi.`);
      await loadWorkouts();
    } catch (err) {
      setError(err.userMessage || 'Puan eklenemedi.');
    } finally {
      setPointsLoadingId(null);
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <Text style={styles.title}>Antrenman Gecmisi</Text>
      <Text style={styles.subtitle}>
        {usingFallback ? 'Backend kapaliyken demo kayitlar gosteriliyor.' : 'Tamamlanan antrenman kayitlari.'}
      </Text>

      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>RabbitMQ Kanit Aksiyonu</Text>
        <Text style={styles.demoText}>
          Bu islem POST /workouts endpointini cagirir ve backend RabbitMQ'ya WORKOUT_CREATED mesaji uretir.
        </Text>
        <AppButton
          disabled={creatingDemo}
          title={creatingDemo ? 'Kaydediliyor...' : 'Demo Antrenman Kaydet'}
          onPress={handleCreateDemoWorkout}
        />
      </View>

      {loading ? <LoadingState message="Antrenmanlar yukleniyor..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && workouts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Henuz antrenman kaydi yok</Text>
          <Text style={styles.emptyText}>Bir program tamamladiginda gecmis burada gorunecek.</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {workouts.map((workout) => {
          const title = workout.programTitle || workout.name || workout.title || 'Antrenman';
          const date = workout.date || workout.createdAt || 'Tarih yok';
          const points = workout.points || workout.gainedPoints || workout.rewardPoints || 0;

          return (
            <View key={workout.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardText}>
                  <Text style={styles.cardTitle}>{title}</Text>
                  <Text style={styles.meta}>
                    {date} · {workout.duration || 0} dk · {workout.calories || 0} kalori
                  </Text>
                  <Text style={styles.points}>{points} puan</Text>
                </View>
                <View style={styles.cardActions}>
                  <AppButton
                    disabled={pointsLoadingId === workout.id}
                    title={pointsLoadingId === workout.id ? 'Ekleniyor...' : 'Puan Kazan'}
                    variant="secondary"
                    style={styles.smallButton}
                    onPress={() => handleGainPoints(workout)}
                  />
                  <AppButton title="Sil" variant="secondary" style={styles.smallButton} onPress={() => confirmDelete(workout)} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: 28,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  demoBox: {
    backgroundColor: colors.infoSoft,
    borderColor: colors.info,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  demoTitle: {
    color: colors.info,
    fontSize: 16,
    fontWeight: '900',
  },
  demoText: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    gap: 5,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  meta: {
    color: colors.mutedText,
    fontSize: 13,
  },
  points: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
  },
  cardActions: {
    gap: 8,
    width: 112,
  },
  smallButton: {
    minHeight: 40,
    paddingHorizontal: 8,
  },
});
