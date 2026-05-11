import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import AppCard from '../../components/AppCard';

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Kayıt ol</Text>
        <Text style={styles.subtitle}>İskelet ekran — backend&apos;e istek yok.</Text>
        <AppCard style={styles.card}>
          <AppInput label="Ad Soyad" value={name} onChangeText={setName} placeholder="Adınız" autoCapitalize="words" />
          <AppInput label="Kullanıcı adı" value={username} onChangeText={setUsername} placeholder="kullanici" />
          <AppInput label="E-posta" value={email} onChangeText={setEmail} placeholder="ornek@mail.com" keyboardType="email-address" />
          <AppInput label="Şifre" value={password} onChangeText={setPassword} placeholder="••••••••" secureTextEntry />
          <AppButton title="Kayıt ol (placeholder)" onPress={() => register({ name, username, email, password })} />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  scroll: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#f8fafc', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 20 },
  card: { marginTop: 8 },
});
