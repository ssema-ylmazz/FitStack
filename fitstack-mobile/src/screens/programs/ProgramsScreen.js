import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import EmptyState from '../../components/EmptyState';
import * as programService from '../../api/programService';

const FILTERS = [
  { key: 'all', label: 'Tümü' },
  { key: 'beginner', label: 'Başlangıç' },
  { key: 'intermediate', label: 'Orta' },
  { key: 'advanced', label: 'İleri' },
];

export default function ProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const loadPrograms = useCallback(async (filter) => {
    setError('');
    setLoading(true);
    setPrograms([]);
    try {
      const list = await programService.fetchPrograms(filter);
      setPrograms(list);
    } catch (e) {
      setPrograms([]);
      setError(e instanceof Error ? e.message : 'Programlar yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPrograms(activeFilter);
  }, [activeFilter, loadPrograms]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError('');
    try {
      const list = await programService.fetchPrograms(activeFilter);
      setPrograms(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Yenileme başarısız.');
    } finally {
      setRefreshing(false);
    }
  }, [activeFilter]);

  const onRetry = useCallback(() => {
    loadPrograms(activeFilter);
  }, [activeFilter, loadPrograms]);

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => navigation.navigate('ProgramDetail', { id: item.id })}
        style={({ pressed }) => [styles.cardPress, pressed && styles.cardPressed]}
      >
        <AppCard style={styles.cardInner}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardMeta}>{programService.programLevelLabel(item.level)}</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardStat}>{item.duration} dk</Text>
            <Text style={styles.cardDot}>·</Text>
            <Text style={styles.cardStat}>{item.category}</Text>
            <Text style={styles.cardDot}>·</Text>
            <Text style={styles.cardStat}>{item.calories} kcal</Text>
          </View>
        </AppCard>
      </Pressable>
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const listEmpty =
    !loading && !error && programs.length === 0 ? (
      <EmptyState title="Program bulunamadı" message="Bu filtreye uygun program yok." />
    ) : null;

  const listLoading = loading && programs.length === 0 && !refreshing ? (
    <View style={styles.inlineLoader}>
      <ActivityIndicator size="large" color="#a3e635" />
      <Text style={styles.loadingText}>Yükleniyor…</Text>
    </View>
  ) : null;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.headerBlock}>
        <Text style={styles.screenTitle}>Programlar</Text>
        <Text style={styles.screenSubtitle}>Listeleme ve zorluk filtresi</Text>
        <View style={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = activeFilter === f.key;
            return (
              <Pressable
                key={f.key}
                onPress={() => !loading && setActiveFilter(f.key)}
                style={[styles.filterChip, active && styles.filterChipActive, loading && styles.filterChipDisabled]}
                disabled={loading}
              >
                <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>{f.label}</Text>
              </Pressable>
            );
          })}
        </View>
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={onRetry} style={styles.retryBtn} />
          </View>
        ) : null}
      </View>

      {listLoading}

      {!listLoading ? (
        <FlatList
          data={programs}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  headerBlock: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  screenTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 14 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap' },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    borderColor: '#a3e635',
    backgroundColor: 'rgba(163, 230, 53, 0.12)',
  },
  filterChipDisabled: { opacity: 0.55 },
  filterChipText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  filterChipTextActive: { color: '#a3e635' },
  errorBanner: {
    marginTop: 4,
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.35)',
  },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
  retryBtn: { alignSelf: 'flex-start' },
  inlineLoader: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  listContent: { paddingHorizontal: 16, paddingBottom: 32, flexGrow: 1 },
  cardPress: { marginBottom: 12 },
  cardPressed: { opacity: 0.92 },
  cardInner: { marginBottom: 0 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#f8fafc', marginBottom: 4 },
  cardMeta: { fontSize: 13, color: '#a3e635', marginBottom: 8, fontWeight: '600' },
  cardRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  cardStat: { fontSize: 13, color: '#94a3b8' },
  cardDot: { fontSize: 13, color: '#475569', marginHorizontal: 6 },
});
