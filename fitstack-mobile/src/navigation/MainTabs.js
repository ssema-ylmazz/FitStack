import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ProgramDetailScreen from '../screens/ProgramDetailScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import WorkoutHistoryScreen from '../screens/WorkoutHistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProgramsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        headerTintColor: colors.primary,
      }}
    >
      <Stack.Screen name="ProgramsList" component={ProgramsScreen} options={{ title: 'Programlar' }} />
      <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ title: 'Program Detayı' }} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text, fontWeight: '800' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: { borderTopColor: colors.border, height: 64, paddingBottom: 8, paddingTop: 8 },
        tabBarIcon: () => null,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '800' },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Ana Sayfa' }} />
      <Tab.Screen name="Programs" component={ProgramsStack} options={{ headerShown: false, title: 'Programlar' }} />
      <Tab.Screen name="Workouts" component={WorkoutHistoryScreen} options={{ title: 'Antrenmanlar' }} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Liderlik' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
}
