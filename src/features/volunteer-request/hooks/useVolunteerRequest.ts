import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  approveVolunteerRequest,
  getVolunteerRequest,
  rejectVolunteerRequest,
} from '../api/volunteer-request.api';
import type { GetVolunteerRequestQuery } from '../model/volunteer-request.request';

export const volunteerRequestKeys = {
  all: 'volunteer-request',
  list: () => [volunteerRequestKeys.all, 'list'],
  list_param: (request: GetVolunteerRequestQuery) => [volunteerRequestKeys.all, 'list', request],
  detail_param: (id: number) => [volunteerRequestKeys.all, 'detail', id],
};

export const useVolunteerRequest = (query: GetVolunteerRequestQuery) => {
  return useQuery({
    queryKey: volunteerRequestKeys.list_param(query),
    queryFn: () => getVolunteerRequest(query),
  });
};

export const useVolunteerRequestApprove = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: approveVolunteerRequest,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: volunteerRequestKeys.list() });
    },
  });
};

export const useVolunteerRequestReject = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: rejectVolunteerRequest,
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: volunteerRequestKeys.list() });
    },
  });
};
