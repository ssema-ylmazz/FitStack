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

import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

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
