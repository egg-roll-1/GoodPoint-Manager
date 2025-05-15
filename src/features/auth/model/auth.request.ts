import { z } from 'zod';

export const SignUpForm = z.object({
  phoneNumber: z.string().default(''),
  password: z.string().min(8).max(14).default(''),
  name: z.string().min(2).default(''),
  age: z.number().min(0).max(200).default(0),
  gender: z.enum(['M', 'F']).default('M'),
});

export type SignUpRequest = z.infer<typeof SignUpForm>;

export const LoginForm = z.object({
  phoneNumber: z.string().min(1, '휴대폰 번호를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginRequest = z.infer<typeof LoginForm>;
