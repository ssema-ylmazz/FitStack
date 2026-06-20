import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function ErrorState({ message = 'Bir hata olustu.' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hata</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dangerSoft,
    borderColor: '#fecaca',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  message: {
    color: colors.text,
    fontSize: 15,
  },
});
