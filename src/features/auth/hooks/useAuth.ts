import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { signIn, signUp } from '../api/api';
import type { LoginResponse } from '../model/auth.response';

export const rememberKey = 'GP:REMEMBER';
export const accessTokenKey = 'GP:ACCESS';
export const accessTokenExpireKey = 'GP:ACCESS:EXPIRE';

/**
 * 로그인 이후 처리를 수행합니다.
 * @param {LoginResponse} response
 * @returns
 */
const afterLoginAction = (response: LoginResponse) => {
  localStorage.setItem(accessTokenKey, response.accessToken);
  localStorage.setItem(accessTokenExpireKey, response.expiredAt);
  localStorage.removeItem(rememberKey);

  const to = localStorage.getItem(rememberKey) ?? '/';
  localStorage.removeItem(rememberKey);

  return to;
};

/**
 * 회원가입
 */
export const useSignUp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      const to = afterLoginAction(response);
      navigate({ to, replace: true });
    },
  });
};

/**
 * 로그인
 */
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      const to = afterLoginAction(response);
      navigate({ to, replace: true });
    },
  });
};

export const useAuthGuard = (redirect = true) => {
  const navigate = useNavigate();
  const location = useLocation();

  const accessToken = localStorage.getItem(accessTokenKey);
  const expiredAt = localStorage.getItem(accessTokenExpireKey);

  const doRedirect = () => {
    // 현재 위치를 기억합니다.
    localStorage.setItem(rememberKey, location.pathname);

    // 로그인으로 이동시킵니다.
    navigate({ to: '/login' });
  };

  // 세션이 없는 경우, 로그인 화면으로 이동시킵니다.
  if (!accessToken || !expiredAt || new Date(expiredAt) <= new Date()) {
    if (redirect) {
      doRedirect();
    }

    return false;
  }

  return true;
};
