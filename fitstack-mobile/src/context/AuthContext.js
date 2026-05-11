import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as tokenStorage from '../storage/tokenStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stored = await tokenStorage.getToken();
      if (!cancelled) {
        setTokenState(stored);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Gerçek API çağrısı yok — sadece iskelet oturumu. */
  const login = useCallback(async (_email, _password) => {
    const shellToken = 'fitstack-shell-token';
    await tokenStorage.saveToken(shellToken);
    setTokenState(shellToken);
  }, []);

  /** Gerçek API çağrısı yok — sadece iskelet oturumu. */
  const register = useCallback(async (_payload) => {
    const shellToken = 'fitstack-shell-token';
    await tokenStorage.saveToken(shellToken);
    setTokenState(shellToken);
  }, []);

  const logout = useCallback(async () => {
    await tokenStorage.removeToken();
    setTokenState(null);
  }, []);

  const value = useMemo(
    () => ({ token, ready, login, register, logout }),
    [token, ready, login, register, logout],
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
