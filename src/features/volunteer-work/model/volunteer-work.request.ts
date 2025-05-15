import type { DayOfWeek } from '../../common/day';

export interface GetVolunteerWorkRequest {
  agencyId: number;
}

export interface PostVolunteerWorkRequest {
  agencyId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  startMinute: number;
  endMinute: number;
  recruitStartDate: Date;
  recruitEndDate: Date;
  dayOfWeek: DayOfWeek[];
  peopleCount: number;
  recruitPeopleCount: number;
  notice: string;
  workAddress: string;
  workPlace: string;
}

export interface PatchVolunteerWorkRequest {
  title?: string;
  startDate?: Date;
  endDate?: Date;
  startMinute?: number;
  endMinute?: number;
  recruitStartDate?: Date;
  recruitEndDate?: Date;
  dayOfWeek?: DayOfWeek[];
  peopleCount?: number;
  recruitPeopleCount?: number;
  notice?: string;
  workAddress?: string;
  workPlace?: string;
}
