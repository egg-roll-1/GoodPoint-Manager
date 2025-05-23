import type { DayOfWeek } from '@/features/common/day';
import type { VolunteerRequestStatus } from './enum';

export interface GetVolunteerRequestQuery {
  status?: VolunteerRequestStatus;
  volunteerWorkId?: number;
  dayOfWeek?: DayOfWeek;
  start?: Date;
  end?: Date;
}
