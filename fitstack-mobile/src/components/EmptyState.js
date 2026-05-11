import { View, Text, StyleSheet } from 'react-native';

export default function EmptyState({ title = 'Henüz veri yok', message = '' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  title: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
