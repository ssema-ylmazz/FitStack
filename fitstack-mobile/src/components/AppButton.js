import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export default function AppButton({ title, onPress, disabled, variant = 'primary', style }) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, variant !== 'primary' && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  secondary: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
    minHeight: 40,
    paddingHorizontal: 8,
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: colors.primaryDark,
  },
});
