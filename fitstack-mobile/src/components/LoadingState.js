import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function LoadingState({ message = 'Yukleniyor...' }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    padding: 24,
  },
  text: {
    color: colors.mutedText,
    fontSize: 15,
  },
});
