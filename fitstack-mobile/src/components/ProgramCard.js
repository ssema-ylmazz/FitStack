import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function ProgramCard({ program, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{program.title}</Text>
        <Text style={styles.level}>{program.level}</Text>
      </View>
      <Text style={styles.description}>{program.description}</Text>
      <View style={styles.footer}>
        <Text style={styles.meta}>{program.duration} dk</Text>
        <Text style={styles.meta}>{program.exercises.length} egzersiz</Text>
        <Text style={styles.link}>Detayı Gör</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  pressed: {
    borderColor: colors.primary,
    transform: [{ scale: 0.99 }],
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
  },
  level: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  description: {
    color: colors.mutedText,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  meta: {
    color: colors.subtleText,
    fontSize: 13,
    fontWeight: '700',
  },
  link: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '900',
    marginLeft: 'auto',
  },
});
