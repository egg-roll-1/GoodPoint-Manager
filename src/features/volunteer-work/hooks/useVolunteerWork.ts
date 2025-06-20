import { errorHandler } from '@/features/common/errorHandler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getVolunteerWork,
  getVolunteerWorkDetail,
  patchVolunteerWork,
  postVolunteerWork,
  removeVolunteerWork,
} from '../api/volunteer-work.api';
import type { GetVolunteerWorkRequest } from '../model/volunteer-work.request';

export const volunteerWorkKeys = {
  all: 'volunteer-work',
  list: () => [volunteerWorkKeys.all, 'list'],
  list_param: (request: GetVolunteerWorkRequest) => [volunteerWorkKeys.all, 'list', request],
  detail_param: (id: number) => [volunteerWorkKeys.all, 'detail', id],
};

export const useVolunteerWork = (request: GetVolunteerWorkRequest) => {
  return useQuery({
    queryKey: volunteerWorkKeys.list_param(request),
    queryFn: () => getVolunteerWork(request),
  });
};

export const useVolunteerWorkDetail = (id: number) => {
  return useQuery({
    queryKey: volunteerWorkKeys.detail_param(id),
    queryFn: () => getVolunteerWorkDetail(id),
  });
};

export const useVolunteerPost = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postVolunteerWork,
    onError: errorHandler,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: volunteerWorkKeys.list(),
      });
    },
  });
};

export const useVolunteerPatch = (id: number) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: patchVolunteerWork,
    onError: errorHandler,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: volunteerWorkKeys.list(),
      });
      await client.invalidateQueries({
        queryKey: volunteerWorkKeys.detail_param(id),
      });
    },
  });
};

export const useVolunteerRemove = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: removeVolunteerWork,
    onError: errorHandler,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: volunteerWorkKeys.list(),
      });
    },
  });
};
