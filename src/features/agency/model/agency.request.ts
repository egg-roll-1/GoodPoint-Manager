import { z } from 'zod';

export const PostAgencyForm = z.object({
  title: z.string().min(1, '기관명을 입력해주세요'),
  nationAgency: z.string().min(1, '지자체 명을 입력해주세요'),
});

export type PostAgencyRequest = z.infer<typeof PostAgencyForm>;

export const PatchAgencyForm = z.object({
  title: z.string().optional(),
  nationAgency: z.string().optional(),
});

export type PatchAgencyRequest = z.infer<typeof PatchAgencyForm>;
