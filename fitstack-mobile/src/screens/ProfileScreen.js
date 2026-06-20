import { StyleSheet, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';

export default function ProfileScreen() {
  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>Profile</Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
});
