import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import SectionTitle from '../components/SectionTitle';
import ScreenContainer from '../components/ScreenContainer';
import StatCard from '../components/StatCard';
import colors from '../constants/colors';
import { dashboardSummary } from '../constants/mockData';

export default function DashboardScreen({ navigation }) {
  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Bugunku durum</Text>
        <Text style={styles.title}>Merhaba, {dashboardSummary.userName}</Text>
        <Text style={styles.subtitle}>Bugun de hareket hedeflerine bir adim daha yaklas.</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Toplam Puan" value={dashboardSummary.totalPoints} />
        <StatCard label="Streak" value={`${dashboardSummary.streakDays} gun`} tone="accent" />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Tamamlanan" value={dashboardSummary.completedWorkouts} tone="info" />
        <StatCard label="Aktif Program" value="1" />
      </View>

      <View style={styles.programCard}>
        <Text style={styles.programLabel}>Secili program</Text>
        <Text style={styles.programTitle}>{dashboardSummary.selectedProgram}</Text>
        <Text style={styles.programText}>Baslangic icin dengeli ve takip etmesi kolay bir antrenman plani.</Text>
        <AppButton title="Programlara Git" onPress={() => navigation.navigate('Programs')} />
      </View>

      <SectionTitle title="Son Aktiviteler" />
      <View style={styles.activityList}>
        {dashboardSummary.recentActivities.map((activity) => (
          <View key={activity} style={styles.activityItem}>
            <Text style={styles.activityDot}>•</Text>
            <Text style={styles.activityText}>{activity}</Text>
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 28,
  },
  header: {
    gap: 8,
    marginBottom: 4,
  },
  kicker: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.mutedText,
    fontSize: 16,
    lineHeight: 23,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  programCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 18,
  },
  programLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  programTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  programText: {
    color: colors.mutedText,
    fontSize: 15,
    lineHeight: 22,
  },
  activityList: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  activityItem: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 8,
  },
  activityDot: {
    color: colors.primary,
    fontSize: 18,
    lineHeight: 22,
  },
  activityText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
});
