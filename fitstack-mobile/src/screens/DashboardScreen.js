import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import SectionTitle from '../components/SectionTitle';
import ScreenContainer from '../components/ScreenContainer';
import StatCard from '../components/StatCard';
import { createBadge, getBadges, getStreak, getUserPoints, updateStreak } from '../api/profileApi';
import colors from '../constants/colors';
import { dashboardSummary } from '../constants/mockData';

export default function DashboardScreen({ navigation }) {
  const [summary, setSummary] = useState({
    totalPoints: dashboardSummary.totalPoints,
    streakDays: dashboardSummary.streakDays,
    badges: ['Yeni Baslayan', 'Kararli Sporcu'],
    usingFallback: false,
    error: '',
    message: '',
  });
  const [earningBadge, setEarningBadge] = useState(false);
  const [updatingStreak, setUpdatingStreak] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const [pointsResponse, badgesResponse, streakResponse] = await Promise.all([
          getUserPoints(),
          getBadges(),
          getStreak(),
        ]);

        if (!mounted) return;

        const totalPoints = pointsResponse.data?.totalPoints ?? dashboardSummary.totalPoints;
        const badges = badgesResponse.data?.badges || [];
        const streak = streakResponse.data?.streak;

        setSummary({
          totalPoints,
          streakDays: streak?.currentStreak ?? dashboardSummary.streakDays,
          badges,
          usingFallback: false,
          error: '',
          message: '',
        });
      } catch (error) {
        if (!mounted) return;
        setSummary((current) => ({
          ...current,
          usingFallback: true,
          error: error.userMessage || 'Canli ozet alinamadi; demo veriler gosteriliyor.',
        }));
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  async function refreshDashboardSummary(message = '') {
    try {
      const [pointsResponse, badgesResponse, streakResponse] = await Promise.all([
        getUserPoints(),
        getBadges(),
        getStreak(),
      ]);
      const totalPoints = pointsResponse.data?.totalPoints ?? dashboardSummary.totalPoints;
      const badges = badgesResponse.data?.badges || [];
      const streak = streakResponse.data?.streak;

      setSummary({
        totalPoints,
        streakDays: streak?.currentStreak ?? dashboardSummary.streakDays,
        badges,
        usingFallback: false,
        error: '',
        message,
      });
    } catch (error) {
      setSummary((current) => ({
        ...current,
        usingFallback: true,
        error: error.userMessage || 'Ozet yenilenemedi; mevcut veriler korunuyor.',
        message,
      }));
    }
  }

  async function handleEarnBadge() {
    if (earningBadge) return;

    setEarningBadge(true);
    try {
      await createBadge({
        key: `mobile_demo_${Date.now()}`,
        name: 'Mobil Demo Rozeti',
      });
      await refreshDashboardSummary('Rozet kazanildi.');
      Alert.alert('Rozet kazanildi', 'GET /badges ile rozet listesi yenilendi.');
    } catch (error) {
      setSummary((current) => ({
        ...current,
        error: error.userMessage || 'Rozet kazanilamadi. Backend kapali olabilir.',
      }));
    } finally {
      setEarningBadge(false);
    }
  }

  async function handleUpdateStreak() {
    if (updatingStreak) return;

    const nextStreak = Number(summary.streakDays || 0) + 1;
    setUpdatingStreak(true);
    try {
      await updateStreak({
        currentStreak: nextStreak,
        lastWorkoutDate: new Date().toISOString().slice(0, 10),
      });
      await refreshDashboardSummary('Seri guncellendi.');
      Alert.alert('Seri guncellendi', `Yeni seri: ${nextStreak} gun.`);
    } catch (error) {
      setSummary((current) => ({
        ...current,
        error: error.userMessage || 'Seri guncellenemedi. Backend kapali olabilir.',
      }));
    } finally {
      setUpdatingStreak(false);
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.kicker}>Bugunku durum</Text>
        <Text style={styles.title}>Merhaba, {dashboardSummary.userName}</Text>
        <Text style={styles.subtitle}>Bugun de hareket hedeflerine bir adim daha yaklas.</Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard label="Toplam Puan" value={summary.totalPoints} />
        <StatCard label="Streak" value={`${summary.streakDays} gun`} tone="accent" />
      </View>
      <View style={styles.statsRow}>
        <StatCard label="Tamamlanan" value={dashboardSummary.completedWorkouts} tone="info" />
        <StatCard label="Rozet" value={summary.badges.length} />
      </View>
      {summary.error ? <Text style={styles.notice}>{summary.error}</Text> : null}
      {summary.message ? <Text style={styles.success}>{summary.message}</Text> : null}
      <View style={styles.actionRow}>
        <AppButton
          disabled={updatingStreak}
          title={updatingStreak ? 'Guncelleniyor...' : 'Seriyi Guncelle'}
          variant="secondary"
          style={styles.actionButton}
          onPress={handleUpdateStreak}
        />
        <AppButton
          disabled={earningBadge}
          title={earningBadge ? 'Kazaniliyor...' : 'Demo Rozet Kazan'}
          variant="secondary"
          style={styles.actionButton}
          onPress={handleEarnBadge}
        />
      </View>

      <View style={styles.programCard}>
        <Text style={styles.programLabel}>Secili program</Text>
        <Text style={styles.programTitle}>{dashboardSummary.selectedProgram}</Text>
        <Text style={styles.programText}>Baslangic icin dengeli ve takip etmesi kolay bir antrenman plani.</Text>
        <AppButton title="Programlara Git" onPress={() => navigation.navigate('Programs')} />
      </View>

      <SectionTitle title="Rozetler" />
      <View style={styles.badgeList}>
        {(summary.badges.length > 0 ? summary.badges : [{ name: 'Demo Rozet' }]).map((badge, index) => (
          <Text key={badge.id || badge.key || badge.name || badge || index} style={styles.badge}>
            {badge.name || badge}
          </Text>
        ))}
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
  notice: {
    backgroundColor: colors.accentSoft,
    borderRadius: 8,
    color: colors.accent,
    fontSize: 13,
    fontWeight: '700',
    padding: 12,
  },
  success: {
    backgroundColor: colors.primarySoft,
    borderRadius: 8,
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
    padding: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 10,
  },
  badgeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 8,
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
