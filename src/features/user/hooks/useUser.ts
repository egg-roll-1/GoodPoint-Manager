import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, patchUserProfile } from '../api/api';

export const userKeys = {
  all: 'user',
  profile: () => [userKeys.all, 'profile'],
};

export const useUser = () => {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: getUserProfile,
  });
};

export const useUserPatch = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: patchUserProfile,
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: userKeys.profile(),
      });
    },
  });
};
