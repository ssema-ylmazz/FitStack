import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';
import { validateRegisterForm, MIN_PASSWORD_LENGTH } from '../../utils/authValidation';

export default function RegisterScreen({ navigation }) {
  const { register, authBusy } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const onSubmit = useCallback(async () => {
    const v = validateRegisterForm({ name, username, email, password });
    if (!v.ok) {
      setError(v.error);
      return;
    }
    setLoading(true);
    setError('');
    const result = await register({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Kayıt tamamlanamadı.');
    }
  }, [name, username, email, password, register]);

  const busy = loading || authBusy;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Kayıt ol</Text>
          <Text style={styles.subtitle}>Yeni hesap oluştur</Text>
          <AppCard style={styles.card}>
            <AppInput
              label="Ad Soyad"
              value={name}
              onChangeText={(t) => {
                setName(t);
                clearError();
              }}
              placeholder="Adınız"
              autoCapitalize="words"
            />
            <AppInput
              label="Kullanıcı adı"
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                clearError();
              }}
              placeholder="kullanici"
            />
            <AppInput
              label="E-posta"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                clearError();
              }}
              placeholder="ornek@mail.com"
              keyboardType="email-address"
            />
            <AppInput
              label="Şifre"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                clearError();
              }}
              placeholder={`En az ${MIN_PASSWORD_LENGTH} karakter`}
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <AppButton title="Kayıt ol" onPress={onSubmit} loading={busy} disabled={busy} />
            <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkWrap}>
              <Text style={styles.link}>Zaten hesabın var mı? Giriş yap</Text>
            </Pressable>
          </AppCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  flex: { flex: 1 },
  scroll: { padding: 20, paddingBottom: 40, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 20 },
  card: { marginTop: 8 },
  error: {
    color: '#f87171',
    marginBottom: 12,
    fontSize: 14,
  },
  linkWrap: { marginTop: 16, alignItems: 'center' },
  link: { color: '#a3e635', fontSize: 15 },
});
