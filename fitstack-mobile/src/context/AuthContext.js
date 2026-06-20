import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  token: null,
  setSession: () => {},
  clearSession: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const value = useMemo(
    () => ({
      user,
      token,
      setSession: (nextSession) => {
        setUser(nextSession?.user ?? null);
        setToken(nextSession?.token ?? null);
      },
      clearSession: () => {
        setUser(null);
        setToken(null);
      },
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
