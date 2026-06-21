import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ErrorState from '../components/ErrorState';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('demo@fitstack.local');
  const [password, setPassword] = useState('demo');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    if (submitting) return;
    if (!email.trim() || !password.trim()) {
      setError('E-posta ve şifre alanları zorunludur.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await login({ email: email.trim(), password });
    } catch (err) {
      setError(err.userMessage || 'Giriş yapılamadı. Bilgileri kontrol edin.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>FitStack</Text>
        <Text style={styles.subtitle}>Antrenmanlarını takip et, puan kazan, gelişimini gör.</Text>
      </View>
      <View style={styles.form}>
        {error ? <ErrorState message={error} /> : null}
        <AppInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-posta"
          onChangeText={setEmail}
          placeholder="sema@fitstack.dev"
          value={email}
        />
        <AppInput label="Şifre" onChangeText={setPassword} placeholder="••••••••" secureTextEntry value={password} />
        <AppButton disabled={submitting} title={submitting ? 'Giriş yapılıyor...' : 'Giriş Yap'} onPress={handleLogin} />
        <AppButton title="Kayıt Ol" variant="ghost" onPress={() => navigation?.navigate('Register')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  hero: {
    marginBottom: 28,
  },
  form: {
    gap: 12,
  },
  logo: {
    color: colors.text,
    fontSize: 38,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
  },
});
