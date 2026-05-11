import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Ana Sayfa</Text>
        <Text style={styles.desc}>
          Özet panel ve hızlı erişim burada olacak. Şimdilik yalnızca iskelet; 17 gereksinim sonradan bağlanacak.
        </Text>
        <AppCard>
          <Text style={styles.section}>İlgili ekranlar (gezinme testi)</Text>
          <AppButton title="Toplam puan" onPress={() => navigation.navigate('Points')} style={styles.btn} />
          <AppButton title="Rozetler" onPress={() => navigation.navigate('Badges')} variant="secondary" style={styles.btn} />
          <AppButton title="Günlük seri" onPress={() => navigation.navigate('Streak')} variant="secondary" style={styles.btn} />
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
  section: { color: '#94a3b8', marginBottom: 12, fontWeight: '600' },
  btn: { marginBottom: 10 },
});
