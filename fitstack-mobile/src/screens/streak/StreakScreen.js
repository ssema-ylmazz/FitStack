import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import * as streakService from '../../api/streakService';

export default function StreakScreen() {
  const [streak, setStreak] = useState(null);
  const [editStreak, setEditStreak] = useState('');
  const [editDate, setEditDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadStreak = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const s = await streakService.fetchStreak();
      setStreak(s);
      setEditStreak(String(s.currentStreak ?? ''));
      setEditDate(s.lastWorkoutDate ? String(s.lastWorkoutDate) : '');
    } catch (e) {
      setStreak(null);
      setError(e instanceof Error ? e.message : 'Seri bilgisi yüklenemedi.');
    } finally {
      if (!silent) setLoading(false);
      if (silent) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadStreak({ silent: false });
    }, [loadStreak]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStreak({ silent: true });
  }, [loadStreak]);

  const onSaveStreak = useCallback(async () => {
    const n = Number(String(editStreak).trim());
    if (Number.isNaN(n) || n < 0) {
      setError('Seri için 0 veya pozitif bir sayı gir.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const next = await streakService.updateStreak({
        currentStreak: n,
        lastWorkoutDate: editDate.trim() === '' ? undefined : editDate.trim(),
      });
      setStreak(next);
      setEditStreak(String(next.currentStreak ?? ''));
      setEditDate(next.lastWorkoutDate ? String(next.lastWorkoutDate) : '');
      Alert.alert('Güncellendi', 'Seri bilgin kaydedildi.', [{ text: 'Tamam' }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  }, [editStreak, editDate]);

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
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenTitle}>Günlük seri</Text>
          <Text style={styles.screenSubtitle}>Üst üste antrenman günlerini takip et</Text>

          {error ? (
            <AppCard style={styles.card}>
              <Text style={styles.errorText}>{error}</Text>
              <AppButton title="Tekrar dene" onPress={() => loadStreak({ silent: false })} />
            </AppCard>
          ) : null}

          {streak && !error ? (
            <>
              <AppCard style={styles.heroCard}>
                <Text style={styles.heroLabel}>Güncel seri</Text>
                <Text style={styles.heroNumber}>{streak.currentStreak}</Text>
                <Text style={styles.heroSuffix}>gün</Text>
                {streak.lastWorkoutDate ? (
                  <Text style={styles.heroMeta}>Son antrenman: {streak.lastWorkoutDate}</Text>
                ) : (
                  <Text style={styles.heroMeta}>Son antrenman tarihi kayıtlı değil</Text>
                )}
                {streak.updatedAt ? (
                  <Text style={styles.heroTiny}>Güncelleme: {formatIso(streak.updatedAt)}</Text>
                ) : null}
              </AppCard>

              <AppCard style={styles.card}>
                <Text style={styles.formTitle}>Seriyi güncelle</Text>
                <AppInput
                  label="Seri (gün sayısı)"
                  value={editStreak}
                  onChangeText={(t) => {
                    setEditStreak(t);
                    if (error) setError('');
                  }}
                  placeholder="0 ve üzeri"
                  keyboardType="number-pad"
                />
                <AppInput
                  label="Son antrenman tarihi (YYYY-MM-DD)"
                  value={editDate}
                  onChangeText={(t) => {
                    setEditDate(t);
                    if (error) setError('');
                  }}
                  placeholder="2026-05-11"
                />
                <AppButton title="Kaydet" onPress={onSaveStreak} loading={saving} disabled={saving} />
              </AppCard>
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function formatIso(iso) {
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
  flex: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  screenTitle: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  screenSubtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  card: { marginBottom: 14 },
  heroCard: {
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 146, 60, 0.4)',
    backgroundColor: 'rgba(251, 146, 60, 0.08)',
  },
  heroLabel: { fontSize: 13, color: '#fb923c', fontWeight: '800', textTransform: 'uppercase', marginBottom: 8 },
  heroNumber: { fontSize: 88, fontWeight: '900', color: '#f8fafc', lineHeight: 92 },
  heroSuffix: { fontSize: 18, color: '#94a3b8', fontWeight: '700', marginTop: 4 },
  heroMeta: { fontSize: 15, color: '#e2e8f0', marginTop: 16, textAlign: 'center' },
  heroTiny: { fontSize: 12, color: '#64748b', marginTop: 10 },
  formTitle: { fontSize: 15, fontWeight: '700', color: '#a3e635', marginBottom: 10 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
