import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import * as programService from '../../api/programService';

export default function ProgramDetailScreen({ route }) {
  const rawId = route.params?.id;
  const programId = rawId != null ? Number(rawId) : NaN;

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selecting, setSelecting] = useState(false);

  const loadDetail = useCallback(async () => {
    if (Number.isNaN(programId)) {
      setError('Geçersiz program.');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await programService.fetchProgramById(programId);
      setProgram(data);
    } catch (e) {
      setProgram(null);
      setError(e instanceof Error ? e.message : 'Program yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, [programId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const onSelectProgram = useCallback(async () => {
    if (Number.isNaN(programId)) return;
    setSelecting(true);
    try {
      const result = await programService.selectProgram(programId);
      Alert.alert('Program seçildi', result.message || 'Seçiminiz kaydedildi.', [{ text: 'Tamam' }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Seçim yapılamadı.';
      Alert.alert('Hata', msg, [{ text: 'Tamam' }]);
    } finally {
      setSelecting(false);
    }
  }, [programId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Program yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !program) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Program</Text>
          <Text style={styles.errorText}>{error || 'Program bulunamadı.'}</Text>
          <AppButton title="Tekrar dene" onPress={loadDetail} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{program.title}</Text>
        <Text style={styles.level}>{programService.programLevelLabel(program.level)}</Text>

        <AppCard style={styles.card}>
          <Text style={styles.sectionLabel}>Açıklama</Text>
          <Text style={styles.description}>{program.description}</Text>
        </AppCard>

        <AppCard style={styles.card}>
          <Text style={styles.sectionLabel}>Özet</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Süre</Text>
            <Text style={styles.value}>{program.duration} dakika</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kategori</Text>
            <Text style={styles.value}>{program.category}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tahmini kalori</Text>
            <Text style={styles.value}>{program.calories} kcal</Text>
          </View>
        </AppCard>

        <AppButton
          title="Programı seç"
          onPress={onSelectProgram}
          loading={selecting}
          disabled={selecting}
          style={styles.selectBtn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc', marginBottom: 6 },
  level: { fontSize: 15, color: '#a3e635', fontWeight: '700', marginBottom: 16 },
  card: { marginBottom: 14 },
  sectionLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', marginBottom: 8, fontWeight: '700' },
  description: { fontSize: 15, color: '#e2e8f0', lineHeight: 22 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  label: { fontSize: 14, color: '#94a3b8' },
  value: { fontSize: 14, color: '#f8fafc', fontWeight: '600' },
  selectBtn: { marginTop: 8 },
  errorText: { color: '#f87171', fontSize: 15, marginBottom: 16 },
});
