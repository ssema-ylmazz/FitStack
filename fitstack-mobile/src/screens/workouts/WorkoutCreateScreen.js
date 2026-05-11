import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import * as workoutService from '../../api/workoutService';
import * as programService from '../../api/programService';

/** null = sunucudaki seçili program (POST’ta programId gönderilmez) */
const USE_SERVER_SELECTION = null;

export default function WorkoutCreateScreen({ navigation }) {
  const [note, setNote] = useState('');
  const [duration, setDuration] = useState('');
  const [programs, setPrograms] = useState([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [selectedProgramId, setSelectedProgramId] = useState(USE_SERVER_SELECTION);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setProgramsLoading(true);
      try {
        const list = await programService.fetchPrograms('all');
        if (!cancelled) setPrograms(list);
      } catch {
        if (!cancelled) setPrograms([]);
      } finally {
        if (!cancelled) setProgramsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = useCallback(async () => {
    setError('');
    if (duration.trim() !== '') {
      const d = Number(duration.trim());
      if (Number.isNaN(d) || d <= 0) {
        setError('Süre pozitif bir sayı olmalı (veya boş bırakılabilir).');
        return;
      }
    }
    setSubmitting(true);
    try {
      await workoutService.createWorkout({
        programId: selectedProgramId,
        duration: duration.trim() === '' ? null : duration.trim(),
        note: note.trim() === '' ? null : note,
      });
      Alert.alert('Kaydedildi', 'Antrenman başarıyla oluşturuldu.', [
        {
          text: 'Tamam',
          onPress: () => navigation.navigate('WorkoutHistory'),
        },
      ]);
      setNote('');
      setDuration('');
      setSelectedProgramId(USE_SERVER_SELECTION);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Kayıt oluşturulamadı.');
    } finally {
      setSubmitting(false);
    }
  }, [duration, note, selectedProgramId, navigation]);

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
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Yeni antrenman</Text>
          <Text style={styles.lead}>
            Programlar sekmesinde &quot;Programı seç&quot; ile işaretlediğin program, aşağıda &quot;Seçili program
            (sunucu)&quot; iken kayda otomatik uygulanır. İstersen aşağıdan başka bir program seçebilirsin.
          </Text>

          <AppCard style={styles.card}>
            <Text style={styles.sectionTitle}>Program</Text>
            {programsLoading ? (
              <ActivityIndicator color="#a3e635" style={styles.programLoader} />
            ) : (
              <View style={styles.chipWrap}>
                <Pressable
                  onPress={() => setSelectedProgramId(USE_SERVER_SELECTION)}
                  style={[
                    styles.chip,
                    selectedProgramId === USE_SERVER_SELECTION && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedProgramId === USE_SERVER_SELECTION && styles.chipTextActive,
                    ]}
                    numberOfLines={2}
                  >
                    Seçili program (sunucu)
                  </Text>
                </Pressable>
                {programs.map((p) => (
                  <Pressable
                    key={p.id}
                    onPress={() => setSelectedProgramId(p.id)}
                    style={[styles.chip, selectedProgramId === p.id && styles.chipActive]}
                  >
                    <Text style={[styles.chipText, selectedProgramId === p.id && styles.chipTextActive]} numberOfLines={2}>
                      {p.title}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </AppCard>

          <AppCard style={styles.card}>
            <Text style={styles.sectionTitle}>Detaylar</Text>
            <AppInput
              label="Süre (dakika, isteğe bağlı)"
              value={duration}
              onChangeText={(t) => {
                setDuration(t);
                if (error) setError('');
              }}
              placeholder="Boş bırakılırsa programın varsayılan süresi"
              keyboardType="number-pad"
            />
            <AppInput
              label="Not (isteğe bağlı)"
              value={note}
              onChangeText={(t) => {
                setNote(t);
                if (error) setError('');
              }}
              placeholder="Örn. sabah seansı"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <AppButton title="Kaydet" onPress={onSubmit} loading={submitting} disabled={submitting} />
          </AppCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  flex: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  lead: { fontSize: 14, color: '#94a3b8', lineHeight: 20, marginBottom: 16 },
  card: { marginBottom: 14 },
  sectionTitle: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  programLoader: { paddingVertical: 12 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#0f172a',
    marginRight: 8,
    marginBottom: 8,
    maxWidth: '100%',
  },
  chipActive: {
    borderColor: '#a3e635',
    backgroundColor: 'rgba(163, 230, 53, 0.12)',
  },
  chipText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#a3e635' },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
});
