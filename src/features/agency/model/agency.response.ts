export interface GetManagerResponse {
  id: number;
  email: string;
  name: string;
  isOwner: boolean;
}

export interface GetAgencyResponse {
  id: number;
  title: string;
  type: string;
  phoneNumber: string;
  managerName: string;
  email: string;
  maxPeopleCount: number;
  managerList: GetManagerResponse[];
}
