import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import EmptyState from '../../components/EmptyState';
import * as workoutService from '../../api/workoutService';

export default function WorkoutHistoryScreen({ navigation }) {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadWorkouts = useCallback(async () => {
    setError('');
    try {
      const list = await workoutService.fetchWorkouts();
      setWorkouts(list);
    } catch (e) {
      setWorkouts([]);
      setError(e instanceof Error ? e.message : 'Antrenmanlar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadWorkouts();
    }, [loadWorkouts]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError('');
    try {
      const list = await workoutService.fetchWorkouts();
      setWorkouts(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yenileme başarısız.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const onRetry = useCallback(() => {
    setLoading(true);
    loadWorkouts();
  }, [loadWorkouts]);

  const confirmDelete = useCallback(
    (item) => {
      Alert.alert(
        'Antrenmanı sil',
        `"${item.programTitle}" kaydı silinsin mi?`,
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Sil',
            style: 'destructive',
            onPress: async () => {
              try {
                await workoutService.deleteWorkout(item.id);
                setWorkouts((prev) => prev.filter((w) => w.id !== item.id));
              } catch (e) {
                Alert.alert('Hata', e instanceof Error ? e.message : 'Silinemedi.');
              }
            },
          },
        ],
      );
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <AppCard style={styles.card}>
        <Text style={styles.cardTitle}>{item.programTitle}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Süre</Text>
          <Text style={styles.value}>{item.duration} dk</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Kalori</Text>
          <Text style={styles.value}>{item.calories} kcal</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tarih</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>
        {item.note ? (
          <View style={styles.noteBlock}>
            <Text style={styles.label}>Not</Text>
            <Text style={styles.note}>{item.note}</Text>
          </View>
        ) : null}
        <Pressable onPress={() => confirmDelete(item)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Sil</Text>
        </Pressable>
      </AppCard>
    ),
    [confirmDelete],
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const listHeader = (
    <View style={styles.headerBlock}>
      <Text style={styles.title}>Antrenman geçmişi</Text>
      <Text style={styles.subtitle}>Tamamladığın antrenmanların özeti</Text>
      <AppButton title="Yeni antrenman kaydı" onPress={() => navigation.navigate('WorkoutCreate')} style={styles.cta} />
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <AppButton title="Tekrar dene" onPress={onRetry} style={styles.retryBtn} />
        </View>
      ) : null}
    </View>
  );

  const listEmpty =
    !loading && !error ? (
      <EmptyState title="Henüz antrenman yok" message="Yeni kayıt oluşturmak için yukarıdaki butonu kullan." />
    ) : null;

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={workouts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  listContent: { paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 },
  headerBlock: { marginBottom: 12, paddingTop: 4 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 12 },
  cta: { marginBottom: 8 },
  errorBanner: {
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.35)',
  },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
  retryBtn: { alignSelf: 'flex-start' },
  card: { marginBottom: 12 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#f8fafc', marginBottom: 10 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  label: { fontSize: 13, color: '#94a3b8' },
  value: { fontSize: 14, color: '#e2e8f0', fontWeight: '600' },
  noteBlock: { marginTop: 8 },
  note: { fontSize: 14, color: '#cbd5e1', marginTop: 4, lineHeight: 20 },
  deleteBtn: { marginTop: 12, alignSelf: 'flex-end', paddingVertical: 6, paddingHorizontal: 10 },
  deleteText: { color: '#f87171', fontWeight: '700', fontSize: 14 },
});
