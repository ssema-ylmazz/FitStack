import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';

export default function ProgramsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Programlar</Text>
        <Text style={styles.desc}>Liste ve zorluk filtresi (beginner / intermediate / advanced) burada olacak.</Text>
        <AppCard>
          <AppButton title="Örnek program detayı" onPress={() => navigation.navigate('ProgramDetail', { id: 1 })} />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  desc: { fontSize: 14, color: '#94a3b8', lineHeight: 20, marginBottom: 16 },
});
