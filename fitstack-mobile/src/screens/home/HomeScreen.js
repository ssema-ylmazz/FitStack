import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import EmptyState from '../../components/EmptyState';
import * as activityService from '../../api/activityService';

function formatActivityTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return '';
  }
}

export default function HomeScreen({ navigation }) {
  const [activities, setActivities] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [feedRefreshing, setFeedRefreshing] = useState(false);
  const [feedError, setFeedError] = useState('');

  const loadFeed = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setFeedLoading(true);
      setFeedError('');
    }
    try {
      const list = await activityService.fetchActivityFeed(5);
      setActivities(list);
      setFeedError('');
    } catch (e) {
      setActivities([]);
      setFeedError(e instanceof Error ? e.message : 'Aktiviteler yüklenemedi.');
    } finally {
      if (!silent) setFeedLoading(false);
      if (silent) setFeedRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFeed({ silent: false });
    }, [loadFeed]),
  );

  const onRefreshFeed = useCallback(async () => {
    setFeedRefreshing(true);
    await loadFeed({ silent: true });
  }, [loadFeed]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={feedRefreshing} onRefresh={onRefreshFeed} tintColor="#a3e635" />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Ana Sayfa</Text>
        <Text style={styles.desc}>
          Son aktivitelerinizi ve puan, rozet ile seri ekranlarına hızlı erişimi buradan takip edebilirsiniz.
        </Text>

        <Text style={styles.feedHeading}>Son aktiviteler</Text>
        <Text style={styles.feedSub}>En son 5 işlem</Text>

        {feedLoading && !feedRefreshing ? (
          <AppCard style={styles.feedCard}>
            <View style={styles.feedCenter}>
              <ActivityIndicator color="#a3e635" />
              <Text style={styles.feedLoadingText}>Yükleniyor…</Text>
            </View>
          </AppCard>
        ) : null}

        {feedError ? (
          <AppCard style={styles.feedCard}>
            <Text style={styles.feedError}>{feedError}</Text>
            <AppButton title="Tekrar dene" onPress={() => loadFeed({ silent: false })} />
          </AppCard>
        ) : null}

        {!feedLoading && !feedError && activities.length === 0 ? (
          <AppCard style={styles.feedCard}>
            <EmptyState title="Henüz aktivite yok" message="Antrenman, puan, rozet veya hedef eklediğinde burada görünür." />
          </AppCard>
        ) : null}

        {!feedLoading && !feedError
          ? activities.map((a) => (
              <AppCard key={a.id} style={styles.activityItem}>
                <Text style={styles.activityMsg}>{a.message}</Text>
                <Text style={styles.activityMeta}>{formatActivityTime(a.createdAt)}</Text>
              </AppCard>
            ))
          : null}

        <AppCard style={styles.navCard}>
          <Text style={styles.section}>İlgili ekranlar (gezinme testi)</Text>
          <AppButton title="Toplam puan" onPress={() => navigation.navigate('Points')} style={styles.btn} />
          <AppButton title="Rozetler" onPress={() => navigation.navigate('Badges')} variant="secondary" style={styles.btn} />
          <AppButton title="Günlük seri" onPress={() => navigation.navigate('Streak')} variant="secondary" style={styles.btn} />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  desc: { fontSize: 14, color: '#94a3b8', lineHeight: 20, marginBottom: 16 },
  feedHeading: { fontSize: 16, fontWeight: '800', color: '#f1f5f9', marginBottom: 4 },
  feedSub: { fontSize: 13, color: '#64748b', marginBottom: 10 },
  feedCard: { marginBottom: 12 },
  feedCenter: { alignItems: 'center', paddingVertical: 16 },
  feedLoadingText: { marginTop: 8, color: '#94a3b8', fontSize: 14 },
  feedError: { color: '#f87171', fontSize: 14, marginBottom: 12 },
  activityItem: { marginBottom: 10, paddingVertical: 14 },
  activityMsg: { fontSize: 15, color: '#e2e8f0', lineHeight: 22, fontWeight: '500' },
  activityMeta: { fontSize: 12, color: '#64748b', marginTop: 8 },
  navCard: { marginTop: 8 },
  section: { color: '#94a3b8', marginBottom: 12, fontWeight: '600' },
  btn: { marginBottom: 10 },
});
