import type { DayOfWeek } from '@/features/common/day';
import type { VolunteerRequestStatus } from './enum';

export interface VolunteerWorkResponse {
  id: number;
  title: string;
  notice: string;
  maxHour: number;
  agencyId: number;
  startDate: Date;
  endDate: Date;
  startMinute: number;
  endMinute: number;
  recruitStartDate: Date;
  recruitEndDate: Date;
  dayOfWeek: DayOfWeek[];
  peopleCount: number;
  recruitPeopleCount: number;
  workAddress: string;
  workPlace: string;
}

export interface VolunteerRequestResponse {
  id: number;
  status: VolunteerRequestStatus;
  userId: number;
  name: string;
  phoneNumber: string;
  volunteerWork: VolunteerWorkResponse;
}
