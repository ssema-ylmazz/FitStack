import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as tokenStorage from '../storage/tokenStorage';
import * as authService from '../api/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stored = await tokenStorage.getToken();
        if (!cancelled) {
          setTokenState(stored);
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    setAuthBusy(true);
    try {
      const { token: newToken, user: nextUser } = await authService.loginWithPassword(email, password);
      await tokenStorage.setToken(newToken);
      setUser(nextUser);
      setTokenState(newToken);
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Giriş yapılamadı.';
      return { ok: false, error: message };
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const register = useCallback(async ({ email, password, name, username }) => {
    setAuthBusy(true);
    try {
      await authService.registerAccount({ email, password, name, username });
      const { token: newToken, user: nextUser } = await authService.loginWithPassword(email, password);
      await tokenStorage.setToken(newToken);
      setUser(nextUser);
      setTokenState(newToken);
      return { ok: true };
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Kayıt tamamlanamadı.';
      return { ok: false, error: message };
    } finally {
      setAuthBusy(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await tokenStorage.removeToken();
    setUser(null);
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({ token, user, ready, authBusy, login, register, logout }),
    [token, user, ready, authBusy, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth yalnızca AuthProvider içinde kullanılabilir.');
  }
  return ctx;
}
