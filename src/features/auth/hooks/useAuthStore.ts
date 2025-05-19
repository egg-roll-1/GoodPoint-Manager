import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const accessTokenKey = 'GP:ACCESS';
export const accessTokenExpireKey = 'GP:ACCESS:EXPIRE';

export type AuthState = {
  context: {
    accessToken: string | null;
    expiredAt: Date | null;
    isAuthenticated: boolean;
  };
};

export type AuthActions = {
  actions: {
    setAuth: (context: AuthState['context']) => void;
    logout: () => void;
  };
};

export type AuthStore = AuthState & AuthActions;

export const PERSIST_AUTH_KEY = 'auth-storage';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      context: {
        accessToken: null,
        expiredAt: null,
        isAuthenticated: false,
      },
      actions: {
        setAuth: (context) => set({ context }),
        logout: () =>
          set({ context: { accessToken: null, expiredAt: null, isAuthenticated: false } }),
      },
    }),
    {
      name: PERSIST_AUTH_KEY,
      partialize: (state) => ({ context: state.context }),
    },
  ),
);

export const getAccessToken = () => {
  const serializedAuthStore = localStorage.getItem(PERSIST_AUTH_KEY);
  if (!serializedAuthStore) {
    return null;
  }

  try {
    const authStore = JSON.parse(serializedAuthStore) as AuthState;
    return authStore?.context?.accessToken;
  } catch {
    return null;
  }
};
