import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';
import { signIn, signUp } from '../api/api';
import { useAuthStore } from './useAuthStore';

/**
 * 회원가입
 */
export const useSignUp = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore((state) => state.actions);

  return useMutation({
    mutationFn: signUp,
    onSuccess: async (response) => {
      const { accessToken, expiredAt: _expiredAt } = response;
      const expiredAt = new Date(_expiredAt);

      setAuth({
        accessToken: accessToken,
        expiredAt: expiredAt,
        isAuthenticated: !!accessToken && !!expiredAt && new Date() < expiredAt,
      });

      await router.navigate({ to: '/' });
    },
  });
};

/**
 * 로그인
 */
export const useLogin = () => {
  const router = useRouter();
  const search = useSearch({ from: '/login' });
  const { setAuth } = useAuthStore((state) => state.actions);

  const { redirect } = search;

  return useMutation({
    mutationFn: signIn,
    onSuccess: async (response) => {
      const { accessToken, expiredAt: _expiredAt } = response;
      const expiredAt = new Date(_expiredAt);

      setAuth({
        accessToken: accessToken,
        expiredAt: expiredAt,
        isAuthenticated: !!accessToken && !!expiredAt && new Date() < expiredAt,
      });

      await router.navigate({ to: redirect ?? '/' });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const { logout: _logout } = useAuthStore((state) => state.actions);

  const logout = useCallback(async () => {
    _logout();
    await router.navigate({ to: '/' });
  }, [router, _logout]);

  return { logout };
};
