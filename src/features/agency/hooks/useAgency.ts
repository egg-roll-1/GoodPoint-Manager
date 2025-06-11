import { errorHandler } from '@/features/common/errorHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getAgency, getAgencyDetail, patchAgency, postAgency } from '../api/agency.api';
import { useAgencyStore } from './useAgencyStore';

export const agencyKeys = {
  all: 'agency',
  list: () => [agencyKeys.all, 'list'],
  detail_param: (id: number) => [agencyKeys.all, 'detail', id],
};

export const useAgency = () => {
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
    onError: errorHandler,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: agencyKeys.list(),
      });
    },
  });
};

export const useAgencyPatch = (id: number) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: patchAgency,
    onError: errorHandler,
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

export const useCurrentAgency = () => {
  const { data: agencyList } = useAgency();
  const { agencyId } = useAgencyStore((state) => state.context);
  const { setAgency } = useAgencyStore((state) => state.actions);

  useEffect(() => {
    if (!agencyList || agencyList.length <= 0) return;
    setAgency({ agencyId: agencyList[0]?.id });
  }, [agencyList, setAgency]);

  return agencyId ?? 0;
};
