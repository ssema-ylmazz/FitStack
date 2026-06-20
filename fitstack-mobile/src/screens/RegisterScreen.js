import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';

export default function RegisterScreen({ navigation }) {
  return (
    <ScreenContainer contentStyle={styles.container}>
      <Text style={styles.title}>Kayit Ol</Text>
      <Text style={styles.subtitle}>FitStack ile hedeflerini takip etmek icin demo hesabini hazirla.</Text>
      <View style={styles.form}>
        <AppInput label="Ad Soyad" placeholder="Sema Yilmaz" />
        <AppInput autoCapitalize="none" keyboardType="email-address" label="Email" placeholder="sema@fitstack.dev" />
        <AppInput label="Password" placeholder="••••••••" secureTextEntry />
        <AppButton title="Kayit Ol" onPress={() => console.log('Mock register pressed')} />
        <AppButton title="Girise Don" variant="ghost" onPress={() => navigation?.navigate('Login')} />
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
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
});
