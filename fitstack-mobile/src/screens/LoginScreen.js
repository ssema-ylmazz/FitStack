import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';

export default function LoginScreen({ navigation }) {
  return (
    <ScreenContainer contentStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>FitStack</Text>
        <Text style={styles.subtitle}>Antrenmanlarini takip et, puan kazan, gelisimini gor.</Text>
      </View>
      <View style={styles.form}>
        <AppInput autoCapitalize="none" keyboardType="email-address" label="Email" placeholder="sema@fitstack.dev" />
        <AppInput label="Password" placeholder="••••••••" secureTextEntry />
        <AppButton title="Giris Yap" onPress={() => console.log('Mock login pressed')} />
        <AppButton title="Kayit Ol" variant="ghost" onPress={() => navigation?.navigate('Register')} />
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
