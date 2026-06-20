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
      <Stack.Screen name="ProgramsList" component={ProgramsScreen} options={{ title: 'Programs' }} />
      <Stack.Screen name="ProgramDetail" component={ProgramDetailScreen} options={{ title: 'Program Detail' }} />
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
        tabBarStyle: { borderTopColor: colors.border },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="Programs" component={ProgramsStack} options={{ headerShown: false, title: 'Programs' }} />
      <Tab.Screen name="Workouts" component={WorkoutHistoryScreen} options={{ title: 'Workouts' }} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
