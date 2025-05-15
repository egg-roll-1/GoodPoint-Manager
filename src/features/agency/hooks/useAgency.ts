import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAgency, getAgencyDetail, patchAgency, postAgency } from '../api/agency.api';

export const agencyKeys = {
  all: 'agency',
  list: () => [agencyKeys.all, 'list'],
  detail_param: (id: number) => [agencyKeys.all, 'detail', id],
};

export const useVolunteerWork = () => {
  return useQuery({
    queryKey: agencyKeys.list(),
    queryFn: () => getAgency(),
  });
};

export const useAgencyDetail = (id: number) => {
  return useQuery({
    queryKey: agencyKeys.detail_param(id),
    queryFn: () => getAgencyDetail(id),
  });
};

export const useAgencyPost = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postAgency,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: agencyKeys.list(),
      });
    },
  });
};

export const useVolunteerPatch = (id: number) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: patchAgency,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: agencyKeys.list(),
      });
      await client.invalidateQueries({
        queryKey: agencyKeys.detail_param(id),
      });
    },
  });
};
