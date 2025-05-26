import { z } from 'zod';

export const PatchUserProfileForm = z.object({
  username: z.string(),
  phoneNumber: z.string(),
});

export type PatchUserProfileRequest = z.infer<typeof PatchUserProfileForm>;
