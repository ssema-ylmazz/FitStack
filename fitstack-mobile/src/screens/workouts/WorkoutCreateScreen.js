import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutCreateScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Antrenman oluştur</Text>
        <Text style={styles.desc}>POST /workouts formu ve puan (PUT /workouts/:id/points) sonradan eklenecek.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  desc: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
});
