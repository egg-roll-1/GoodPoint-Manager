import { authAxios } from '../../auth/config/axios';
import type { ResultResponse } from '../../common/model';
import type { GetVolunteerHistoryRequest } from '../model/volunteer-history.request';
import type { GetVolunteerHistoryResponse } from '../model/volunteer-history.response';

export const getVolunteerHistory = async (request: GetVolunteerHistoryRequest) => {
  const { data } = await authAxios.get<ResultResponse<GetVolunteerHistoryResponse[]>>(
    '/volunteer-history',
    {
      params: {
        ...request,
      },
    },
  );
  return data.result;
};

export const postVolunteerHistory = async () => {
  const { data } = await authAxios.post<ResultResponse<undefined>>('/volunteer-history');
  return data.result;
};

export const cancelVolunteerHistory = async () => {
  const { data } = await authAxios.delete<ResultResponse<undefined>>('/volunteer-history');
  return data.result;
};
