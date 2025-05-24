import type { DayOfWeek } from '../../common/day';
import type { VolunteerRequestStatus } from '../../volunteer-request/model/enum';

export interface GetVolunteerWorkResponse {
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
  dateList: Date[];
}

export interface VolunteerWorkRequest {
  id: number;
  status: VolunteerRequestStatus;
  userId: number;
  name: string;
  phoneNumber: string;
}

export interface GetVolunteerWorkDetailResponse extends GetVolunteerWorkResponse {
  notice: string;
  requestList: VolunteerWorkRequest[];
}
