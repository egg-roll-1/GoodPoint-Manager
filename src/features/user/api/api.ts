import { authAxios } from '@/features/auth/config/axios';
import type { ResultResponse } from '../../common/model';
import type { PatchUserProfileRequest } from '../model/user.request';
import type { UserProfileResponse } from '../model/user.response';

export const getUserProfile = async () => {
  const { data } = await authAxios.get<ResultResponse<UserProfileResponse>>('/user');
  return data.result;
};

export const patchUserProfile = async (request: PatchUserProfileRequest) => {
  const { data } = await authAxios.patch<ResultResponse<undefined>>('/user', request);
  return data.result;
};
