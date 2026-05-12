import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import EmptyState from '../../components/EmptyState';
import * as badgesService from '../../api/badgesService';

const COL_GAP = 12;
const screenW = Dimensions.get('window').width;
const tileW = (screenW - 32 - COL_GAP) / 2;

function badgeEmoji(key) {
  const k = String(key || '');
  const pool = ['🏅', '⭐', '🔥', '💪', '🎯', '🏃', '🥇', '✨'];
  let h = 0;
  for (let i = 0; i < k.length; i += 1) h = (h + k.charCodeAt(i) * (i + 1)) % 997;
  return pool[h % pool.length];
}

export default function BadgesScreen() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [earnName, setEarnName] = useState('');
  const [earning, setEarning] = useState(false);

  const loadBadges = useCallback(async (opts = { silent: false }) => {
    const silent = opts.silent === true;
    if (!silent) {
      setLoading(true);
      setError('');
    }
    try {
      const list = await badgesService.fetchBadges();
      setBadges(list);
    } catch (e) {
      setBadges([]);
      setError(e instanceof Error ? e.message : 'Rozetler yüklenemedi.');
    } finally {
      if (!silent) setLoading(false);
      if (silent) setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadBadges({ silent: false });
    }, [loadBadges]),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadBadges({ silent: true });
  }, [loadBadges]);

  const onEarnBadge = useCallback(async () => {
    setEarning(true);
    setError('');
    try {
      const name = earnName.trim() === '' ? undefined : earnName.trim();
      await badgesService.createBadge(name ? { name } : {});
      setEarnName('');
      await loadBadges({ silent: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rozet eklenemedi.');
    } finally {
      setEarning(false);
    }
  }, [earnName, loadBadges]);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={[styles.tile, { width: tileW }]}>
        <AppCard style={styles.tileCard}>
          <Text style={styles.emoji}>{badgeEmoji(item.key)}</Text>
          <Text style={styles.badgeName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.badgeKey} numberOfLines={1}>
            {item.key}
          </Text>
          <Text style={styles.badgeDate}>{formatShortDate(item.earnedAt)}</Text>
        </AppCard>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item) => String(item.id), []);

  const listHeader = (
    <View style={styles.header}>
      <Text style={styles.title}>Rozetler</Text>
      <Text style={styles.subtitle}>Kazandığın başarılar</Text>
      {error ? (
        <AppCard style={styles.errorCard}>
          <Text style={styles.errorText}>{error}</Text>
          <AppButton title="Tekrar dene" onPress={() => loadBadges({ silent: false })} />
        </AppCard>
      ) : null}
      <AppCard style={styles.earnCard}>
        <Text style={styles.earnTitle}>Rozet kazan</Text>
        <AppInput
          label="Rozet adı (isteğe bağlı)"
          value={earnName}
          onChangeText={(t) => {
            setEarnName(t);
            if (error) setError('');
          }}
          placeholder="Boş bırakılırsa sunucu varsayılanı"
        />
        <AppButton title="Rozet kazan" onPress={onEarnBadge} loading={earning} disabled={earning} />
      </AppCard>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#a3e635" />
          <Text style={styles.loadingText}>Rozetler yükleniyor…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <FlatList
        data={badges}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={badges.length > 1 ? styles.rowWrap : undefined}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          !error && badges.length === 0 ? (
            <EmptyState title="Henüz rozet yok" message="Yukarıdan yeni rozet kazanarak başla." />
          ) : null
        }
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#a3e635" />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function formatShortDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return String(iso).slice(0, 10);
    return d.toLocaleDateString('tr-TR');
  } catch {
    return String(iso).slice(0, 10);
  }
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 12, color: '#94a3b8', fontSize: 14 },
  listContent: { paddingHorizontal: 16, paddingBottom: 32 },
  header: { marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94a3b8', marginBottom: 14 },
  errorCard: { marginBottom: 12 },
  errorText: { color: '#f87171', fontSize: 14, marginBottom: 12 },
  earnCard: { marginBottom: 16 },
  earnTitle: { fontSize: 15, fontWeight: '700', color: '#a3e635', marginBottom: 10 },
  rowWrap: { justifyContent: 'space-between', marginBottom: COL_GAP },
  tile: { marginBottom: COL_GAP },
  tileCard: { alignItems: 'center', minHeight: 140, justifyContent: 'center' },
  emoji: { fontSize: 36, marginBottom: 8 },
  badgeName: { fontSize: 15, fontWeight: '700', color: '#f8fafc', textAlign: 'center' },
  badgeKey: { fontSize: 11, color: '#64748b', marginTop: 4, textAlign: 'center' },
  badgeDate: { fontSize: 12, color: '#94a3b8', marginTop: 8 },
});
