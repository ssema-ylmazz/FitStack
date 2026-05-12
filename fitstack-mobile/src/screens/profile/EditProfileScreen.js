import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import * as profileService from '../../api/profileService';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');

  const loadForm = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const u = await profileService.fetchProfile();
      setName(u.name ?? '');
      setUsername(u.username ?? '');
      setEmail(u.email ?? '');
      setLevel(u.level ?? '');
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Profil yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  const onSave = useCallback(async () => {
    setSaving(true);
    setSaveError('');
    try {
      await profileService.updateProfile({
        name,
        username,
        email,
        level,
      });
      Alert.alert('Başarılı', 'Profilin güncellendi.', [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  }, [name, username, email, level, navigation]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Profil yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loadError) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <Text style={styles.title}>Profili düzenle</Text>
          <Text style={styles.errorText}>{loadError}</Text>
          <AppButton title="Tekrar dene" onPress={loadForm} style={styles.retryTop} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Profili düzenle</Text>
          <Text style={styles.lead}>Bilgilerini güncelle ve kaydet.</Text>

          {saveError ? (
            <AppCard style={styles.card}>
              <Text style={styles.errorText}>{saveError}</Text>
            </AppCard>
          ) : null}

          <AppCard style={styles.card}>
            <AppInput
              label="Ad Soyad"
              value={name}
              onChangeText={(t) => {
                setName(t);
                if (saveError) setSaveError('');
              }}
              placeholder="Adınız"
              autoCapitalize="words"
            />
            <AppInput
              label="Kullanıcı adı"
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                if (saveError) setSaveError('');
              }}
              placeholder="kullaniciadi"
            />
            <AppInput
              label="E-posta"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                if (saveError) setSaveError('');
              }}
              placeholder="ornek@mail.com"
              keyboardType="email-address"
            />
            <AppInput
              label="Seviye"
              value={level}
              onChangeText={(t) => {
                setLevel(t);
                if (saveError) setSaveError('');
              }}
              placeholder="örn. beginner, intermediate"
            />
            <AppButton title="Kaydet" onPress={onSave} loading={saving} disabled={saving} />
          </AppCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  flex: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 12, textAlign: 'center' },
  lead: { fontSize: 14, color: '#94a3b8', marginBottom: 16 },
  card: { marginBottom: 14 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 4 },
  retryTop: { marginTop: 16, alignSelf: 'stretch', maxWidth: 280 },
});
