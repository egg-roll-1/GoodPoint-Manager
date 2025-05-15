import type { ResultResponse } from '../../common/model';
import { publicAxios } from '../config/axios';
import type { LoginRequest, SignUpRequest } from '../model/auth.request';
import type { LoginResponse } from '../model/auth.response';

export const signUp = async (request: SignUpRequest) => {
  const { data } = await publicAxios.post<ResultResponse<LoginResponse>>('/auth/signup', request);
  return data.result;
};

export const signIn = async (request: LoginRequest) => {
  const { data } = await publicAxios.post<ResultResponse<LoginResponse>>('/auth/login', request);
  return data.result;
};
