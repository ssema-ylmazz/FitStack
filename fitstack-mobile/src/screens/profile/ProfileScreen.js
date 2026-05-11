import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { logout } = useAuth();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.desc}>GET /users/profile ve hesap silme (DELETE) burada olacak.</Text>
        <AppCard>
          <AppButton title="Profili düzenle" onPress={() => navigation.navigate('EditProfile')} style={styles.btn} />
          <AppButton title="Çıkış yap" onPress={() => logout()} variant="secondary" />
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
  btn: { marginBottom: 10 },
});
