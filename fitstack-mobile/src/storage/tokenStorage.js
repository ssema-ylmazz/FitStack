import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@fitstack/auth_token';

export async function setToken(token) {
  if (token == null || token === '') {
    await removeToken();
    return;
  }
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
