import { z } from 'zod';

export const DayOfWeekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
export const DayOfWeekSchema = z.enum(DayOfWeekList);
export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;

export const dayOfWeek2Title: Record<DayOfWeek, string> = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
};
