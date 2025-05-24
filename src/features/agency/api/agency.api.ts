import { authAxios } from '../../auth/config/axios';
import type { ResultResponse } from '../../common/model';
import type { PatchAgencyRequest, PostAgencyRequest } from '../model/agency.request';
import type { GetAgencyResponse } from '../model/agency.response';

export const getAgency = async () => {
  const { data } = await authAxios.get<ResultResponse<GetAgencyResponse[]>>('/agency', {});
  return data.result;
};

export const getAgencyDetail = async (id: number) => {
  const { data } = await authAxios.get<ResultResponse<GetAgencyResponse>>(`/agency/${id}`);
  return data.result;
};

export const postAgency = async (request: PostAgencyRequest) => {
  const { data } = await authAxios.post<ResultResponse<number>>('/agency', request);
  return data.result;
};

export const patchAgency = async (request: PatchAgencyRequest & { id: number }) => {
  const { id, ..._request } = request;
  const { data } = await authAxios.patch<ResultResponse<undefined>>(`/agency/${id}`, _request);
  return data.result;
};

export const removeAgency = async ({ id }: { id: number }) => {
  const { data } = await authAxios.delete<ResultResponse<undefined>>(`/agency/${id}`);
  return data.result;
};
