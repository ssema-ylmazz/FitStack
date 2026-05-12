import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { useAuth } from '../../context/AuthContext';
import * as profileService from '../../api/profileService';

export default function ProfileScreen({ navigation }) {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async (opts = { isRefresh: false }) => {
    const isRefresh = opts.isRefresh === true;
    if (!isRefresh) setLoading(true);
    setError('');
    try {
      const u = await profileService.fetchProfile();
      setProfile(u);
    } catch (e) {
      setProfile(null);
      setError(e instanceof Error ? e.message : 'Profil yüklenemedi.');
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfile({ isRefresh: false });
    }, [loadProfile]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadProfile({ isRefresh: true });
  }, [loadProfile]);

  const onDeleteAccount = useCallback(() => {
    Alert.alert(
      'Hesabı sil',
      'Hesabınız kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await profileService.deleteProfile();
              await logout();
            } catch (e) {
              Alert.alert('Hata', e instanceof Error ? e.message : 'Hesap silinemedi.');
            }
          },
        },
      ],
    );
  }, [logout]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Hesap bilgilerin</Text>

        {loading && !refreshing ? (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#a3e635" />
            <Text style={styles.loaderText}>Yükleniyor…</Text>
          </View>
        ) : null}

        {error && !loading ? (
          <AppCard style={styles.card}>
            <Text style={styles.errorText}>{error}</Text>
            <AppButton title="Tekrar dene" onPress={() => loadProfile({ isRefresh: false })} />
          </AppCard>
        ) : null}

        {profile && !loading ? (
          <AppCard style={styles.card}>
            <ProfileRow label="Ad Soyad" value={profile.name} />
            <ProfileRow label="Kullanıcı adı" value={profile.username} />
            <ProfileRow label="E-posta" value={profile.email} />
            <ProfileRow label="Seviye" value={profile.level} isLast />
          </AppCard>
        ) : null}

        <View style={styles.actions}>
          <AppButton title="Profili düzenle" onPress={() => navigation.navigate('EditProfile')} style={styles.btn} />
          <AppButton
            title="Hesabı sil"
            onPress={onDeleteAccount}
            variant="secondary"
            disabled={loading || !profile}
            style={styles.btn}
          />
          <AppButton title="Çıkış yap" onPress={() => logout()} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileRow({ label, value, isLast }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value ?? '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 16, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  loaderWrap: { paddingVertical: 32, alignItems: 'center' },
  loaderText: { marginTop: 10, color: '#94a3b8', fontSize: 14 },
  card: { marginBottom: 16 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: { fontSize: 12, color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginBottom: 4 },
  rowValue: { fontSize: 16, color: '#f8fafc', fontWeight: '600' },
  actions: { marginTop: 8 },
  btn: { marginBottom: 10 },
});
