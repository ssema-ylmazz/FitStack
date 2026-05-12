import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import EmptyState from '../../components/EmptyState';
import * as statisticsService from '../../api/statisticsService';

const screenW = Dimensions.get('window').width;
const chartOuterPad = 32;
const chartWidth = Math.max(280, screenW - chartOuterPad);

const chartConfig = {
  backgroundGradientFrom: '#1e293b',
  backgroundGradientTo: '#0f172a',
  color: (opacity = 1) => `rgba(163, 230, 53, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
  barPercentage: 0.55,
  decimalPlaces: 0,
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: 'rgba(51, 65, 85, 0.6)',
  },
};

const PIE_COLORS = [
  'rgba(163, 230, 53, 0.95)',
  'rgba(56, 189, 248, 0.92)',
  'rgba(244, 114, 182, 0.9)',
  'rgba(250, 204, 21, 0.9)',
  'rgba(167, 139, 250, 0.9)',
  'rgba(52, 211, 153, 0.9)',
];

function StatTile({ label, value, unit }) {
  return (
    <View style={styles.statTile}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {unit ? <Text style={styles.statUnit}>{unit}</Text> : null}
    </View>
  );
}

export default function StatisticsScreen() {
  const [workoutStats, setWorkoutStats] = useState(null);
  const [calStats, setCalStats] = useState(null);
  const [catStats, setCatStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const [w, cal, cat] = await Promise.all([
        statisticsService.fetchWorkoutStats(),
        statisticsService.fetchCaloriesStats(),
        statisticsService.fetchCategoryStats(),
      ]);
      setWorkoutStats(w);
      setCalStats(cal);
      setCatStats(cat);
      setError('');
    } catch (e) {
      setWorkoutStats(null);
      setCalStats(null);
      setCatStats(null);
      setError(e instanceof Error ? e.message : 'İstatistikler yüklenemedi.');
    } finally {
      if (!silent) setLoading(false);
      if (silent) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load({ silent: false });
    }, [load]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await load({ silent: true });
  }, [load]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>İstatistikler yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  const emptyWorkouts = workoutStats && workoutStats.totalWorkouts === 0;

  const weekBarData = {
    labels: workoutStats?.currentWeekLabels ?? [],
    datasets: [{ data: workoutStats?.currentWeekMinutes?.length ? workoutStats.currentWeekMinutes : [0, 0, 0, 0, 0, 0, 0] }],
  };

  const last7Labels =
    workoutStats?.lastSevenDays?.map((d) => `${d.dayLabel}\n${d.dateKey.slice(8)}`) ?? [];
  const last7Data = workoutStats?.lastSevenDays?.map((d) => d.durationMinutes) ?? [];

  const last7BarData = {
    labels: last7Labels.length ? last7Labels : ['—', '—', '—', '—', '—', '—', '—'],
    datasets: [{ data: last7Data.length ? last7Data : [0, 0, 0, 0, 0, 0, 0] }],
  };

  const pieRows = catStats?.categories ?? [];
  const pieData = pieRows.map((c, i) => ({
    name: c.label,
    population: Math.max(c.totalMinutes, c.count > 0 ? 1 : 0),
    color: PIE_COLORS[i % PIE_COLORS.length],
    legendFontColor: '#cbd5e1',
    legendFontSize: 12,
  }));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>İstatistikler</Text>
        <Text style={styles.screenSubtitle}>Antrenman ve puan özeti</Text>

        {error ? (
          <AppCard style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={() => load({ silent: false })} />
          </AppCard>
        ) : null}

        {!error && workoutStats && calStats ? (
          <>
            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Özet</Text>
              <View style={styles.statGrid}>
                <StatTile label="Antrenman" value={String(workoutStats.totalWorkouts)} unit="kayıt" />
                <StatTile label="Toplam süre" value={String(workoutStats.totalDurationMinutes)} unit="dk" />
                <StatTile label="Toplam kalori" value={String(calStats.totalCalories)} unit="kcal" />
                <StatTile label="Ort. süre" value={String(workoutStats.avgDurationMinutes)} unit="dk / antrenman" />
              </View>
              <View style={styles.pointsRow}>
                <Text style={styles.pointsLabel}>Toplam XP (puanlar)</Text>
                <Text style={styles.pointsValue}>{workoutStats.totalPoints}</Text>
              </View>
              <Text style={styles.pointsHint}>Ortalama kalori: {calStats.avgCaloriesPerWorkout} kcal / antrenman</Text>
            </AppCard>

            {emptyWorkouts ? (
              <AppCard style={styles.card}>
                <EmptyState
                  title="Henüz antrenman yok"
                  message="Antrenman eklediğinde grafikler ve dağılımlar burada görünür."
                />
              </AppCard>
            ) : null}

            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Bu hafta — antrenman süresi (dk)</Text>
              <Text style={styles.chartHint}>Takvim haftası (Pzt–Paz), yerel saat</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                  data={weekBarData}
                  width={Math.max(chartWidth, 340)}
                  height={200}
                  yAxisSuffix=""
                  fromZero
                  chartConfig={chartConfig}
                  style={styles.chart}
                  verticalLabelRotation={0}
                />
              </ScrollView>
            </AppCard>

            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Son 7 gün — süre (dk)</Text>
              <Text style={styles.chartHint}>Günlük toplam antrenman süresi</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BarChart
                  data={last7BarData}
                  width={Math.max(chartWidth, 360)}
                  height={220}
                  yAxisSuffix=""
                  fromZero
                  chartConfig={{ ...chartConfig, color: (opacity = 1) => `rgba(56, 189, 248, ${opacity})` }}
                  style={styles.chart}
                  verticalLabelRotation={15}
                />
              </ScrollView>
            </AppCard>

            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Son 7 gün — özet</Text>
              {(workoutStats.lastSevenDays ?? []).map((d) => (
                <View key={d.dateKey} style={styles.dayRow}>
                  <View style={styles.dayRowLeft}>
                    <Text style={styles.dayName}>{d.dayLabel}</Text>
                    <Text style={styles.dayDate}>{d.dateKey}</Text>
                  </View>
                  <View style={styles.dayRowRight}>
                    <Text style={styles.dayMeta}>{d.durationMinutes} dk</Text>
                    <Text style={styles.dayMetaMuted}>{d.calories} kcal · {d.workoutCount} antrenman</Text>
                  </View>
                </View>
              ))}
            </AppCard>

            <AppCard style={styles.card}>
              <Text style={styles.sectionTitle}>Kategori dağılımı</Text>
              {pieData.length > 0 ? (
                <>
                  <PieChart
                    data={pieData}
                    width={chartWidth}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="0"
                    center={[10, 0]}
                    absolute
                    hasLegend
                  />
                  {pieRows.map((c) => (
                    <View key={c.key} style={styles.catRow}>
                      <View style={styles.catRowTop}>
                        <Text style={styles.catName}>{c.label}</Text>
                        <Text style={styles.catPct}>{c.percentOfMinutes}% süre</Text>
                      </View>
                      <View style={styles.progressTrack}>
                        <View style={[styles.progressFill, { width: `${Math.min(100, c.percentOfMinutes)}%` }]} />
                      </View>
                      <Text style={styles.catSub}>
                        {c.count} antrenman · {c.totalMinutes} dk · {c.totalCalories} kcal
                      </Text>
                    </View>
                  ))}
                </>
              ) : (
                <Text style={styles.muted}>Kategori verisi yok.</Text>
              )}
            </AppCard>
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
  card: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 12,
    color: '#a3e635',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 8,
  },
  chartHint: { fontSize: 12, color: '#64748b', marginBottom: 8 },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  statTile: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  statLabel: { fontSize: 12, color: '#94a3b8', marginBottom: 4 },
  statValue: { fontSize: 22, fontWeight: '800', color: '#f8fafc' },
  statUnit: { fontSize: 11, color: '#64748b', marginTop: 2 },
  pointsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  pointsLabel: { fontSize: 14, color: '#e2e8f0', fontWeight: '600' },
  pointsValue: { fontSize: 22, fontWeight: '800', color: '#a3e635' },
  pointsHint: { fontSize: 12, color: '#64748b', marginTop: 8 },
  chart: { marginVertical: 8, borderRadius: 12, alignSelf: 'flex-start' },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#334155',
  },
  dayRowLeft: {},
  dayName: { fontSize: 15, fontWeight: '700', color: '#f1f5f9' },
  dayDate: { fontSize: 12, color: '#64748b', marginTop: 2 },
  dayRowRight: { alignItems: 'flex-end' },
  dayMeta: { fontSize: 15, fontWeight: '700', color: '#38bdf8' },
  dayMetaMuted: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
  catRow: { marginTop: 14 },
  catRowTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  catName: { fontSize: 14, fontWeight: '700', color: '#e2e8f0' },
  catPct: { fontSize: 12, color: '#a3e635', fontWeight: '600' },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#334155',
    overflow: 'hidden',
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a3e635',
  },
  catSub: { fontSize: 12, color: '#94a3b8', marginTop: 6 },
  muted: { fontSize: 14, color: '#64748b' },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
