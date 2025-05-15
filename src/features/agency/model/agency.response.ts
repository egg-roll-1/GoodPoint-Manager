export interface GetAgencyResponse {
  id: number;
  title: string;
  type: string;
  phoneNumber: string;
  managerName: string;
  email: string;
  maxPeopleCount: number;
  managerList: string[];
}
