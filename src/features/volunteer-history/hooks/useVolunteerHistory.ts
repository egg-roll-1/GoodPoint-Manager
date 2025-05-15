import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelVolunteerHistory,
  getVolunteerHistory,
  postVolunteerHistory,
} from '../api/volunteer-history.api';
import type { GetVolunteerHistoryRequest } from '../model/volunteer-history.request';

export const volunteerHistoryKeys = {
  all: 'volunteer-history',
  list: () => [volunteerHistoryKeys.all, 'list'],
  list_param: (request: GetVolunteerHistoryRequest) => [volunteerHistoryKeys.all, 'list', request],
};

export const useVolunteerHistory = (request: GetVolunteerHistoryRequest) => {
  return useQuery({
    queryKey: volunteerHistoryKeys.list_param(request),
    queryFn: () => getVolunteerHistory(request),
  });
};

export const useVolunteerPost = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: postVolunteerHistory,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: volunteerHistoryKeys.list(),
      });
    },
  });
};

export const useVolunteerCancel = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: cancelVolunteerHistory,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: volunteerHistoryKeys.list(),
      });
    },
  });
};
