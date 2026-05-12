import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  DeviceEventEmitter,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import EmptyState from '../../components/EmptyState';
import { useAuth } from '../../context/AuthContext';
import * as leaderboardService from '../../api/leaderboardService';
import * as pointsService from '../../api/pointsService';

const MEDALS = ['🥇', '🥈', '🥉'];

function PodiumBlock({ entry, medal, tall, isSelf }) {
  if (!entry) return <View style={[styles.podiumSlot, { flex: 1 }]} />;
  return (
    <AppCard
      style={[
        styles.podiumCard,
        tall === 'high' && styles.podiumHigh,
        tall === 'mid' && styles.podiumMid,
        tall === 'low' && styles.podiumLow,
        isSelf && styles.podiumSelf,
      ]}
    >
      <Text style={styles.podiumMedal}>{medal}</Text>
      <Text style={styles.podiumRank}>#{entry.rank}</Text>
      <Text style={styles.podiumName} numberOfLines={1}>
        {entry.username}
        {isSelf ? ' · Sen' : ''}
      </Text>
      <Text style={styles.podiumPoints}>{entry.points} XP</Text>
      <Text style={styles.podiumStreak}>🔥 {entry.streak} gün</Text>
    </AppCard>
  );
}

function RestRow({ item, isSelf }) {
  return (
    <AppCard style={[styles.rowCard, isSelf && styles.rowCardSelf]}>
      <View style={styles.rowLeft}>
        <Text style={styles.rowRank}>#{item.rank}</Text>
        <View style={styles.rowText}>
          <Text style={styles.rowName} numberOfLines={1}>
            {item.username}
            {isSelf ? ' · Sen' : ''}
          </Text>
          <Text style={styles.rowMeta}>🔥 Seri: {item.streak} gün</Text>
        </View>
      </View>
      <Text style={styles.rowPoints}>{item.points}</Text>
    </AppCard>
  );
}

export default function LeaderboardScreen() {
  const { user } = useAuth();
  const selfId = user?.id != null ? Number(user.id) : null;
  const tabFocusRef = useRef(false);

  const [period, setPeriod] = useState('week');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(
    async (opts = { silent: false }) => {
      const silent = opts.silent === true;
      if (!silent) {
        setLoading(true);
        setError('');
      }
      try {
        const { leaderboard: list } = await leaderboardService.fetchLeaderboard(period);
        setError('');
        setLeaderboard(list);
      } catch (e) {
        setLeaderboard([]);
        setError(e instanceof Error ? e.message : 'Liderlik yüklenemedi.');
      } finally {
        if (!silent) setLoading(false);
        if (silent) setRefreshing(false);
      }
    },
    [period],
  );

  useEffect(() => {
    load({ silent: false });
  }, [load]);

  useFocusEffect(
    useCallback(() => {
      if (tabFocusRef.current) {
        load({ silent: true });
      } else {
        tabFocusRef.current = true;
      }
      return undefined;
    }, [load]),
  );

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener(pointsService.POINTS_UPDATED_EVENT, () => {
      load({ silent: true });
    });
    return () => sub.remove();
  }, [load]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load({ silent: true });
  }, [load]);

  const top = leaderboard.slice(0, 3);
  const second = top[1];
  const first = top[0];
  const third = top[2];
  const rest = leaderboard.slice(3);

  const isSelf = (entry) => selfId != null && !Number.isNaN(selfId) && entry.id === selfId;

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Sıralama yükleniyor…</Text>
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
        <Text style={styles.screenTitle}>Liderlik</Text>
        <Text style={styles.screenSubtitle}>Haftalık ve aylık puan sıralaması (demo veri)</Text>

        <View style={styles.toggleRow}>
          <Pressable
            style={[styles.toggleBtn, period === 'week' && styles.toggleBtnActive]}
            onPress={() => setPeriod('week')}
          >
            <Text style={[styles.toggleLabel, period === 'week' && styles.toggleLabelActive]}>Haftalık</Text>
          </Pressable>
          <Pressable
            style={[styles.toggleBtn, period === 'month' && styles.toggleBtnActive]}
            onPress={() => setPeriod('month')}
          >
            <Text style={[styles.toggleLabel, period === 'month' && styles.toggleLabelActive]}>Aylık</Text>
          </Pressable>
        </View>

        {error ? (
          <AppCard style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={() => load({ silent: false })} />
          </AppCard>
        ) : null}

        {!error && leaderboard.length === 0 ? (
          <AppCard style={styles.card}>
            <EmptyState title="Liste boş" message="Henüz sıralamada kimse yok." />
          </AppCard>
        ) : null}

        {!error && leaderboard.length > 0 ? (
          <>
            <Text style={styles.sectionLabel}>İlk üç</Text>
            <View style={styles.podiumRow}>
              <PodiumBlock entry={second} medal={MEDALS[1]} tall="mid" isSelf={second ? isSelf(second) : false} />
              <PodiumBlock entry={first} medal={MEDALS[0]} tall="high" isSelf={first ? isSelf(first) : false} />
              <PodiumBlock entry={third} medal={MEDALS[2]} tall="low" isSelf={third ? isSelf(third) : false} />
            </View>

            {rest.length > 0 ? (
              <>
                <Text style={[styles.sectionLabel, styles.sectionSpaced]}>Diğerleri</Text>
                {rest.map((item) => (
                  <View key={String(item.id)} style={styles.restGap}>
                    <RestRow item={item} isSelf={isSelf(item)} />
                  </View>
                ))}
              </>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  screenTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleBtnActive: {
    backgroundColor: 'rgba(163, 230, 53, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(163, 230, 53, 0.45)',
  },
  toggleLabel: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  toggleLabelActive: { color: '#ecfccb' },
  sectionLabel: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  sectionSpaced: { marginTop: 8 },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  restGap: { marginBottom: 10 },
  podiumSlot: { minHeight: 8 },
  podiumCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginBottom: 0,
    marginHorizontal: 4,
  },
  podiumHigh: {
    minHeight: 168,
    justifyContent: 'center',
    borderColor: 'rgba(234, 179, 8, 0.45)',
    backgroundColor: 'rgba(234, 179, 8, 0.1)',
  },
  podiumMid: {
    minHeight: 138,
    justifyContent: 'center',
    borderColor: 'rgba(148, 163, 184, 0.5)',
    backgroundColor: 'rgba(148, 163, 184, 0.08)',
  },
  podiumLow: {
    minHeight: 118,
    justifyContent: 'center',
    borderColor: 'rgba(180, 83, 9, 0.45)',
    backgroundColor: 'rgba(180, 83, 9, 0.08)',
  },
  podiumSelf: {
    borderColor: 'rgba(163, 230, 53, 0.55)',
    backgroundColor: 'rgba(163, 230, 53, 0.12)',
  },
  podiumMedal: { fontSize: 28, marginBottom: 4 },
  podiumRank: { fontSize: 11, color: '#94a3b8', fontWeight: '700' },
  podiumName: { fontSize: 13, fontWeight: '700', color: '#f1f5f9', marginTop: 4, textAlign: 'center' },
  podiumPoints: { fontSize: 15, fontWeight: '800', color: '#a3e635', marginTop: 6 },
  podiumStreak: { fontSize: 11, color: '#94a3b8', marginTop: 4 },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginBottom: 0,
  },
  rowCardSelf: {
    borderColor: 'rgba(163, 230, 53, 0.45)',
    backgroundColor: 'rgba(163, 230, 53, 0.06)',
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 },
  rowRank: {
    fontSize: 16,
    fontWeight: '800',
    color: '#64748b',
    width: 40,
  },
  rowText: { flex: 1 },
  rowName: { fontSize: 15, fontWeight: '700', color: '#f8fafc' },
  rowMeta: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  rowPoints: { fontSize: 17, fontWeight: '800', color: '#a3e635' },
  card: { marginBottom: 14 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
