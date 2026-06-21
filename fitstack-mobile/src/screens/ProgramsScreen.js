import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import ProgramCard from '../components/ProgramCard';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { getPrograms } from '../api/programsApi';
import { programs as mockPrograms } from '../constants/mockData';

const filters = [
  { label: 'Tümü', value: '' },
  { label: 'Başlangıç', value: 'beginner' },
  { label: 'Orta', value: 'intermediate' },
  { label: 'İleri', value: 'advanced' },
];

function normalizeProgram(program) {
  return {
    ...program,
    duration: program.duration ?? 0,
    exercises: program.exercises || program.steps || [],
    level: program.level || 'Program',
  };
}

export default function ProgramsScreen({ navigation }) {
  const [programs, setPrograms] = useState(mockPrograms);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadPrograms() {
      setLoading(true);
      setError('');
      try {
        const response = await getPrograms(selectedLevel ? { level: selectedLevel } : undefined);
        const apiPrograms = response.data?.programs || response.data?.data?.programs || [];
        if (mounted && apiPrograms.length > 0) {
          setPrograms(apiPrograms.map(normalizeProgram));
          setUsingFallback(false);
        } else if (mounted) {
          setPrograms(filterMockPrograms(selectedLevel));
          setUsingFallback(true);
          setError('API program listesi bos geldi. Demo liste gosteriliyor.');
        }
      } catch (err) {
        if (mounted) {
          setPrograms(filterMockPrograms(selectedLevel));
          setUsingFallback(true);
          setError(err.userMessage || 'Programlar API uzerinden alinamadi. Demo liste gosteriliyor.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPrograms();

    return () => {
      mounted = false;
    };
  }, [selectedLevel]);

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programlar</Text>
        <Text style={styles.subtitle}>
          {usingFallback ? 'API bağlantısı yokken demo programlar gösteriliyor.' : 'Seviyene uygun programı seç ve detayını incele.'}
        </Text>
      </View>
      <View style={styles.filters}>
        {filters.map((filter) => {
          const active = selectedLevel === filter.value;
          return (
            <Text
              key={filter.label}
              onPress={() => setSelectedLevel(filter.value)}
              style={[styles.filterButton, active && styles.filterButtonActive]}
            >
              {filter.label}
            </Text>
          );
        })}
      </View>
      {loading ? <LoadingState message="Programlar yükleniyor..." /> : null}
      {error ? <ErrorState message={error} /> : null}
      <View style={styles.list}>
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onPress={() => navigation.navigate('ProgramDetail', { program, programId: program.id })}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

function filterMockPrograms(level) {
  if (!level) return mockPrograms;
  return mockPrograms.filter((program) => program.level === level);
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  list: {
    gap: 14,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  filterButton: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    color: colors.primaryDark,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
