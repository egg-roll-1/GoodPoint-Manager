export interface GetVolunteerHistoryRequest {
  volunteerWorkId: number;
  startDateTime: Date;
  endDateTime: Date;
}

export interface PostVolunteerHistoryRequest {
  userId: number;
  volunteerWorkId: number;
  startDateTime: Date;
  endDateTime: Date;
}
