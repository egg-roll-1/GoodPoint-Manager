import { z } from 'zod';
import { DayOfWeekSchema } from '../../common/day';

export interface GetVolunteerWorkRequest {
  agencyId: number;
}

export const PostVolunteerWorkForm = z.object({
  title: z.string().min(1, '봉사활동명을 입력해주세요!'),
  startDate: z.date(),
  endDate: z.date(),
  startMinute: z.number().min(0).max(1440),
  endMinute: z.number().min(0).max(1440),
  recruitStartDate: z.date(),
  recruitEndDate: z.date(),
  dayOfWeek: z.array(DayOfWeekSchema),
  recruitPeopleCount: z.number().min(0, '올바른 모집인원을 입력해주세요!'),
  notice: z.string().min(1, '공지사항을 입력해주세요!'),
  workAddress: z.string().min(1, '봉사활동 주소를 입력해주세요!'),
  workPlace: z.string().min(1, '활동장소를 입력해주세요!'),
});

export type PostVolunteerWorkRequest = z.infer<typeof PostVolunteerWorkForm>;

export const PatchVolunteerWorkForm = z.object({
  title: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  startMinute: z.number().min(0).max(1440).optional(),
  endMinute: z.number().min(0).max(1440).optional(),
  recruitStartDate: z.date().optional(),
  recruitEndDate: z.date().optional(),
  dayOfWeek: z.array(DayOfWeekSchema).optional(),
  recruitPeopleCount: z.number().min(0).optional(),
  notice: z.string().optional(),
  workAddress: z.string().optional(),
  workPlace: z.string().optional(),
});

export type PatchVolunteerWorkRequest = z.infer<typeof PatchVolunteerWorkForm>;
