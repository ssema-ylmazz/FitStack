import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import EmptyState from '../../components/EmptyState';
import * as goalsService from '../../api/goalsService';

const TYPE_OPTIONS = [
  { value: 'weekly_workouts', label: 'Haftalık antrenman' },
  { value: 'total_points', label: 'Puan hedefi' },
  { value: 'streak_days', label: 'Seri (gün)' },
];

const QUICK_PRESETS = [
  { type: 'weekly_workouts', title: 'Haftada 3 antrenman', hint: 'Bu hafta 3 kayıt' },
  { type: 'total_points', title: '500 puan kazan', hint: 'Toplam XP' },
  { type: 'streak_days', title: '5 günlük seri', hint: 'Günlük seri' },
];

function typeLabel(t) {
  const f = TYPE_OPTIONS.find((x) => x.value === t);
  return f ? f.label : t;
}

function GoalCard({ item, busy, onSetManual }) {
  const pct = item.progressPercent;
  const autoOnlyDone = item.completed && !item.manualComplete;
  return (
    <AppCard style={[styles.goalCard, item.completed && styles.goalCardDone]}>
      <View style={styles.goalHeader}>
        <View style={styles.goalTitleBlock}>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <Text style={styles.goalType}>{typeLabel(item.type)}</Text>
        </View>
        {item.completed ? (
          <View style={styles.badgeDone}>
            <Text style={styles.badgeDoneText}>Tamamlandı</Text>
          </View>
        ) : (
          <View style={styles.badgeOpen}>
            <Text style={styles.badgeOpenText}>Devam</Text>
          </View>
        )}
      </View>
      <Text style={styles.goalProgressText}>
        İlerleme: {item.current} / {item.target}
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.pctMuted}>{pct}%</Text>
      {autoOnlyDone ? (
        <Text style={styles.autoDoneHint}>Bu hedef ilerleme ile karşılandı.</Text>
      ) : (
        <AppButton
          title={item.manualComplete ? 'Manuel tamamlandıyı kaldır' : 'Manuel tamamlandı işaretle'}
          variant="secondary"
          disabled={busy}
          onPress={() => onSetManual(item, !item.manualComplete)}
        />
      )}
    </AppCard>
  );
}

export default function GoalsScreen() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toggleId, setToggleId] = useState(null);

  const [formType, setFormType] = useState('weekly_workouts');
  const [formTitle, setFormTitle] = useState('');
  const [formTarget, setFormTarget] = useState('');

  const loadGoals = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const list = await goalsService.fetchGoals();
      setGoals(list);
      setError('');
    } catch (e) {
      setGoals([]);
      setError(e instanceof Error ? e.message : 'Hedefler yüklenemedi.');
    } finally {
      if (!silent) setLoading(false);
      if (silent) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadGoals({ silent: false });
    }, [loadGoals]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadGoals({ silent: true });
  }, [loadGoals]);

  const onCreate = useCallback(async () => {
    setSaving(true);
    setError('');
    try {
      const payload = { type: formType };
      const t = formTitle.trim();
      if (t) payload.title = t;
      const n = Number(String(formTarget).trim());
      if (!Number.isNaN(n) && n > 0) payload.target = n;
      await goalsService.createGoal(payload);
      setFormTitle('');
      setFormTarget('');
      await loadGoals({ silent: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Hedef eklenemedi.');
    } finally {
      setSaving(false);
    }
  }, [formType, formTitle, formTarget, loadGoals]);

  const onQuick = useCallback(
    async (preset) => {
      setSaving(true);
      setError('');
      try {
        await goalsService.createGoal({ type: preset.type });
        await loadGoals({ silent: true });
      } catch (e) {
        Alert.alert('Hata', e instanceof Error ? e.message : 'Eklenemedi.');
      } finally {
        setSaving(false);
      }
    },
    [loadGoals],
  );

  const onSetManual = useCallback(
    async (item, value) => {
      setToggleId(item.id);
      setError('');
      try {
        await goalsService.updateGoal(item.id, { manualComplete: value });
        await loadGoals({ silent: true });
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Güncellenemedi.');
      } finally {
        setToggleId(null);
      }
    },
    [loadGoals],
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Hedefler yükleniyor…</Text>
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
        <Text style={styles.screenTitle}>Hedefler</Text>
        <Text style={styles.screenSubtitle}>Antrenman, puan ve seri ilerlemen</Text>

        {error ? (
          <AppCard style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={() => loadGoals({ silent: false })} />
          </AppCard>
        ) : null}

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Hızlı ekle</Text>
          <Text style={styles.hint}>Örnek hedefleri tek dokunuşla listene ekle.</Text>
          <View style={styles.quickRow}>
            {QUICK_PRESETS.map((p) => (
              <Pressable
                key={p.type}
                style={({ pressed }) => [styles.quickChip, pressed && styles.quickChipPressed]}
                onPress={() => onQuick(p)}
                disabled={saving}
              >
                <Text style={styles.quickTitle}>{p.title}</Text>
                <Text style={styles.quickHint}>{p.hint}</Text>
              </Pressable>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionTitle}>Yeni hedef</Text>
          <Text style={styles.hint}>Tür seç, isteğe bağlı başlık ve hedef sayısı gir.</Text>
          <View style={styles.typeRow}>
            {TYPE_OPTIONS.map((opt) => {
              const active = formType === opt.value;
              return (
                <Pressable
                  key={opt.value}
                  style={[styles.typeChip, active && styles.typeChipActive]}
                  onPress={() => setFormType(opt.value)}
                >
                  <Text style={[styles.typeChipLabel, active && styles.typeChipLabelActive]}>{opt.label}</Text>
                </Pressable>
              );
            })}
          </View>
          <AppInput label="Başlık (isteğe bağlı)" value={formTitle} onChangeText={setFormTitle} placeholder="Örn: Haftada 4 antrenman" />
          <AppInput
            label="Hedef sayı (isteğe bağlı)"
            value={formTarget}
            onChangeText={setFormTarget}
            placeholder="Örn: 4"
            keyboardType="number-pad"
          />
          <AppButton title={saving ? 'Kaydediliyor…' : 'Hedef oluştur'} onPress={onCreate} disabled={saving} />
        </AppCard>

        <Text style={styles.listHeading}>Hedef listesi</Text>
        {!error && goals.length === 0 ? (
          <AppCard style={styles.card}>
            <EmptyState title="Henüz hedef yok" message="Yukarıdan hızlı ekle veya form ile oluştur." />
          </AppCard>
        ) : null}

        {goals.map((g) => (
          <GoalCard key={g.id} item={g} busy={toggleId === g.id} onSetManual={onSetManual} />
        ))}
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
    marginBottom: 6,
  },
  hint: { fontSize: 13, color: '#94a3b8', marginBottom: 12, lineHeight: 18 },
  quickRow: { marginTop: 4 },
  quickChip: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
  },
  quickChipPressed: { borderColor: 'rgba(163, 230, 53, 0.5)', backgroundColor: 'rgba(163, 230, 53, 0.08)' },
  quickTitle: { fontSize: 15, fontWeight: '700', color: '#f1f5f9' },
  quickHint: { fontSize: 12, color: '#64748b', marginTop: 4 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8, marginHorizontal: -4 },
  typeChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    margin: 4,
    backgroundColor: '#111827',
  },
  typeChipActive: {
    borderColor: 'rgba(163, 230, 53, 0.55)',
    backgroundColor: 'rgba(163, 230, 53, 0.12)',
  },
  typeChipLabel: { fontSize: 13, color: '#94a3b8', fontWeight: '600' },
  typeChipLabelActive: { color: '#ecfccb' },
  listHeading: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 4,
  },
  goalCard: { marginBottom: 12 },
  goalCardDone: {
    borderColor: 'rgba(52, 211, 153, 0.45)',
    backgroundColor: 'rgba(52, 211, 153, 0.06)',
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  goalTitleBlock: { flex: 1, marginRight: 8 },
  goalTitle: { fontSize: 16, fontWeight: '800', color: '#f8fafc' },
  goalType: { fontSize: 12, color: '#64748b', marginTop: 4 },
  badgeDone: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
  },
  badgeDoneText: { fontSize: 11, fontWeight: '700', color: '#34d399' },
  badgeOpen: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  badgeOpenText: { fontSize: 11, fontWeight: '700', color: '#fbbf24' },
  goalProgressText: { fontSize: 14, color: '#e2e8f0', marginBottom: 8, fontWeight: '600' },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#334155',
    overflow: 'hidden',
  },
  fill: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#a3e635',
  },
  pctMuted: { fontSize: 11, color: '#64748b', marginTop: 6, marginBottom: 10 },
  autoDoneHint: { fontSize: 13, color: '#64748b', fontStyle: 'italic' },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
