import { StyleSheet, Text, View } from 'react-native';
import ProgramCard from '../components/ProgramCard';
import ScreenContainer from '../components/ScreenContainer';
import colors from '../constants/colors';
import { programs } from '../constants/mockData';

export default function ProgramsScreen({ navigation }) {
  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Programlar</Text>
        <Text style={styles.subtitle}>Sema icin demo akista gosterilecek hazir egzersiz programlari.</Text>
      </View>
      <View style={styles.list}>
        {programs.map((program) => (
          <ProgramCard
            key={program.id}
            program={program}
            onPress={() => navigation.navigate('ProgramDetail', { programId: program.id })}
          />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 28,
  },
  header: {
    marginBottom: 18,
  },
  list: {
    gap: 14,
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
});
