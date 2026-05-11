import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, ready } = useAuth();

  if (!ready) {
    return <Loading />;
  }

  return (
    <RootStack.Navigator
      key={token ? 'authed' : 'guest'}
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f172a' } }}
    >
      {token ? (
        <RootStack.Screen name="Main" component={MainTabs} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}
