import { authAxios } from '@/features/auth/config/axios';
import type { ResultResponse } from '@/features/common/model';
import type { GetVolunteerRequestQuery } from '../model/volunteer-request.request';
import type { VolunteerRequestResponse } from '../model/volunteer-request.response';

export const getVolunteerRequest = async (request: GetVolunteerRequestQuery) => {
  const { data } = await authAxios.get<ResultResponse<VolunteerRequestResponse[]>>(
    '/volunteer-request',
    {
      params: {
        ...request,
      },
    },
  );
  return data.result;
};

export const approveVolunteerRequest = async (id: number) => {
  const { data } = await authAxios.post<ResultResponse<undefined>>(
    `/volunteer-request/${id}/approve`,
  );
  return data.result;
};

export const rejectVolunteerRequest = async (id: number) => {
  const { data } = await authAxios.post<ResultResponse<undefined>>(
    `/volunteer-request/${id}/reject`,
  );
  return data.result;
};
