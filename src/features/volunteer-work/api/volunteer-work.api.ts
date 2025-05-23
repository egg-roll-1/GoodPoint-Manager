import { authAxios } from '../../auth/config/axios';
import type { ResultResponse } from '../../common/model';
import type {
  GetVolunteerWorkRequest,
  PatchVolunteerWorkRequest,
  PostVolunteerWorkRequest,
} from '../model/volunteer-work.request';
import type {
  GetVolunteerWorkDetailResponse,
  GetVolunteerWorkResponse,
} from '../model/volunteer-work.response';

export const getVolunteerWork = async (request: GetVolunteerWorkRequest) => {
  if (request.agencyId <= 0) return [];

  const { data } = await authAxios.get<ResultResponse<GetVolunteerWorkResponse[]>>(
    '/volunteer-work',
    {
      params: {
        ...request,
      },
    },
  );
  return data.result;
};

export const getVolunteerWorkDetail = async (id: number) => {
  const { data } = await authAxios.get<ResultResponse<GetVolunteerWorkDetailResponse>>(
    `/volunteer-work/${id}`,
  );
  return data.result;
};

export const postVolunteerWork = async (
  request: PostVolunteerWorkRequest & { agencyId: number },
) => {
  const { data } = await authAxios.post<ResultResponse<undefined>>('/volunteer-work', request);
  return data.result;
};

export const patchVolunteerWork = async (request: PatchVolunteerWorkRequest & { id: number }) => {
  const { id, ..._request } = request;
  const { data } = await authAxios.patch<ResultResponse<undefined>>(
    `/volunteer-work/${id}`,
    _request,
  );
  return data.result;
};

export const removeVolunteerWork = async ({ id }: { id: number }) => {
  const { data } = await authAxios.delete<ResultResponse<undefined>>(`/volunteer-work/${id}`);
  return data.result;
};
