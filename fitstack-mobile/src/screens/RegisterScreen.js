import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ErrorState from '../components/ErrorState';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleRegister() {
    if (submitting) return;
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Ad soyad, e-posta ve şifre alanları zorunludur.');
      setMessage('');
      return;
    }

    setError('');
    setMessage('');
    setSubmitting(true);
    try {
      await register({ name: name.trim(), email: email.trim(), password });
      setMessage('Kayıt başarılı. Giriş ekranına yönlendiriliyorsun.');
      navigation?.navigate('Login');
    } catch (err) {
      setError(err.userMessage || 'Kayıt tamamlanamadı.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScreenContainer contentStyle={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <Text style={styles.subtitle}>FitStack ile hedeflerini takip etmek için demo hesabını hazırla.</Text>
      <View style={styles.form}>
        {error ? <ErrorState message={error} /> : null}
        {message ? <Text style={styles.success}>{message}</Text> : null}
        <AppInput label="Ad Soyad" onChangeText={setName} placeholder="Sema Yilmaz" value={name} />
        <AppInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-posta"
          onChangeText={setEmail}
          placeholder="sema@fitstack.dev"
          value={email}
        />
        <AppInput label="Şifre" onChangeText={setPassword} placeholder="••••••••" secureTextEntry value={password} />
        <AppButton disabled={submitting} title={submitting ? 'Kayıt yapılıyor...' : 'Kayıt Ol'} onPress={handleRegister} />
        <AppButton title="Girişe Dön" variant="ghost" onPress={() => navigation?.navigate('Login')} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  form: {
    gap: 12,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 24,
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
});
