import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout, user } = useContext(AuthContext);

  return (
    <ScreenContainer contentStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Aktif Kullanici</Text>
        <Text style={styles.title}>{user?.name || 'FitStack Kullanici'}</Text>
        <Text style={styles.email}>{user?.email || 'Profil bilgisi yuklenemedi'}</Text>
      </View>
      <AppButton title="Cikis Yap" variant="secondary" onPress={logout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    gap: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  label: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  email: {
    color: colors.mutedText,
    fontSize: 15,
    marginTop: 6,
  },
});
