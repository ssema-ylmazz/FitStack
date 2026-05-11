import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>FitStack</Text>
        <Text style={styles.subtitle}>Giriş (iskelet — API çağrısı yok)</Text>
        <AppCard style={styles.card}>
          <AppInput label="E-posta" value={email} onChangeText={setEmail} placeholder="ornek@mail.com" keyboardType="email-address" />
          <AppInput label="Şifre" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <AppButton title="Giriş yap" onPress={() => login(email, password)} />
          <Pressable onPress={() => navigation.navigate('Register')} style={styles.linkWrap}>
            <Text style={styles.link}>Hesabın yok mu? Kayıt ol</Text>
          </Pressable>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '800', color: '#a3e635', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 20 },
  card: { marginTop: 8 },
  linkWrap: { marginTop: 16, alignItems: 'center' },
  link: { color: '#a3e635', fontSize: 15 },
});
