import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import * as programService from '../../api/programService';
import * as pointsService from '../../api/pointsService';

export default function ProgramDetailScreen({ route }) {
  const rawId = route.params?.id;
  const programId = rawId != null ? Number(rawId) : NaN;

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepIds, setCompletedStepIds] = useState([]);
  const [finishing, setFinishing] = useState(false);
  const [completion, setCompletion] = useState(null);

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
      setCurrentStepIndex(0);
      setCompletedStepIds([]);
      setCompletion(null);
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

  const steps = useMemo(() => (Array.isArray(program?.steps) ? program.steps : []), [program]);
  const currentStep = steps[currentStepIndex];
  const currentCompleted = currentStep ? completedStepIds.includes(currentStep.id) : false;
  const allStepsCompleted = steps.length > 0 && completedStepIds.length === steps.length;
  const isLastStep = currentStepIndex === steps.length - 1;

  const completeCurrentStep = useCallback(() => {
    if (!currentStep || currentCompleted) return;
    setCompletedStepIds((prev) => [...prev, currentStep.id]);
  }, [currentStep, currentCompleted]);

  const goNextStep = useCallback(() => {
    if (!currentCompleted || isLastStep) return;
    setCurrentStepIndex((prev) => prev + 1);
  }, [currentCompleted, isLastStep]);

  const finishExercise = useCallback(async () => {
    if (!allStepsCompleted || finishing) return;
    setFinishing(true);
    try {
      const result = await pointsService.completeExercise(programId, completedStepIds);
      setCompletion(result);
      Alert.alert(
        'Egzersiz tamamlandı',
        `+${result.gainedPoints} XP kazandın. Yeni toplam puanın: ${result.totalPoints} XP.`,
        [{ text: 'Harika' }],
      );
    } catch (e) {
      Alert.alert('Tamamlama başarısız', e instanceof Error ? e.message : 'Puan eklenemedi.');
    } finally {
      setFinishing(false);
    }
  }, [allStepsCompleted, completedStepIds, finishing, programId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Program yükleniyor...</Text>
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
        <View style={styles.metaRow}>
          <Text style={styles.level}>{programService.programLevelLabel(program.level)}</Text>
          <Text style={styles.reward}>+{program.rewardPoints} XP</Text>
        </View>

        <AppCard style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.sectionLabel}>Egzersiz ilerlemesi</Text>
            <Text style={styles.progressCount}>{completedStepIds.length}/{steps.length}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${steps.length ? (completedStepIds.length / steps.length) * 100 : 0}%` },
              ]}
            />
          </View>
          <View style={styles.stepDots}>
            {steps.map((step, index) => {
              const done = completedStepIds.includes(step.id);
              const active = index === currentStepIndex;
              return (
                <View
                  key={step.id}
                  style={[styles.stepDot, done && styles.stepDotDone, active && styles.stepDotActive]}
                />
              );
            })}
          </View>
        </AppCard>

        {currentStep ? (
          <AppCard style={styles.stepCard}>
            <Text style={styles.stepCounter}>ADIM {currentStepIndex + 1} / {steps.length}</Text>
            <Image source={{ uri: currentStep.imageUrl }} style={styles.stepImage} resizeMode="cover" />
            <Text style={styles.stepTitle}>{currentStep.title}</Text>
            <Text style={styles.description}>{currentStep.instruction}</Text>

            <AppButton
              title={currentCompleted ? 'Adım tamamlandı' : 'Adımı Tamamla'}
              onPress={completeCurrentStep}
              disabled={currentCompleted || completion != null}
              style={styles.actionButton}
            />

            {!isLastStep ? (
              <AppButton
                title={currentCompleted ? 'Sonraki Adıma Geç' : 'Önce Bu Adımı Tamamla'}
                onPress={goNextStep}
                disabled={!currentCompleted || completion != null}
                variant="secondary"
              />
            ) : (
              <AppButton
                title={completion ? `+${completion.gainedPoints} XP Kazanıldı` : 'Egzersizi Bitir ve Puan Kazan'}
                onPress={finishExercise}
                loading={finishing}
                disabled={!allStepsCompleted || finishing || completion != null}
                variant={allStepsCompleted && !completion ? 'primary' : 'secondary'}
              />
            )}
          </AppCard>
        ) : (
          <AppCard style={styles.stepCard}>
            <Text style={styles.errorText}>Bu program için egzersiz adımı tanımlanmamış.</Text>
          </AppCard>
        )}

        {completion ? (
          <AppCard style={styles.successCard}>
            <Text style={styles.successTitle}>Puanın eklendi</Text>
            <Text style={styles.successGain}>+{completion.gainedPoints} XP</Text>
            <Text style={styles.successText}>Yeni toplam: {completion.totalPoints} XP</Text>
          </AppCard>
        ) : null}

        <AppCard style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>Program özeti</Text>
          <Text style={styles.summaryText}>
            {program.duration} dakika · {program.calories} kcal · {program.category}
          </Text>
          <Text style={styles.description}>{program.description}</Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc', marginBottom: 6 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  level: { fontSize: 15, color: '#a3e635', fontWeight: '700' },
  reward: { fontSize: 15, color: '#fbbf24', fontWeight: '800' },
  progressCard: { marginBottom: 14 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', marginBottom: 8, fontWeight: '700' },
  progressCount: { color: '#f8fafc', fontSize: 13, fontWeight: '700' },
  progressTrack: { height: 8, backgroundColor: '#334155', overflow: 'hidden', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: '#a3e635', borderRadius: 4 },
  stepDots: { flexDirection: 'row', marginTop: 12 },
  stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#475569', marginRight: 8 },
  stepDotDone: { backgroundColor: '#a3e635' },
  stepDotActive: { borderWidth: 2, borderColor: '#f8fafc' },
  stepCard: { marginBottom: 14 },
  stepCounter: { fontSize: 12, color: '#a3e635', fontWeight: '800', marginBottom: 10 },
  stepImage: { width: '100%', aspectRatio: 16 / 10, borderRadius: 8, backgroundColor: '#334155', marginBottom: 16 },
  stepTitle: { fontSize: 20, color: '#f8fafc', fontWeight: '800', marginBottom: 8 },
  description: { fontSize: 15, color: '#cbd5e1', lineHeight: 22 },
  actionButton: { marginTop: 18, marginBottom: 10 },
  successCard: {
    marginBottom: 14,
    alignItems: 'center',
    borderColor: 'rgba(163, 230, 53, 0.5)',
    backgroundColor: 'rgba(163, 230, 53, 0.1)',
  },
  successTitle: { color: '#a3e635', fontSize: 14, fontWeight: '700', marginBottom: 6 },
  successGain: { color: '#f8fafc', fontSize: 32, fontWeight: '900', marginBottom: 4 },
  successText: { color: '#cbd5e1', fontSize: 14, fontWeight: '600' },
  summaryCard: { marginBottom: 14 },
  summaryText: { color: '#f8fafc', fontSize: 14, fontWeight: '700', marginBottom: 10 },
  errorText: { color: '#f87171', fontSize: 15, marginBottom: 16 },
});
