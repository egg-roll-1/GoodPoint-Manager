import { z } from 'zod';

export const SignUpForm = z.object({
  phoneNumber: z.string().min(1, '휴대폰 번호를 입력해주세요'),
  password: z
    .string()
    .min(5, '5~14 자리 길이의 비밀번호를 입력해주세요.')
    .max(14, '5~14 자리 길이의 비밀번호를 입력해주세요.'),
  name: z.string().min(2, '이름을 입력해주세요'),
  age: z.number().min(1, '나이를 입력해주세요'),
  gender: z.enum(['M', 'F']),
});

export type SignUpRequest = z.infer<typeof SignUpForm>;

export const LoginForm = z.object({
  phoneNumber: z.string().min(1, '휴대폰 번호를 입력해주세요'),
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginRequest = z.infer<typeof LoginForm>;
