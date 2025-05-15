import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../api/api';
import type { LoginResponse } from '../model/auth.response';
import type { AuthState } from '../model/model';

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
};

/**
 * 회원가입
 */
export const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      afterLoginAction(response);
    },
  });
};

/**
 * 로그인
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      afterLoginAction(response);
    },
  });
};

export const useAuth = (): AuthState => {
  const accessToken = localStorage.getItem(accessTokenKey);
  const _expiredAt = localStorage.getItem(accessTokenExpireKey);
  const expiredAt = _expiredAt ? new Date(_expiredAt) : null;
  const isAuthenticated = !!accessToken && !!expiredAt && new Date() < expiredAt;

  return {
    accessToken,
    expiredAt,
    isAuthenticated,
  };
};
