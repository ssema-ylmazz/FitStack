import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/home/HomeScreen';
import PointsScreen from '../screens/points/PointsScreen';
import BadgesScreen from '../screens/badges/BadgesScreen';
import StreakScreen from '../screens/streak/StreakScreen';

import ProgramsScreen from '../screens/programs/ProgramsScreen';
import ProgramDetailScreen from '../screens/programs/ProgramDetailScreen';

import WorkoutHistoryScreen from '../screens/workouts/WorkoutHistoryScreen';
import WorkoutCreateScreen from '../screens/workouts/WorkoutCreateScreen';

import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';
import StatisticsScreen from '../screens/statistics/StatisticsScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

/** Repoda `screens/goals/GoalsScreen` yoksa bile sekme çalışsın diye geçici yer tutucu (ileride dosyayla değiştirilebilir). */
function GoalsPlaceholderScreen() {
  return (
    <View style={goalsPlaceholderStyles.wrap}>
      <Text style={goalsPlaceholderStyles.title}>Hedefler</Text>
      <Text style={goalsPlaceholderStyles.hint}>
        Tam hedefler arayüzü için src/screens/goals/GoalsScreen.js dosyasını ekleyip bu sekmede component olarak bağlayın.
      </Text>
    </View>
  );
}

const goalsPlaceholderStyles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0f172a', padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#f8fafc', marginBottom: 12 },
  hint: { fontSize: 14, color: '#94a3b8', lineHeight: 20 },
});

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProgramsStack = createNativeStackNavigator();
const WorkoutsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const stackScreenOptions = {
  headerStyle: { backgroundColor: '#111827' },
  headerTintColor: '#f8fafc',
  contentStyle: { backgroundColor: '#0f172a' },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ title: 'Ana Sayfa' }} />
      <HomeStack.Screen name="Points" component={PointsScreen} options={{ title: 'Puanlar' }} />
      <HomeStack.Screen name="Badges" component={BadgesScreen} options={{ title: 'Rozetler' }} />
      <HomeStack.Screen name="Streak" component={StreakScreen} options={{ title: 'Seri' }} />
    </HomeStack.Navigator>
  );
}

function ProgramsStackNavigator() {
  return (
    <ProgramsStack.Navigator screenOptions={stackScreenOptions}>
      <ProgramsStack.Screen name="ProgramsList" component={ProgramsScreen} options={{ title: 'Programlar' }} />
      <ProgramsStack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ title: 'Program Detayı' }} />
    </ProgramsStack.Navigator>
  );
}

function WorkoutsStackNavigator() {
  return (
    <WorkoutsStack.Navigator screenOptions={stackScreenOptions}>
      <WorkoutsStack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} options={{ title: 'Geçmiş' }} />
      <WorkoutsStack.Screen name="WorkoutCreate" component={WorkoutCreateScreen} options={{ title: 'Yeni Antrenman' }} />
    </WorkoutsStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} options={{ title: 'Profil' }} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Profili Düzenle' }} />
    </ProfileStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#111827',
          borderTopColor: '#1e293b',
        },
        tabBarActiveTintColor: '#a3e635',
        tabBarInactiveTintColor: '#64748b',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProgramsTab"
        component={ProgramsStackNavigator}
        options={{
          tabBarLabel: 'Programlar',
          tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="WorkoutsTab"
        component={WorkoutsStackNavigator}
        options={{
          tabBarLabel: 'Antrenmanlar',
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="LeaderboardTab"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Liderlik',
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="StatisticsTab"
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'İstatistikler',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsPlaceholderScreen}
        options={{
          tabBarLabel: 'Hedefler',
          tabBarIcon: ({ color, size }) => <Ionicons name="flag-outline" size={size ?? 22} color={color} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size ?? 22} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
