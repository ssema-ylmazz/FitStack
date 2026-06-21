import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function StatCard({ label, value, tone = 'primary' }) {
  const toneStyle = tone === 'accent' ? styles.accent : tone === 'info' ? styles.info : styles.primary;

  return (
    <View style={[styles.card, toneStyle]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    flex: 1,
    minHeight: 92,
    padding: 14,
    justifyContent: 'space-between',
  },
  primary: {
    backgroundColor: colors.primarySoft,
  },
  accent: {
    backgroundColor: colors.accentSoft,
  },
  info: {
    backgroundColor: colors.infoSoft,
  },
  value: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  label: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: '700',
  },
});
