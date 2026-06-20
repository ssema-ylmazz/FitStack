import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import ScreenContainer from '../components/ScreenContainer';
import { getLeaderboard } from '../api/leaderboardApi';
import colors from '../constants/colors';
import { mockLeaderboard } from '../constants/mockData';

const periods = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

function normalizeRows(rows) {
  return rows.map((row, index) => ({
    id: row.id ?? `${row.username || 'user'}-${index}`,
    username: row.username || row.name || 'FitStack Kullanici',
    points: row.points ?? row.totalPoints ?? 0,
    streak: row.streak ?? row.currentStreak ?? 0,
    rank: row.rank ?? index + 1,
  }));
}

export default function LeaderboardScreen() {
  const [period, setPeriod] = useState('week');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadLeaderboard(period);
  }, [period]);

  async function loadLeaderboard(nextPeriod = period) {
    setLoading(true);
    setError('');
    try {
      const response = await getLeaderboard(nextPeriod);
      const leaderboard = response.data?.leaderboard || response.data?.data?.leaderboard || [];
      setRows(normalizeRows(leaderboard));
      setUsingFallback(false);
    } catch (err) {
      setRows(mockLeaderboard);
      setUsingFallback(true);
      setError(err.userMessage || 'Liderlik tablosu alinamadi. Demo liste gosteriliyor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Liderlik Tablosu</Text>
        <Text style={styles.subtitle}>
          Redis cache kaniti icin bu ekran backend leaderboard endpointini cagirir.
        </Text>
        <Text style={styles.endpoint}>GET /leaderboard?period={period}</Text>
      </View>

      <View style={styles.periods}>
        {periods.map((item) => {
          const active = period === item.value;
          return (
            <Text key={item.value} onPress={() => setPeriod(item.value)} style={[styles.period, active && styles.periodActive]}>
              {item.label}
            </Text>
          );
        })}
      </View>

      <AppButton disabled={loading} title={loading ? 'Yenileniyor...' : 'Yenile'} onPress={() => loadLeaderboard()} />

      {usingFallback ? <Text style={styles.notice}>Backend kapaliyken demo siralama gosteriliyor.</Text> : null}
      {loading ? <LoadingState message="Liderlik tablosu yukleniyor..." /> : null}
      {error ? <ErrorState message={error} /> : null}

      {!loading && rows.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Siralama verisi yok</Text>
          <Text style={styles.emptyText}>Leaderboard endpointinden veri geldiginde burada listelenecek.</Text>
        </View>
      ) : null}

      <View style={styles.list}>
        {rows.map((row) => (
          <View key={row.id} style={styles.card}>
            <Text style={styles.rank}>#{row.rank}</Text>
            <View style={styles.user}>
              <Text style={styles.username}>{row.username}</Text>
              <Text style={styles.meta}>{row.streak} gun streak</Text>
            </View>
            <Text style={styles.points}>{row.points} puan</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: 28,
  },
  header: {
    gap: 8,
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
  endpoint: {
    backgroundColor: colors.infoSoft,
    borderRadius: 8,
    color: colors.info,
    fontSize: 13,
    fontWeight: '800',
    padding: 10,
  },
  periods: {
    flexDirection: 'row',
    gap: 8,
  },
  period: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  periodActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    color: colors.primaryDark,
  },
  notice: {
    backgroundColor: colors.accentSoft,
    borderRadius: 8,
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    padding: 12,
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
    gap: 10,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  rank: {
    color: colors.primaryDark,
    fontSize: 18,
    fontWeight: '900',
    width: 42,
  },
  user: {
    flex: 1,
    gap: 4,
  },
  username: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  meta: {
    color: colors.mutedText,
    fontSize: 13,
  },
  points: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
});
