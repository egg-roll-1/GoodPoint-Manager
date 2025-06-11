import { z } from 'zod';

export const PatchUserProfileForm = z.object({
  username: z.string().min(1, '이름을 입력해주세요!'),
  phoneNumber: z.string().min(1, '휴대폰 번호를 입력해주세요!'),
});

export type PatchUserProfileRequest = z.infer<typeof PatchUserProfileForm>;
