import { z } from 'zod';
import { DayOfWeekSchema } from '../../common/day';

export interface GetVolunteerWorkRequest {
  agencyId: number;
}

export const PostVolunteerWorkForm = z.object({
  title: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  startMinute: z.number().min(0).max(1440),
  endMinute: z.number().min(0).max(1440),
  recruitStartDate: z.date(),
  recruitEndDate: z.date(),
  dayOfWeek: z.array(DayOfWeekSchema),
  recruitPeopleCount: z.number().min(0),
  notice: z.string(),
  workAddress: z.string(),
  workPlace: z.string(),
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
