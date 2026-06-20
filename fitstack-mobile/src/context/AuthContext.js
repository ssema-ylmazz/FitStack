import { createContext, useEffect, useMemo, useState } from 'react';
import { getProfile as fetchProfile, loginUser, registerUser } from '../api/authApi';
import { getToken, removeToken, saveToken } from '../utils/storage';

export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

function readToken(data) {
  return data?.token || data?.accessToken || data?.data?.token || data?.data?.accessToken || null;
}

function readUser(data) {
  return data?.user || data?.data?.user || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshProfile() {
    try {
      const response = await fetchProfile();
      const nextUser = readUser(response.data);
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      console.log('[Auth] Profil yuklenemedi:', error.userMessage || error.message);
      return null;
    }
  }

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      try {
        const storedToken = await getToken();
        if (!mounted) return;
        if (storedToken) {
          setToken(storedToken);
          await refreshProfile();
        }
      } catch (error) {
        console.log('[Auth] Oturum yuklenemedi:', error.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function login(credentials) {
    const response = await loginUser(credentials);
    const nextToken = readToken(response.data);
    const nextUser = readUser(response.data);

    if (nextToken) {
      await saveToken(nextToken);
      setToken(nextToken);
    }
    if (nextUser) {
      setUser(nextUser);
    }

    return response.data;
  }

  async function register(payload) {
    const response = await registerUser(payload);
    return response.data;
  }

  async function logout() {
    await removeToken();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      refreshProfile,
    }),
    [user, token, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
