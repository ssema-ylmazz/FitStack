import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ErrorState from '../components/ErrorState';
import SectionTitle from '../components/SectionTitle';
import ScreenContainer from '../components/ScreenContainer';
import { selectProgram } from '../api/programsApi';
import colors from '../constants/colors';
import { programs } from '../constants/mockData';

export default function ProgramDetailScreen({ route }) {
  const routeProgram = route?.params?.program;
  const program = routeProgram || programs.find((item) => item.id === route?.params?.programId) || programs[0];
  const exercises = program.exercises || program.steps || [];
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSelectProgram() {
    if (submitting) return;

    setError('');
    setSubmitting(true);
    try {
      await selectProgram(program.id);
      Alert.alert('Program seçildi', `${program.title} aktif programa eklendi.`);
    } catch (err) {
      setError(err.userMessage || 'Program seçilemedi. Backend kapalı olabilir.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.level}>{program.level}</Text>
        <Text style={styles.title}>{program.title}</Text>
        <Text style={styles.description}>{program.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{program.duration} dakika</Text>
          <Text style={styles.meta}>{exercises.length} egzersiz</Text>
        </View>
      </View>

      <SectionTitle title="Egzersiz Listesi" />
      <View style={styles.exerciseList}>
        {exercises.map((exercise, index) => (
          <View key={exercise.id || exercise.title || exercise} style={styles.exerciseItem}>
            <Text style={styles.exerciseNumber}>{index + 1}</Text>
            <Text style={styles.exerciseText}>{exercise.title || exercise}</Text>
          </View>
        ))}
      </View>

      {error ? <ErrorState message={error} /> : null}
      <AppButton
        disabled={submitting}
        title={submitting ? 'Seçiliyor...' : 'Programı Seç'}
        onPress={handleSelectProgram}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 18,
  },
  level: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentSoft,
    borderRadius: 999,
    color: colors.accent,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  description: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 10,
  },
  meta: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '800',
  },
  exerciseList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  exerciseItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 10,
  },
  exerciseNumber: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
    height: 28,
    lineHeight: 28,
    textAlign: 'center',
    width: 28,
  },
  exerciseText: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
});
