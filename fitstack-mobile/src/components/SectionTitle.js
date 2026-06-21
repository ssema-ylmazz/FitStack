import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function SectionTitle({ title, action }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  action: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
