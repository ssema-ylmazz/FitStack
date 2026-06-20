import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ErrorState from '../components/ErrorState';
import ScreenContainer from '../components/ScreenContainer';
import { deleteProfile, updateProfile } from '../api/authApi';
import colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout, refreshProfile, user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [level, setLevel] = useState(user?.level || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setName(user?.name || '');
    setUsername(user?.username || '');
    setLevel(user?.level || '');
  }, [user]);

  async function handleUpdateProfile() {
    if (submitting) return;

    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      await updateProfile({
        name: name.trim(),
        username: username.trim(),
        level: level.trim(),
      });
      await refreshProfile();
      setMessage('Profil bilgileri guncellendi.');
    } catch (err) {
      setError(err.userMessage || 'Profil guncellenemedi.');
    } finally {
      setSubmitting(false);
    }
  }

  function confirmDeleteProfile() {
    Alert.alert('Profili sil', 'Hesabini silmek istediginden emin misin?', [
      { text: 'Vazgec', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: handleDeleteProfile },
    ]);
  }

  async function handleDeleteProfile() {
    setMessage('');
    setError('');
    try {
      await deleteProfile();
      await logout();
    } catch (err) {
      setError(err.userMessage || 'Profil silinemedi.');
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Aktif Kullanici</Text>
        <Text style={styles.title}>{user?.name || 'FitStack Kullanici'}</Text>
        <Text style={styles.email}>{user?.email || 'Profil bilgisi yuklenemedi'}</Text>
      </View>

      {error ? <ErrorState message={error} /> : null}
      {message ? <Text style={styles.success}>{message}</Text> : null}

      <View style={styles.form}>
        <AppInput label="Ad Soyad" onChangeText={setName} placeholder="Ad Soyad" value={name} />
        <AppInput label="Kullanici Adi" onChangeText={setUsername} placeholder="username" value={username} />
        <AppInput label="Seviye" onChangeText={setLevel} placeholder="beginner" value={level} />
        <AppButton
          disabled={submitting}
          title={submitting ? 'Guncelleniyor...' : 'Profili Guncelle'}
          onPress={handleUpdateProfile}
        />
      </View>

      <AppButton title="Profili Sil" variant="secondary" onPress={confirmDeleteProfile} />
      <AppButton title="Cikis Yap" variant="secondary" onPress={logout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 28,
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
  form: {
    gap: 12,
  },
  success: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '700',
    padding: 12,
  },
});
