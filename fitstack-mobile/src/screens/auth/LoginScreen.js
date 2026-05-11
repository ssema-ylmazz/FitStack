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
import { validateLoginForm } from '../../utils/authValidation';

export default function LoginScreen({ navigation }) {
  const { login, authBusy } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onEmailChange = useCallback((t) => {
    setEmail(t);
    if (error) setError('');
  }, [error]);

  const onPasswordChange = useCallback((t) => {
    setPassword(t);
    if (error) setError('');
  }, [error]);

  const onSubmit = useCallback(async () => {
    const v = validateLoginForm({ email, password });
    if (!v.ok) {
      setError(v.error);
      return;
    }
    setLoading(true);
    setError('');
    const result = await login(email.trim(), password);
    setLoading(false);
    if (!result.ok) {
      setError(result.error || 'Giriş yapılamadı.');
    }
  }, [email, password, login]);

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
          <Text style={styles.title}>FitStack</Text>
          <Text style={styles.subtitle}>Hesabınla giriş yap</Text>
          <AppCard style={styles.card}>
            <AppInput
              label="E-posta"
              value={email}
              onChangeText={onEmailChange}
              placeholder="ornek@mail.com"
              keyboardType="email-address"
            />
            <AppInput
              label="Şifre"
              value={password}
              onChangeText={onPasswordChange}
              placeholder="••••••••"
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <AppButton title="Giriş yap" onPress={onSubmit} loading={busy} disabled={busy} />
            <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
              <Text style={styles.link}>Hesabın yok mu? Kayıt ol</Text>
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
  title: { fontSize: 28, fontWeight: '800', color: '#a3e635', marginBottom: 8 },
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
