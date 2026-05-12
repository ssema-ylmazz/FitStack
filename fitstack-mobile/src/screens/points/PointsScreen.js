import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import * as pointsService from '../../api/pointsService';

export default function PointsScreen() {
  const [totalPoints, setTotalPoints] = useState(0);
  const [updatedAt, setUpdatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastAward, setLastAward] = useState(null);

  const loadPoints = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const s = await pointsService.fetchPointsSummary();
      setError('');
      setTotalPoints(s.totalPoints);
      setUpdatedAt(s.updatedAt || '');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Puanlar yüklenemedi.');
    } finally {
      if (!silent) setLoading(false);
      if (silent) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadPoints({ silent: false });
    }, [loadPoints]),
  );

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(pointsService.POINTS_UPDATED_EVENT, (payload) => {
      if (payload && typeof payload.totalPoints === 'number') {
        setTotalPoints(payload.totalPoints);
      }
      setLastAward({
        gained: payload?.gainedPoints ?? 0,
        total: payload?.totalPoints ?? 0,
        at: new Date().toISOString(),
      });
    });
    return () => sub.remove();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPoints({ silent: true });
  }, [loadPoints]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Puanlar yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Puanlar</Text>
        <Text style={styles.screenSubtitle}>Toplam XP ve son kazanım özeti</Text>

        {error ? (
          <AppCard style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={() => loadPoints({ silent: false })} />
          </AppCard>
        ) : null}

        {!error ? (
          <>
            <AppCard style={styles.heroCard}>
              <Text style={styles.heroLabel}>Toplam puan</Text>
              <Text style={styles.heroValue}>{totalPoints}</Text>
              <Text style={styles.heroUnit}>XP</Text>
              {updatedAt ? (
                <Text style={styles.meta}>Sunucu güncellemesi: {formatIsoDisplay(updatedAt)}</Text>
              ) : null}
            </AppCard>

            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Son kazanılan puan</Text>
              {lastAward ? (
                <>
                  <Text style={styles.awardGain}>+{lastAward.gained} XP</Text>
                  <Text style={styles.awardTotal}>Yeni toplam: {lastAward.total} XP</Text>
                  <Text style={styles.meta}>İşlem zamanı: {formatIsoDisplay(lastAward.at)}</Text>
                </>
              ) : (
                <Text style={styles.emptyHint}>
                  Bu oturumda henüz puan kazanılmadı. Antrenman geçmişinden &quot;Puan kazan&quot; ile ekleyebilirsin.
                </Text>
              )}
            </AppCard>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function formatIsoDisplay(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso).slice(0, 16);
    return d.toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return String(iso).slice(0, 16);
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  screenTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  card: { marginBottom: 14 },
  heroCard: {
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 28,
    borderWidth: 1,
    borderColor: 'rgba(163, 230, 53, 0.35)',
    backgroundColor: 'rgba(163, 230, 53, 0.08)',
  },
  heroLabel: { fontSize: 13, color: '#a3e635', fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
  heroValue: { fontSize: 56, fontWeight: '900', color: '#f8fafc', lineHeight: 62 },
  heroUnit: { fontSize: 16, color: '#94a3b8', fontWeight: '600', marginTop: 4 },
  meta: { fontSize: 12, color: '#64748b', marginTop: 12, textAlign: 'center' },
  sectionTitle: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginBottom: 10 },
  awardGain: { fontSize: 28, fontWeight: '800', color: '#a3e635', marginBottom: 6 },
  awardTotal: { fontSize: 16, color: '#e2e8f0', fontWeight: '600', marginBottom: 8 },
  emptyHint: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
